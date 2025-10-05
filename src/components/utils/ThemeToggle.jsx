// ThemeToggle.jsx
import { useEffect, useState } from "react";

const LS_KEY = "theme-choice"; // "light" | "dark" | "system"

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [choice, setChoice] = useState(() => {
    try {
      return localStorage.getItem(LS_KEY) || "system";
    } catch {
      return "system";
    }
  });

  // apply theme to <html>
  useEffect(() => {
    const apply = (c) => {
      const isDark = c === "dark" ? true : c === "light" ? false : getSystemPrefersDark();
      document.documentElement.classList.toggle("dark", isDark);
    };
    apply(choice);
  }, [choice]);

  // keep system changes in sync when choice === "system"
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (choice === "system") {
        document.documentElement.classList.toggle("dark", mq.matches);
      }
    };
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, [choice]);

  const cycle = () => {
    const next = choice === "light" ? "dark" : choice === "dark" ? "system" : "light";
    try {
      localStorage.setItem(LS_KEY, next === "system" ? "system" : next);
    } catch {}
    setChoice(next);
  };

  return (
    <button
      aria-pressed={choice === "dark"}
      onClick={cycle}
      title={`Theme: ${choice}`}
    >
      {choice === "dark" ? "🌙" : choice === "light" ? "☀️" : "🖥️"}
    </button>
  );
}
