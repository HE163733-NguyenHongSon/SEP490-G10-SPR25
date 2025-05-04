"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SelectList({
  items,
  searchParam,
}: {
  items: { label: string; value: string }[];
  searchParam: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(searchParam, e.target.value);
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <select
      className="p-2 mt-2 border rounded-md w-full"
      value={searchParams.get(searchParam) || ""}
      onChange={handleChange}
    >
      <option value="">-- Chọn --</option>
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
