import { type InputHTMLAttributes, forwardRef, type ForwardedRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function InputComponent(
  { label, error, name, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      
      <input
        ref={ref}
        name={name}
        id={name}
        className={`border rounded-md px-3 py-2 outline-none transition-all
          ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500"}
        `}
        {...props}
      />

      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}

export const Input = forwardRef(InputComponent);
Input.displayName = "Input";