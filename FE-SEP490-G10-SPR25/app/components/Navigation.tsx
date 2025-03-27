"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavigationProps {
  routes: { path: string; name: string }[];
  isWhiteText?: boolean;
}

const Navigation = ({ routes, isWhiteText }: NavigationProps) => {
  const currentPath = usePathname();

  return (
    <nav className="flex flex-row gap-8 font-semibold text-lg">
      {routes.map((route) => (
        <Link
          key={route.name}
          className={`${
            currentPath === route.path ? "text-cyan-500 underline underline-offset-2"
              : isWhiteText ? "text-white"
              : "text-gray-700"
          } hover:text-cyan-500 hover:underline underline-offset-2`}
          href={route.path}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
