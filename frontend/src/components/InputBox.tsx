import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../icon/Eye";

interface InputBoxProps {
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visibilityButton?: boolean;
}

export function InputBox({
  label,
  placeholder,
  onChange,
  visibilityButton = false,
}: InputBoxProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>

      <div className="relative">
        <input
          onChange={onChange}
          placeholder={placeholder}
          type={visibilityButton && !show ? "password" : "text"}
          className="w-full px-2 py-1 border rounded border-slate-200 pr-10"
        />

        {visibilityButton && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
