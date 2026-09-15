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
  primaryColor = '#D8B4E5',
  secondaryColor = '#F3E8FF',
  strokeColor = '#581C87',
  mood = 'happy',
  accessory = 'none',
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

        {accessory === 'bunny_ears' && (
          <g id="acc-bunny-ears">
            {/* Band */}
            <path d="M 75 35 Q 100 15 125 35" fill="none" stroke="#FBCFE8" strokeWidth="5" strokeLinecap="round" />
            {/* Left Ear */}
            <path d="M 85 22 C 70 -10, 85 -20, 95 0 C 97 10, 95 18, 85 22 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
            <path d="M 86 16 C 76 -5, 84 -10, 91 0 Z" fill="#FBCFE8" />
            {/* Right Ear */}
            <path d="M 115 22 C 130 -10, 115 -20, 105 0 C 103 10, 105 18, 115 22 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
            <path d="M 114 16 C 124 -5, 116 -10, 109 0 Z" fill="#FBCFE8" />
          </g>
        )}

        {accessory === 'strawberry_pin' && (
          <g id="acc-strawberry-pin">
            <path d="M 125 35 Q 130 25, 135 30" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            <path d="M 135 26 C 145 26, 142 42, 135 42 C 128 42, 125 26, 135 26 Z" fill="#EF4444" stroke={strokeColor} strokeWidth="1.5" />
            {/* Seeds */}
            <circle cx="132" cy="32" r="0.8" fill="#FEF08A" />
            <circle cx="138" cy="34" r="0.8" fill="#FEF08A" />
            <circle cx="135" cy="38" r="0.8" fill="#FEF08A" />
            {/* Leaves */}
            <path d="M 132 26 C 132 20, 135 22, 135 26 C 135 22, 138 20, 138 26 Z" fill="#22C55E" />
          </g>
        )}

        {accessory === 'beanie' && (
          <g id="acc-beanie">
            {/* Beanie Body */}
            <path d="M 70 35 C 70 5, 130 5, 130 35 C 130 45, 70 45, 70 35 Z" fill="#3B82F6" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
            {/* Brim */}
            <path d="M 65 35 C 65 42, 135 42, 135 35" fill="none" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" />
            {/* Pom Pom */}
            <circle cx="100" cy="5" r="9" fill="#93C5FD" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        )}

        {accessory === 'star_clip' && (
          <g id="acc-star-clip">
            <path d="M 65 35 Q 70 25, 75 30" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            {/* Star */}
            <path d="M 75 22 L 78 28 L 84 28 L 79 32 L 81 38 L 75 34 L 69 38 L 71 32 L 66 28 L 72 28 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" />
          </g>
        )}

        {accessory === 'wizard_hat' && (
          <g id="acc-wizard-hat">
            {/* Back Brim */}
            <path d="M 60 40 Q 100 20 140 40" fill="none" stroke="#312E81" strokeWidth="12" strokeLinecap="round" />
            {/* Hat Cone */}
            <path d="M 65 35 Q 90 20 100 -20 Q 110 20 135 35 Z" fill="#4338CA" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
            {/* Hat Fold */}
            <path d="M 100 -20 Q 115 -10 105 10" fill="none" stroke="#312E81" strokeWidth="2" />
            {/* Stars */}
            <path d="M 95 0 L 97 4 L 102 4 L 98 7 L 100 11 L 95 9 L 90 11 L 92 7 L 88 4 L 93 4 Z" fill="#FACC15" />
            <path d="M 115 15 L 117 18 L 120 18 L 118 20 L 119 23 L 115 21 L 111 23 L 112 20 L 110 18 L 113 18 Z" fill="#FACC15" transform="scale(0.7) translate(40, 5)" />
            {/* Front Brim */}
            <path d="M 55 42 Q 100 55 145 42" fill="none" stroke="#3730A3" strokeWidth="10" strokeLinecap="round" />
          </g>
        )}

        {accessory === 'propeller_hat' && (
          <g id="acc-propeller-hat">
            {/* Hat Body */}
            <path d="M 75 30 C 75 10, 125 10, 125 30 Z" fill="#EF4444" stroke={strokeColor} strokeWidth="2" />
            <path d="M 70 30 Q 100 40 130 30" fill="none" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
            {/* Propeller base */}
            <path d="M 100 10 L 100 0" stroke={strokeColor} strokeWidth="3" />
            <circle cx="100" cy="0" r="3" fill="#F59E0B" />
            {/* Blades */}
            <path d="M 75 -5 Q 100 5 125 -5 Q 100 -15 75 -5 Z" fill="#10B981" opacity="0.9" stroke={strokeColor} strokeWidth="1" />
          </g>
        )}

        {accessory === 'headphone' && (
          <g id="acc-headphone">
            {/* Headband */}
            <path d="M 60 70 C 50 10, 150 10, 140 70" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
            {/* Left Earpad */}
            <ellipse cx="55" cy="75" rx="12" ry="18" fill="#F8FAFC" stroke="#475569" strokeWidth="3" />
            <ellipse cx="50" cy="75" rx="5" ry="12" fill="#CBD5E1" />
            {/* Right Earpad */}
            <ellipse cx="145" cy="75" rx="12" ry="18" fill="#F8FAFC" stroke="#475569" strokeWidth="3" />
            <ellipse cx="150" cy="75" rx="5" ry="12" fill="#CBD5E1" />
          </g>
        )}

        {accessory === 'flower_crown' && (
          <g id="acc-flower-crown">
            {/* Base vine */}
            <path d="M 65 35 Q 100 50 135 35" fill="none" stroke="#22C55E" strokeWidth="3" />
            <path d="M 70 32 Q 100 40 130 32" fill="none" stroke="#4ADE80" strokeWidth="2" />
            
            {/* Flowers */}
            <g transform="translate(65, 33)">
              <circle cx="0" cy="0" r="5" fill="#F472B6" />
              <circle cx="0" cy="0" r="2" fill="#FEF08A" />
            </g>
            <g transform="translate(85, 41) scale(1.2)">
              <circle cx="0" cy="0" r="5" fill="#A78BFA" />
              <circle cx="0" cy="0" r="2" fill="#FEF08A" />
            </g>
            <g transform="translate(105, 43)">
              <circle cx="0" cy="0" r="5" fill="#60A5FA" />
              <circle cx="0" cy="0" r="2" fill="#FEF08A" />
            </g>
            <g transform="translate(125, 37) scale(1.1)">
              <circle cx="0" cy="0" r="5" fill="#F472B6" />
              <circle cx="0" cy="0" r="2" fill="#FEF08A" />
            </g>
            <g transform="translate(140, 31) scale(0.8)">
              <circle cx="0" cy="0" r="5" fill="#FCD34D" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {accessory === 'kindergarten_hat' && (
          <g id="acc-kindergarten-hat">
            {/* Neck flap protector at back */}
            <path d="M 72 36 C 68 54, 82 58, 100 58 C 118 58, 132 54, 128 36" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
            {/* Hat dome */}
            <path d="M 68 34 C 68 12, 132 12, 132 34 Z" fill="#FBBF24" stroke={strokeColor} strokeWidth="2.5" />
            {/* Blue ribbon band */}
            <path d="M 67 33 Q 100 42 133 33" fill="none" stroke="#2563EB" strokeWidth="4.5" />
            {/* Hat brim */}
            <ellipse cx="100" cy="36" rx="36" ry="7" fill="#FDE047" stroke={strokeColor} strokeWidth="2" />
            {/* Front Kindergarten Badge */}
            <circle cx="100" cy="22" r="4.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
            <path d="M 100 19 L 100 25 M 97 22 L 103 22" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {accessory === 'cat_ears' && (
          <g id="acc-cat-ears">
            {/* Headband */}
            <path d="M 72 36 Q 100 16 128 36" fill="none" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
            {/* Left Cat Ear */}
            <path d="M 68 36 L 62 10 L 84 26 Z" fill="#F472B6" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
            <path d="M 68 32 L 64 16 L 80 25 Z" fill="#FCE7F3" />
            {/* Right Cat Ear */}
            <path d="M 132 36 L 138 10 L 116 26 Z" fill="#F472B6" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
            <path d="M 132 32 L 136 16 L 120 25 Z" fill="#FCE7F3" />
            {/* Tiny pink bow */}
            <circle cx="68" cy="30" r="3" fill="#EC4899" />
          </g>
        )}

        {accessory === 'frog_hat' && (
          <g id="acc-frog-hat">
            {/* Frog Hat Dome */}
            <path d="M 66 38 C 66 14, 134 14, 134 38 Z" fill="#4ADE80" stroke={strokeColor} strokeWidth="2.5" />
            {/* Brim curve */}
            <path d="M 62 38 Q 100 48 138 38" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            {/* Left Frog Eye */}
            <circle cx="76" cy="15" r="10" fill="#4ADE80" stroke={strokeColor} strokeWidth="2" />
            <circle cx="76" cy="15" r="6.5" fill="#FFFFFF" />
            <circle cx="77" cy="15" r="3.5" fill="#1E293B" />
            <circle cx="75" cy="13" r="1.5" fill="#FFFFFF" />
            {/* Right Frog Eye */}
            <circle cx="124" cy="15" r="10" fill="#4ADE80" stroke={strokeColor} strokeWidth="2" />
            <circle cx="124" cy="15" r="6.5" fill="#FFFFFF" />
            <circle cx="123" cy="15" r="3.5" fill="#1E293B" />
            <circle cx="125" cy="13" r="1.5" fill="#FFFFFF" />
            {/* Rosy Cheeks */}
            <circle cx="80" cy="30" r="3.5" fill="#F87171" opacity="0.7" />
            <circle cx="120" cy="30" r="3.5" fill="#F87171" opacity="0.7" />
          </g>
        )}

        {accessory === 'round_glasses' && (
          <g id="acc-round-glasses">
            {/* Glasses frame - Left lens */}
            <circle cx="74" cy="86" r="15" fill="rgba(255,255,255,0.2)" stroke="#D97706" strokeWidth="3" />
            <path d="M 67 78 Q 76 75 81 81" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
            {/* Right lens */}
            <circle cx="126" cy="86" r="15" fill="rgba(255,255,255,0.2)" stroke="#D97706" strokeWidth="3" />
            <path d="M 119 78 Q 128 75 133 81" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
            {/* Bridge */}
            <path d="M 89 86 Q 100 80 111 86" stroke="#D97706" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Left ear piece */}
            <path d="M 59 86 L 44 80" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right ear piece */}
            <path d="M 141 86 L 156 80" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {accessory === 'apple_clip' && (
          <g id="acc-apple-clip">
            {/* Clip pin */}
            <path d="M 120 40 Q 130 30 142 36" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            {/* Apple */}
            <path d="M 134 26 C 143 24, 148 34, 143 42 C 139 46, 136 45, 134 44 C 132 45, 129 46, 125 42 C 120 34, 125 24, 134 26 Z" fill="#EF4444" stroke={strokeColor} strokeWidth="1.5" />
            {/* Stem & Leaf */}
            <path d="M 134 26 Q 132 18 129 17" fill="none" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M 134 25 Q 140 20 142 22 Q 138 27 134 25 Z" fill="#22C55E" />
            <ellipse cx="128" cy="32" rx="2" ry="3.5" transform="rotate(-20 128 32)" fill="#FFFFFF" opacity="0.5" />
          </g>
        )}

        {accessory === 'angel_halo' && (
          <g id="acc-angel-halo">
            {/* Halo floating ring */}
            <ellipse cx="100" cy="8" rx="28" ry="7" fill="none" stroke="#FDE047" strokeWidth="4.5" />
            <ellipse cx="100" cy="8" rx="28" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
            {/* Star Sparkle Left */}
            <path d="M 68 2 L 70 6 L 74 7 L 70 8 L 69 12 L 67 8 L 63 7 L 67 6 Z" fill="#FDE047" />
            {/* Star Sparkle Right */}
            <path d="M 130 3 L 132 7 L 136 8 L 132 9 L 131 13 L 129 9 L 125 8 L 129 7 Z" fill="#FDE047" />
          </g>
        )}

        {accessory === 'minnie_bow' && (
          <g id="acc-minnie-bow" transform="translate(100, 24)">
            {/* Minnie Red Polka Dot Big Bow */}
            <path d="M 0 0 L -26 -16 C -32 -4, -28 8, -24 14 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 0 0 L 26 -16 C 32 -4, 28 8, 24 14 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" strokeLinejoin="round" />
            {/* Polka dots left */}
            <circle cx="-16" cy="-8" r="2.5" fill="#FFFFFF" />
            <circle cx="-10" cy="-2" r="2" fill="#FFFFFF" />
            <circle cx="-20" cy="4" r="2.5" fill="#FFFFFF" />
            {/* Polka dots right */}
            <circle cx="16" cy="-8" r="2.5" fill="#FFFFFF" />
            <circle cx="10" cy="-2" r="2" fill="#FFFFFF" />
            <circle cx="20" cy="4" r="2.5" fill="#FFFFFF" />
            {/* Center knot */}
            <circle cx="0" cy="0" r="8" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3" />
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
          </g>
        )}

        {accessory === 'grad_cap' && (
          <g id="acc-grad-cap">
            {/* Graduation Skull Cap Under */}
            <path d="M 80 34 C 80 24, 120 24, 120 34 Z" fill="#1E1B4B" stroke={strokeColor} strokeWidth="2" />
            {/* Diamond Board Top */}
            <polygon points="100,8 142,22 100,32 58,22" fill="#312E81" stroke="#1E1B4B" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="100,10 138,22 100,30 62,22" fill="#4338CA" />
            {/* Center Button */}
            <circle cx="100" cy="21" r="3" fill="#FBBF24" />
            {/* Tassel */}
            <path d="M 100 21 Q 124 23 128 36" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
            <rect x="125" y="36" width="6" height="12" rx="2" fill="#F59E0B" />
          </g>
        )}

        {accessory === 'panda_ears' && (
          <g id="acc-panda-ears">
            {/* Headband */}
            <path d="M 72 36 Q 100 16 128 36" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
            {/* Left Panda Ear */}
            <circle cx="68" cy="18" r="14" fill="#0F172A" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="68" cy="18" r="7" fill="#475569" />
            {/* Right Panda Ear */}
            <circle cx="132" cy="18" r="14" fill="#0F172A" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="132" cy="18" r="7" fill="#475569" />
          </g>
        )}

        {accessory === 'fried_egg' && (
          <g id="acc-fried-egg" transform="translate(130, 32)">
            {/* Pin clip */}
            <path d="M -15 10 Q 0 0 15 5" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            {/* Egg White */}
            <path d="M 0 -12 C 12 -14, 18 -4, 16 6 C 14 14, 4 16, -6 14 C -14 12, -18 2, -14 -6 C -12 -12, -6 -11, 0 -12 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Yolk */}
            <circle cx="0" cy="0" r="7.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="-2" cy="-2" r="2.5" fill="#FEF08A" opacity="0.9" />
          </g>
        )}

        {accessory === 'carrot_clip' && (
          <g id="acc-carrot-clip" transform="translate(132, 32) rotate(25)">
            {/* Pin */}
            <path d="M -8 10 L 10 10" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M 0 -10 C -4 -16, -8 -14, -4 -8" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 0 -10 C 0 -18, 2 -18, 0 -8" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 0 -10 C 4 -16, 8 -14, 4 -8" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Carrot body */}
            <polygon points="-7,-10 7,-10 0,16" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Texture marks */}
            <line x1="-3" y1="-4" x2="1" y2="-4" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="2" x2="3" y2="2" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-2" y1="8" x2="1" y2="8" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {accessory === 'mushroom_hat' && (
          <g id="acc-mushroom-hat">
            {/* Mushroom Underside */}
            <ellipse cx="100" cy="38" rx="38" ry="7" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
            {/* Mushroom Cap Dome */}
            <path d="M 62 38 C 60 4, 140 4, 138 38 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="3" strokeLinejoin="round" />
            {/* White Dots */}
            <circle cx="100" cy="18" r="7" fill="#FFFFFF" />
            <circle cx="78" cy="26" r="5.5" fill="#FFFFFF" />
            <circle cx="122" cy="26" r="5.5" fill="#FFFFFF" />
            <circle cx="94" cy="32" r="3.5" fill="#FFFFFF" />
            <circle cx="112" cy="32" r="3" fill="#FFFFFF" />
          </g>
        )}

        {accessory === 'unicorn_horn' && (
          <g id="acc-unicorn-horn">
            {/* Magical Flower Base */}
            <circle cx="88" cy="32" r="4.5" fill="#F472B6" />
            <circle cx="100" cy="34" r="5.5" fill="#60A5FA" />
            <circle cx="112" cy="32" r="4.5" fill="#C084FC" />
            {/* Horn Body */}
            <polygon points="93,30 107,30 100,-8" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" strokeLinejoin="round" />
            {/* Spiral Bands */}
            <path d="M 94 24 Q 100 20 106 24" fill="none" stroke="#F59E0B" strokeWidth="2" />
            <path d="M 96 14 Q 100 10 104 14" fill="none" stroke="#F59E0B" strokeWidth="2" />
            <path d="M 98 4 Q 100 2 102 4" fill="none" stroke="#F59E0B" strokeWidth="2" />
            {/* Magic Glow Sparkles */}
            <path d="M 100 -14 L 101 -9 L 106 -8 L 101 -7 L 100 -2 L 99 -7 L 94 -8 L 99 -9 Z" fill="#FACC15" />
          </g>
        )}

        {accessory === 'pirate_hat' && (
          <g id="acc-pirate-hat">
            {/* Back rim */}
            <path d="M 52 38 Q 100 56 148 38" fill="none" stroke="#0F172A" strokeWidth="8" strokeLinecap="round" />
            {/* Tricorn Body */}
            <path d="M 56 36 C 50 16, 90 6, 100 6 C 110 6, 150 16, 144 36 C 126 30, 74 30, 56 36 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            {/* Golden Trim on edge */}
            <path d="M 58 34 C 54 18, 90 8, 100 8 C 110 8, 146 18, 142 34" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
            {/* Jolly Roger Skull Symbol */}
            <circle cx="100" cy="20" r="4.5" fill="#FFFFFF" />
            <circle cx="98.5" cy="19.5" r="1.2" fill="#0F172A" />
            <circle cx="101.5" cy="19.5" r="1.2" fill="#0F172A" />
            <path d="M 97 26 L 103 26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            {/* Crossed Bones */}
            <path d="M 95 24 L 105 28 M 105 24 L 95 28" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}

        {accessory === 'sakura_pin' && (
          <g id="acc-sakura-pin" transform="translate(132, 34)">
            {/* Pin */}
            <path d="M -12 10 Q -2 4 12 8" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            {/* 5 Sakura Petals */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <path d="M 0 0 C -4 -7, -2 -14, 0 -13 C 2 -14, 4 -7, 0 0 Z" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1" />
                <path d="M -1 -12 L 0 -10 L 1 -12" fill="#FFFFFF" />
              </g>
            ))}
            {/* Center pistil */}
            <circle cx="0" cy="0" r="3.5" fill="#F472B6" />
            <circle cx="0" cy="0" r="1.8" fill="#FDE047" />
          </g>
        )}

        {accessory === 'cupcake_hat' && (
          <g id="acc-cupcake-hat" transform="translate(100, 26)">
            {/* Wrapper Base */}
            <polygon points="-14,10 14,10 10,22 -10,22" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            <line x1="-6" y1="10" x2="-4" y2="22" stroke="#0284C7" strokeWidth="1" />
            <line x1="0" y1="10" x2="0" y2="22" stroke="#0284C7" strokeWidth="1" />
            <line x1="6" y1="10" x2="4" y2="22" stroke="#0284C7" strokeWidth="1" />
            {/* Cream Swirls */}
            <path d="M -16 10 C -18 2, -10 0, -6 6 C -2 -2, 6 -2, 8 6 C 14 2, 18 4, 16 10 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.5" />
            <path d="M -10 4 C -8 -4, 8 -4, 10 4 Z" fill="#F472B6" />
            {/* Sprinkles */}
            <circle cx="-6" cy="4" r="1" fill="#FACC15" />
            <circle cx="4" cy="2" r="1" fill="#4ADE80" />
            <circle cx="0" cy="6" r="1" fill="#60A5FA" />
            {/* Cherry on Top */}
            <circle cx="0" cy="-3" r="3.8" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
            <path d="M 1 -6 Q 6 -12 8 -8" fill="none" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
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
