"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type MousePosition = {
  x: number | null;
  y: number | null;
};

type UseMousePositionOptions = {
  throttleInterval?: number;
  enabled?: boolean;
};

export const useMousePosition = (
  options: UseMousePositionOptions = {}
): MousePosition => {
  const { throttleInterval = 0, enabled = true } = options;
  const [mousePosition, setMousePosition] = useState<MousePosition>({ 
    x: null, 
    y: null 
  });
  const lastUpdate = useRef<number>(0);

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    if (!enabled) return;
    
    const now = performance.now();
    if (now - lastUpdate.current < throttleInterval) return;
    
    lastUpdate.current = now;
    setMousePosition({ 
      x: ev.clientX, 
      y: ev.clientY 
    });
  }, [enabled, throttleInterval]);

  useEffect(() => {
    if (!enabled) {
      setMousePosition({ x: null, y: null });
      return;
    }

    const handleMove = (ev: MouseEvent) => updateMousePosition(ev);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [enabled, updateMousePosition]);

  return mousePosition;
};