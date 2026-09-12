import React, { useState } from 'react';
import { Music, X, ExternalLink, Volume2, Sparkles, Disc3, Minimize2, Maximize2 } from 'lucide-react';
import { Character } from '../types';
import { sound } from '../utils/audio';

interface YouTubeMusicPlayerProps {
  activeCharacter: Character | null;
  onClose: () => void;
}

export const YouTubeMusicPlayer: React.FC<YouTubeMusicPlayerProps> = ({
  activeCharacter,
  onClose
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!activeCharacter || !activeCharacter.youtubeMusicUrl) {
    return null;
  }

  // Extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    } catch {
      return null;
    }
  };

  const videoId = getYouTubeId(activeCharacter.youtubeMusicUrl);

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized
          ? 'bottom-4 right-4'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[360px]'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[var(--dominant)] shadow-2xl p-3 sm:p-4 relative overflow-hidden">
        
        {/* Cute pastel rainbow top line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--dominant)] via-[var(--accent)] to-[var(--accent)]" />

        {isMinimized ? (
          /* Minimized State */
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--dominant)] to-[var(--accent)] flex items-center justify-center text-[var(--text-main)] shadow-xs animate-spin" style={{ animationDuration: '6s' }}>
              <Disc3 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-xs font-bold text-[var(--text-main)] truncate">{activeCharacter.name}</p>
              <p className="text-[10px] text-[var(--text-main)] font-semibold flex items-center gap-1">
                <Music className="w-2.5 h-2.5 animate-bounce" /> Đang phát nhạc
              </p>
            </div>
            <button
              onClick={() => { sound.playChime('pop'); setIsMinimized(false); }}
              className="p-1.5 rounded-xl hover:bg-[var(--accent)]/40 text-[var(--text-main)]/70 cursor-pointer"
              title="Phóng to"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => { sound.playChime('pop'); onClose(); }}
              className="p-1.5 rounded-xl hover:bg-red-50 text-red-400 cursor-pointer"
              title="Tắt nhạc"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Expanded Player */
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[var(--dominant)]/30">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-[var(--accent)] flex items-center justify-center text-[var(--text-main)] shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[var(--text-main)] truncate flex items-center gap-1 font-['Comfortaa']">
                    Máy Nhạc Bé Ngoan
                    <Sparkles className="w-3 h-3 text-[var(--text-main)]" />
                  </h4>
                  <p className="text-[10px] text-[var(--text-main)]/70 truncate">
                    Giai điệu của: <span className="font-bold text-[var(--text-main)]">{activeCharacter.name}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={activeCharacter.youtubeMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-xl text-[var(--text-main)]/60 hover:bg-[var(--accent)]/40 hover:text-[var(--text-main)] cursor-pointer"
                  title="Mở trên YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-xl text-[var(--text-main)]/60 hover:bg-[var(--accent)]/40 hover:text-[var(--text-main)] cursor-pointer"
                  title="Thu nhỏ"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { sound.playChime('pop'); onClose(); }}
                  className="p-1.5 rounded-xl text-red-400 hover:bg-red-50 cursor-pointer"
                  title="Đóng máy nhạc"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Player or Fallback */}
            {videoId ? (
              <div className="rounded-2xl overflow-hidden aspect-video bg-black/5 shadow-inner border border-[var(--dominant)]/40">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`Giai điệu của ${activeCharacter.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[var(--grad-end)] text-center border border-[var(--dominant)]/30">
                <p className="text-xs text-[var(--text-main)]/80 mb-2 font-medium">
                  Đang mở liên kết bài hát của bé...
                </p>
                <a
                  href={activeCharacter.youtubeMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--dominant)] text-[var(--text-main)] text-xs font-bold shadow-xs hover:scale-105 transition-all"
                >
                  <span>Mở YouTube Nghe Nhạc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Cute bottom tip */}
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-[var(--text-main)]/60">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-[var(--text-main)]" /> Nhạc mầm non chữa lành
              </span>
              <span>Lớp Mầm Non Rắn Con 🐍</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
