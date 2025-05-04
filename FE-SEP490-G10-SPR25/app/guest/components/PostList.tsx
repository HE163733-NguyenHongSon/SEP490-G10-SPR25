"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

interface IPost {
  id: string;
  imageUrl: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
}

interface PostListProps {
  items: IPost[];
  displayView?: "grid" | "slider";
}

export const PostList = ({ items, displayView = "grid" }: PostListProps) => {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const PostCard = ({ post }: { post: IPost }) => (
    <div className="bg-white rounded-md shadow-md border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="relative w-full h-48 overflow-hidden group rounded-md">
        <Image
          src={
            post.imageUrl
              ? `${imgUrl}/${post.imageUrl}`
              : "/images/placeholder.jpg"
          }
          alt={post.title}
          fill
          className="object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
        />
        <div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs px-2 py-1">
          {post.category}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
          {post.summary}
        </p>
        <div className="text-sm text-gray-500 flex justify-between mb-2">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
        <Link
          href={`/guest/blogs/${post.id}`}
          className="mt-auto block text-center bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md transition-colors text-sm"
        >
          Đọc thêm
        </Link>
      </div>
    </div>
  );

  if (displayView === "slider") {
    return (
      <div className="w-full py-4">
        <Carousel
          responsive={responsive}
          infinite
          autoPlaySpeed={3000}
          containerClass="carousel-container pb-4"
          itemClass="px-4 "
        >
          {items.map((post) => (
            <div key={post.id} className="h-full">
              <PostCard post={post} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[450px]">
      {items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
