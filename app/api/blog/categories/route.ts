import { NextResponse } from "next/server";
import { BlogDbService } from "@/lib/blog/services/blogDbService";
import { BlogStore } from "@/lib/blog/blogStore";
import { validateCategory } from "@/lib/blog/validation";

export async function GET() {
  try {
    const categories = await BlogDbService.getCategories();
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    try {
      const fallback = BlogStore.getCategories();
      return NextResponse.json({ success: true, categories: fallback });
    } catch {}
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateCategory(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const created = await BlogDbService.createCategory(body);
    try {
      BlogStore.createCategory(body);
    } catch {}

    return NextResponse.json({ success: true, category: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category" },
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
    const deleted = await BlogDbService.deleteCategory(id);
    try {
      BlogStore.deleteCategory(id);
    } catch {}
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

