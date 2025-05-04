"use client";
import BlogsPage from "@/common/pages/BlogsPage";

export default function PatientBlogsPage() {
  return <BlogsPage isGuest={false} basePath="/patient" />;
}
