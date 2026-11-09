import { NextResponse } from "next/server";
import { ProjectDbService } from "@/lib/projects/services/projectDbService";
import { UpdateProjectInput } from "@/lib/projects/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const project = await ProjectDbService.getById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const body: UpdateProjectInput = await request.json();

    const updated = await ProjectDbService.update(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const success = await ProjectDbService.delete(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}

