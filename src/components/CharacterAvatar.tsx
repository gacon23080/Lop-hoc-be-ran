import React from 'react';
import { CuteBabySnake } from './CuteBabySnake';
import { DEFAULT_MASCOTS } from '../data/mascots';

interface CharacterAvatarProps {
  avatarUrl?: string;
  name: string;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  avatarUrl = '',
  name,
  className = 'w-full h-full'
}) => {
  // Check if avatarUrl maps to one of the beloved preschool mascots
  if (avatarUrl.startsWith('mascot-') || avatarUrl === 'mascot-tim' || avatarUrl === 'mascot-18plus') {
    const mascotKey = avatarUrl === 'mascot-18plus' ? 'mascot-tim' : avatarUrl;
    const mascot = DEFAULT_MASCOTS.find((m) => m.id === mascotKey) || DEFAULT_MASCOTS[0];

    const is18Plus = avatarUrl === 'mascot-18plus';
    const primaryColor = is18Plus ? '#9333EA' : mascot.primaryColor;
    const strokeColor = is18Plus ? '#3B0764' : mascot.strokeColor;
    const secondaryColor = is18Plus ? '#F3E8FF' : mascot.secondaryColor;
    const isChick = avatarUrl === 'mascot-gacon';

    return (
      <div className={`relative flex items-center justify-center p-2 bg-gradient-to-b from-purple-50 to-pink-50 ${className}`}>
        <CuteBabySnake
          primaryColor={primaryColor}
          strokeColor={strokeColor}
          secondaryColor={secondaryColor}
          isChick={isChick}
          className="w-full h-full"
        />
        {is18Plus && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black shadow-xs">
            18+
          </div>
        )}
      </div>
    );
  }

  // Normal image URL
  return (
    <img
      src={avatarUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80'}
      alt={name}
      referrerPolicy="no-referrer"
      className={`object-cover ${className}`}
    />
  );
};
