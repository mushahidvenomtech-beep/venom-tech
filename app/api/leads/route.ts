import { NextResponse } from "next/server";
import { LeadDbService } from "@/lib/leads/services/leadDbService";
import { NewLeadInput } from "@/lib/leads/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const leads = await LeadDbService.getAll({ status, search });
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: NewLeadInput = await request.json();

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const lead = await LeadDbService.create(body);
    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create lead" },
      { status: 500 }
    );
  }
}

