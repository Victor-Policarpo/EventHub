import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom"; 
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Partial<LinkProps> & {
  isLoading?: boolean;
  variant?: 'primary' | 'ghost' | 'ghostDanger' | 'secondary';
  to?: string;
};

export const Button = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className, 
  to,
  ...props 
}: ButtonProps) => {
  
  const baseStyles = "w-full font-bold rounded-xl text-sm px-5 py-3 transition-all disabled:opacity-50 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-700 group",
    ghostDanger: "text-slate-500 hover:bg-red-50 hover:text-red-600 group",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm",
  };

  const combinedClassName = twMerge(baseStyles, variants[variant], className);
  if (to) {
    return (
      <Link 
        to={to} 
        className={combinedClassName}
        {...(props)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={combinedClassName}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};