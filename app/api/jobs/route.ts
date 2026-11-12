import { NextResponse } from "next/server";
import { JobDbService } from "@/lib/jobs/services/jobDbService";
import { CandidateDbService } from "@/lib/jobs/services/candidateDbService";
import { NewJobInput } from "@/lib/jobs/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const department = searchParams.get("department") || undefined;
    const workMode = searchParams.get("workMode") || undefined;
    const search = searchParams.get("search") || undefined;
    const includeCounts = searchParams.get("includeCounts") === "true";

    const jobs = await JobDbService.getAll({ status, department, workMode, search });

    if (includeCounts) {
      const candidates = await CandidateDbService.getAll();
      const countMap = new Map<string, number>();
      for (const c of candidates) {
        countMap.set(c.jobId, (countMap.get(c.jobId) || 0) + 1);
      }
      const enriched = jobs.map((j) => ({
        ...j,
        applicantsCount: countMap.get(j.id) || 0,
      }));
      return NextResponse.json({ success: true, jobs: enriched });
    }

    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: NewJobInput = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Job title is required" },
        { status: 400 }
      );
    }

    const job = await JobDbService.create(body);
    return NextResponse.json({ success: true, job }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create job posting" },
      { status: 500 }
    );
  }
}

