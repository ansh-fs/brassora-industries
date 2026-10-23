import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Ctx = {
  items: string[];
  has: (sku: string) => boolean;
  toggle: (sku: string) => void;
  remove: (sku: string) => void;
  clear: () => void;
};

const BasketCtx = createContext<Ctx | null>(null);
const KEY = "brassora-enquiry";

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(v)) setItems(v);
    } catch {
      /* ignore */
    }
  }, []);
  const save = (next: string[]) => {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  return (
    <BasketCtx.Provider
      value={{
        items,
        has: (s) => items.includes(s),
        toggle: (s) => save(items.includes(s) ? items.filter((i) => i !== s) : [...items, s]),
        remove: (s) => save(items.filter((i) => i !== s)),
        clear: () => save([]),
      }}
    >
      {children}
    </BasketCtx.Provider>
  );
}

export function useBasket() {
  const c = useContext(BasketCtx);
  if (!c) throw new Error("useBasket outside provider");
  return c;
}
