const TipsBlock = ({ items }: { items: string[] }) => (
  <section
    className="
      rounded-2xl border bg-white p-4 sm:p-5
      max-[360px]:p-3
    "
    aria-label="小撇步 Tips"
  >
    <div className="flex items-baseline gap-2 mb-3">
      <h3
        className="
          font-semibold text-slate-900
          text-base sm:text-lg md:text-xl
          leading-snug
        "
      >
        小撇步
      </h3>
      <em className="text-xs sm:text-sm italic text-slate-500">Tips</em>
    </div>

    <ul
      className="
        text-slate-700
        text-[15px] sm:text-base md:text-lg
        space-y-2 sm:space-y-2.5
      "
    >
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          {/* 장식용 불릿 */}
          <span aria-hidden className="mt-1.5 sm:mt-2 leading-none">•</span>

          {/* 긴 문장 안정적 줄바꿈 + iOS 클리핑 방지 */}
          <span className="leading-relaxed break-words">
            {t}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default TipsBlock;
