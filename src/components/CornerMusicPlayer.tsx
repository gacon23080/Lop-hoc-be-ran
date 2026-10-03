import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3, RotateCcw } from 'lucide-react';
import { Character } from '../types';
import { sound } from '../utils/audio';

interface CornerMusicPlayerProps {
  activeCharacter: Character | null;
  onStopCharacterMusic: () => void;
  onPlayCharacterMusic: (char: Character) => void;
}

export const CornerMusicPlayer: React.FC<CornerMusicPlayerProps> = ({
  activeCharacter,
  onStopCharacterMusic,
}) => {
  // Web Background Music: "Đến đây bên anh" (https://youtu.be/3Ozo7tejr00)
  const WEB_BG_VIDEO_ID = '3Ozo7tejr00';
  const WEB_BG_TITLE = 'Đến Đây Bên Anh';

  // Music playing state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isUserTurnedOff, setIsUserTurnedOff] = useState<boolean>(false);

  const webIframeRef = useRef<HTMLIFrameElement | null>(null);
  const charIframeRef = useRef<HTMLIFrameElement | null>(null);

  // Helper: send YouTube command via postMessage
  const sendCommand = (iframe: HTMLIFrameElement | null, func: string, args: any = '') => {
    try {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func,
            args: args ? [args] : ''
          }),
          '*'
        );
      }
    } catch {
      // Ignored
    }
  };

  // Extract YouTube ID helper
  const getYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    } catch {
      return null;
    }
  };

  const characterVideoId = activeCharacter ? getYouTubeId(activeCharacter.youtubeMusicUrl) : null;
  const isPlayingCharacter = Boolean(activeCharacter && characterVideoId);

  // Turn ON music
  const startPlaying = () => {
    setIsPlaying(true);
    setIsUserTurnedOff(false);

    if (isPlayingCharacter) {
      sendCommand(webIframeRef.current, 'pauseVideo');
      sendCommand(charIframeRef.current, 'unMute');
      sendCommand(charIframeRef.current, 'setVolume', 100);
      sendCommand(charIframeRef.current, 'playVideo');
    } else {
      sendCommand(charIframeRef.current, 'pauseVideo');
      sendCommand(webIframeRef.current, 'unMute');
      sendCommand(webIframeRef.current, 'setVolume', 100);
      sendCommand(webIframeRef.current, 'playVideo');
    }
  };

  // Turn OFF music (user manually toggles off)
  const stopPlaying = () => {
    setIsPlaying(false);
    setIsUserTurnedOff(true);
    sendCommand(webIframeRef.current, 'pauseVideo');
    sendCommand(charIframeRef.current, 'pauseVideo');
  };

  // Toggle Music On / Off
  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime('pop');
    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying();
    }
  };

  // Initial autoplay & unblock on user gesture (only if user hasn't explicitly turned it off)
  useEffect(() => {
    const handleGesture = () => {
      if (!isUserTurnedOff) {
        startPlaying();
      }
    };

    window.addEventListener('click', handleGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
    window.addEventListener('pointerdown', handleGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleGesture, { once: true, passive: true });

    // Initial play attempt after mount
    const timer = setTimeout(() => {
      if (!isUserTurnedOff) {
        sendCommand(webIframeRef.current, 'unMute');
        sendCommand(webIframeRef.current, 'playVideo');
      }
    }, 1000);

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      clearTimeout(timer);
    };
  }, [isUserTurnedOff, isPlayingCharacter]);

  // When activeCharacter changes:
  useEffect(() => {
    if (activeCharacter && characterVideoId) {
      // Pause web music, start character music
      sendCommand(webIframeRef.current, 'pauseVideo');
      setIsPlaying(true);
      setIsUserTurnedOff(false);

      setTimeout(() => {
        sendCommand(charIframeRef.current, 'unMute');
        sendCommand(charIframeRef.current, 'setVolume', 100);
        sendCommand(charIframeRef.current, 'playVideo');
      }, 300);
    } else if (!activeCharacter && !isUserTurnedOff) {
      // Resume web background music
      sendCommand(charIframeRef.current, 'pauseVideo');
      setIsPlaying(true);

      setTimeout(() => {
        sendCommand(webIframeRef.current, 'unMute');
        sendCommand(webIframeRef.current, 'setVolume', 100);
        sendCommand(webIframeRef.current, 'playVideo');
      }, 300);
    }
  }, [activeCharacter, characterVideoId]);

  // Return to web background music
  const handleBackToWebMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime('bell');
    onStopCharacterMusic();
    sendCommand(charIframeRef.current, 'pauseVideo');
    setIsPlaying(true);
    setIsUserTurnedOff(false);

    setTimeout(() => {
      sendCommand(webIframeRef.current, 'unMute');
      sendCommand(webIframeRef.current, 'playVideo');
    }, 200);
  };

  const currentTitle = isPlayingCharacter ? `Nhạc: ${activeCharacter?.name}` : WEB_BG_TITLE;

  return (
    <>
      {/* 1. HIDDEN AUDIO IFRAMES (Off-screen / inside viewport behind pill) */}
      <div 
        className="fixed bottom-2 right-2 w-4 h-4 pointer-events-none opacity-[0.01] overflow-hidden select-none -z-10" 
        aria-hidden="true"
      >
        {/* Web Background Music Iframe */}
        <iframe
          ref={webIframeRef}
          key="web-bg-music-player"
          width="64"
          height="64"
          src={`https://www.youtube.com/embed/${WEB_BG_VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${WEB_BG_VIDEO_ID}&playsinline=1&controls=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
          title="Nhạc Nền Đến Đây Bên Anh"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          tabIndex={-1}
          onLoad={() => {
            if (!isUserTurnedOff) {
              sendCommand(webIframeRef.current, 'unMute');
              sendCommand(webIframeRef.current, 'playVideo');
            }
          }}
        />

        {/* Character Music Iframe */}
        {characterVideoId && (
          <iframe
            ref={charIframeRef}
            key={`char-music-${activeCharacter?.id}-${characterVideoId}`}
            width="64"
            height="64"
            src={`https://www.youtube.com/embed/${characterVideoId}?enablejsapi=1&autoplay=1&playsinline=1&controls=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            title={`Giai điệu của ${activeCharacter?.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
            onLoad={() => {
              if (isPlaying && isPlayingCharacter) {
                sendCommand(charIframeRef.current, 'unMute');
                sendCommand(charIframeRef.current, 'playVideo');
              }
            }}
          />
        )}
      </div>

      {/* 2. ULTRA-COMPACT CORNER MUSIC WIDGET (Chỉ phát ở góc nhỏ, gọn gàng, có nút tắt nhạc) */}
      <div className="fixed bottom-4 right-4 z-40 select-none">
        <div
          className={`flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[var(--dominant)] shadow-lg shadow-purple-900/10 transition-all duration-300 hover:shadow-xl ${
            isPlaying ? 'ring-2 ring-purple-300/60' : 'opacity-80 hover:opacity-100 bg-gray-50/95'
          }`}
          title={isPlaying ? 'Nhạc đang phát - Bấm nút để tắt nhạc' : 'Nhạc đang tắt - Bấm nút để bật nhạc'}
        >
          {/* Mini Spinning Vinyl Disc */}
          <div className="relative shrink-0">
            <div
              className={`w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-indigo-400 flex items-center justify-center text-white shadow-xs ${
                isPlaying ? 'animate-spin' : 'grayscale opacity-60'
              }`}
              style={{ animationDuration: '4s' }}
            >
              <Disc3 className="w-4 h-4" />
            </div>
            {/* Center mini dot */}
            <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white flex items-center justify-center text-[5px]">
              {isPlaying ? '🌸' : '•'}
            </div>
          </div>

          {/* Compact Song Info */}
          <div className="min-w-0 max-w-[100px] sm:max-w-[130px]">
            <p className="text-[11px] font-bold text-[var(--text-main)] truncate leading-tight">
              {currentTitle}
            </p>
            <p className="text-[9px] text-[var(--text-muted)] font-medium truncate">
              {isPlaying ? 'Đang phát' : 'Đã tắt nhạc'}
            </p>
          </div>

          {/* Clear TẮT / BẬT NHẠC Button */}
          <button
            onClick={handleToggleMusic}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
              isPlaying
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-200'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
            }`}
            title={isPlaying ? 'Bấm để tắt nhạc' : 'Bấm để bật nhạc'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3 h-3 text-purple-700 animate-pulse" />
                <span>Tắt</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3" />
                <span>Bật</span>
              </>
            )}
          </button>

          {/* Switch back to Web Background Music button if Character Music is on */}
          {isPlayingCharacter && (
            <button
              onClick={handleBackToWebMusic}
              className="p-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors cursor-pointer shrink-0"
              title="Quay lại nhạc nền web: Đến đây bên anh"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};
