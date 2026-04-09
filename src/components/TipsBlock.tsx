const TipsBlock = ({ items }: { items: string[] }) => (
  <section
    className="bg-tertiary-container/40 p-6 sm:p-8 md:p-12 rounded-xl border-l-8 border-tertiary mb-12"
    aria-label="Pro Culinary Tips"
  >
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <div className="bg-tertiary text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-xl sm:text-2xl">lightbulb</span>
      </div>
      <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Pro Culinary Tips</h2>
    </div>

    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      {items.map((t, i) => {
        // Assume tips are formatted with colons if they have titles like "Title: Description"
        const parts = t.split(":");
        if (parts.length > 1 && parts[0].length < 20) {
          return (
            <div key={i} className="space-y-2.5">
              <h4 className="font-headline font-bold text-tertiary uppercase text-base sm:text-lg tracking-widest leading-snug">
                {parts[0]}
              </h4>
              <p className="text-on-surface-variant font-body leading-relaxed text-base sm:text-lg">
                {parts.slice(1).join(":")}
              </p>
            </div>
          );
        } else {
          return (
            <div key={i} className="space-y-2.5">
              <h4 className="font-headline font-bold text-tertiary uppercase text-base sm:text-lg tracking-widest">
                Tip {i + 1}
              </h4>
              <p className="text-on-surface-variant font-body leading-relaxed text-base sm:text-lg">
                {t}
              </p>
            </div>
          );
        }
      })}
    </div>
  </section>
);

export default TipsBlock;
