"use client";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RatingStars from "@/components/RatingStars";

interface FeedbackItem {
  id: number;
  name: string;
  initials: string;
  targetName: string;
  timeAgo: string;
  rating: number;
  content: string;
}

interface FeedbackListProps {
  feedbacks: FeedbackItem[];
  displayView?: "slider" | "grid";
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  displayView = "slider",
}) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };
  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCard = (feedback: FeedbackItem) => (
    <div
      key={feedback.id}
      className="bg-white rounded-xl shadow-md p-6 border border-cyan-100 mx-2"
    >
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
          {feedback.initials}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-start">{feedback.name}</p>
          <div className="flex items-center text-yellow-500 text-sm">
          <RatingStars rating={feedback.rating} />
          <span className="text-gray-500 ml-2">{feedback.timeAgo}</span>
          </div>
        </div>
        <div className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer">
          ⋮
        </div>
      </div>
      <div className="mt-4 text-gray-700 text-sm text-start mx-5">
        <p >
          {expanded[feedback.id]
            ? feedback.content
            : feedback.content.slice(0, 120) +
              (feedback.content.length > 120 ? "..." : "")}
        </p>
        {feedback.content.length > 120 && (
          <button
            className="mt-2 text-cyan-600 font-medium hover:underline"
            onClick={() => toggleExpand(feedback.id)}
          >
            {expanded[feedback.id] ? "Show less" : "Show more"}
          </button>
        )}
        <p className="font-light text-gray-500  mt-2">
          Nhận xét về "{feedback.targetName}"
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full px-10 py-6">
      {displayView === "slider" ? (
        <Carousel
          responsive={responsive}
          infinite
          autoPlaySpeed={3000}
          containerClass="carousel-container"
          itemClass="px-4"
        >
          {feedbacks.map(renderCard)}
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {feedbacks.map(renderCard)}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
