import React from 'react';
import { AccessoryType } from '../types';

export type MascotMood = 'happy' | 'loved' | 'eating' | 'bathing' | 'sleeping' | 'playing' | 'wink' | 'sad';

interface InteractiveMascotSnakeProps {
  primaryColor?: string;
  secondaryColor?: string;
  strokeColor?: string;
  mood?: MascotMood;
  accessory?: AccessoryType;
  cleanliness?: number;
  happiness?: number;
  isWiggling?: boolean;
  isSleeping?: boolean;
  isAngel?: boolean;
  isChick?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const InteractiveMascotSnake: React.FC<InteractiveMascotSnakeProps> = ({
  primaryColor = '#E9D5FF',
  secondaryColor = '#FAF5FF',
  strokeColor = '#581C87',
  mood = 'happy',
  accessory = 'sprout',
  cleanliness = 100,
  happiness = 100,
  isWiggling = false,
  isSleeping = false,
  isAngel = false,
  isChick = false,
  className = 'w-64 h-64',
  onClick
}) => {
  // If cleanliness < 40: dirty
  const isDirty = cleanliness < 45;
  // If happiness < 40 and not sleeping: sad
  const isSad = (happiness < 40 || mood === 'sad') && !isSleeping;
  const currentMood = isSleeping ? 'sleeping' : isSad ? 'sad' : mood;

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer transition-transform duration-300 ${
        isWiggling ? 'scale-105 rotate-3' : 'hover:scale-102'
      } ${className}`}
      title={isChick ? "Nhấp để xoa đầu và cưng nựng bé gà con!" : "Nhấp để xoa đầu và cưng nựng bé rắn!"}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl transition-all duration-300 transform-gpu"
      >
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ground Soft Shadow */}
        <ellipse cx="100" cy="186" rx="66" ry="11" fill={strokeColor} opacity="0.16" />

        {/* Tail (Wiggling on the left) */}
        <path
          d="M 45 170 C 10 170 5 130 25 125 C 35 120 30 145 45 150 Z"
          fill={primaryColor}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinejoin="round"
          className={isWiggling ? 'animate-bounce' : ''}
        />

        {/* Tail heart tip */}
        <path
          d="M 22 124 C 18 118 10 120 12 128 C 14 133 22 136 22 136 C 22 136 30 133 32 128 C 34 120 26 118 22 124 Z"
          fill={secondaryColor}
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Chubby Lower Body Base */}
        <path
          d="M 65 95 C 10 130, 30 185, 100 185 C 170 185, 190 130, 135 95 Z"
          fill={primaryColor}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Soft Tummy Belly Patch */}
        <path
          d="M 78 102 C 65 130, 70 185, 100 185 C 130 185, 135 130, 122 102 Z"
          fill={secondaryColor}
          stroke={strokeColor}
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Belly Ring Stripes */}
        <path d="M 76 126 Q 100 136 124 126" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" opacity="0.3" fill="none" />
        <path d="M 73 146 Q 100 156 127 146" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" opacity="0.3" fill="none" />
        <path d="M 76 166 Q 100 173 124 166" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" opacity="0.3" fill="none" />

        {/* Baby Bib (Yếm Mầm Non Rắn Con) */}
        <path d="M 66 108 C 66 134, 134 134, 134 108 Z" fill="#FEF08A" stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
        <path d="M 66 108 C 80 118, 120 118, 134 108" fill="none" stroke="#FACC15" strokeWidth="3.5" />
        <circle cx="100" cy="120" r="3.5" fill="#EF4444" />

        {/* Big Mochi Head (Tạo hình đầu tròn mochi y hệt bé mascot tím) */}
        <path
          d="M 100 25 C 135 25, 165 50, 160 85 C 155 118, 125 115, 100 115 C 75 115, 45 118, 40 85 C 35 50, 65 25, 100 25 Z"
          fill={primaryColor}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Baby Hair Curl or Chick Crest */}
        {(isChick || primaryColor === '#FDE047') ? (
          <g id="chick-tuft-crest">
            {/* Adorable Chick Crest (Mào Gà Con Lông Xù Màu Vàng Đỏ) */}
            <path d="M 92 26 C 88 10, 98 4, 100 12 C 103 4, 112 8, 108 26 Z" fill="#FACC15" stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="95" cy="11" r="3.5" fill="#EF4444" />
            <circle cx="104" cy="9" r="4" fill="#F59E0B" />
          </g>
        ) : (
          /* Baby Hair Curl (Tóc mầm ngố đáng yêu) */
          <path d="M 100 25 C 95 10, 115 5, 110 15 C 105 25, 100 25, 100 25" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
        )}

        {/* Heavenly Angel Halo & Wings if deceased/angel */}
        {isAngel && (
          <g id="angel-halo-wings">
            <ellipse cx="100" cy="12" rx="32" ry="9" fill="none" stroke="#FACC15" strokeWidth="4.5" />
            <ellipse cx="100" cy="12" rx="32" ry="9" fill="none" stroke="#FEF08A" strokeWidth="2" />
            {/* Small Angel Wings */}
            <path d="M 38 90 C 8 80, 5 115, 36 108 Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="3" opacity="0.9" />
            <path d="M 162 90 C 192 80, 195 115, 164 108 Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="3" opacity="0.9" />
          </g>
        )}

        {/* Rosy Cheeks (Má hồng bầu bĩnh) */}
        <ellipse cx="54" cy="92" rx="10" ry="6" fill="#FCA5A5" opacity={currentMood === 'loved' ? 0.8 : currentMood === 'sad' ? 0.3 : 0.6} />
        <ellipse cx="146" cy="92" rx="10" ry="6" fill="#FCA5A5" opacity={currentMood === 'loved' ? 0.8 : currentMood === 'sad' ? 0.3 : 0.6} />

        {/* EXPRESSIONS / EYES - MẮT KHÔNG LONG LANH (Chấm tròn mộc mạc hoặc nét nhắm mắt em bé) */}
        {currentMood === 'sleeping' ? (
          <g>
            {/* Sleeping closed smile eyes */}
            <path d="M 67 86 Q 74 91 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 91 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Floating Zzz */}
            <g className="animate-pulse">
              <text x="142" y="55" fill="#A855F7" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Z</text>
              <text x="154" y="42" fill="#C084FC" fontSize="13" fontWeight="bold" fontFamily="sans-serif">z</text>
              <text x="164" y="32" fill="#E9D5FF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">z</text>
            </g>
          </g>
        ) : currentMood === 'sad' ? (
          <g>
            {/* Drooping sad eyes when neglected / sad */}
            <path d="M 67 89 Q 74 83 81 88" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 119 88 Q 126 83 133 89" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Tear droplet rolling on cheek */}
            <path d="M 58 92 C 55 88 61 86 63 89 C 64 92 59 97 58 97 C 58 97 55 93 58 92 Z" fill="#38BDF8" className="animate-bounce" />
          </g>
        ) : currentMood === 'loved' ? (
          <g>
            {/* Happy sweet closed eyes */}
            <path d="M 67 86 Q 74 80 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Tiny hearts floating near cheeks */}
            <path d="M 40 68 C 38 65 34 66 35 70 C 36 73 40 75 40 75 C 40 75 44 73 45 70 C 46 66 42 65 40 68 Z" fill="#E8A0BF" />
            <path d="M 160 68 C 158 65 154 66 155 70 C 156 73 160 75 160 75 C 160 75 164 73 165 70 C 166 66 162 65 160 68 Z" fill="#E8A0BF" />
          </g>
        ) : currentMood === 'eating' ? (
          <g>
            {/* Content squinted happy eyes */}
            <path d="M 67 86 Q 74 80 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Cute crumb beside pacifier */}
            <circle cx="116" cy="98" r="2" fill="#D97706" />
          </g>
        ) : currentMood === 'bathing' ? (
          <g>
            {/* Delighted closed eyes */}
            <path d="M 67 86 Q 74 80 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Soap bubbles around body */}
            <g className="animate-bounce">
              <circle cx="45" cy="80" r="10" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="2" />
              <circle cx="42" cy="77" r="3" fill="#FFFFFF" />
              <circle cx="155" cy="75" r="13" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="2" />
              <circle cx="152" cy="71" r="4" fill="#FFFFFF" />
              <circle cx="100" cy="18" r="11" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2" />
              <circle cx="97" cy="15" r="3.5" fill="#FFFFFF" />
            </g>
          </g>
        ) : currentMood === 'playing' ? (
          <g>
            {/* Joyful closed laugh eyes */}
            <path d="M 67 86 Q 74 80 81 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        ) : currentMood === 'wink' ? (
          <g>
            {/* One solid dot eye, one closed smile eye */}
            <circle cx="74" cy="86" r="7.5" fill="#1F0033" />
            <path d="M 119 86 Q 126 80 133 86" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <g>
            {/* MẮT TRÒN ĐEN MỘC MẠC - KHÔNG LONG LANH (Solid clean baby eyes) */}
            <circle cx="74" cy="86" r="7.5" fill="#1F0033" />
            <circle cx="126" cy="86" r="7.5" fill="#1F0033" />
          </g>
        )}

        {/* BABY PACIFIER (TI GIẢ EM BÉ - TẤT CẢ CÁC BÉ RẮN ĐỀU ĐEO TI GIẢ) */}
        <g id="baby-pacifier-signature" className={isWiggling ? 'animate-wiggle' : ''}>
          {/* Pacifier Shield (Tấm chắn ti giả) - Màu ti giả đồng nhất với màu bụng */}
          <ellipse cx="100" cy="94" rx="14" ry="11" fill={secondaryColor} stroke={strokeColor} strokeWidth="3" />
          <ellipse cx="98" cy="91" rx="8" ry="5" fill="#FFFFFF" opacity="0.6" />
          {/* Pacifier Center Knob (Nút giữa) */}
          <circle cx="100" cy="94" r="5" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2" />
          {/* Pacifier Ring/Handle (Vòng quai cầm ti giả) */}
          <path d="M 94 99 C 94 107, 106 107, 106 99" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Nếu chọn phụ kiện ti giả đặc biệt: thêm chấm vàng hoàng gia */}
          {accessory === 'pacifier' && (
            <circle cx="100" cy="94" r="2.5" fill="#FACC15" />
          )}
        </g>

        {/* DIRT / MUD SMUDGES (LẤM LEM BÙN ĐẤT KHI KHÔNG ĐƯỢC TẮM RỬA) */}
        {isDirty && (
          <g id="dirt-mud-smudges" opacity={cleanliness < 25 ? 0.85 : 0.6}>
            {/* Vết bùn trên trán */}
            <path d="M 88 48 C 84 42, 96 40, 102 44 C 105 48, 93 52, 88 48 Z" fill="#78350F" />
            <circle cx="106" cy="42" r="2" fill="#78350F" />
            {/* Vết bẩn bên má trái */}
            <path d="M 46 80 C 42 75, 50 72, 54 78 C 52 83, 44 84, 46 80 Z" fill="#78350F" />
            {/* Vết bẩn bên má phải */}
            <path d="M 142 80 C 146 76, 154 80, 150 86 C 144 88, 138 85, 142 80 Z" fill="#78350F" />
            {/* Vết lấm lem trên yếm & bụng */}
            <ellipse cx="88" cy="138" rx="8" ry="4" fill="#78350F" />
            <ellipse cx="114" cy="154" rx="7" ry="4" fill="#78350F" />
            <circle cx="68" cy="65" r="2.5" fill="#78350F" />
            <circle cx="132" cy="62" r="2" fill="#78350F" />
            {/* Mùi hôi / khói bụi nếu quá bẩn */}
            {cleanliness < 25 && (
              <g>
                <path d="M 76 28 Q 78 22 75 16" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
                <path d="M 124 28 Q 122 22 125 16" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
              </g>
            )}
          </g>
        )}

        {/* ACCESSORIES LAYER */}
        {accessory === 'sprout' && (
          <g id="acc-sprout">
            {/* Little plant sprout on head */}
            <path d="M 100 26 C 100 12, 100 8, 100 5" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
            {/* Left Leaf */}
            <path d="M 100 12 C 90 2, 78 8, 86 16 C 94 20, 100 12, 100 12 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Right Leaf */}
            <path d="M 100 8 C 110 -2, 122 4, 114 12 C 106 16, 100 8, 100 8 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" strokeLinejoin="round" />
          </g>
        )}

        {accessory === 'bow' && (
          <g id="acc-bow" transform="translate(100, 26)">
            {/* Pink Princess Bow */}
            <path d="M 0 0 L -22 -14 C -26 -5, -24 5, -20 12 Z" fill="#F43F5E" stroke="#881337" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 0 0 L 22 -14 C 26 -5, 24 5, 20 12 Z" fill="#F43F5E" stroke="#881337" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="0" cy="0" r="7" fill="#FECDD3" stroke="#881337" strokeWidth="3" />
            <circle cx="0" cy="0" r="2.5" fill="#E11D48" />
          </g>
        )}

        {accessory === 'crown' && (
          <g id="acc-crown" transform="translate(100, 24)">
            {/* Gold Little Crown */}
            <path d="M -22 0 L -24 -20 L -10 -10 L 0 -24 L 10 -10 L 24 -20 L 22 0 Z" fill="#FACC15" stroke="#854D0E" strokeWidth="3.5" strokeLinejoin="round" />
            <ellipse cx="0" cy="0" rx="22" ry="4" fill="#EAB308" stroke="#854D0E" strokeWidth="3" />
            <circle cx="-24" cy="-20" r="2.5" fill="#EF4444" />
            <circle cx="0" cy="-24" r="3.5" fill="#3B82F6" />
            <circle cx="24" cy="-20" r="2.5" fill="#10B981" />
            <circle cx="0" cy="-8" r="3" fill="#EF4444" stroke="#854D0E" strokeWidth="1.5" />
          </g>
        )}

        {accessory === 'sunglasses' && (
          <g id="acc-sunglasses" transform="translate(100, 84)">
            {/* Cool Black Sunglasses */}
            <rect x="-42" y="-12" width="34" height="24" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <rect x="8" y="-12" width="34" height="24" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <path d="M -8 -4 L 8 -4" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            {/* Glare line */}
            <line x1="-36" y1="-7" x2="-14" y2="7" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <line x1="14" y1="-7" x2="36" y2="7" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          </g>
        )}

        {accessory === 'party_hat' && (
          <g id="acc-party-hat" transform="translate(100, 26)">
            {/* Birthday Party Hat */}
            <path d="M -16 0 L 0 -36 L 16 0 Z" fill="#EC4899" stroke="#9D174D" strokeWidth="3" strokeLinejoin="round" />
            {/* Hat Stripes */}
            <path d="M -7 -16 L 7 -16" stroke="#FDE047" strokeWidth="3.5" />
            <path d="M -12 -5 L 12 -5" stroke="#38BDF8" strokeWidth="3.5" />
            {/* Pom-pom on top */}
            <circle cx="0" cy="-38" r="6" fill="#FACC15" stroke="#9D174D" strokeWidth="2" />
          </g>
        )}

        {accessory === 'flower' && (
          <g id="acc-flower" transform="translate(132, 42)">
            {/* Daisy Flower */}
            <circle cx="-8" cy="0" r="5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="8" cy="0" r="5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="0" cy="-8" r="5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="0" cy="8" r="5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          </g>
        )}

        {accessory === 'pacifier' && (
          <g id="acc-pacifier" transform="translate(100, 96)">
            <circle cx="0" cy="0" r="13" fill="#FBCFE8" stroke={strokeColor} strokeWidth="3.5" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2.5" />
            <path d="M -13 0 A 13 13 0 0 0 13 0" fill="none" stroke={strokeColor} strokeWidth="2.5" opacity="0.35" />
            <path d="M 0 6 C 0 14, 0 16, 0 18" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
