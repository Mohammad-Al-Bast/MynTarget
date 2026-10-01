"use client";

import { Check, Desktop, Moon, Sun } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";

type Mode = "light" | "dark" | "system";

const KEY = "theme";
const EVENT = "theme-change";

const options: { mode: Mode; label: string; Icon: typeof Sun }[] = [
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "dark", label: "Dark", Icon: Moon },
  { mode: "system", label: "Device", Icon: Desktop },
];

function read(): Mode {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function apply(mode: Mode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
  try {
    if (mode === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, mode);
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Light, dark, or follow the device. The saved choice is applied before paint by ThemeScript. */
export function ThemeToggle({ className }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, read, () => "system" as Mode);
  const current = options.find((o) => o.mode === mode) ?? options[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Theme: ${current.label}. Change theme`}
        className={cn(
          "grid size-10 place-items-center border border-line text-ink transition-colors hover:border-accent hover:text-accent-text data-[state=open]:border-accent",
          className,
        )}
      >
        <current.Icon size={18} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map(({ mode: m, label, Icon }) => (
          <DropdownMenuItem key={m} onSelect={() => apply(m)}>
            <Icon aria-hidden="true" />
            {label}
            {mode === m && <Check aria-hidden="true" weight="bold" className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
