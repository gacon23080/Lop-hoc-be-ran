import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X, Award, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { CuteBabySnake, SnakeMood } from './CuteBabySnake';

const CUTE_QUOTES = [
  'Ưm... Bé Khoai Môn chào cô và các bạn ạ! (✿◠‿◠) 💜',
  'Bé Khoai Môn ngoan ngoãn đang đợi giờ uống sữa ấm nè 🍼✨',
  'Hôm nay bé được cô thưởng 3 hoa bé ngoan đó nha! ⭐',
  'Xoa đầu cưng nựng bé một cái đi mà~ (≧◡≦) ♡',
  'Chiếc ti giả của bé có màu êm dịu giống hệt bụng bé luôn nè 💜',
  'Cô chủ nhiệm dạy chúng mình phải luôn mỉm cười vui vẻ nè 🌸',
  'Bạn có muốn nghe bài hát vui nhộn của lớp bé ngoan hông? 🎵',
  'Bé ngoan là biết vâng lời, không quấy khóc đâu nè~ 🧸'
];

export const CuteSnakeMascot: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isWiggling, setIsWiggling] = useState(false);
  const [snakeMood, setSnakeMood] = useState<SnakeMood>('happy');
  const [reactionText, setReactionText] = useState<string | null>(null);
  const [patsCount, setPatsCount] = useState<number>(() => {
    const saved = localStorage.getItem('snake_mascot_pats_v3');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Cycle cute quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % CUTE_QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const triggerReaction = (text: string, effectType: 'milk' | 'flower' | 'pat') => {
    setIsWiggling(true);
    setReactionText(text);

    if (effectType === 'milk') {
      setSnakeMood('milk');
      sound.playChime('love');
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { x: 0.12, y: 0.85 },
        colors: ['#F3E8FF', '#E9D5FF', '#D8B4E5', 'var(--dominant)', '#FFFFFF'],
        disableForReducedMotion: true
      });
    } else if (effectType === 'flower') {
      setSnakeMood('star');
      sound.playChime('bell');
      confetti({
        particleCount: 40,
        spread: 65,
        origin: { x: 0.12, y: 0.85 },
        colors: ['var(--dominant)', '#D8B4E5', '#E9D5FF', '#FDE047'],
        disableForReducedMotion: true
      });
    } else {
      // Pat head / xoa đầu
      setSnakeMood('loved');
      sound.playChime('pop');
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x: 0.12, y: 0.85 },
        colors: ['var(--dominant)', '#D8B4E5', '#E9D5FF', '#F472B6'],
        disableForReducedMotion: true
      });
      const newCount = patsCount + 1;
      setPatsCount(newCount);
      localStorage.setItem('snake_mascot_pats_v3', newCount.toString());
    }

    setTimeout(() => {
      setIsWiggling(false);
    }, 1400);

    setTimeout(() => {
      setSnakeMood('happy');
    }, 3200);

    setTimeout(() => {
      setReactionText(null);
    }, 4000);
  };

  const handleSnakeClick = () => {
    sound.playChime('pop');
    setQuoteIndex((prev) => (prev + 1) % CUTE_QUOTES.length);
    triggerReaction('Dạ Bé Khoai Môn nghe đây ạ~ Chít chít! 💕💜', 'pat');
  };

  return (
    <aside aria-label="Bé Khoai Môn Mascot" className="fixed bottom-5 left-4 sm:left-6 z-40 flex items-end gap-3 select-none pointer-events-auto">
      {/* Speech Bubble - Pastel Theme */}
      {isOpen && (
        <div className="relative max-w-[250px] sm:max-w-[285px] bg-white/95 rounded-3xl p-3.5 shadow-xl shadow-[var(--dominant)]/20 border-2 border-[var(--dominant)] backdrop-blur-xs animate-bounce-gentle">
          
          {/* Close tiny button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/60 border border-[var(--dominant)] text-[var(--text-main)]/70 hover:text-[var(--text-main)] flex items-center justify-center text-xs shadow-xs cursor-pointer hover:scale-110 transition-all"
            title="Tạm thu nhỏ"
            aria-label="Thu nhỏ Bé Khoai Môn"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Speech header */}
          <div className="flex items-center justify-between gap-1 mb-1.5 pb-1 border-b border-[var(--dominant)]">
            <span className="text-[11px] font-bold text-[var(--text-main)] flex items-center gap-1.5">
              <span className="w-4 h-4 inline-flex items-center justify-center">
                <CuteBabySnake mood="happy" className="w-4 h-4" />
              </span>
              <span>Bé Khoai Môn Lớp Mầm</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--text-main)] border border-[var(--dominant)]">
              Xoa đầu: {patsCount} lần
            </span>
          </div>

          {/* Speech dialogue text */}
          <p className="text-xs text-[var(--text-main)] font-medium leading-relaxed min-h-[38px] flex items-center">
            {reactionText || CUTE_QUOTES[quoteIndex]}
          </p>

          {/* Cute interactive buttons */}
          <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-[var(--dominant)]/70">
            <button
              onClick={() => triggerReaction('Oa oa~ Sữa ấm ngọt thơm quá chít chít! 🍼💜', 'milk')}
              className="flex-1 py-1.5 px-1.5 rounded-xl bg-white/60 hover:bg-[var(--accent)] text-[var(--text-main)] text-[10px] font-bold border border-[var(--dominant)] shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1 hover:scale-105"
              title="Cho bé rắn ti sữa"
            >
              <span>🍼</span>
              <span>Ti sữa</span>
            </button>

            <button
              onClick={() => triggerReaction('Yayyy~ Bé có thêm 1 hoa bé ngoan đính vào nơ rồi nè! ⭐', 'flower')}
              className="flex-1 py-1.5 px-1.5 rounded-xl bg-white/60 hover:bg-[var(--accent)] text-[var(--text-main)] text-[10px] font-bold border border-[var(--dominant)] shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1 hover:scale-105"
              title="Tặng hoa bé ngoan"
            >
              <Award className="w-3 h-3 text-[var(--text-main)]" />
              <span>Hoa ngoan</span>
            </button>

            {/* XOA ĐẦU RẮN - Using cute baby snake illustration */}
            <button
              onClick={() => triggerReaction('Thích quá đi à~ Bạn cưng bé rắn nhất quả đất luôn á! (≧◡≦) ♡', 'pat')}
              className="flex-1 py-1.5 px-1.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--dominant)] text-[var(--text-main)] text-[10px] font-bold border border-[var(--dominant)] shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1 hover:scale-105"
              title="Xoa đầu cưng nựng bé rắn"
            >
              <div className="w-4 h-4 shrink-0">
                <CuteBabySnake mood="loved" className="w-4 h-4" />
              </div>
              <span className="truncate">Xoa đầu</span>
            </button>
          </div>

          {/* Quick link to playground nursery */}
          <button
            onClick={() => {
              sound.playChime('bell');
              document.getElementById('playground-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full mt-2 py-1.5 px-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white text-[10px] font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-102"
          >
            <span>🎡</span>
            <span>Đến Khu Vui Chơi & Chăm Sóc Bé</span>
          </button>

          {/* Pointer Triangle to the mascot */}
          <div className="absolute -bottom-2 left-7 w-3 h-3 bg-white border-b-2 border-r-2 border-[var(--dominant)] transform rotate-45"></div>
        </div>
      )}

      {/* Mascot Animated Character Avatar - Ultra Cute Baby Snake with Big Twinkling Eyes */}
      <div className="relative group">
        <button
          onClick={isOpen ? handleSnakeClick : () => setIsOpen(true)}
          className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-3xl p-1 bg-gradient-to-tr from-[var(--dominant)] via-[#D8B4E5] to-[var(--grad-start)] shadow-xl shadow-[var(--dominant)]/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
            isWiggling ? 'animate-wiggle scale-110' : 'animate-bounce-gentle'
          }`}
          title="Chạm để xoa đầu và trò chuyện với bé rắn nhỏ"
        >
          {/* Baby Snake Cute Vector / Illustration Card */}
          <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF] to-[var(--grad-start)] flex flex-col items-center justify-center overflow-hidden border border-[var(--dominant)] relative p-1">
            
            {/* The Adorable Illustrated Baby Snake SVG */}
            <CuteBabySnake mood={snakeMood} isPatted={snakeMood === 'loved'} className="w-16 h-16 sm:w-18 sm:h-18" />

            {/* Sparkle badge */}
            <div className="absolute top-1 left-1 text-[9px] animate-pulse">
              ✨
            </div>
            {snakeMood === 'loved' && (
              <div className="absolute top-1 right-1 text-xs animate-heart-beat">
                💖
              </div>
            )}
          </div>
        </button>

        {/* Small floating hearts & star effect above mascot */}
        <div className="absolute -top-3 -right-2 text-xs text-pink-400 animate-heart-beat pointer-events-none">
          💖
        </div>
        <div className="absolute -top-4 -left-1 text-xs animate-bounce pointer-events-none">
          ⭐
        </div>

        {!isOpen && (
          <div className="absolute -top-7 left-0 px-2.5 py-0.5 rounded-full bg-[var(--accent)] text-[var(--text-main)] text-[10px] font-bold shadow-md border border-[var(--dominant)] whitespace-nowrap animate-bounce flex items-center gap-1">
            <span className="w-3.5 h-3.5 inline-block">
              <CuteBabySnake mood="happy" className="w-3.5 h-3.5" />
            </span>
            <span>Bé ở đây nè!</span>
            <Sparkles className="w-2.5 h-2.5 text-[var(--text-main)]" />
          </div>
        )}
      </div>
    </aside>
  );
};

