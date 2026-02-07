'use client';

import { useEffect, useState } from 'react';

export default function CursorTrail() {
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const newTrail = { id: id++, x: e.clientX, y: e.clientY };
      setTrails((prev) => [...prev.slice(-8), newTrail]);

      // Remove trails after animation
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed w-3 h-3 bg-teal-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: mousePos.x - 6,
          top: mousePos.y - 6,
          transition: 'transform 0.1s ease-out',
        }}
      />
      {/* Trail dots */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed w-2 h-2 bg-teal-400/30 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            opacity: (index + 1) / trails.length * 0.5,
            transform: `scale(${(index + 1) / trails.length})`,
            transition: 'opacity 0.3s, transform 0.3s',
          }}
        />
      ))}
    </>
  );
}
