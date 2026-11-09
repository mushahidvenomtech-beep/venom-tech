"use client";

import React from "react";
import Image from "next/image";
import {
  EditorBlock,
  HeadingBlockData,
  ParagraphBlockData,
  ListBlockData,
  ImageBlockData,
  QuoteBlockData,
  TableBlockData,
  CodeBlockData,
  CalloutBlockData,
  DividerBlockData,
} from "@/lib/blog/types";
import { sanitizeText, sanitizeUrl } from "@/lib/blog/sanitize";

interface BlogBlockRendererProps {
  blocks: EditorBlock[];
  isDarkTheme?: boolean;
}

export default function BlogBlockRenderer({
  blocks,
  isDarkTheme = false,
}: BlogBlockRendererProps) {
  let normalizedBlocks: EditorBlock[] = [];
  if (Array.isArray(blocks)) {
    normalizedBlocks = blocks;
  } else if (typeof blocks === "string") {
    try {
      const parsed = JSON.parse(blocks);
      normalizedBlocks = Array.isArray(parsed) ? parsed : [];
    } catch {
      normalizedBlocks = [];
    }
  }

  if (normalizedBlocks.length === 0) {
    return (
      <div className="py-8 text-center text-stone-500 font-mono text-xs">
        No content blocks available.
      </div>
    );
  }

  return (
    <div className={`space-y-6 max-w-4xl font-sans ${isDarkTheme ? "text-stone-300" : "text-stone-800"}`}>
      {normalizedBlocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const data = block.data as HeadingBlockData;
            const text = data.text || "";
            if (data.level === 1) {
              return (
                <h1
                  key={block.id}
                  className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-4xl tracking-tight mt-8 mb-4 ${
                    isDarkTheme ? "text-white" : "text-slate-950"
                  }`}
                >
                  {text}
                </h1>
              );
            }
            if (data.level === 2) {
              return (
                <h2
                  key={block.id}
                  className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl sm:text-3xl tracking-tight mt-8 mb-4 ${
                    isDarkTheme ? "text-white" : "text-slate-900"
                  }`}
                >
                  {text}
                </h2>
              );
            }
            if (data.level === 3) {
              return (
                <h3
                  key={block.id}
                  className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl tracking-wide mt-6 mb-3 ${
                    isDarkTheme ? "text-stone-100" : "text-slate-800"
                  }`}
                >
                  {text}
                </h3>
              );
            }
            return (
              <h4
                key={block.id}
                className={`font-[family-name:var(--font-oswald)] uppercase font-semibold text-lg tracking-wide mt-4 mb-2 ${
                  isDarkTheme ? "text-stone-200" : "text-slate-800"
                }`}
              >
                {text}
              </h4>
            );
          }

          case "paragraph": {
            const data = block.data as ParagraphBlockData;
            const alignClass =
              data.align === "center"
                ? "text-center"
                : data.align === "right"
                ? "text-right"
                : "text-left";
            return (
              <p
                key={block.id}
                className={`text-base leading-relaxed ${alignClass} ${
                  isDarkTheme ? "text-stone-300" : "text-stone-700"
                }`}
              >
                {data.text}
              </p>
            );
          }

          case "list": {
            const data = block.data as ListBlockData;
            const isOrdered = data.style === "ordered";
            return (
              <div key={block.id} className="my-4 pl-4">
                {isOrdered ? (
                  <ol className="list-decimal space-y-2 pl-5 text-base">
                    {data.items?.map((item, idx) => (
                      <li key={idx} className={isDarkTheme ? "text-stone-300" : "text-stone-700"}>
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc space-y-2 pl-5 text-base marker:text-[#3BC8F6]">
                    {data.items?.map((item, idx) => (
                      <li key={idx} className={isDarkTheme ? "text-stone-300" : "text-stone-700"}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          case "image": {
            const data = block.data as ImageBlockData;
            const validUrl = sanitizeUrl(data.url);
            return (
              <figure key={block.id} className="my-8 space-y-2">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-video bg-stone-900">
                  <Image
                    src={validUrl}
                    alt={data.alt || "Article illustration"}
                    fill
                    unoptimized={Boolean(
                      validUrl.startsWith("data:") || validUrl.startsWith("blob:")
                    )}
                    className="object-cover"
                  />
                </div>
                {data.caption && (
                  <figcaption className="text-center text-xs font-mono text-stone-500 italic">
                    {data.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "quote": {
            const data = block.data as QuoteBlockData;
            return (
              <blockquote
                key={block.id}
                className={`my-8 pl-6 border-l-4 border-gradient-to-b border-[#C07DFF] py-2 italic text-lg sm:text-xl font-serif ${
                  isDarkTheme ? "text-stone-200 bg-white/[0.02]" : "text-stone-800 bg-stone-50"
                } rounded-r-2xl pr-4`}
              >
                <p>&ldquo;{data.quote}&rdquo;</p>
                {data.citation && (
                  <footer className="mt-2 text-xs font-sans not-italic font-semibold tracking-wider uppercase text-[#3BC8F6]">
                    &mdash; {data.citation}
                  </footer>
                )}
              </blockquote>
            );
          }

          case "table": {
            const data = block.data as TableBlockData;
            return (
              <div
                key={block.id}
                className={`my-6 overflow-x-auto rounded-2xl border ${
                  isDarkTheme ? "border-white/10 bg-white/[0.02]" : "border-stone-200 bg-white"
                }`}
              >
                <table className="w-full text-left text-sm">
                  {data.headers && data.headers.length > 0 && (
                    <thead
                      className={`uppercase text-xs font-[family-name:var(--font-oswald)] tracking-wider border-b ${
                        isDarkTheme
                          ? "border-white/10 bg-white/[0.04] text-stone-400"
                          : "border-stone-200 bg-stone-100 text-stone-600"
                      }`}
                    >
                      <tr>
                        {data.headers.map((h, i) => (
                          <th key={i} className="py-3 px-4 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody className={`divide-y ${isDarkTheme ? "divide-white/5" : "divide-stone-100"}`}>
                    {data.rows?.map((row, rIdx) => (
                      <tr key={rIdx} className={isDarkTheme ? "hover:bg-white/[0.02]" : "hover:bg-stone-50"}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-3 px-4 text-xs sm:text-sm">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case "code": {
            const data = block.data as CodeBlockData;
            return (
              <div key={block.id} className="my-6 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 text-xs sm:text-sm font-mono text-cyan-300">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-white/10 text-[11px] text-stone-400">
                  <span>{data.language || "code"}</span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500">Snippet</span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code>{data.code}</code>
                </pre>
              </div>
            );
          }

          case "callout": {
            const data = block.data as CalloutBlockData;
            const variantClasses = {
              info: "border-cyan-500/40 bg-cyan-950/20 text-cyan-200",
              warning: "border-amber-500/40 bg-amber-950/20 text-amber-200",
              tip: "border-[#C07DFF]/40 bg-[#C07DFF]/10 text-purple-200",
              success: "border-emerald-500/40 bg-emerald-950/20 text-emerald-200",
            }[data.variant || "info"];

            return (
              <div key={block.id} className={`my-6 p-4 sm:p-5 rounded-2xl border ${variantClasses} space-y-1.5`}>
                {data.title && (
                  <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wide text-white">
                    {data.title}
                  </h4>
                )}
                <p className="text-xs sm:text-sm leading-relaxed">{data.text}</p>
              </div>
            );
          }

          case "divider": {
            return (
              <div key={block.id} className="my-10 flex items-center justify-center">
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C07DFF] to-transparent opacity-60" />
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}

