import { Search } from "lucide-react";
import { type InputHTMLAttributes } from "react";
import { Input } from "./Input";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  value: string;
  placeholder?: string;
}

export function SearchInput({ placeholder, value, onSearch, ...rest }: SearchInputProps) {
  return (
    <div className="relative w-full -mb-6">
      <div className="absolute left-4 top-3.5 z-10 flex items-center justify-center text-slate-400 pointer-events-none">
        <Search size={20} />
      </div>

      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-11" 
        {...rest}
      />
    </div>
  );
}