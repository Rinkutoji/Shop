import { createContext, useState, useEffect, useCallback } from "react";

export const AppCtx = createContext();

export function AppProvider({ children }) {
  const [dark, setDarkState] = useState(() => {
    // អាន saved preference ពី localStorage
    const saved = localStorage.getItem("shopwave-dark");
    return saved === "true";
  });

  const [toasts, setToasts] = useState([]);

  const setDark = (value) => {
    const next = typeof value === "function" ? value(dark) : value;
    setDarkState(next);
    localStorage.setItem("shopwave-dark", next);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <AppCtx.Provider value={{ dark, setDark, addToast, toasts, removeToast }}>
      {children}
    </AppCtx.Provider>
  );
}
