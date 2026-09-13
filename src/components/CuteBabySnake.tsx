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
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 transform-gpu"
      >
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="65" ry="10" fill="#3B0764" opacity="0.15" />

        {/* Tail (Peeking out from the left) */}
        <path 
          d="M 45 170 C 10 170 5 130 25 125 C 35 120 30 145 45 150 Z" 
          fill="#D8B4E5" 
          stroke="#4C1D95" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />

        {/* Body (Perfectly Symmetrical, smooth chubby base) */}
        <path 
          d="M 65 95 C 10 130, 30 185, 100 185 C 170 185, 190 130, 135 95 Z" 
          fill="#D8B4E5" 
          stroke="#4C1D95" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />

        {/* Belly Patch */}
        <path 
          d="M 78 100 C 65 130, 70 185, 100 185 C 130 185, 135 130, 122 100 Z" 
          fill="#FAF5FF" 
          stroke="#4C1D95" 
          strokeWidth="5" 
          strokeLinejoin="round" 
        />

        {/* Belly Lines */}
        <path d="M 76 125 Q 100 135 124 125" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" opacity="0.3" fill="none" />
        <path d="M 73 145 Q 100 155 127 145" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" opacity="0.3" fill="none" />
        <path d="M 76 165 Q 100 172 124 165" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" opacity="0.3" fill="none" />

        {/* Head (Super Chubby mochi cheeks!) */}
        <path 
          d="M 100 25 C 135 25, 165 50, 160 85 C 155 118, 125 115, 100 115 C 75 115, 45 118, 40 85 C 35 50, 65 25, 100 25 Z" 
          fill="#D8B4E5" 
          stroke="#4C1D95" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />

        {/* Blush (Moved slightly outward for plumper cheeks) */}
        <circle cx="54" cy="85" r="8" fill="#FCA5A5" opacity="0.6" />
        <circle cx="146" cy="85" r="8" fill="#FCA5A5" opacity="0.6" />

        {/* Face Expressions */}
        {currentMood === 'loved' ? (
          <g>
            {/* Simple Heart Eyes */}
            <path d="M 80 84 L 74 76 A 4.5 4.5 0 0 1 80 71 A 4.5 4.5 0 0 1 86 76 Z" fill="#DB2777" />
            <path d="M 120 84 L 114 76 A 4.5 4.5 0 0 1 120 71 A 4.5 4.5 0 0 1 126 76 Z" fill="#DB2777" />
            {/* Happy open mouth */}
            <path d="M 92 86 Q 100 96 108 86 Z" fill="#F472B6" stroke="#4C1D95" strokeWidth="3" strokeLinejoin="round" />
          </g>
        ) : currentMood === 'star' ? (
          <g>
            {/* Simple Star Eyes */}
            <path d="M 80 68 L 83 75 L 90 76 L 85 81 L 86 88 L 80 84 L 74 88 L 75 81 L 70 76 L 77 75 Z" fill="#F59E0B" />
            <path d="M 120 68 L 123 75 L 130 76 L 125 81 L 126 88 L 120 84 L 114 88 L 115 81 L 110 76 L 117 75 Z" fill="#F59E0B" />
            <path d="M 94 88 Q 100 94 106 88" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        ) : currentMood === 'milk' ? (
          <g>
            {/* Content closed eyes */}
            <path d="M 72 76 Q 80 70 88 76" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 112 76 Q 120 70 128 76" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Milk bottle */}
            <g transform="translate(100, 92)">
              <rect x="-6" y="-5" width="12" height="20" rx="4" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="3" />
              <path d="M -4 -5 L -2 -10 L 2 -10 L 4 -5 Z" fill="#FCD34D" stroke="#4C1D95" strokeWidth="2" strokeLinejoin="round" />
              <line x1="-6" y1="5" x2="6" y2="5" stroke="#E9D5FF" strokeWidth="2" />
            </g>
          </g>
        ) : (
          <g>
            {/* Default: Simple solid dot eyes (No sparkles) */}
            <circle cx="80" cy="76" r="5" fill="#1F0033" />
            <circle cx="120" cy="76" r="5" fill="#1F0033" />
            {/* Simple smile */}
            <path d="M 94 86 Q 100 92 106 86" stroke="#1F0033" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
