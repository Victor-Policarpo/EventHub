import { twMerge } from "tailwind-merge";
import React from "react";

export function Card({
  children,
  className = ""
}: {
  children: React.ReactNode,
  className?: string
}) {
  return (
    <div
      className={twMerge(
        "bg-white border border-slate-200 p-5 rounded-xl mb-4 w-full",
        "shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300",
        className
      )}
    >
      {children}
    </div>
  );
}