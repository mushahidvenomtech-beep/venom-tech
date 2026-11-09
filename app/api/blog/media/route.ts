import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BlogDbService } from "@/lib/blog/services/blogDbService";
import { BlogStore } from "@/lib/blog/blogStore";

export async function GET() {
  try {
    const media = await BlogDbService.getMedia();
    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    try {
      const fallback = BlogStore.getMedia();
      return NextResponse.json({ success: true, media: fallback });
    } catch {}
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch media" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // 1. Direct File Upload from Local Computer (multipart/form-data)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const title = (formData.get("title") as string) || file?.name || "Uploaded Image";
      const alt = (formData.get("alt") as string) || title;

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file was provided in upload" },
          { status: 400 }
        );
      }

      const uploadDir = path.join(process.cwd(), "public", "images", "blog");
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

      const publicUrl = `/images/blog/${safeFilename}`;
      const sizeStr = `${Math.max(1, Math.round(file.size / 1024))} KB`;

      const mediaItem = await BlogDbService.addMedia({
        url: publicUrl,
        filename: safeFilename,
        title,
        alt,
        caption: "",
        size: sizeStr,
        mimeType: file.type || "image/jpeg",
        dimensions: "Original",
      });

      try {
        BlogStore.addMedia(mediaItem);
      } catch {}

      return NextResponse.json(
        {
          success: true,
          url: publicUrl,
          filename: safeFilename,
          media: mediaItem,
        },
        { status: 201 }
      );
    }

    // 2. JSON Payload (URL or data URL)
    const body = await request.json();
    if (!body.url || !body.title) {
      return NextResponse.json(
        { success: false, error: "Image URL and title are required" },
        { status: 400 }
      );
    }

    const created = await BlogDbService.addMedia(body);
    try {
      BlogStore.addMedia(body);
    } catch {}

    return NextResponse.json({ success: true, media: created, url: created.url }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process media" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, alt, caption } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Media ID is required" }, { status: 400 });
    }
    const updated = await BlogDbService.updateMedia(id, { title, alt, caption });
    return NextResponse.json({ success: true, media: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update media" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }
    const deleted = await BlogDbService.deleteMedia(id);
    try {
      BlogStore.deleteMedia(id);
    } catch {}
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

