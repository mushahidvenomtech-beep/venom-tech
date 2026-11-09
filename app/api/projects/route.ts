import { NextResponse } from "next/server";
import { ProjectDbService } from "@/lib/projects/services/projectDbService";
import { NewProjectInput } from "@/lib/projects/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isFeatured = searchParams.get("featured") === "true" ? true : undefined;
    const onlyActive = searchParams.get("active") === "true";
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const projects = await ProjectDbService.getAll({
      isFeatured,
      onlyActive,
      status,
      search,
    });

    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: NewProjectInput = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Project title is required" },
        { status: 400 }
      );
    }

    const created = await ProjectDbService.create(body);
    return NextResponse.json({ success: true, project: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}

