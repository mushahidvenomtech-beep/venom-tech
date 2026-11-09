"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import SwipeToast from "@/app/component/global/ui/SwipeToast";

interface CommentItem {
  id: number;
  name: string;
  date: string;
  comment: string;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 1,
    name: "Marcus Aurelius",
    date: "November 19, 2026 at 10:24 AM",
    comment: "This is a masterclass in modern digital campaigns. The emphasis on restraint and typography resonates with how we scale our enterprise platforms.",
  },
];

export default function SingleBlogComments() {
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [formData, setFormData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
    saveInfo: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.comment.trim() || !formData.name.trim()) return;

    const newComment: CommentItem = {
      id: Date.now(),
      name: formData.name,
      date: "Just now",
      comment: formData.comment,
    };

    setComments([newComment, ...comments]);
    setSubmitted(true);
    setToastOpen(true);
    setFormData({
      comment: "",
      name: formData.saveInfo ? formData.name : "",
      email: formData.saveInfo ? formData.email : "",
      website: formData.saveInfo ? formData.website : "",
      saveInfo: formData.saveInfo,
    });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-10 max-w-[1100px] mx-auto">
      {/* Existing Comments Display */}
      {comments.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111]">
              Discussion ({comments.length})
            </h3>
          </div>

          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-6 bg-white border border-stone-200 shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white font-[family-name:var(--font-oswald)] font-bold text-xs flex items-center justify-center">
                      {c.name[0]}
                    </div>
                    <span className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base text-[#111111]">
                      {c.name}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-stone-400">{c.date}</span>
                </div>
                <p className="font-sans text-stone-600 text-sm leading-relaxed pl-11">
                  {c.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave a Reply Header */}
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-5xl text-[#111111] tracking-tight mb-2">
          Leave a Reply
        </h2>
        <p className="font-sans text-stone-500 text-xs sm:text-sm">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>

      {submitted && (
        <div className="p-4 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6]/10 border border-[#C07DFF]/30 text-[#C07DFF] font-[family-name:var(--font-oswald)] text-sm uppercase tracking-wider font-semibold mb-6 animate-in fade-in">
          ✓ Your reply has been posted successfully!
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Comment Textarea */}
        <div>
          <label htmlFor="comment-text" className="block font-sans text-xs text-stone-600 font-semibold mb-2">
            Comment *
          </label>
          <textarea
            id="comment-text"
            required
            rows={7}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full bg-white border border-stone-300 px-4 py-3 text-[#111111] font-sans text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="comment-name" className="block font-sans text-xs text-stone-600 font-semibold mb-2">
            Name *
          </label>
          <input
            id="comment-name"
            required
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white border border-stone-300 px-4 py-3 text-[#111111] font-sans text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="comment-email" className="block font-sans text-xs text-stone-600 font-semibold mb-2">
            Email *
          </label>
          <input
            id="comment-email"
            required
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-stone-300 px-4 py-3 text-[#111111] font-sans text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Website Input */}
        <div>
          <label htmlFor="comment-website" className="block font-sans text-xs text-stone-600 font-semibold mb-2">
            Website
          </label>
          <input
            id="comment-website"
            type="url"
            autoComplete="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full bg-white border border-stone-300 px-4 py-3 text-[#111111] font-sans text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Save Info Checkbox */}
        <div className="flex items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            id="saveInfo"
            checked={formData.saveInfo}
            onChange={(e) => setFormData({ ...formData, saveInfo: e.target.checked })}
            className="w-4 h-4 accent-black rounded border-stone-300"
          />
          <label htmlFor="saveInfo" className="font-sans text-xs text-stone-600 cursor-pointer select-none">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-8 py-3.5 font-[family-name:var(--font-oswald)] uppercase font-semibold text-sm tracking-wider transition-all duration-300 shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* React Bits SwipeToast on Comment Submission */}
      {toastOpen && (
        <SwipeToast
          open={toastOpen}
          onClose={() => setToastOpen(false)}
          title="Comment Published"
          description="Your reply has been posted successfully and is now live."
          background="#09090b"
          color="#f5f5f5"
          fuseColor="#C07DFF"
          duration={4000}
          fuse="bottom"
          pauseOnHover
          closeButton
        />
      )}
    </section>
  );
}

