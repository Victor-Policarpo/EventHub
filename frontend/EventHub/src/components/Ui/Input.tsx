import { type InputHTMLAttributes, forwardRef, type ForwardedRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function InputComponent(
  { label, error, name, className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="flex flex-col gap-1.5 mb-4 w-full">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      
      <input
        ref={ref}
        name={name}
        id={name}
        className={twMerge(
          "w-full min-h-11 px-4 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none",
          "disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed",
          error 
            ? "border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20" 
            : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
          className
        )}
        {...props}
      />

      {error && (
        <span className="text-xs text-red-600 font-medium">{error}</span>
      )}
    </div>
  );
}

export const Input = forwardRef(InputComponent);
Input.displayName = "Input";