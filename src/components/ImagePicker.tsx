import { useEffect } from "react";
import type { Matrix } from "../lib/conv";
import { generatedPattern, imageToGrayscale, loadImage } from "../lib/image";

interface Props {
  size: number;
  onChange: (m: Matrix, label: string) => void;
  value: string;
}

const PRESETS: { id: string; label: string; kind: "pattern" | "url"; arg: string }[] = [
  { id: "checker", label: "Checkerboard", kind: "pattern", arg: "checker" },
  { id: "circle", label: "Circle", kind: "pattern", arg: "circle" },
  { id: "stripes", label: "Stripes", kind: "pattern", arg: "stripes" },
];

export function ImagePicker({ size, onChange, value }: Props) {
  useEffect(() => {
    const p = PRESETS.find((p) => p.id === value);
    if (!p) return;
    if (p.kind === "pattern") {
      onChange(generatedPattern(p.arg as "checker" | "circle" | "stripes", size), p.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, size]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    loadImage(url).then((img) => {
      onChange(imageToGrayscale(img, size), file.name);
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.id}
          onClick={() => {
            if (p.kind === "pattern") {
              onChange(generatedPattern(p.arg as "checker" | "circle" | "stripes", size), p.label);
            }
          }}
          className={`px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer ${
            value === p.id ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {p.label}
        </button>
      ))}
      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 cursor-pointer transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 0 1 .7.29l4 4a1 1 0 1 1-1.4 1.42L11 6.41V13a1 1 0 1 1-2 0V6.41L6.7 8.71A1 1 0 1 1 5.3 7.29l4-4A1 1 0 0 1 10 3Zm-6 11a1 1 0 0 1 1 1v1h10v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"
            clipRule="evenodd"
          />
        </svg>
        Upload
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
    </div>
  );
}
