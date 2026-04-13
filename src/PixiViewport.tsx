import React, { useEffect, useRef } from 'react';
import { ScrollApp } from './input/ScrollApp';

export const PixiViewport: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAppRef = useRef<ScrollApp | null>(null);

  useEffect(() => {
    if (containerRef.current && !scrollAppRef.current) {
      const scrollApp = new ScrollApp(containerRef.current);

      scrollAppRef.current = scrollApp;

      scrollApp.init().catch(() => {
      });
    }

    return () => {
      if (scrollAppRef.current) {
        scrollAppRef.current.destroy();
        scrollAppRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        touchAction: 'none',
      }}
    />
  );
};
