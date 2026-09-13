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

        {/* Baby Bib (Yếm em bé) */}
        <path d="M 65 110 C 65 135, 135 135, 135 110 Z" fill="#FEF08A" stroke="#4C1D95" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 65 110 C 80 120, 120 120, 135 110" fill="none" stroke="#FDE047" strokeWidth="4" />

        {/* Head (Super Chubby mochi cheeks!) */}
        <path 
          d="M 100 25 C 135 25, 165 50, 160 85 C 155 118, 125 115, 100 115 C 75 115, 45 118, 40 85 C 35 50, 65 25, 100 25 Z" 
          fill="#D8B4E5" 
          stroke="#4C1D95" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />

        {/* Baby Hair Curl (Tóc mầm cây ngố xíu) */}
        <path d="M 100 25 C 95 10, 115 5, 110 15 C 105 25, 100 25, 100 25" fill="none" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" />

        {/* Blush (Oval and moved down for chibi look) */}
        <ellipse cx="54" cy="92" rx="10" ry="6" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="146" cy="92" rx="10" ry="6" fill="#FCA5A5" opacity="0.6" />

        {/* Face Expressions */}
        {currentMood === 'loved' ? (
          <g>
            {/* Simple Heart Eyes */}
            <path d="M 76 94 L 70 86 A 4.5 4.5 0 0 1 76 81 A 4.5 4.5 0 0 1 82 86 Z" fill="#DB2777" />
            <path d="M 124 94 L 118 86 A 4.5 4.5 0 0 1 124 81 A 4.5 4.5 0 0 1 130 86 Z" fill="#DB2777" />
            {/* Happy open mouth */}
            <path d="M 94 92 Q 100 102 106 92 Z" fill="#F472B6" stroke="#4C1D95" strokeWidth="3" strokeLinejoin="round" />
          </g>
        ) : currentMood === 'star' ? (
          <g>
            {/* Simple Star Eyes */}
            <path d="M 76 78 L 79 85 L 86 86 L 81 91 L 82 98 L 76 94 L 70 98 L 71 91 L 66 86 L 73 85 Z" fill="#F59E0B" />
            <path d="M 124 78 L 127 85 L 134 86 L 129 91 L 130 98 L 124 94 L 118 98 L 119 91 L 114 86 L 121 85 Z" fill="#F59E0B" />
            <path d="M 94 96 Q 100 102 106 96" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        ) : currentMood === 'milk' ? (
          <g>
            {/* Content closed eyes */}
            <path d="M 68 86 Q 76 80 84 86" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 116 86 Q 124 80 132 86" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Milk bottle */}
            <g transform="translate(100, 100)">
              <rect x="-6" y="-5" width="12" height="20" rx="4" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="3" />
              <path d="M -4 -5 L -2 -10 L 2 -10 L 4 -5 Z" fill="#FCD34D" stroke="#4C1D95" strokeWidth="2" strokeLinejoin="round" />
              <line x1="-6" y1="5" x2="6" y2="5" stroke="#E9D5FF" strokeWidth="2" />
            </g>
          </g>
        ) : (
          <g>
            {/* Default: Simple solid dot eyes (No sparkles), moved wider and lower */}
            <circle cx="74" cy="86" r="7.5" fill="#1F0033" />
            <circle cx="126" cy="86" r="7.5" fill="#1F0033" />
            
            {/* Cute Pacifier instead of mouth for extra baby look */}
            <circle cx="100" cy="94" r="12" fill="#FBCFE8" stroke="#4C1D95" strokeWidth="3" />
            <circle cx="100" cy="94" r="5" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="2" />
            <path d="M 88 94 A 12 12 0 0 0 112 94" fill="none" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          </g>
        )}
      </svg>
    </div>
  );
};
