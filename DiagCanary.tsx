"use client";

import { useEffect } from "react";

/**
 * TEMPORARY DIAGNOSTIC COMPONENT — safe to delete once the mobile tap issue is found.
 * Search "DIAG_REMOVE_ME" across the repo to find every piece added for this.
 *
 * Renders nothing visible. On mount, flags that React actually hydrated,
 * and exposes a manual test button (only visible with ?debug=1) that logs
 * whether a plain onClick handler fires at all on the real device.
 */
export default function DiagCanary() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    (window as typeof window & { __reactHydrated?: boolean }).__reactHydrated = true;
    const log = (window as typeof window & { __diagLog?: (m: string) => void }).__diagLog;
    if (log) log("CONFIRMED: React hydrated (useEffect fired).");
  }, []);

  if (typeof window === "undefined" || window.location.search.indexOf("debug=1") === -1) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        const log = (window as typeof window & { __diagLog?: (m: string) => void }).__diagLog;
        if (log) log("REACT onClick FIRED SUCCESSFULLY on test button.");
      }}
      style={{
        position: "fixed",
        bottom: 8,
        right: 8,
        zIndex: 2147483647,
        background: "#ff2d55",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: 8,
        fontSize: 12,
        border: "none",
      }}
    >
      Tap to test React onClick
    </button>
  );
}
