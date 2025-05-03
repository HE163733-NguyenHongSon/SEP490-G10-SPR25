"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight, FaSearch } from "react-icons/fa";

interface BlogsPageProps {
  isGuest?: boolean;
  basePath: string; // "/guest" or "/patient"
}

interface IBlog {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

interface IApiPost {
  postId: number;
  postTitle: string;
  postDescription: string;
  postCreatedDate: string;
  postSourceUrl: string;
  authorName: string | null;
  postImageUrl: string;
}

const BlogsPage = ({ isGuest = false, basePath }: BlogsPageProps) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
        if (!res.ok) throw new Error("API lỗi");
        const rawData: IApiPost[] = await res.json();
        const data: IBlog[] = rawData.map((p) => ({
          id: p.postId,
          title: p.postTitle,
          summary: p.postDescription,
          content: "",
          author: p.authorName || "Ẩn danh",
          date: new Date(p.postCreatedDate).toLocaleDateString("vi-VN"),
          imageUrl: p.postImageUrl,
          category: "",
        }));
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, blogs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_blogs.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="relative z-30 w-full">
        <div className="flex justify-center mb-3 mt-20">
          <div className="relative flex items-center w-[400px] bg-white rounded-full shadow-md border border-gray-300 overflow-hidden">
            <button className="flex items-center bg-blue-500 text-white px-3 py-2">
              Name <FaChevronRight className="ml-2" />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm cẩm nang..."
              className="w-full px-3 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 text-gray-500">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="p-10 relative z-20 bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                        src={
                          blog.imageUrl
                            ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${blog.imageUrl}`
                            : "/images/placeholder.jpg"
                        }
                        alt={blog.title}
                        fill
                        className="object-cover rounded-t-lg"
                    />
                  <div className="absolute top-0 right-0 bg-cyan-500 text-white px-2 py-1 text-xs">
                    {blog.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {blog.summary}
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{blog.author}</span>
                      <span>{blog.date}</span>
                    </div>
                    <Link
                      href={`${basePath}/blogs/${blog.id}`}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm transition-colors inline-block w-full text-center"
                    >
                      Đọc thêm
                    </Link>
                    {isGuest && (
                      <div className="mt-2">
                        <a
                          href="/common/auth/login"
                          className="text-cyan-600 text-sm hover:underline text-center block"
                        >
                          Đăng nhập để bình luận
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage; 