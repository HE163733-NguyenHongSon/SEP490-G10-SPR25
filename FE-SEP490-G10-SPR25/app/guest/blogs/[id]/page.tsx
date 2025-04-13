"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PostSection {
  sectionTitle: string;
  sectionContent: string;
  postImageUrl?: string;
  sectionIndex: number;
}

interface Comment {
  commentId: number;
  content: string;
  userId?: number;
  commentOn: string;
  repliedCommentId?: number | null;
  numberOfLikes: number;
}

interface PostDetail {
  postId: number;
  postTitle: string;
  postDescription: string;
  postCreatedDate: string;
  postSourceUrl: string;
  postImageUrl?: string;
  postCategory?: string;
  authorBio?: string;
  sections: PostSection[];
  comments: Comment[];
}

const GuestBlogDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`);
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        const data: PostDetail = await res.json();
        setPost(data);
      } catch (err) {
        setError("Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  const renderComment = (comment: Comment, allComments: Comment[], level = 0) => {
    const replies = allComments.filter(c => c.repliedCommentId === comment.commentId);

    return (
      <div
        key={comment.commentId}
        className={`border-l-2 pl-4 ml-${level * 4} mb-4`}
      >
        <p className="text-gray-800 mb-1">{comment.content}</p>
        <p className="text-xs text-gray-500">
          {new Date(comment.commentOn).toLocaleString("vi-VN")}
        </p>

        {replies.map(reply => renderComment(reply, allComments, level + 1))}
      </div>
    );
  };


  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error || !post) return <div className="text-center text-red-500 mt-10">{error || "Không tìm thấy bài viết"}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-3">{post.postTitle}</h1>
        <p className="text-gray-500 text-sm mb-2">
          {new Date(post.postCreatedDate).toLocaleDateString("vi-VN")} - {post.authorBio ?? "Ẩn danh"}
        </p>

        {post.postImageUrl && (
          <img
            src={post.postImageUrl}
            alt="Post Cover"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <p className="text-base text-gray-700 mb-6">{post.postDescription}</p>

        {post.sections?.sort((a, b) => a.sectionIndex - b.sectionIndex).map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{section.sectionTitle}</h2>
            {section.postImageUrl && (
              <img
                src={section.postImageUrl}
                alt={`Ảnh section ${idx + 1}`}
                className="w-full h-52 object-cover rounded-md mb-3"
              />
            )}
            <p className="text-gray-800 whitespace-pre-line">{section.sectionContent}</p>
          </div>
        ))}

<div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Bình luận</h3>
          {post.comments
            .filter(c => !c.repliedCommentId)
            .map(parent => renderComment(parent, post.comments))}
        </div>

      </div>
    </div>
  );
};

export default GuestBlogDetailPage;
