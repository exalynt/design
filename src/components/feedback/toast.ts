import { createContext, useContext } from "react";

/*
 * Every notice about how a request went, success or failure, is a toast.
 * Pages and dialogs do not render their own banners for these; they call
 * useToast() and let ToastProvider show it over whatever is on screen.
 */
export type Toaster = {
  success: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
};

export const ToastContext = createContext<Toaster | null>(null);

/** Stable across renders, so it is safe in effect dependencies. */
export function useToast(): Toaster {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}
