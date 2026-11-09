import { NextResponse } from "next/server";
import { LeadDbService } from "@/lib/leads/services/leadDbService";

// Simple in-memory rate-limiter: max 10 requests per 60 seconds per IP
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }

  if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function sanitize(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many inquiries sent. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse Body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { name, email, phone, company, services, message, source } = body;

    // 3. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: "A valid name between 2 and 100 characters is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim()) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: "A valid business email address is required." },
        { status: 400 }
      );
    }

    const selectedServices = Array.isArray(services) && services.length > 0 ? services : ["General Inquiry"];
    const messageContent = message && typeof message === "string" ? sanitize(message) : "Initial discovery lead inquiry";

    // 4. Save Lead directly into MySQL database
    const lead = await LeadDbService.create({
      name: sanitize(name),
      email: sanitize(email).toLowerCase(),
      phone: phone && typeof phone === "string" ? sanitize(phone) : "",
      company: company && typeof company === "string" ? sanitize(company) : "",
      services: selectedServices,
      message: messageContent,
      status: "New",
      source: source && typeof source === "string" ? sanitize(source) : "contact_page_multistep",
    });

    return NextResponse.json(
      {
        success: true,
        lead,
        message: "Your inquiry has been received. Our partner team will review your brief within 24 hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
