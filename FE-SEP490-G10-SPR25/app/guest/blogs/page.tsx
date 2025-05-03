"use client";
import BlogsPage from "@/common/pages/BlogsPage";

export default function GuestBlogsPage() {
  return <BlogsPage isGuest={true} basePath="/guest" />;
} 