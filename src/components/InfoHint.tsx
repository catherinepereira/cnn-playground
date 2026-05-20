import { useState } from "react";

interface Props {
  text: string;
}

export function InfoHint({ text }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-4 h-4 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 hover:border-gray-400 dark:hover:border-zinc-600 flex items-center justify-center text-[10px] font-medium transition-colors cursor-pointer"
        aria-label="More info"
      >
        ?
      </button>
      {open && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-64 rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 text-xs text-gray-600 dark:text-zinc-400 shadow-md">
          {text}
        </span>
      )}
    </span>
  );
}
