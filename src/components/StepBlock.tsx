import { useEffect, useMemo, useRef, useState } from "react";
import { Step } from "../types";
import HeatBadge from "./HeatBadge";

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
  let seconds = hasSec ? Math.round(n) : hasHour ? Math.round(n*3600) : Math.round(n*60);
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

  const emit = (r: number, run: boolean) => {
    const isDone = r <= 0 && initial > 0;
    onChange?.({ remaining: r, running: run, initial, isDone });
  };

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
        try { (navigator as any).vibrate?.(160); } catch {}
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, initial]);

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
  }, [running, initial]);

  const isDone = remaining <= 0 && initial > 0;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggle}
        className={
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs sm:text-sm font-medium transition " +
          (isDone ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : running ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200")
        }
        aria-pressed={running}
        aria-live="polite"
        title={running ? "일시정지" : "시작"}
      >
        <span aria-hidden>⏱</span>
        <span className="tabular-nums">
          {initial > 0 ? (running || isDone ? mmss(remaining) : parsed.label) : "타이머"}
        </span>
      </button>

      {/* <button
        onClick={reset}
        className="inline-flex items-center justify-center rounded-full border border-slate-200 w-7 h-7 text-xs text-slate-600 hover:bg-slate-50"
        title="리셋"
        aria-label="리셋"
      >
        ⟲
      </button> */}
    </div>
  );
}

/** Step 이미지(생략: 기존 동일) */
const StepImage = ({ url, color, alt }: { url?: string; color?: string; alt?: string }) => (
  <div className="w-full sm:w-44 md:w-56 lg:w-64 aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden border bg-slate-100 shrink-0" aria-hidden={!url}>
    {url ? (<img src={url} alt={alt || "step"} className="w-full h-full object-cover" loading="lazy" decoding="async" />)
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

  return (
    <div
      className={
        "rounded-2xl border p-4 sm:p-5 flex flex-col-reverse sm:flex-row sm:items-start gap-4 md:gap-5 transition " +
        (urgent ? "bg-red-50 border-red-400 " : "bg-white border ") +
        (flash ? "ring-2 ring-red-300 scale-[0.998]" : "")
      }
    >
      {/* Left/Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-900 text-white grid place-items-center text-sm md:text-base" aria-hidden>
            {index + 1}
          </div>

          {step.title ? (
            <span className="font-semibold text-slate-900 mr-1 text-base sm:text-lg md:text-xl leading-snug break-words">
              {step.title}
            </span>
          ) : null}

          {step.heat && <HeatBadge level={step.heat} />}

          {step.time ? (
            <TimerBadge
              timeText={step.time}
              onChange={({ remaining: r, running: run }) => {
                setRemaining(r);
                setRunning(run);
              }}
            />
          ) : null}
        </div>

        {step.text ? (
          <p className="text-slate-800 leading-relaxed text-[15px] sm:text-base md:text-lg max-[360px]:text-[14px]">
            {step.text}
          </p>
        ) : null}

        {step.tip ? (
          <p className="mt-2 text-xs sm:text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block">
            Tips：{step.tip}
          </p>
        ) : null}

        <span className="sr-only" role="status" aria-live="assertive">
          {urgent ? "此步驟即將結束。請準備進入下一步。" : ""}
        </span>
      </div>

      {/* Right/Image */}
      <StepImage url={step.image} color={color} alt={step.title || `步驟 ${index + 1}`} />
    </div>
  );
};

export default StepBlock;
