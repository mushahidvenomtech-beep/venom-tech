import { NextResponse } from "next/server";
import { ProjectCategoryDbService } from "@/lib/projects/services/projectCategoryDbService";
import { NewProjectCategoryInput } from "@/lib/projects/types";

export async function GET() {
  try {
    const categories = await ProjectCategoryDbService.getAll();
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch project categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: NewProjectCategoryInput = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await ProjectCategoryDbService.create(body);
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}

