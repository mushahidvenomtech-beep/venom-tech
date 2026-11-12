import { NextResponse } from "next/server";
import { JobDbService } from "@/lib/jobs/services/jobDbService";
import { UpdateJobInput } from "@/lib/jobs/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await JobDbService.getById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job posting not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch job posting" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateJobInput = await request.json();

    if (body.title !== undefined && !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Job title cannot be empty" },
        { status: 400 }
      );
    }

    const updated = await JobDbService.update(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Job posting not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, job: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update job posting" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await JobDbService.delete(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete job posting" },
      { status: 500 }
    );
  }
}

