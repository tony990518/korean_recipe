import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Step } from "../types";

/** 문자열 시간을 '초'로 파싱 (秒/分/小時, mm:ss, 숫자만=분) */
function parseDurationSeconds(input?: string | number): { seconds: number; label: string } {
  if (typeof input === "number" && isFinite(input)) {
    const sec = Math.max(0, Math.floor(input * 60));
    return { seconds: sec, label: `${input} 分` };
  }
  const raw = String(input ?? "").trim();
  const colon = raw.match(/^(\d{1,3})\s*:\s*(\d{1,2})$/);
  if (colon) {
    const m = parseInt(colon[1], 10), s = parseInt(colon[2], 10);
    return { seconds: Math.max(0, m * 60 + s), label: `${m}:${String(s).padStart(2,"0")}` };
  }
  const num = raw.match(/(\d+(?:\.\d+)?)/);
  const n = num ? parseFloat(num[1]) : NaN;
  if (!isFinite(n)) return { seconds: 0, label: "⏱" };
  const hasSec  = /(秒|second|seconds|sec|secs|\bs\b)/i.test(raw);
  const hasHour = /(小時|小时|hour|hours|hr|hrs|\bh\b)/i.test(raw);
  const seconds = hasSec ? Math.round(n) : hasHour ? Math.round(n * 3600) : Math.round(n * 60);
  const label  = hasSec ? `${Math.round(n)} 秒` : hasHour ? `${n} 小時` : `${n} 分`;
  return { seconds: Math.max(0, seconds), label };
}

function mmss(totalSeconds: number) {
  const mm = Math.floor(totalSeconds / 60), ss = totalSeconds % 60;
  return `${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
}

/** 타이머 배지: 초가 '변할 때만' 상위에 알림 */
function TimerBadge({
  timeText,
  onChange,
}: {
  timeText?: string;
  onChange?: (s: { remaining: number; running: boolean; initial: number; isDone: boolean }) => void;
}) {
  const parsed = useMemo(() => parseDurationSeconds(timeText), [timeText]);
  const initial = parsed.seconds;

  const [remaining, setRemaining] = useState(initial);
  const [running, setRunning] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastSecRef = useRef<number>(initial);

  const emit = useCallback((r: number, run: boolean) => {
    const isDone = r <= 0 && initial > 0;
    onChange?.({ remaining: r, running: run, initial, isDone });
  }, [initial, onChange]);

  const start = () => {
    if (remaining <= 0) setRemaining(initial);
    startRef.current = Date.now();
    setRunning(true);
    emit(remaining <= 0 ? initial : remaining, true);
  };
  const pause = () => { setRunning(false); startRef.current = null; emit(remaining, false); };
  const toggle = () => (running ? pause() : start());
  // const reset  = () => { setRunning(false); setRemaining(initial); startRef.current = null; lastSecRef.current = initial; emit(initial, false); };

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const startedAt = startRef.current ?? Date.now();
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const next = Math.max(0, initial - elapsed);

      // ⬇️ '초가 바뀐 경우에만' 상태 업데이트 & 알림
      if (next !== lastSecRef.current) {
        lastSecRef.current = next;
        setRemaining(next);
        emit(next, true);
      }

      if (next <= 0) {
        setRunning(false);
        startRef.current = null;

        const nav = navigator as Navigator & { vibrate?: (pattern: number | number[]) => boolean };
        if (typeof nav.vibrate === "function") {
          try {
            nav.vibrate(160);
          } catch (error) {
            // 일부 환경에서는 진동이 차단될 수 있으므로 조용히 무시합니다.
          }
        }
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running, initial, emit]);

  useEffect(() => {
    const onVis = () => {
      if (!running || startRef.current == null) return;
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      const next = Math.max(0, initial - elapsed);
      if (next !== lastSecRef.current) {
        lastSecRef.current = next;
        setRemaining(next);
        emit(next, next > 0);
      }
      if (next <= 0) { setRunning(false); startRef.current = null; }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [running, initial, emit]);

  const isDone = remaining <= 0 && initial > 0;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggle}
        className={
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition " +
          (isDone ? "bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20"
                  : running ? "bg-red-600/10 text-red-700 hover:bg-red-600/20"
                            : "bg-primary/10 text-primary hover:bg-primary/20")
        }
        aria-pressed={running}
        aria-live="polite"
        title={running ? "일시정지" : "시작"}
      >
        <span className="material-symbols-outlined text-[12px]" aria-hidden>timer</span>
        <span className="tabular-nums">
          {initial > 0 ? (running || isDone ? mmss(remaining) : parsed.label) : "타이머"}
        </span>
      </button>
    </div>
  );
}

const StepImage = ({ url, color, alt }: { url?: string; color?: string; alt?: string }) => (
  <div className="w-full h-full min-h-[250px] md:min-h-full overflow-hidden bg-slate-100" aria-hidden={!url}>
    {url ? (<img src={url} alt={alt || "step"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />)
         : (<div className="w-full h-full" style={{ backgroundColor: color || "#E5E7EB" }} />)}
  </div>
);

const StepBlock = ({ step, index }: { step: Step; index: number }) => {
  const COLORS = ["#FDE68A", "#BFDBFE", "#FBCFE8", "#C7D2FE", "#A7F3D0", "#FEE2E2"];
  const color = COLORS[index % COLORS.length];

  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const urgent = running && remaining > 0 && remaining <= 10;

  // ⬇️ 초가 바뀔 때마다 180ms '틱' 하듯 강조
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (!urgent) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 180);
    return () => clearTimeout(t);
  }, [remaining, urgent]);

  // For styling the index number padding, `01` `02` format
  const paddedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      className={
        "group bg-surface-container grid md:grid-cols-12 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md " +
        (urgent ? "ring-2 ring-red-400 " : "") +
        (flash ? "ring-4 ring-red-300 scale-[0.998] " : "")
      }
    >
      {/* Index Panel */}
      <div className="md:col-span-1 bg-primary text-white flex items-center justify-center p-6 md:p-8 shrink-0">
        <span className="text-3xl md:text-4xl font-black italic">{paddedIndex}</span>
      </div>

      {/* Content Panel */}
      <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
        {/* Badges Container */}
        <div className="flex flex-wrap gap-3 mb-4">
          {step.heat && (
            <div className="bg-primary/10 text-primary text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center">
              {step.heat}
            </div>
          )}
          {step.time && (
            <TimerBadge
              timeText={step.time}
              onChange={({ remaining: r, running: run }) => {
                setRemaining(r);
                setRunning(run);
              }}
            />
          )}
        </div>

        {step.title && (
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-on-surface font-headline">{step.title}</h3>
        )}

        {step.text && (
          <p className="text-on-surface-variant leading-relaxed font-body text-[15px] sm:text-base">
            {step.text}
          </p>
        )}

        {step.tip && (
          <div className="mt-4 inline-flex items-start gap-2 text-[13px] sm:text-sm text-on-surface-variant bg-surface-container-high px-3 py-2.5 rounded-lg border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0" aria-hidden>info</span>
            <span className="leading-relaxed">{step.tip}</span>
          </div>
        )}

        <span className="sr-only" role="status" aria-live="assertive">
          {urgent ? "此步驟即將結束。請準備進入下一步。" : ""}
        </span>
      </div>

      {/* Image Panel */}
      <div className="md:col-span-4 h-64 md:h-auto overflow-hidden">
        <StepImage url={step.image} color={color} alt={step.title || `步驟 ${index + 1}`} />
      </div>
    </div>
  );
};

export default StepBlock;
