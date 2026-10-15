import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { TOAST_WIDTH, ToastCard, type ToastSeverity } from "./ToastCard";
import { ToastContext } from "./toast";

export type ToastProviderProps = { children: ReactNode };

type Toast = { id: number; severity: ToastSeverity; message: string; leaving: boolean };

/* How many toasts show at once; older ones wait, hidden, behind them. */
const VISIBLE = 3;
/* How far each toast behind shows under the one in front, collapsed. */
const PEEK = 10;
/* The space between toasts, expanded. */
const GAP = 8;
/* The footer's height under the spread-out stack: Clear all, and the
   position and arrows once there are more than VISIBLE. */
const FOOTER_HEIGHT = 28;
/* How far a toast scrolled out of view moves as it fades. */
const SLIDE = 16;
/* How far a wheel, trackpad or finger moves to scroll one toast, and how soon
   the wheel can scroll the next, so a flick moves one at a time. */
const STEP_DISTANCE = 30;
const WHEEL_COOLDOWN_MS = 180;
/* How long a closing toast takes to fade before it's removed. */
const LEAVE_MS = 300;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* Long enough to read: a short confirmation clears in about six seconds, a
   paragraph stays up for longer. */
function durationFor(message: string) {
  return Math.min(4000 + message.length * 40, 15000);
}

/*
 * Shows the toasts raised with useToast(), top right, newest in front. Up to
 * three stack, collapsed, with the older ones peeking out underneath; hovering
 * or focusing the stack spreads them out into a list, with Clear all under it
 * when there's more than one, and pauses every toast's timer until the pointer
 * leaves. With more than three, the spread-out list is a window onto them that
 * scrolls one toast at a time, by wheel, swipe, arrow keys or its arrows, with
 * a scrollbar and "4–6 of 9" to say where it is. Mount it once, inside the
 * ThemeProvider, around the whole app.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const show = useCallback((severity: ToastSeverity, message: string) => {
    const id = nextId.current++;
    setToasts((prev) => [{ id, severity, message, leaving: false }, ...prev]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)),
    );
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), LEAVE_MS);
  }, []);

  /* Toasts raised after this keep going; the timeout removes only those it
     sent on their way. */
  const dismissAll = useCallback(() => {
    setToasts((prev) => prev.map((toast) => ({ ...toast, leaving: true })));
    setTimeout(() => setToasts((prev) => prev.filter((toast) => !toast.leaving)), LEAVE_MS);
  }, []);

  const value = useMemo(
    () => ({
      success: (message: string) => show("success", message),
      info: (message: string) => show("info", message),
      warning: (message: string) => show("warning", message),
      error: (message: string) => show("error", message),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Mounted only while there are toasts, so it starts collapsed each time. */}
      {toasts.length > 0 ? (
        <ToastStack toasts={toasts} dismiss={dismiss} dismissAll={dismissAll} />
      ) : null}
    </ToastContext.Provider>
  );
}

/* The pills under the stack: its floating surface, at the footer's height. */
const pillSx = {
  height: FOOTER_HEIGHT,
  borderRadius: 999,
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  boxShadow: 6,
} as const;

function ToastStack({
  toasts,
  dismiss,
  dismissAll,
}: {
  toasts: Toast[];
  dismiss: (id: number) => void;
  dismissAll: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  /* The first toast in view, spread out, counting from the newest. */
  const [startState, setStart] = useState(0);
  /* Each toast's natural content height, measured as it renders. */
  const [heights, setHeights] = useState<Record<number, number>>({});
  const regionRef = useRef<HTMLElement>(null);

  const measure = useCallback((id: number, height: number) => {
    setHeights((prev) => (prev[id] === height ? prev : { ...prev, [id]: height }));
  }, []);

  const active = toasts.filter((toast) => !toast.leaving);
  const count = active.length;
  const maxStart = Math.max(0, count - VISIBLE);
  const scrollable = expanded && count > VISIBLE;
  /* Held in range as toasts close; collapsed, the newest is always in front. */
  const start = expanded ? Math.min(startState, maxStart) : 0;

  function step(delta: number) {
    setStart(Math.min(Math.max(start + delta, 0), maxStart));
  }

  function collapse() {
    setExpanded(false);
    setStart(0);
  }

  /* The wheel listener is added once, and must call preventDefault (React's
     is passive), so it reads the latest of these through a ref. */
  const wheel = useRef({ scrollable, step });
  useEffect(() => {
    wheel.current = { scrollable, step };
  });
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    let travelled = 0;
    let last = 0;
    function onWheel(event: WheelEvent) {
      if (!wheel.current.scrollable) return;
      event.preventDefault();
      const now = Date.now();
      if (now - last < WHEEL_COOLDOWN_MS) return;
      travelled += event.deltaY;
      if (Math.abs(travelled) < STEP_DISTANCE) return;
      wheel.current.step(Math.sign(travelled));
      travelled = 0;
      last = now;
    }
    region.addEventListener("wheel", onWheel, { passive: false });
    return () => region.removeEventListener("wheel", onWheel);
  }, []);

  const touchY = useRef(0);

  /* Lay out every toast. Collapsed, the front three stack; spread out, the
     three in view list down from the top, those scrolled past slide up and
     fade, and those still to come wait faded just under the list. A closing
     toast holds the place of the one that moves up into it. */
  const frontHeight = count > 0 ? (heights[active[0].id] ?? 0) : 0;
  const layout: { toast: Toast; position: number; y: number; hidden: boolean }[] = [];
  let offset = 0;
  let index = 0;
  let stackHeight = 0;
  for (const toast of toasts) {
    const position = index - start;
    const inView = position >= 0 && position < VISIBLE;
    let y = index * PEEK;
    if (expanded) y = position < 0 ? -SLIDE : offset;
    layout.push({ toast, position, y, hidden: !inView });
    if (toast.leaving) continue;
    if (inView) {
      /* Measured heights are inside the card's 1px border. */
      const outer = (heights[toast.id] ?? 0) + 2;
      stackHeight = expanded ? offset + outer : frontHeight + 2 + position * PEEK;
      if (expanded) offset += outer + GAP;
    }
    index += 1;
  }

  const showFooter = expanded && count > 1;

  return (
    <Box
      ref={regionRef}
      component="section"
      aria-label="Notifications"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={collapse}
      onFocus={() => setExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) collapse();
      }}
      onKeyDown={(event) => {
        if (!scrollable || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
        event.preventDefault();
        step(event.key === "ArrowDown" ? 1 : -1);
      }}
      onTouchStart={(event) => {
        touchY.current = event.touches[0].clientY;
      }}
      onTouchMove={(event) => {
        if (!scrollable) return;
        const y = event.touches[0].clientY;
        if (Math.abs(touchY.current - y) < STEP_DISTANCE) return;
        step(touchY.current > y ? 1 : -1);
        touchY.current = y;
      }}
      sx={{
        position: "fixed",
        zIndex: "snackbar",
        top: { xs: 8, sm: 24 },
        right: { xs: 8, sm: 24 },
        left: { xs: 8, sm: "auto" },
        width: { sm: TOAST_WIDTH },
        /* Covers the gaps between spread-out toasts, so moving the pointer
           across one doesn't collapse the stack. */
        height: showFooter ? stackHeight + GAP + FOOTER_HEIGHT : stackHeight,
        /* A swipe scrolls the toasts rather than the page behind them. */
        touchAction: scrollable ? "none" : undefined,
      }}
    >
      {layout.map(({ toast, position, y, hidden }) => (
        <StackedToast
          key={toast.id}
          toast={toast}
          position={position}
          y={y}
          hidden={hidden}
          expanded={expanded}
          height={heights[toast.id]}
          frontHeight={frontHeight}
          dismiss={dismiss}
          measure={measure}
        />
      ))}

      {/* The scrollbar: the list's whole length, with the part in view lit. */}
      {count > VISIBLE ? (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: 0,
            left: -7,
            width: 3,
            height: stackHeight,
            borderRadius: 999,
            bgcolor: "divider",
            opacity: scrollable ? 1 : 0,
            transition: `opacity 200ms, height 400ms ${EASE}`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${(start / count) * 100}%`,
              height: `${(VISIBLE / count) * 100}%`,
              borderRadius: 999,
              bgcolor: "text.secondary",
              transition: `top 400ms ${EASE}, height 400ms ${EASE}`,
            }}
          />
        </Box>
      ) : null}

      {/* Rendered whenever there's more than one, so tabbing to its buttons
          spreads the stack and shows it. */}
      {count > 1 ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
            transform: `translateY(${stackHeight + GAP - (showFooter ? 0 : 4)}px)`,
            opacity: showFooter ? 1 : 0,
            pointerEvents: showFooter ? undefined : "none",
            transition: `transform 400ms ${EASE}, opacity 200ms`,
            "@media (prefers-reduced-motion: reduce)": { transition: "opacity 150ms" },
          }}
        >
          {count > VISIBLE ? (
            <Box
              sx={{
                ...pillSx,
                display: "inline-flex",
                alignItems: "center",
                px: 0.25,
                color: "text.secondary",
              }}
            >
              <IconButton
                aria-label="Newer"
                disabled={start === 0}
                onClick={() => step(-1)}
                sx={{ p: "3px", color: "inherit" }}
              >
                <KeyboardArrowUpRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <Box
                component="span"
                aria-live="polite"
                sx={{ fontSize: 13, lineHeight: "18px", fontVariantNumeric: "tabular-nums" }}
              >
                {start + 1}–{start + VISIBLE} of {count}
              </Box>
              <IconButton
                aria-label="Older"
                disabled={start === maxStart}
                onClick={() => step(1)}
                sx={{ p: "3px", color: "inherit" }}
              >
                <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          ) : null}
          <Button
            size="small"
            onClick={dismissAll}
            sx={{
              ...pillSx,
              ml: "auto",
              minHeight: 0,
              px: 1.5,
              py: 0,
              fontSize: 13,
              lineHeight: "18px",
              color: "text.secondary",
              "&:hover": { bgcolor: "background.paper", color: "text.primary" },
            }}
          >
            {count > VISIBLE ? `Clear all (${count})` : "Clear all"}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}

function StackedToast({
  toast,
  position,
  y,
  hidden,
  expanded,
  height,
  frontHeight,
  dismiss,
  measure,
}: {
  toast: Toast;
  /* Its place from the front, or from the top of the window spread out:
     negative once scrolled past. */
  position: number;
  y: number;
  hidden: boolean;
  expanded: boolean;
  /* Its own measured height, set so that tucking it behind and spreading it
     out both animate (a height of auto can't). */
  height: number | undefined;
  frontHeight: number;
  dismiss: (id: number) => void;
  measure: (id: number, height: number) => void;
}) {
  const { id, severity, message, leaving } = toast;
  const [entered, setEntered] = useState(false);
  const remaining = useRef(durationFor(message));
  const contentRef = useRef<HTMLDivElement>(null);

  /* Rendered first above the screen's edge, then slid into place. */
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Its height can change with the screen's width, so watch it. */
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => measure(id, content.offsetHeight));
    observer.observe(content);
    return () => observer.disconnect();
  }, [id, measure]);

  /* The timer runs only while the toast is in the stack and the stack is
     collapsed, and picks up where it left off when the pointer leaves. */
  useEffect(() => {
    if (expanded || leaving || hidden) return;
    const started = Date.now();
    const timer = setTimeout(() => dismiss(id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [expanded, leaving, hidden, id, dismiss]);

  const tucked = !expanded && position > 0;
  let scale = 1 - position * 0.05;
  if (expanded) scale = hidden ? 0.95 : 1;

  let transform = `translateY(${y}px) scale(${scale})`;
  if (!entered) transform = "translateY(-100%)";
  else if (leaving) transform = `translateY(${y}px) scale(0.96)`;

  let zIndex = VISIBLE + 1 - position;
  if (leaving || hidden) zIndex = 0;

  return (
    <Box
      role={severity === "error" ? "alert" : "status"}
      /* Out of view or closing: not tabbable, and not read out. */
      inert={hidden || leaving}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex,
        transform,
        transformOrigin: "center bottom",
        opacity: !entered || leaving || hidden ? 0 : 1,
        pointerEvents: leaving || hidden ? "none" : undefined,
        transition: `transform 400ms ${EASE}, opacity ${leaving ? LEAVE_MS : 400}ms ${EASE}`,
        "@media (prefers-reduced-motion: reduce)": { transition: "opacity 150ms" },
      }}
    >
      <ToastCard
        severity={severity}
        message={message}
        onClose={() => dismiss(id)}
        height={tucked && frontHeight ? frontHeight : height}
        hideContent={tucked}
        contentRef={contentRef}
      />
    </Box>
  );
}
