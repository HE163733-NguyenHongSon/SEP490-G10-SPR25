"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ClearButton = ({
  path,
  keptSearchParams,
  labelName,
}: {
  path: string;
  keptSearchParams: string[];
  labelName: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div>
      <button
        className="  bg-cyan-500 text-white px-3 py-1 rounded-full "
        onClick={() => {        
          if (searchParams.toString()) {
            router.push(
              `${path}?${keptSearchParams
                .map((ksp) => `${ksp}=${searchParams.get(ksp)}`)
                .join("&")}`
            );
          } else {
            router.push(path);
          }
        }}
      >
        {labelName}
      </button>
    </div>
  );
};

export default ClearButton;
