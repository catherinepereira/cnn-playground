export function ColorLegend() {
  return (
    <div className="flex items-center gap-2 text-[11px] text-gray-500">
      <span>negative</span>
      <div
        className="h-2 w-32 rounded"
        style={{
          background:
            "linear-gradient(to right, rgb(37,99,235), rgb(255,255,255), rgb(220,38,38))",
          border: "1px solid #e5e7eb",
        }}
      />
      <span>positive</span>
      <span className="text-gray-400">· white = 0</span>
    </div>
  );
}
