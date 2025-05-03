"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { getCurrentUser } from "@/common/services/authService";

interface IApiPost {
  postId: number;
  postTitle: string;
  postDescription: string;
  postCreatedDate: string;
  postSourceUrl: string;
  authorName: string | null;
  postImageUrl: string;
  authorId?: number;
}

const DoctorBlogsPage = () => {
  const [posts, setPosts] = useState<IApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.userId) {
      setCurrentUserId(Number(user.userId));
    }
  }, []);
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
      if (!res.ok) throw new Error("API lỗi");
      const data: IApiPost[] = await res.json();
      setPosts(data);
    } catch (err) {
      setError("Không thể tải bài viết");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xoá bài viết này?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xoá thất bại");
      await fetchPosts();
    } catch (err) {
      alert("Xoá bài viết thất bại");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Đang tải bài viết...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <p className="text-red-500 text-lg font-medium mb-2">Lỗi</p>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchPosts();
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg px-6 py-5 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quản lý bài viết</h1>
              <p className="text-gray-500 mt-1">Tạo và quản lý các bài viết y tế của bạn</p>
            </div>
            <Link
              href="/doctor/blogs/create"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Tạo bài viết mới</span>
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white shadow-sm rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Chưa có bài viết nào</p>
            <Link
              href="/doctor/blogs/create"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Tạo bài viết đầu tiên</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.postId}
                className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="relative h-52 w-full">
                  {post.postImageUrl ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${post.postImageUrl}`}
                      alt={post.postTitle}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Không có hình ảnh</span>
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{post.postTitle}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.postDescription}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span className="mr-4">
                        <span className="font-medium">Ngày đăng:</span>{" "}
                        {new Date(post.postCreatedDate).toLocaleDateString("vi-VN")}
                      </span>
                      <span>
                        <span className="font-medium">Tác giả:</span>{" "}
                        {post.authorName || "Ẩn danh"}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        href={`/doctor/blogs/${post.postId}`}
                        className="flex items-center justify-center gap-1 flex-1 px-3 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
                      >
                      <Eye className="h-4 w-4" />
                        <span>Xem</span>
                      </Link>
                      {/* <Link
                        href={`/doctor/blogs/edit/${post.postId}`}
                        className="flex items-center justify-center gap-1 flex-1 px-3 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors duration-200"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Sửa</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.postId)}
                        className="flex items-center justify-center gap-1 flex-1 px-3 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Xoá</span>
                      </button> */}
                      {post.authorId === currentUserId && (
                        <>
                          <Link
                            href={`/doctor/blogs/edit/${post.postId}`}
                            className="flex items-center justify-center gap-1 flex-1 px-3 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors duration-200"
                          >
                            <Pencil className="h-4 w-4" />
                            <span>Sửa</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(post.postId)}
                            className="flex items-center justify-center gap-1 flex-1 px-3 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Xoá</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorBlogsPage;