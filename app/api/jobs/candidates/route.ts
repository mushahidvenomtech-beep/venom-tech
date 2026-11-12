import { NextResponse } from "next/server";
import { CandidateDbService } from "@/lib/jobs/services/candidateDbService";
import { JobDbService } from "@/lib/jobs/services/jobDbService";
import { CandidateFilterBucket, NewCandidateInput } from "@/lib/jobs/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = (searchParams.get("filter") || "all") as CandidateFilterBucket;
    const status = searchParams.get("status") || undefined;
    const jobId = searchParams.get("jobId") || undefined;
    const search = searchParams.get("search") || undefined;

    const [candidates, allForCounts] = await Promise.all([
      CandidateDbService.getAll({ filter, status, jobId, search }),
      CandidateDbService.getAll({ jobId }),
    ]);

    const counts = {
      total: allForCounts.length,
      newCount: allForCounts.filter((c) => c.status === "New").length,
      unattendedCount: allForCounts.filter(
        (c) => !c.isAttended || c.status === "New" || c.status === "Unattended"
      ).length,
      attendedCount: allForCounts.filter(
        (c) => c.isAttended && c.status !== "New" && c.status !== "Unattended"
      ).length,
    };

    return NextResponse.json({ success: true, candidates, counts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: NewCandidateInput = await request.json();

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name and email address are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    let resolvedJobTitle = body.jobTitle?.trim() || "General Application";

    if (body.jobId && body.jobId !== "general") {
      const job = await JobDbService.getById(body.jobId);
      if (job) {
        resolvedJobTitle = job.title;
        if (job.status !== "Open") {
          return NextResponse.json(
            { success: false, error: "This position is no longer accepting applications." },
            { status: 400 }
          );
        }
        if (job.applyFormConfig.requireResume && !body.resumeUrl?.trim()) {
          return NextResponse.json(
            { success: false, error: "Please upload or attach your Resume / CV." },
            { status: 400 }
          );
        }
        for (const q of job.applyFormConfig.customQuestions || []) {
          if (q.required) {
            const answerObj = (body.customAnswers || []).find(
              (a) => a.questionId === q.id
            );
            if (!answerObj || !answerObj.answer?.trim()) {
              return NextResponse.json(
                { success: false, error: `Please answer required question: "${q.label}"` },
                { status: 400 }
              );
            }
          }
        }
      }
    }

    const candidate = await CandidateDbService.create({
      ...body,
      jobTitle: resolvedJobTitle,
    });

    return NextResponse.json({ success: true, candidate }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit job application" },
      { status: 500 }
    );
  }
}

