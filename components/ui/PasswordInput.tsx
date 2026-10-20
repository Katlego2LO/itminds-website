"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

/** Password field with a show/hide button. */
export function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`field pr-12 ${props.className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink-muted hover:text-slate-brand"
      >
        {visible ? (
          <EyeOff size={20} strokeWidth={1.5} aria-hidden />
        ) : (
          <Eye size={20} strokeWidth={1.5} aria-hidden />
        )}
      </button>
    </div>
  );
}