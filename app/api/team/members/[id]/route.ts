import { NextResponse } from "next/server";
import { TeamDbService } from "@/lib/team/services/teamDbService";
import { UpdateTeamMemberInput } from "@/lib/team/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const member = await TeamDbService.getById(id);

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const body: UpdateTeamMemberInput = await request.json();

    const updated = await TeamDbService.update(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, member: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const success = await TeamDbService.delete(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete team member" },
      { status: 500 }
    );
  }
}
