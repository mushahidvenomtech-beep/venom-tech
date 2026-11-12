import { NextResponse } from "next/server";
import { CandidateDbService } from "@/lib/jobs/services/candidateDbService";
import { UpdateCandidateInput } from "@/lib/jobs/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const candidate = await CandidateDbService.getById(id);

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, candidate });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch candidate" },
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
    const body: UpdateCandidateInput = await request.json();

    if (body.name !== undefined && !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Candidate name cannot be empty" },
        { status: 400 }
      );
    }

    if (body.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const updated = await CandidateDbService.update(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Candidate not found or failed to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, candidate: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update candidate" },
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
    const deleted = await CandidateDbService.delete(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete candidate" },
      { status: 500 }
    );
  }
}

