// services/postService.ts

export interface IApiPost {
    postId: string;
    postTitle: string;
    postDescription: string;
    postCreatedDate: string;
    postImageUrl: string;
    authorName?: string;
  }
  
  export interface IBlog {
    id: string;
    title: string;
    summary: string;
    content: string;
    author: string;
    date: string;
    imageUrl: string;
    category: string;
  }
  
  export const getPostList = async (): Promise<IBlog[]> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
      if (!res.ok) throw new Error("Lỗi khi gọi API bài viết");
  
      const rawData: IApiPost[] = await res.json();
  
      return rawData.map((p) => ({
        id: p.postId,
        title: p.postTitle,
        summary: p.postDescription,
        content: "",
        author: p.authorName || "Ẩn danh",
        date: new Date(p.postCreatedDate).toLocaleDateString("vi-VN"),
        imageUrl: p.postImageUrl,
        category: "",
      }));
    } catch (error) {
      console.error("Lỗi trong getPostList:", error);
      throw error;
    }
  };
  