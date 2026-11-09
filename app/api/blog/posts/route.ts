import { NextResponse } from "next/server";
import { BlogDbService } from "@/lib/blog/services/blogDbService";
import { validatePost } from "@/lib/blog/validation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const sortBy = (searchParams.get("sortBy") as any) || "newest";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const result = await BlogDbService.getPosts({
      search,
      status,
      category,
      tag,
      sortBy,
      page,
      pageSize,
    });

    const stats = await BlogDbService.getStatistics();

    return NextResponse.json({
      success: true,
      ...result,
      stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = validatePost(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const created = await BlogDbService.createPost(body);
    return NextResponse.json({ success: true, post: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}

