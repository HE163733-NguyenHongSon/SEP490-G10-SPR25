"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as signalR from "@microsoft/signalr";
import { getCurrentUser } from "@/services/authService"; // ✅ lấy thông tin người dùng hiện tại

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
  authorName?: string;
  sections: PostSection[];
  comments: Comment[];
}

const PatientBlogDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [hubConnection, setHubConnection] = useState<signalR.HubConnection | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); // ✅ state lưu ID user

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

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) setCurrentUserId(Number(user.userId)); // ✅ ép kiểu về number
    };
    fetchUser();
  }, []); // ✅ lấy user sau khi mount

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/hubs/comments`)
      .withAutomaticReconnect()
      .build();

    connect.on("ReceiveComment", (message: Comment) => {
      console.log("Nhận comment mới từ SignalR:", message);

      setPost(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: [...prev.comments, message],
        };
      });
    });

    connect.start()
      .then(() => console.log("Kết nối SignalR thành công"))
      .catch(err => console.error("Lỗi khi kết nối SignalR:", err));

    setHubConnection(connect);

    return () => {
      connect.stop();
    };
  }, []);

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

  const handleSendComment = async () => {
    if (!newComment.trim() || !id || !currentUserId) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newComment,
        postId: parseInt(id as string),
        userId: currentUserId, // ✅ gửi kèm userId thật
        repliedCommentId: null
      })
    });

    if (res.ok) {
      const saved = await res.json();
      if (hubConnection) {
        await hubConnection.invoke("SendComment", saved);
      }
      setNewComment("");
    } else {
      console.error("Lỗi khi gửi bình luận qua API");
    }
  };

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error || !post) return <div className="text-center text-red-500 mt-10">{error || "Không tìm thấy bài viết"}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-3">{post.postTitle}</h1>
        <p className="text-gray-500 text-sm mb-2">
          {new Date(post.postCreatedDate).toLocaleDateString("vi-VN")} - {post.authorName ?? "Ẩn danh"}
        </p>

        {post.postImageUrl && (
          <img
            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${post.postImageUrl}`}
            alt="Post Cover"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <p className="text-base text-gray-700 mb-6">{post.postDescription}</p>

        {post.postSourceUrl && (
          <p className="text-sm text-blue-500 underline mb-4">
            <a href={post.postSourceUrl} target="_blank" rel="noopener noreferrer">
              Nguồn bài viết
            </a>
          </p>
        )}

        {post.sections?.sort((a, b) => a.sectionIndex - b.sectionIndex).map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{section.sectionTitle}</h2>
            {section.postImageUrl && (
              <div className="w-full mb-3">
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${section.postImageUrl}`}
                  alt={`Ảnh section ${idx + 1}`}
                  className="w-full max-h-[400px] object-contain rounded-md"
                />
              </div>
            )}
            <p className="text-gray-800 whitespace-pre-line">{section.sectionContent}</p>
          </div>
        ))}

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Bình luận</h3>
          {post.comments
            .filter(c => !c.repliedCommentId)
            .map(parent => renderComment(parent, post.comments))}

          {/* form thêm bình luận mới */}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Nhập bình luận..."
              className="w-full border rounded-md p-2 mb-2"
            />
            <button
              onClick={handleSendComment}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Gửi bình luận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBlogDetailPage;
