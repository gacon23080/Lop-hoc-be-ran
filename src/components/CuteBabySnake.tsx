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
          <linearGradient id="snakeSkin" x1="0" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="50%" stopColor="#dcd1ff" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          <linearGradient id="snakeSkinDark" x1="0" y1="40" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dcd1ff" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
          <linearGradient id="snakeSkinLight" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FAF5FF" />
            <stop offset="100%" stopColor="#dcd1ff" />
          </linearGradient>
        </defs>

        {/* 1. Base Shadow */}
        <ellipse cx="60" cy="105" rx="55" ry="10" fill="var(--dominant)" opacity="0.3" />

        {/* 2. Base Pancake Coil (Bottom layer) */}
        <ellipse cx="60" cy="88" rx="55" ry="22" fill="url(#snakeSkinDark)" />
        
        {/* Base Details/Scales */}
        <path d="M 25 98 Q 30 100, 35 98" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M 45 103 Q 50 105, 55 103" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M 65 103 Q 70 105, 75 103" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M 85 98 Q 90 100, 95 98" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.6"/>

        {/* 3. Back Ring Part (Behind head) */}
        <path d="M 15 75 C 10 40, 110 40, 105 75 C 90 60, 30 60, 15 75 Z" fill="url(#snakeSkin)" />

        {/* Inner hole shadow where head rests */}
        <ellipse cx="60" cy="72" rx="35" ry="12" fill="#7E22CE" opacity="0.15" />

        {/* 4. The Head */}
        <path d="M 35 68 C 30 35, 90 35, 85 68 C 80 82, 40 82, 35 68 Z" fill="url(#snakeSkinLight)" />

        {/* 5. Front Ring Part (Wraps over head base) */}
        <path d="M 10 75 C 5 105, 115 105, 110 75 C 100 55, 80 80, 60 80 C 40 80, 20 55, 10 75 Z" fill="url(#snakeSkin)" />
        
        {/* Front Ring Highlights/Scales */}
        <path d="M 20 80 Q 25 82, 30 80" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M 90 80 Q 85 82, 80 80" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M 10 75 C 5 105, 115 105, 110 75" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />

        {/* 6. Face Details */}
        {/* Forehead Crescent Moon */}
        <path d="M 57 48 A 3.5 3.5 0 1 1 63 48 A 4.5 4.5 0 1 0 57 48 Z" fill="#F472B6" opacity="0.85" />
        
        {/* Blush */}
        <ellipse cx="40" cy="58" rx="6" ry="4" fill="#F472B6" opacity="0.4" />
        <ellipse cx="80" cy="58" rx="6" ry="4" fill="#F472B6" opacity="0.4" />

        {/* Eyes based on mood */}
        {currentMood === 'loved' ? (
          <g>
            <path d="M0 -3 C -3 -6, -6 -3, -6 0 C -6 4, 0 8, 0 8 C 0 8, 6 4, 6 0 C 6 -3, 3 -6, 0 -3 Z" fill="#DB2777" transform="translate(46, 54) scale(0.9)"/>
            <path d="M0 -3 C -3 -6, -6 -3, -6 0 C -6 4, 0 8, 0 8 C 0 8, 6 4, 6 0 C 6 -3, 3 -6, 0 -3 Z" fill="#DB2777" transform="translate(74, 54) scale(0.9)"/>
          </g>
        ) : currentMood === 'star' ? (
          <g>
            <path d="M0 -5 L 1.5 -1.5 L 5 -1.5 L 2 1 L 3 5 L 0 2.5 L -3 5 L -2 1 L -5 -1.5 L -1.5 -1.5 Z" fill="#F59E0B" transform="translate(46, 54) scale(1)"/>
            <path d="M0 -5 L 1.5 -1.5 L 5 -1.5 L 2 1 L 3 5 L 0 2.5 L -3 5 L -2 1 L -5 -1.5 L -1.5 -1.5 Z" fill="#F59E0B" transform="translate(74, 54) scale(1)"/>
          </g>
        ) : currentMood === 'milk' ? (
          <g>
            <path d="M -4 1 Q 0 -4, 4 1" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" fill="none" transform="translate(46, 55)"/>
            <path d="M -4 1 Q 0 -4, 4 1" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" fill="none" transform="translate(74, 55)"/>
          </g>
        ) : (
          <g>
            {/* Left Eye */}
            <ellipse cx="46" cy="54" rx="4.5" ry="6" fill="#3B0764" transform="rotate(10 46 54)" />
            <circle cx="44.5" cy="52" r="1.5" fill="#FFFFFF" />
            <circle cx="47.5" cy="56" r="0.8" fill="#F472B6" />
            {/* Right Eye */}
            <ellipse cx="74" cy="54" rx="4.5" ry="6" fill="#3B0764" transform="rotate(-10 74 54)" />
            <circle cx="72.5" cy="52" r="1.5" fill="#FFFFFF" />
            <circle cx="75.5" cy="56" r="0.8" fill="#F472B6" />
          </g>
        )}

        {/* The signature blep tongue flopping over the front coil */}
        {(currentMood === 'happy' || currentMood === 'loved') && (
          <g>
            <path d="M 54 66 C 45 85, 30 75, 22 82" fill="none" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
            <path d="M 22 82 L 19 80 M 22 82 L 21 85" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Small mouth curve */}
        {currentMood === 'milk' ? (
          <circle cx="60" cy="62" r="2.5" fill="#F472B6" />
        ) : (
          <path d="M 56 64 Q 60 67, 64 64" stroke="#4A154B" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}
        
        {/* Milk Bottle when mood is milk */}
        {currentMood === 'milk' && (
           <g transform="translate(55, 68) rotate(-20)">
             <rect x="-6" y="0" width="12" height="18" rx="3" fill="#FFFFFF" stroke="#D8B4E5" strokeWidth="2" />
             <rect x="-4" y="-3" width="8" height="4" rx="1" fill="#FDE047" />
             <path d="M -2 -3 L -2 -5 L 2 -5 L 2 -3 Z" fill="#FB923C" />
             <line x1="-5" y1="12" x2="5" y2="12" stroke="#E9D5FF" strokeWidth="2" />
           </g>
        )}

        {/* Little floating sparkles */}
        <circle cx="20" cy="30" r="2" fill="#FDE047" />
        <path d="M14 27 L 15 30 L 18 30 L 15.5 32 L 16.5 35 L 14 33 L 11.5 35 L 12.5 32 L 10 30 L 13 30 Z" fill="#FDE047" transform="scale(0.6) translate(15, 45)" />
        <circle cx="95" cy="25" r="2" fill="#F472B6" />
        <circle cx="100" cy="32" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
