import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded" },
        { status: 400 }
      );
    }

    // Verify it's an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Uploaded file must be an image (JPEG, PNG, WEBP, etc.)" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "images", "team");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.name) || ".jpg";
    const baseClean = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const safeFilename = `${Date.now()}-${baseClean}${ext}`;
    const filePath = path.join(uploadDir, safeFilename);

    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    const publicUrl = `/images/team/${safeFilename}`;

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        filename: safeFilename,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process image upload" },
      { status: 500 }
    );
  }
}
