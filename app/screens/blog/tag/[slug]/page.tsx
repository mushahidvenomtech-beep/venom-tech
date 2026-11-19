import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import BlogArchiveView from "@/app/component/blog/archive/BlogArchiveView";
import { BlogStore } from "@/lib/blog/blogStore";

export function generateStaticParams() {
  const tags = BlogStore.getTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tags = BlogStore.getTags();
  const tag = tags.find((t) => t.slug === slug);
  const title = tag ? tag.name : slug;

  return {
    title: `#${title} Articles | Venom Tech IT Solution Blog`,
    description: `Read all articles and updates tagged with #${title}.`,
  };
}

export default async function TagArchiveScreen({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tags = BlogStore.getTags();
  const tag = tags.find((t) => t.slug === slug);
  const tagName = tag ? tag.name : slug;

  const posts = BlogStore.getPosts({
    tag: tagName,
    status: "published",
    pageSize: 30,
  }).posts;

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main id="main-content">
        <BlogArchiveView
          type="tag"
          title={`#${tagName}`}
          description={`All articles, technical tutorials, and insights tagged with #${tagName}.`}
          posts={posts}
        />
      </main>
      <HomeFooter />
    </div>
  );
}
