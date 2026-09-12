import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  icon: string;
}

const ICONS = ['💝', '🌸', '🐣', '✨', '🎨', '🧸', '🪅', '🍼'];

export const CuteClickSparkles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn particles if clicking inside inputs or textareas to avoid interference
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const randomIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        icon: randomIcon
      };

      setParticles((prev) => [...prev.slice(-8), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 850);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-lg select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'cuteSparkleFloat 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) forwards'
          }}
        >
          {p.icon}
        </span>
      ))}
      <style>{`
        @keyframes cuteSparkleFloat {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -80%) scale(1.3) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -120%) scale(1) rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
};
