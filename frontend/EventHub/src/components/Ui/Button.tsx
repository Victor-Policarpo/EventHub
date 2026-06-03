import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom"; 
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Partial<LinkProps> & {
  isLoading?: boolean;
  variant?: 'primary' | 'ghost' | 'ghostDanger' | 'secondary';
  to?: string;
};

export const Button = ({ children, isLoading, variant = 'primary', className, to, ...props }: ButtonProps) => {
  
  const baseStyles = "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-200",
    ghostDanger: "text-slate-500 hover:bg-red-50 hover:text-red-600 focus-visible:ring-red-200",
    secondary: "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-sm focus-visible:ring-slate-200",
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