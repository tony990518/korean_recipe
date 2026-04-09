import React from 'react';
import { Ingredient } from "../types";

const IngredientThumb = React.memo(({ url, label, fit }: { url?: string; label: string; fit?: "cover" | "contain" }) => (
  <div
    className="
      w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm
    "
    aria-hidden={!url ? true : false}
  >
    {url ? (
      <img
        src={url}
        alt={label}
        className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className="w-full h-full bg-slate-100" />
    )}
  </div>
));

/** 장바구니 아이콘 */
const IconCart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...props}>
    <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 18zM6.2 5l.3 2H21l-2 8H8l-.2-1H5.1L4.2 5H2V3h4.4a1 1 0 0 1 .98.8zM9 13h8.1l1.3-5H6.8l.7 5H9z" fill="currentColor"/>
  </svg>
);

const IngredientList = ({ ingredients }: { ingredients: Ingredient[] }) => (
  <div className="w-full mt-8">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {ingredients.map((it, idx) => {
        const key = `${it.label}-${idx}`;
        return (
          <div
            key={key}
            className="bg-surface-container-low p-6 rounded-lg text-center transition-transform hover:-translate-y-1 relative"
          >
            <IngredientThumb url={it.image} label={it.label} fit={it.imageFit} />
            
            <p className="font-headline font-bold text-on-surface line-clamp-1" title={it.label}>
              {it.label}
              {it.brand && (
                <span className="text-xs font-normal text-on-surface-variant block">({it.brand})</span>
              )}
            </p>
            
            {it.amount && (
              <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">{it.amount}</p>
            )}

            {/* Links/Buttons integrated safely into the card if present */}
            {it.link && (
              <div className="mt-4 flex flex-col gap-2 relative z-10 w-full">
                {(() => {
                  const links = Array.isArray(it.link) ? it.link : [it.link];
                  return links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-primary text-white hover:bg-primary-dim focus:outline-none transition w-full px-2 py-1.5 rounded-full text-xs font-bold shadow-sm"
                      title={`${it.label} ${link.label}`}
                    >
                      <IconCart className="shrink-0 mr-1" width="14" height="14" />
                      <span className="truncate">{link.label}</span>
                    </a>
                  ));
                })()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default IngredientList;
