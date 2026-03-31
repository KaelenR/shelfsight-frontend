"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface CartItem {
  bookId: string;
  bookCopyId: string;
  title: string;
  author: string;
  isbn: string;
  barcode: string;
}

interface CheckoutCartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (bookCopyId: string) => void;
  clear: () => void;
  count: number;
  has: (bookCopyId: string) => boolean;
}

const STORAGE_KEY = "shelfsight-checkout-cart";

const CheckoutCartContext = createContext<CheckoutCartContextValue | null>(null);

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    if (items.length === 0) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  } catch {
    // sessionStorage may be unavailable
  }
}

export function CheckoutCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  // Persist to sessionStorage on change
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.bookCopyId === item.bookCopyId)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((bookCopyId: string) => {
    setItems((prev) => prev.filter((i) => i.bookCopyId !== bookCopyId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback(
    (bookCopyId: string) => items.some((i) => i.bookCopyId === bookCopyId),
    [items],
  );

  return (
    <CheckoutCartContext.Provider value={{ items, addItem, removeItem, clear, count: items.length, has }}>
      {children}
    </CheckoutCartContext.Provider>
  );
}

export function useCheckoutCart() {
  const ctx = useContext(CheckoutCartContext);
  if (!ctx) throw new Error("useCheckoutCart must be used within CheckoutCartProvider");
  return ctx;
}
