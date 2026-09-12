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
          {/* Main Snake Purple Pastel Gradients */}
          <linearGradient id="snakeSkin" x1="20" y1="20" x2="100" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="45%" stopColor="#D8B4E5" />
            <stop offset="100%" stopColor="var(--dominant)" />
          </linearGradient>

          <linearGradient id="snakeBelly" x1="40" y1="50" x2="80" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </linearGradient>

          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>

          <linearGradient id="blushGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Coiled Tail & Lower Body (Base) */}
        <path
          d="M32 94 C 22 96, 18 84, 26 76 C 35 68, 50 78, 62 82 C 78 86, 96 85, 102 75 C 108 65, 98 56, 92 60 C 86 64, 88 74, 94 76"
          stroke="url(#snakeSkin)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tail Tip with Cute Swirl */}
        <path
          d="M96 74 C 104 76, 108 86, 98 94 C 90 99, 78 98, 70 96 C 56 94, 42 96, 30 94"
          stroke="url(#snakeSkin)"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Underbelly Stripes on Tail */}
        <path
          d="M48 83 Q 54 80, 60 84"
          stroke="#FAF5FF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M68 85 Q 74 82, 80 86"
          stroke="#FAF5FF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M86 80 Q 90 77, 94 82"
          stroke="#FAF5FF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Chubby Snake Head & Upper Body */}
        {/* Upper Body Neck */}
        <ellipse cx="60" cy="74" rx="20" ry="17" fill="url(#snakeSkin)" />
        
        {/* Belly Patch (Soft Tummy) */}
        <ellipse cx="60" cy="77" rx="13" ry="12" fill="url(#snakeBelly)" />
        <path d="M52 72 Q 60 75, 68 72" stroke="#D8B4E5" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M53 78 Q 60 81, 67 78" stroke="#D8B4E5" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M55 84 Q 60 87, 65 84" stroke="#D8B4E5" strokeWidth="1.8" strokeLinecap="round" />

        {/* Chubby Round Head */}
        <circle cx="60" cy="46" r="27" fill="url(#snakeSkin)" />

        {/* Cute Baby Cheeks (Blushing) */}
        <ellipse cx="41" cy="54" rx="6" ry="3.8" fill="url(#blushGrad)" />
        <ellipse cx="79" cy="54" rx="6" ry="3.8" fill="url(#blushGrad)" />
        {/* Cheek blush sparkles */}
        <circle cx="40" cy="53" r="1" fill="#FFFFFF" />
        <circle cx="80" cy="53" r="1" fill="#FFFFFF" />

        {/* EYES: Rendered according to mood */}
        {currentMood === 'loved' ? (
          /* Heart Eyes when patted! */
          <g>
            <path
              d="M48 42 C 48 37, 43 35, 41 38 C 39 35, 34 37, 34 42 C 34 47, 41 51, 41 51 C 41 51, 48 47, 48 42 Z"
              fill="#DB2777"
            />
            <path
              d="M86 42 C 86 37, 81 35, 79 38 C 77 35, 72 37, 72 42 C 72 47, 79 51, 79 51 C 79 51, 86 47, 86 42 Z"
              fill="#DB2777"
            />
            <circle cx="43" cy="39" r="1.5" fill="#FFFFFF" />
            <circle cx="81" cy="39" r="1.5" fill="#FFFFFF" />
          </g>
        ) : currentMood === 'star' ? (
          /* Star Eyes when awarded flower */
          <g>
            <path
              d="M41 37 L 43 43 L 49 43 L 44 47 L 46 53 L 41 49 L 36 53 L 38 47 L 33 43 L 39 43 Z"
              fill="#F59E0B"
            />
            <path
              d="M79 37 L 81 43 L 87 43 L 82 47 L 84 53 L 79 49 L 74 53 L 76 47 L 71 43 L 77 43 Z"
              fill="#F59E0B"
            />
          </g>
        ) : currentMood === 'milk' ? (
          /* Blissful closed curve eyes when drinking warm milk */
          <g>
            <path d="M36 46 Q 42 39, 48 46" stroke="#3B0764" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            <path d="M72 46 Q 78 39, 84 46" stroke="#3B0764" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          /* Standard Hyper-Cute Large Anime Eyes with Twinkle */
          <g>
            {/* Left Eye */}
            <ellipse cx="44" cy="45" rx="6.5" ry="8" fill="#3B0764" />
            <ellipse cx="42" cy="42.5" rx="2.8" ry="3.8" fill="#FFFFFF" />
            <circle cx="46.5" cy="48" r="1.6" fill="#FFFFFF" />
            <circle cx="42" cy="49" r="0.9" fill="#E9D5FF" />

            {/* Right Eye */}
            <ellipse cx="76" cy="45" rx="6.5" ry="8" fill="#3B0764" />
            <ellipse cx="74" cy="42.5" rx="2.8" ry="3.8" fill="#FFFFFF" />
            <circle cx="78.5" cy="48" r="1.6" fill="#FFFFFF" />
            <circle cx="74" cy="49" r="0.9" fill="#E9D5FF" />
          </g>
        )}

        {/* Sweet Kitten Smile or Blep */}
        {currentMood === 'loved' ? (
          /* Wide joyful open smile */
          <g>
            <path
              d="M54 53 Q 60 62, 66 53"
              stroke="#581C87"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="#F472B6"
            />
            {/* Little tongue blep */}
            <path d="M57 56 Q 60 61, 63 56" fill="#FB7185" />
          </g>
        ) : currentMood === 'milk' ? (
          /* Sucking milk mouth */
          <g>
            <circle cx="60" cy="55" r="3.2" fill="#581C87" />
            <circle cx="60" cy="55" r="2" fill="#F472B6" />
          </g>
        ) : (
          /* Cute gentle kitty mouth (3 or w) */
          <path
            d="M53 53 Q 56.5 57, 60 54 Q 63.5 57, 67 53"
            stroke="#4A154B"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Little Preschool Yellow Star Clip or Ribbon Bow on Head */}
        <g transform="translate(68, 20) rotate(15)">
          {/* Bow Left Loop */}
          <ellipse cx="5" cy="8" rx="6" ry="4" fill="url(#ribbonGrad)" transform="rotate(-25 5 8)" />
          {/* Bow Right Loop */}
          <ellipse cx="15" cy="8" rx="6" ry="4" fill="url(#ribbonGrad)" transform="rotate(25 15 8)" />
          {/* Bow Center Knot */}
          <circle cx="10" cy="8" r="3" fill="#F43F5E" />
          {/* Yellow Star in Center of Ribbon */}
          <path
            d="M10 5.5 L 10.8 7.2 L 12.6 7.2 L 11.2 8.3 L 11.7 10 L 10 9 L 8.3 10 L 8.8 8.3 L 7.4 7.2 L 9.2 7.2 Z"
            fill="#FDE047"
          />
        </g>

        {/* Little Baby Milk Bottle accessory when mood is milk */}
        {currentMood === 'milk' && (
          <g transform="translate(62, 58) rotate(-15)">
            <rect x="0" y="4" width="10" height="15" rx="3" fill="#FFFFFF" stroke="#D8B4E5" strokeWidth="1.5" />
            <rect x="2" y="1" width="6" height="3" rx="1" fill="#FDE047" />
            <circle cx="5" cy="0" r="1.5" fill="#FB923C" />
            <line x1="2" y1="10" x2="8" y2="10" stroke="#E9D5FF" strokeWidth="1.5" />
          </g>
        )}

        {/* Small floating sparkles / bubbles around head */}
        <circle cx="28" cy="35" r="1.5" fill="#FDE047" />
        <path d="M28 32 L 29 35 L 32 35 L 29.5 37 L 30.5 40 L 28 38 L 25.5 40 L 26.5 37 L 24 35 L 27 35 Z" fill="#FDE047" transform="scale(0.5) translate(28, 30)" />
        <circle cx="94" cy="38" r="1.8" fill="#F472B6" />
        <circle cx="98" cy="34" r="1" fill="#FFFFFF" />

      </svg>
    </div>
  );
};
