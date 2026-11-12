import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import SingleBlogArticleClient from "@/app/component/blog/single/SingleBlogArticleClient";
import { BlogStore } from "@/lib/blog/blogStore";
import { BlogDbService } from "@/lib/blog/services/blogDbService";

export function generateStaticParams() {
  const posts = BlogStore.getPosts({ status: "published" }).posts;
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.startsWith("zzzzzz")) {
    return {
      title: "Article Not Found | Venom Tech IT Solution",
      robots: { index: false, follow: false },
    };
  }

  const post = BlogStore.getPostBySlug(slug) || (await BlogDbService.getPostBySlug(slug));

  if (!post) {
    return {
      title: "Article Not Found | Venom Tech IT Solution",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.seo?.metaTitle || post.title} | Venom Tech IT Solution`,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: post.seo?.canonicalUrl || `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.author.name],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noFollow,
    },
  };
}

async function BlogPostContent({ slug }: { slug: string }) {
  if (!slug || slug.startsWith("zzzzzz")) {
    notFound();
  }

  const post = BlogStore.getPostBySlug(slug) || (await BlogDbService.getPostBySlug(slug));

  const jsonLdArticle = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage,
        datePublished: post.publishedAt || post.createdAt,
        dateModified: post.updatedAt,
        author: {
          "@type": "Person",
          name: post.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: "Venom Tech IT Solution",
          logo: {
            "@type": "ImageObject",
            url: "https://venomtech.pk/images/logo.webp",
          },
        },
      }
    : null;

  return (
    <>
      {jsonLdArticle && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        />
      )}
      <SingleBlogArticleClient initialPost={post} slug={slug} />
    </>
  );
}

export default async function BlogPostScreen({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main id="main-content">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#C07DFF] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <BlogPostContent slug={slug} />
        </Suspense>
        <PortfolioSection />
      </main>
      <HomeFooter />
    </div>
  );
}
