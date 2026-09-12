import React from 'react';

export type SnakeMood = 'happy' | 'loved' | 'milk' | 'star' | 'wink';

interface CuteBabySnakeProps {
  mood?: SnakeMood;
  className?: string;
  isPatted?: boolean;
}

export const CuteBabySnake: React.FC<CuteBabySnakeProps> = ({
  mood = 'happy',
  className = 'w-full h-full',
  isPatted = false
}) => {
  const currentMood = isPatted ? 'loved' : mood;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 transform-gpu"
      >
        <defs>
          <radialGradient id="headGrad" cx="50%" cy="65%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F3E8FF" />
            <stop offset="75%" stopColor="#D8B4E5" />
            <stop offset="100%" stopColor="#C084FC" />
          </radialGradient>
          
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F3E8FF" />
            <stop offset="70%" stopColor="#D8B4E5" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>

          <linearGradient id="tailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="60%" stopColor="#D8B4E5" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <filter id="blushBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* 1. Ground Shadow */}
        <ellipse cx="60" cy="100" rx="42" ry="7" fill="#3B0764" opacity="0.12" />

        {/* 2. Tail (Behind body) */}
        <path 
          d="M 65 85 C 85 105, 110 90, 105 75 C 95 85, 75 80, 65 75 Z" 
          fill="url(#tailGrad)" 
          stroke="#3B0764" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />

        {/* 3. Main Body */}
        <path 
          d="M 45 60 C 35 75, 15 85, 25 102 C 32 112, 65 112, 75 95 C 82 82, 75 60, 75 60 Z" 
          fill="url(#bodyGrad)" 
          stroke="#3B0764" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
        {/* Subtle belly highlight */}
        <path 
          d="M 42 62 C 34 75, 18 85, 27 100" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.8" 
        />

        {/* 4. Drop shadow under head onto body */}
        <path 
          d="M 45 66 C 55 72, 65 72, 75 66 C 70 75, 50 75, 45 66 Z" 
          fill="#3B0764" 
          opacity="0.15" 
        />

        {/* 5. Head (Wide Chibi Bell Shape) */}
        <path 
          d="M 60 68 C 30 68, 15 55, 20 38 C 25 15, 50 15, 60 15 C 70 15, 95 15, 100 38 C 105 55, 90 68, 60 68 Z" 
          fill="url(#headGrad)" 
          stroke="#3B0764" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
        {/* Top of head highlight */}
        <path 
          d="M 45 20 C 55 16, 65 16, 75 20 C 65 22, 55 22, 45 20 Z" 
          fill="#FFFFFF" 
          opacity="0.5" 
        />

        {/* 6. Huge Soft Blush */}
        <circle cx="28" cy="48" r="11" fill="#F472B6" opacity="0.4" filter="url(#blushBlur)" />
        <circle cx="92" cy="48" r="11" fill="#F472B6" opacity="0.4" filter="url(#blushBlur)" />

        {/* 7. Nostrils */}
        <circle cx="56" cy="48" r="0.8" fill="#3B0764" />
        <circle cx="64" cy="48" r="0.8" fill="#3B0764" />

        {/* 8. Eyes */}
        {currentMood === 'loved' ? (
          <g>
            <path d="M 0 -2 C -3 -6, -7 -3, -7 1 C -7 5, 0 9, 0 9 C 0 9, 7 5, 7 1 C 7 -3, 3 -6, 0 -2 Z" fill="#DB2777" transform="translate(40, 42)" />
            <path d="M 0 -2 C -3 -6, -7 -3, -7 1 C -7 5, 0 9, 0 9 C 0 9, 7 5, 7 1 C 7 -3, 3 -6, 0 -2 Z" fill="#DB2777" transform="translate(80, 42)" />
          </g>
        ) : currentMood === 'star' ? (
          <g>
            <path d="M 0 -6 L 2 -2 L 6 -2 L 3 1 L 4 5 L 0 3 L -4 5 L -3 1 L -6 -2 L -2 -2 Z" fill="#F59E0B" transform="translate(40, 42)" />
            <path d="M 0 -6 L 2 -2 L 6 -2 L 3 1 L 4 5 L 0 3 L -4 5 L -3 1 L -6 -2 L -2 -2 Z" fill="#F59E0B" transform="translate(80, 42)" />
          </g>
        ) : currentMood === 'milk' ? (
          <g>
            <path d="M -5 1 Q 0 -4, 5 1" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" fill="none" transform="translate(40, 43)" />
            <path d="M -5 1 Q 0 -4, 5 1" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" fill="none" transform="translate(80, 43)" />
          </g>
        ) : (
          <g>
            <circle cx="40" cy="42" r="4.5" fill="#1F2937" />
            <circle cx="39" cy="40.5" r="1.2" fill="#FFFFFF" />
            <circle cx="80" cy="42" r="4.5" fill="#1F2937" />
            <circle cx="79" cy="40.5" r="1.2" fill="#FFFFFF" />
          </g>
        )}

        {/* 9. Mouth & Tongue */}
        {currentMood === 'loved' ? (
          <g>
            <path d="M 48 51 Q 60 62, 72 51 Z" fill="#F472B6" stroke="#3B0764" strokeWidth="1.5" />
            <path d="M 54 54 Q 60 60, 66 54 Z" fill="#FB7185" />
          </g>
        ) : currentMood === 'milk' ? (
          <circle cx="60" cy="52" r="2.5" fill="#F472B6" />
        ) : (
          <g>
            {/* Pink Tongue hanging out */}
            <path d="M 57 51 C 57 62, 59 66, 60 66 C 61 66, 63 62, 63 51 Z" fill="#F472B6" stroke="#3B0764" strokeWidth="1.2" />
            {/* Tongue split line */}
            <line x1="60" y1="53" x2="60" y2="62" stroke="#3B0764" strokeWidth="1" />
            {/* W shaped mouth drawn over top */}
            <path d="M 46 51 Q 53 56, 60 51 Q 67 56, 74 51" fill="none" stroke="#3B0764" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* 10. Accessories */}
        {/* Milk Bottle when mood is milk */}
        {currentMood === 'milk' && (
           <g transform="translate(56, 56) rotate(-20)">
             <rect x="-6" y="0" width="12" height="18" rx="3" fill="#FFFFFF" stroke="#D8B4E5" strokeWidth="1.5" />
             <rect x="-4" y="-3" width="8" height="4" rx="1" fill="#FDE047" />
             <path d="M -2 -3 L -2 -5 L 2 -5 L 2 -3 Z" fill="#FB923C" />
             <line x1="-5" y1="12" x2="5" y2="12" stroke="#E9D5FF" strokeWidth="1.5" />
           </g>
        )}
        
        {/* Star Ribbon for Star mood */}
        {currentMood === 'star' && (
          <g transform="translate(75, 22) rotate(20)">
            <ellipse cx="-6" cy="0" rx="7" ry="4" fill="#F472B6" transform="rotate(-20 -6 0)" />
            <ellipse cx="6" cy="0" rx="7" ry="4" fill="#F472B6" transform="rotate(20 6 0)" />
            <circle cx="0" cy="0" r="3.5" fill="#FDE047" />
          </g>
        )}
      </svg>
    </div>
  );
};
