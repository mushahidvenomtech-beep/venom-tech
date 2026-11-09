import { NextResponse } from "next/server";
import { BlogDbService } from "@/lib/blog/services/blogDbService";
import { BlogStore } from "@/lib/blog/blogStore";
import { validateTag } from "@/lib/blog/validation";

export async function GET() {
  try {
    const tags = await BlogDbService.getTags();
    return NextResponse.json({ success: true, tags });
  } catch (error: any) {
    try {
      const fallback = BlogStore.getTags();
      return NextResponse.json({ success: true, tags: fallback });
    } catch {}
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateTag(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const created = await BlogDbService.createTag(body);
    try {
      BlogStore.createTag(body);
    } catch {}
    return NextResponse.json({ success: true, tag: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create tag" },
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
    const deleted = await BlogDbService.deleteTag(id);
    try {
      BlogStore.deleteTag(id);
    } catch {}
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

