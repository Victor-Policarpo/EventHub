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
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-base font-medium text-slate-800">
        {label}
      </label>
      
      <input
        ref={ref}
        name={name}
        id={name}
        className={twMerge(
          "w-full min-h-12 px-4 py-3 bg-white border rounded-xl text-base text-slate-900 placeholder:text-slate-400 transition-all outline-none",
          "disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed",
          error 
            ? "border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20" 
            : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
          className
        )}
        {...props}
      />
      <div className="mt-0.5 flex flex-col">
        {error ? (
          <span className="text-sm text-red-600 font-medium animate-in fade-in duration-200">
            {error}
          </span>
        ) : (
          <span className="text-sm text-transparent select-none pointer-events-none" aria-hidden="true">
            &nbsp;
          </span>
        )}
      </div>
    </div>
  );
}

export const Input = forwardRef(InputComponent);
Input.displayName = "Input";