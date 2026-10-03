import React, { useState, useEffect } from 'react';
import { Sparkles, X, Shuffle, Heart, Music, Eye, Gift, Star, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Character } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../utils/audio';

interface RandomHusbandModalProps {
  isOpen: boolean;
  characters: Character[];
  onClose: () => void;
  onSelectCharacter: (char: Character) => void;
  onPlayMusic: (char: Character) => void;
}

export const RandomHusbandModal: React.FC<RandomHusbandModalProps> = ({
  isOpen,
  characters,
  onClose,
  onSelectCharacter,
  onPlayMusic,
}) => {
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [pickedCharacter, setPickedCharacter] = useState<Character | null>(null);
  const [loveScore, setLoveScore] = useState<number>(99);

  // Trigger draw logic
  const handleDraw = () => {
    if (characters.length === 0) return;
    setIsRolling(true);
    sound.playChime('toy');

    // Simulate gacha roll suspense for 1.2s
    let rollCounter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setPickedCharacter(characters[randomIndex]);
      rollCounter++;
      if (rollCounter > 10) {
        clearInterval(interval);
        // Final pick
        const finalPick = characters[Math.floor(Math.random() * characters.length)];
        setPickedCharacter(finalPick);
        setLoveScore(Math.floor(Math.random() * 11) + 90); // 90% - 100%
        setIsRolling(false);
        sound.playChime('levelUp');

        try {
          confetti({
            particleCount: 75,
            spread: 90,
            origin: { y: 0.55 },
            colors: ['#dcd1ff', '#F5D5E0', '#ffc6ff', '#bdb2ff', '#ffdfba']
          });
        } catch {
          // Fallback
        }
      }
    }, 110);
  };

  useEffect(() => {
    if (isOpen && characters.length > 0 && !pickedCharacter) {
      handleDraw();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-3 border-[var(--dominant)] overflow-hidden text-center">
        
        {/* Cute top gradient stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playChime('pop');
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent)] text-[var(--text-main)] text-xs font-bold mb-3 border border-[var(--dominant)] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Vòng Quay May Mắn Bé Rắn</span>
          <span>🎲</span>
        </div>

        <h3 className="font-['Comfortaa'] font-extrabold text-2xl sm:text-3xl text-[var(--text-main)] mb-1">
          Bốc Thăm Bé Chồng Định Mệnh
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-5">
          Khám phá xem hôm nay duyên số sẽ đưa bé rắn nào về bên bạn nhé!
        </p>

        {/* Rolling / Result Display */}
        {characters.length === 0 ? (
          <div className="p-8 bg-purple-50 rounded-2xl border border-purple-200">
            <p className="text-sm font-semibold text-purple-700">Chưa có bé rắn nào trong danh sách lớp!</p>
          </div>
        ) : (
          <div className="relative bg-gradient-to-b from-purple-50/70 to-pink-50/40 rounded-3xl p-5 border-2 border-[var(--dominant)]/70 shadow-inner mb-6">
            {isRolling ? (
              <div className="py-10 flex flex-col items-center justify-center animate-soft-pulse">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center text-4xl shadow-lg mb-3 animate-spin">
                  🎲
                </div>
                <p className="font-['Comfortaa'] font-bold text-lg text-purple-900 animate-bounce">
                  Đang bốc thăm bé chồng...
                </p>
                <p className="text-xs text-purple-600 mt-1">Đợi một chút xíu nha moah moah~</p>
              </div>
            ) : pickedCharacter ? (
              <div>
                {/* Crown / Match score */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">👑</span>
                  <span className="text-xs font-extrabold text-pink-600 bg-white px-3 py-1 rounded-full shadow-xs border border-pink-200">
                    Độ Hợp Nhau: {loveScore}% 💖
                  </span>
                </div>

                {/* Character Picture Seated at Desk Frame */}
                <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-tr from-purple-400 via-pink-400 to-amber-300 shadow-xl shadow-purple-300/40 mb-3 transform hover:scale-105 transition-transform overflow-hidden">
                  <CharacterAvatar
                    avatarUrl={pickedCharacter.avatarUrl}
                    name={pickedCharacter.name}
                    className="w-full h-full rounded-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-purple-200 text-base">
                    🐍
                  </div>
                  {pickedCharacter.tags?.some(t => /18\+|r18|nsfw/i.test(t)) && (
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black shadow-xs">
                      18+
                    </div>
                  )}
                </div>

                {/* Name & Title */}
                <h4 className="font-['Comfortaa'] font-extrabold text-2xl text-[var(--text-main)] mb-0.5">
                  {pickedCharacter.name}
                </h4>
                <p className="text-xs font-bold text-purple-700 mb-2">
                  {pickedCharacter.nickname} &bull; {pickedCharacter.title}
                </p>

                {/* Quote / Bio */}
                <div className="bg-white/80 p-3 rounded-2xl border border-[var(--dominant)]/40 text-xs text-[var(--text-main)]/90 italic leading-relaxed mb-3">
                  &ldquo;{pickedCharacter.personality || 'Ngoan ngoãn, đáng yêu, chuẩn bé chồng quốc dân của lớp mầm non!'}&rdquo;
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {pickedCharacter.tags?.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-purple-800 border border-purple-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleDraw}
            disabled={isRolling}
            className="flex-1 py-3 px-4 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>Bốc Thăm Lại</span>
          </button>

          {pickedCharacter && !isRolling && (
            <>
              {pickedCharacter.youtubeMusicUrl && (
                <button
                  onClick={() => {
                    sound.playChime('bell');
                    onPlayMusic(pickedCharacter);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Music className="w-4 h-4" />
                  <span>Bật Nhạc Bé</span>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playChime('pop');
                  onSelectCharacter(pickedCharacter);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] hover:brightness-105 text-[var(--text-main)] font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Xem Hồ Sơ</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
