"use client";

import React from "react";
import { BlogPost, PostRevision } from "@/lib/blog/types";

interface BlogRevisionsModalProps {
  post: BlogPost;
  onRestoreRevision: (revision: PostRevision) => void;
  onClose: () => void;
}

export default function BlogRevisionsModal({
  post,
  onRestoreRevision,
  onClose,
}: BlogRevisionsModalProps) {
  const revisions = post.revisions || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-950 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg text-white">
              Revision History &bull; {post.title}
            </h4>
            <p className="text-xs text-stone-400 font-sans">
              Review snapshots of prior saved states and restore content anytime.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2"
          >
            ✕
          </button>
        </div>

        {/* Revisions Timeline List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {revisions.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-mono text-xs">
              No historical revisions found for this post yet.
            </div>
          ) : (
            revisions.map((rev, index) => {
              const isCurrent = index === 0;
              return (
                <div
                  key={rev.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-white/[0.04] border-[#3BC8F6]/40"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-white font-semibold">
                          {new Date(rev.savedAt).toLocaleString()}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-[#3BC8F6]/20 text-[#3BC8F6] text-[10px] font-mono font-bold">
                            Current Version
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 font-sans">
                        Author: <span className="text-stone-400">{rev.author}</span>
                        {rev.note && (
                          <>
                            {" "}&bull; <span className="text-stone-400 italic">{rev.note}</span>
                          </>
                        )}
                      </p>
                      <p className="text-[11px] font-mono text-stone-500">
                        {rev.contentBlocks?.length || 0} blocks recorded
                      </p>
                    </div>

                    {!isCurrent && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Restore this version? Unsaved changes will be replaced.")) {
                            onRestoreRevision(rev);
                            onClose();
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#C07DFF] hover:text-white text-stone-300 text-xs font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider transition-all"
                      >
                        Restore Version &rarr;
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

