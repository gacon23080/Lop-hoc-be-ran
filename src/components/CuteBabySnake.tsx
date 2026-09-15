import React from 'react';

export type SnakeMood = 'happy' | 'loved' | 'milk' | 'star' | 'wink';

interface CuteBabySnakeProps {
  mood?: SnakeMood;
  className?: string;
  isPatted?: boolean;
  primaryColor?: string;
  strokeColor?: string;
  secondaryColor?: string;
  isChick?: boolean;
}

export const CuteBabySnake: React.FC<CuteBabySnakeProps> = ({
  mood = 'happy',
  className = 'w-full h-full',
  isPatted = false,
  primaryColor = '#E9D5FF', // Bé Khoai Môn pastel lavender purple
  strokeColor = '#581C87', // Deep grape purple
  secondaryColor = '#FAF5FF', // Cream lilac
  isChick = false
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
        <ellipse cx="100" cy="185" rx="65" ry="10" fill="#78350F" opacity="0.15" />

        {/* Tail (Peeking out from the left) */}
        <path 
          d="M 45 170 C 10 170 5 130 25 125 C 35 120 30 145 45 150 Z" 
          fill={primaryColor} 
          stroke={strokeColor} 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />

        {/* Body (Perfectly Symmetrical, smooth chubby base) */}
        <path 
          d="M 65 95 C 10 130, 30 185, 100 185 C 170 185, 190 130, 135 95 Z" 
          fill={primaryColor} 
          stroke={strokeColor} 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />

        {/* Belly Patch */}
        <path 
          d="M 78 100 C 65 130, 70 185, 100 185 C 130 185, 135 130, 122 100 Z" 
          fill={secondaryColor} 
          stroke={strokeColor} 
          strokeWidth="5" 
          strokeLinejoin="round" 
        />

        {/* Belly Lines */}
        <path d="M 76 125 Q 100 135 124 125" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" opacity="0.3" fill="none" />
        <path d="M 73 145 Q 100 155 127 145" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" opacity="0.3" fill="none" />
        <path d="M 76 165 Q 100 172 124 165" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" opacity="0.3" fill="none" />

        {/* Baby Bib (Yếm em bé) */}
        <path d="M 65 110 C 65 135, 135 135, 135 110 Z" fill="#FEF08A" stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
        <path d="M 65 110 C 80 120, 120 120, 135 110" fill="none" stroke="#FACC15" strokeWidth="4" />

        {/* Head (Super Chubby mochi cheeks!) */}
        <path 
          d="M 100 25 C 135 25, 165 50, 160 85 C 155 118, 125 115, 100 115 C 75 115, 45 118, 40 85 C 35 50, 65 25, 100 25 Z" 
          fill={primaryColor} 
          stroke={strokeColor} 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />

        {/* Baby Hair Curl or Chick Crest */}
        {isChick ? (
          <g id="chick-tuft-mini">
            <path d="M 92 26 C 88 10, 98 4, 100 12 C 103 4, 112 8, 108 26 Z" fill="#FACC15" stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
            <circle cx="95" cy="11" r="3" fill="#EF4444" />
            <circle cx="104" cy="9" r="3.5" fill="#F59E0B" />
          </g>
        ) : (
          <path d="M 100 25 C 95 10, 115 5, 110 15 C 105 25, 100 25, 100 25" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
        )}

        {/* Blush (Oval and moved down for chibi look) */}
        <ellipse cx="54" cy="92" rx="10" ry="6" fill="#FCA5A5" opacity={0.65} />
        <ellipse cx="146" cy="92" rx="10" ry="6" fill="#FCA5A5" opacity={0.65} />

        {/* Face Expressions - Mắt không long lanh, nét vẽ em bé chibi */}
        {currentMood === 'loved' ? (
          <g>
            {/* Happy closed smile eyes */}
            <path d="M 67 86 Q 74 80 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Tiny floating love hearts above */}
            <path d="M 62 65 C 60 62 56 63 57 67 C 58 70 62 72 62 72 C 62 72 66 70 67 67 C 68 63 64 62 62 65 Z" fill="#E8A0BF" />
            <path d="M 138 65 C 136 62 132 63 133 67 C 134 70 138 72 138 72 C 138 72 142 70 143 67 C 144 63 140 62 138 65 Z" fill="#E8A0BF" />
          </g>
        ) : currentMood === 'star' ? (
          <g>
            {/* Joyful closed smile eyes */}
            <path d="M 67 86 Q 74 80 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Little floating flower / reward star above */}
            <circle cx="100" cy="18" r="4" fill="#FACC15" />
          </g>
        ) : currentMood === 'milk' ? (
          <g>
            {/* Content sleeping/drinking eyes */}
            <path d="M 67 86 Q 74 80 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Sweet milk droplet */}
            <circle cx="86" cy="100" r="2.5" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        ) : (
          <g>
            {/* Mắt tròn xoe mộc mạc, KHÔNG long lanh (Solid clean baby eyes) */}
            <circle cx="74" cy="86" r="7.5" fill="#1F0033" />
            <circle cx="126" cy="86" r="7.5" fill="#1F0033" />
          </g>
        )}

        {/* Baby Pacifier (Ti Giả Em Bé - Luôn đeo trên miệng - màu đồng nhất với bụng) */}
        <g id="baby-pacifier">
          <ellipse cx="100" cy="94" rx="14" ry="11" fill={secondaryColor} stroke={strokeColor} strokeWidth="3" />
          <ellipse cx="98" cy="91" rx="8" ry="5" fill="#FDF2F8" opacity="0.6" />
          <circle cx="100" cy="94" r="5" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2" />
          <path d="M 94 99 C 94 107, 106 107, 106 99" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
