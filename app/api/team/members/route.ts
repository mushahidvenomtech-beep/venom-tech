import { NextResponse } from "next/server";
import { TeamDbService } from "@/lib/team/services/teamDbService";
import { NewTeamMemberInput } from "@/lib/team/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyActive = searchParams.get("active") === "true";
    const members = await TeamDbService.getAll(onlyActive);
    return NextResponse.json({ success: true, members });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: NewTeamMemberInput = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { success: false, error: "Member name is required" },
        { status: 400 }
      );
    }

    if (!body.role?.trim()) {
      return NextResponse.json(
        { success: false, error: "Member role/title is required" },
        { status: 400 }
      );
    }

    if (!body.specialty?.trim()) {
      return NextResponse.json(
        { success: false, error: "Member specialty/focus is required" },
        { status: 400 }
      );
    }

    const created = await TeamDbService.create(body);
    return NextResponse.json({ success: true, member: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create team member" },
      { status: 500 }
    );
  }
}
