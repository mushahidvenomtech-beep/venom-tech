import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import BlogArchiveView from "@/app/component/blog/archive/BlogArchiveView";
import { BlogStore } from "@/lib/blog/blogStore";

export function generateStaticParams() {
  const categories = BlogStore.getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = BlogStore.getCategories();
  const category = categories.find((c) => c.slug === slug);
  const title = category ? category.name : "Category Archive";

  return {
    title: `${title} | Venom Tech IT Solution Blog`,
    description: category?.description || `Explore articles and essays categorized under ${title}.`,
  };
}

export default async function CategoryArchiveScreen({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = BlogStore.getCategories();
  const category = categories.find((c) => c.slug === slug);
  const categoryName = category ? category.name : slug;

  const posts = BlogStore.getPosts({
    category: categoryName,
    status: "published",
    pageSize: 30,
  }).posts;

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main id="main-content">
        <BlogArchiveView
          type="category"
          title={categoryName}
          description={category?.description}
          posts={posts}
        />
      </main>
      <HomeFooter />
    </div>
  );
}
