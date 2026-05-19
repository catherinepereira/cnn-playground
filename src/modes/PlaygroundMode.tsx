import { useMemo, useState } from "react";
import { KERNELS, convolve, type Matrix } from "../lib/conv";
import { generatedPattern } from "../lib/image";
import { MatrixCanvas } from "../components/MatrixCanvas";
import { KernelEditor } from "../components/KernelEditor";
import { ImagePicker } from "../components/ImagePicker";
import { ColorLegend } from "../components/ColorLegend";
import { InfoHint } from "../components/InfoHint";

const IMG_SIZE = 64;

export function PlaygroundMode() {
  const [input, setInput] = useState<Matrix>(() => generatedPattern("circle", IMG_SIZE));
  const [imageId, setImageId] = useState("circle");
  const [kernel, setKernel] = useState<Matrix>(KERNELS["sobel-x"]);
  const [stride, setStride] = useState(1);
  const [padding, setPadding] = useState<"same" | "valid">("same");

  const output = useMemo(
    () => convolve(input, kernel, { stride, padding }),
    [input, kernel, stride, padding],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600">Image:</span>
        <ImagePicker
          size={IMG_SIZE}
          value={imageId}
          onChange={(m, label) => {
            setInput(m);
            setImageId(label.toLowerCase());
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600">Preset:</span>
        {Object.keys(KERNELS).map((k) => (
          <button
            key={k}
            onClick={() => setKernel(KERNELS[k].map((r) => r.slice()))}
            className="px-3 py-1.5 text-sm rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-mono"
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-8 items-start">
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Input <span className="font-mono normal-case">{IMG_SIZE}×{IMG_SIZE}</span></h3>
          <MatrixCanvas matrix={input} cellSize={6} />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Kernel <span className="font-mono normal-case">3×3</span></h3>
            <KernelEditor kernel={kernel} onChange={setKernel} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Stride:</span>
              <select
                value={stride}
                onChange={(e) => setStride(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <InfoHint text="Stride is how many pixels the kernel moves between positions. Stride 1 visits every pixel; stride 2 skips every other one, shrinking the output by half." />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Padding:</span>
              <select
                value={padding}
                onChange={(e) => setPadding(e.target.value as "same" | "valid")}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="same">same</option>
                <option value="valid">valid</option>
              </select>
              <InfoHint text="Padding adds a border of zeros around the input so the kernel can sit on edge pixels. 'same' adds enough to keep output and input the same size; 'valid' adds none, so the output shrinks by (kernel size − 1)." />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Output <span className="font-mono normal-case">{output[0]?.length ?? 0}×{output.length}</span>
          </h3>
          <MatrixCanvas matrix={output} cellSize={6} colormap="diverging" />
          <div className="mt-2">
            <ColorLegend />
          </div>
        </div>
      </div>
    </div>
  );
}
