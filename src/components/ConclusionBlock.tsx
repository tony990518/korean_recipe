
const ConclusionBlock = ({ text }: { text: string }) => (
    <div className="rounded-2xl border p-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="pl-3 border-l-2 border-slate-300">
        <p className="text-slate-700 leading-relaxed whitespace-pre-line">{text}</p>
      </div>
    </div>
  );

export default ConclusionBlock;
