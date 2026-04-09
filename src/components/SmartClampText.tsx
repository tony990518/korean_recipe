import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  prepare,
  layout,
} from "@chenglou/pretext";

interface SmartClampTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export default function SmartClampText({
  text,
  maxLines = 3,
  className = "",
}: SmartClampTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;
    let preparedCache: ReturnType<typeof prepare> | null = null;
    let lastFont = "";

    const recompute = (width?: number) => {
      if (!el) return;

      const nextWidth = width ?? el.getBoundingClientRect().width;
      if (nextWidth <= 0) return;

      const style = window.getComputedStyle(el);
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const fontSize = Number.parseFloat(style.fontSize);
      const lineHeight = Number.isFinite(Number.parseFloat(style.lineHeight))
        ? Number.parseFloat(style.lineHeight)
        : fontSize * 1.5;

      try {
        if (font !== lastFont || preparedCache === null) {
          preparedCache = prepare(text, font, {
            whiteSpace: "normal",
            wordBreak: "keep-all",
          });
          lastFont = font;
        }

        const { lineCount } = layout(preparedCache, nextWidth, lineHeight);
        setIsClamped(lineCount > maxLines);
      } catch (error) {
        console.error("@chenglou/pretext calculation error:", error);
      }
    };

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      recompute(rect?.width);
    });

    observer.observe(el);
    recompute();

    document.fonts?.ready
      .then(() => {
        recompute();
      })
      .catch(() => {
        // Ignore font readiness failures and keep the current measurement.
      });

    return () => {
      observer.disconnect();
    };
  }, [text, maxLines]);

  const collapsedStyle: CSSProperties | undefined = expanded
    ? undefined
    : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
        overflow: "hidden",
      };

  return (
    <div className={className}>
      <div ref={textRef} style={collapsedStyle}>
        {text}
      </div>
      {isClamped ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 font-bold text-primary hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
          aria-expanded={expanded}
        >
          {expanded ? "收合內容" : "查看更多"}
        </button>
      ) : null}
    </div>
  );
}
