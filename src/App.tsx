import { useState } from "react";
import { SingleConvMode } from "./modes/SingleConvMode";
import { PlaygroundMode } from "./modes/PlaygroundMode";
import { MultiLayerMode } from "./modes/MultiLayerMode";

type Tab = "single" | "playground" | "multi";

const TABS: { id: Tab; label: string; blurb: string }[] = [
  { id: "single", label: "Single Conv", blurb: "Watch a kernel slide over an image and see the output build up cell by cell." },
  { id: "playground", label: "Playground", blurb: "Edit kernel values, change stride and padding, and see the output update live." },
  { id: "multi", label: "Multi-Layer", blurb: "Stack convolution layers with ReLU and pooling to see how feature maps evolve." },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("single");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">CNN Playground</h1>
        </header>

        <p className="text-sm text-gray-600 mb-5">
          An interactive look at what convolutions do.
        </p>

        <div className="mb-6 flex items-center bg-gray-100 rounded-lg p-0.5 text-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded-md transition-colors cursor-pointer ${
                tab === t.id
                  ? "bg-white text-gray-900 shadow-sm font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-5">{active.blurb}</p>

        {tab === "single" && <SingleConvMode />}
        {tab === "playground" && <PlaygroundMode />}
        {tab === "multi" && <MultiLayerMode />}

        <footer className="mt-12 pb-4 text-xs text-gray-400">
          part of a CV learning arc. all math runs in your browser.
        </footer>
      </div>
    </div>
  );
}
