import { useState } from "react";
import { SingleConvMode } from "./modes/SingleConvMode";
import { PlaygroundMode } from "./modes/PlaygroundMode";
import { MultiLayerMode } from "./modes/MultiLayerMode";
import { SiteHeader } from "./components/SiteHeader";

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
    <div className="min-h-screen bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <SiteHeader title="CNN Playground" repo="cnn-playground">
          A{" "}
          <a
            href="https://en.wikipedia.org/wiki/Convolutional_neural_network"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-zinc-100"
          >
            convolution
          </a>{" "}
          slides a small kernel of weights across an image, multiplies elementwise,
          and sums to produce one output pixel. Stack convolutions with ReLU and
          pooling, and you have a CNN. Pick a preset kernel or hand-edit one to see
          how it shapes the output, then move up to multi-layer mode to watch
          feature maps build on each other.
        </SiteHeader>

        <div className="mb-6 flex items-center bg-gray-100 dark:bg-zinc-800 rounded-lg p-0.5 text-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded-md transition-colors cursor-pointer ${
                tab === t.id
                  ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 shadow-sm font-medium"
                  : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-5">{active.blurb}</p>

        {tab === "single" && <SingleConvMode />}
        {tab === "playground" && <PlaygroundMode />}
        {tab === "multi" && <MultiLayerMode />}

      </div>
    </div>
  );
}
