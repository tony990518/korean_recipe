
const HeatBadge = ({ level }: { level: "low" | "med" | "high" }) => {
    const map: Record<"low" | "med" | "high", string> = { low: "小火", med: "中火", high: "大火" };
    return (
      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-slate-700 border-slate-300 bg-white">
        {map[level]}
      </span>
    );
  };

export default HeatBadge;
