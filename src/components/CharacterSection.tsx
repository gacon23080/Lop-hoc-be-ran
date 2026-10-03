import React, { useState, useMemo } from 'react';
import { Search, Heart, LayoutGrid, SlidersHorizontal, Sparkles, ChevronLeft, ChevronRight, Eye, Tag, Music, ExternalLink, Baby, Shield, Mail, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Character, InboxMessage } from '../types';
import { CharacterModal } from './CharacterModal';
import { CharacterAvatar } from './CharacterAvatar';
import { RandomHusbandModal } from './RandomHusbandModal';
import { AgeVerificationModal } from './AgeVerificationModal';
import { sound } from '../utils/audio';

interface CharacterSectionProps {
  characters: Character[];
  onToggleLike: (charId: string) => void;
  userLikes: Record<string, boolean>;
  onPlayMusic?: (char: Character) => void;
  totalStudents?: number;
  inboxMessages?: InboxMessage[];
  isAdminLoggedIn?: boolean;
  onDeleteInboxMessage?: (msgId: string) => void;
  onLikeInboxMessage?: (msgId: string) => void;
  onSelectRecipientForLetter?: (charName: string) => void;
}

export const CharacterSection: React.FC<CharacterSectionProps> = ({
  characters,
  onToggleLike,
  userLikes,
  onPlayMusic,
  totalStudents,
  inboxMessages = [],
  isAdminLoggedIn,
  onDeleteInboxMessage,
  onLikeInboxMessage,
  onSelectRecipientForLetter
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('#Tất Cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // 3 view modes: 'classroom' (bàn ghế lớp học - default), 'grid' (lưới), 'carousel' (băng chuyền)
  const [viewMode, setViewMode] = useState<'classroom' | 'grid' | 'carousel'>('classroom');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeModalChar, setActiveModalChar] = useState<Character | null>(null);

  // Random Bé Chồng Modal state
  const [isRandomModalOpen, setIsRandomModalOpen] = useState<boolean>(false);

  // 18+ Age Verification Modal state
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState<boolean>(false);
  const [pending18PlusChar, setPending18PlusChar] = useState<Character | null>(null);

  // Helper: check if character has 18+ tag
  const is18Plus = (char: Character): boolean => {
    return (
      char.tags?.some((t) => /18\+|r18|r-18|nsfw|adult/i.test(t)) ||
      /18\+|r18|r-18|nsfw|adult/i.test(char.title || '') ||
      /18\+|r18|r-18|nsfw|adult/i.test(char.personality || '')
    );
  };

  // Extract all unique hashtags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    tagsSet.add('#Tất Cả');
    characters.forEach((c) => {
      c.tags.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [characters]);

  // Filtered characters
  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      const matchesTag = selectedTag === '#Tất Cả' || c.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.nickname.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.personality.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });
  }, [characters, selectedTag, searchQuery]);

  const handleLikeClick = (e: React.MouseEvent, charId: string) => {
    e.stopPropagation();
    sound.playChime('love');
    onToggleLike(charId);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x, y },
      colors: ['#dcd1ff', '#F5D5E0', '#ffc6ff', '#bdb2ff'],
      disableForReducedMotion: true
    });
  };

  // Click on a character / desk
  const handleCardClick = (char: Character) => {
    // If character is 18+ and user has not verified age yet, show Age Verification Modal
    if (is18Plus(char) && !isAgeVerified) {
      setPending18PlusChar(char);
      setIsAgeModalOpen(true);
      return;
    }
    executeSelectChar(char);
  };

  const executeSelectChar = (char: Character) => {
    sound.playChime('pop');
    setActiveModalChar(char);
    // When clicking character, automatically start character music (which pauses web background music!)
    if (onPlayMusic) {
      onPlayMusic(char);
    }
  };

  const handleConfirmAge = () => {
    setIsAgeVerified(true);
    setIsAgeModalOpen(false);
    if (pending18PlusChar) {
      executeSelectChar(pending18PlusChar);
      setPending18PlusChar(null);
    }
  };

  const handleCancelAge = () => {
    setIsAgeModalOpen(false);
    setPending18PlusChar(null);
  };

  const nextCarousel = () => {
    if (carouselIndex < filteredCharacters.length - 1) {
      sound.playChime('pop');
      setCarouselIndex((prev) => prev + 1);
    }
  };

  const prevCarousel = () => {
    if (carouselIndex > 0) {
      sound.playChime('pop');
      setCarouselIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="characters-section" className="py-12 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--text-main)] font-bold text-xs border border-[var(--dominant)]">
                <Baby className="w-3.5 h-3.5 text-[var(--text-main)]" />
                <span>Sổ Điểm Danh Học Sinh Nhí</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[var(--text-main)] font-bold text-xs border border-[var(--dominant)]/70 shadow-2xs">
                <span>🏫 Sĩ số lớp:</span>
                <span className="text-[var(--text-main)] font-extrabold">{totalStudents || characters.length}</span>
                <span>bé ngoan</span>
              </div>
            </div>
            <h2 className="font-['Comfortaa'] font-bold text-2xl sm:text-4xl text-[var(--text-main)]">
              Bé Rắn Của Lớp
            </h2>
            <p className="text-sm text-[var(--text-main)]/85 font-medium mt-1">
              Các bé rắn ngồi ngoan tại bàn học lớp mầm non &bull; Bấm vào từng bé để chọn xem hồ sơ & nghe giai điệu
            </p>
          </div>

          {/* Action Row: Random Bé Chồng Button + View Modes */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            {/* Random Bé Chồng Feature Button */}
            <button
              onClick={() => {
                sound.playChime('toy');
                setIsRandomModalOpen(true);
              }}
              id="btn-random-be-chong"
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-400 to-amber-300 hover:from-purple-600 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-purple-300/40 hover:shadow-lg hover:scale-103 active:scale-98 transition-all cursor-pointer animate-bounce-gentle"
              title="Bốc thăm bé chồng ngẫu nhiên hôm nay"
            >
              <span className="text-base">🎲</span>
              <span className="font-['Comfortaa']">Random Bé Chồng</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white/90 p-1.5 rounded-2xl border border-[var(--dominant)]/60 shadow-xs">
              <button
                onClick={() => { sound.playChime('pop'); setViewMode('classroom'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'classroom'
                    ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-xs'
                    : 'text-[var(--text-main)]/80 hover:text-[var(--text-main)]'
                }`}
                title="Xem các bé ngồi tại bàn học lớp mầm non"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bàn Học Lớp</span>
              </button>

              <button
                onClick={() => { sound.playChime('pop'); setViewMode('grid'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-xs'
                    : 'text-[var(--text-main)]/80 hover:text-[var(--text-main)]'
                }`}
                title="Dạng thẻ lưới"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Lưới</span>
              </button>

              <button
                onClick={() => { sound.playChime('pop'); setViewMode('carousel'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-xs'
                    : 'text-[var(--text-main)]/80 hover:text-[var(--text-main)]'
                }`}
                title="Dạng băng chuyền ngang"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Băng Chuyền</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Hashtag Filter Bar */}
        <div className="bg-white/95 rounded-3xl p-5 shadow-lg shadow-[var(--dominant)]/10 border-2 border-[var(--dominant)]/60 mb-8 space-y-4">
          
          {/* Live Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-main)]" />
            <input
              type="text"
              id="character-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bé, biệt danh, đặc điểm tính cách dễ thương..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[var(--grad-end)] border-2 border-[var(--dominant)]/50 focus:border-[var(--dominant)] focus:bg-white text-sm text-[var(--text-main)] placeholder-[var(--text-main)]/40 outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--text-main)] hover:underline cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Hashtag Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[var(--text-main)] shrink-0 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[var(--text-main)]" />
              Chủ đề:
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {allTags.map((tag) => {
                const isSelected = selectedTag === tag;
                const isTag18Plus = /18\+|r18|nsfw/i.test(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      sound.playChime('pop');
                      setSelectedTag(tag);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? isTag18Plus
                          ? 'bg-red-500 text-white shadow-xs'
                          : 'bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] shadow-xs scale-105'
                        : isTag18Plus
                          ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                          : 'bg-[var(--grad-end)] text-[var(--text-main)] hover:bg-[var(--dominant)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--text-main)]/80 pt-1">
            <span>
              Tìm thấy <strong>{filteredCharacters.length}</strong> bé rắn phù hợp
            </span>
            {selectedTag !== '#Tất Cả' && (
              <button
                onClick={() => { setSelectedTag('#Tất Cả'); setSearchQuery(''); }}
                className="text-[var(--text-main)] font-bold hover:underline cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredCharacters.length === 0 && (
          <div className="bg-white/80 rounded-3xl p-12 text-center border-2 border-dashed border-[var(--dominant)] max-w-md mx-auto">
            <div className="text-4xl mb-3">🐍❓</div>
            <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)] mb-1">
              Chưa tìm thấy bé rắn nào
            </h3>
            <p className="text-xs text-[var(--text-main)]/70 mb-4">
              Không có bé rắn nào khớp với từ khóa &ldquo;{searchQuery}&rdquo;. Hãy thử tìm với từ khóa khác nhé!
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag('#Tất Cả'); }}
              className="px-4 py-2 rounded-xl bg-[var(--dominant)] text-[var(--text-main)] text-xs font-bold hover:brightness-105 cursor-pointer"
            >
              Xem Tất Cả Bé Rắn
            </button>
          </div>
        )}

        {/* VIEW 1: CLASSROOM SEATING CHART (CÁC CHAR NGỒI TRÊN GHẾ LỚP HỌC - BẤM VÀO CHỌN) */}
        {viewMode === 'classroom' && filteredCharacters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
            {filteredCharacters.map((char) => {
              const isLiked = !!userLikes[char.id];
              const charIs18Plus = is18Plus(char);

              return (
                <div
                  key={char.id}
                  onClick={() => handleCardClick(char)}
                  className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none"
                >
                  {/* 1. Hình Bé Rắn (Char) Tại Bàn Học (Không Có Ghế) */}
                  <div className="relative -mb-6 z-0 flex justify-center">
                    <div className="relative w-36 sm:w-40 h-36 sm:h-40 rounded-3xl overflow-hidden border-3 border-white shadow-xl bg-gradient-to-b from-purple-100/90 via-pink-50/80 to-white/95 transform group-hover:scale-105 transition-transform duration-300">
                      <CharacterAvatar
                        avatarUrl={char.avatarUrl}
                        name={char.name}
                        className="w-full h-full"
                      />

                      {/* Huy hiệu 18+ nếu nhân vật có tag 18+ */}
                      {charIs18Plus && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-500/95 text-white text-[10px] font-black shadow-md flex items-center gap-1 backdrop-blur-xs">
                          <span>🔞 18+</span>
                        </div>
                      )}

                      {/* Chỉ số thư */}
                      {(() => {
                        const count = inboxMessages.filter(
                          (m) => m.recipient === char.name && (m.status === 'approved' || isAdminLoggedIn)
                        ).length;
                        if (count === 0) return null;
                        return (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-pink-500/95 text-white text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs">
                            <Mail className="w-3 h-3" />
                            <span>{count}</span>
                          </div>
                        );
                      })()}

                      {/* Biểu tượng có nhạc */}
                      {char.youtubeMusicUrl && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/95 text-red-500 text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs border border-red-200">
                          <Music className="w-3 h-3 animate-bounce" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Bàn Học Sinh Bằng Gỗ Phía Trước (Preschool Student Desk) */}
                  <div className="relative w-full max-w-[270px] sm:max-w-[290px] bg-gradient-to-b from-[#fdf6ec] via-[#f7ebd9] to-[#eedcbf] rounded-2xl p-3 sm:p-3.5 border-3 border-[#cbb08b] shadow-xl z-10 group-hover:border-purple-400 group-hover:shadow-2xl transition-all">
                    
                    {/* Mặt bàn với các đồ dùng học tập mầm non */}
                    <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-[#ddc6a7]/70 text-xs">
                      {/* Bình sữa */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-white/70 px-2 py-0.5 rounded-full border border-amber-200">
                        <span>🍼</span>
                        <span>Sữa ấm</span>
                      </div>
                      {/* Hộp bút */}
                      <span className="text-xs">✏️</span>
                      {/* Điểm bé ngoan */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200">
                        <span>⭐</span>
                        <span>{char.obedienceRate || 10} sao</span>
                      </div>
                    </div>

                    {/* Biển Tên Học Sinh Đặt Trên Bàn */}
                    <div className="mt-2.5 bg-white/95 rounded-xl p-2 text-center border border-[#d6be9f] shadow-inner">
                      <h3 className="font-['Comfortaa'] font-extrabold text-base sm:text-lg text-[var(--text-main)] group-hover:text-purple-700 transition-colors truncate">
                        {char.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-purple-600 truncate mt-0.5">
                        {char.nickname} &bull; {char.title}
                      </p>
                    </div>

                    {/* Nút bắn tim & Lời nhắc bấm chọn */}
                    <div className="mt-2 flex items-center justify-between gap-2 pt-1.5">
                      <button
                        onClick={(e) => handleLikeClick(e, char.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isLiked
                            ? 'bg-pink-100 text-pink-600 border border-pink-300'
                            : 'bg-white/80 text-gray-600 hover:text-pink-500 border border-[#ddc6a7]'
                        }`}
                        title="Bắn tim cho bé rắn"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-pink-500' : 'text-pink-400'}`} />
                        <span>{char.likesCount}</span>
                      </button>

                      <div className="text-[11px] font-extrabold text-purple-700 bg-purple-100/90 group-hover:bg-purple-200 px-3 py-1 rounded-full border border-purple-300 transition-colors flex items-center gap-1">
                        <span>Ấn vào chọn</span>
                        <span>✨</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: STANDARD GRID MODE */}
        {viewMode === 'grid' && filteredCharacters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredCharacters.map((char, index) => {
              const isLiked = !!userLikes[char.id];
              const washiTapeColor = index % 3 === 0 ? 'washi-tape-purple' : index % 3 === 1 ? 'washi-tape-lilac' : 'washi-tape-purple';
              const charIs18Plus = is18Plus(char);

              return (
                <div
                  key={char.id}
                  onClick={() => handleCardClick(char)}
                  className="group relative bg-white/95 rounded-3xl p-5 shadow-lg shadow-[var(--dominant)]/10 border-2 border-[var(--dominant)]/60 hover:border-[var(--dominant)] hover:shadow-xl hover:shadow-[var(--dominant)]/25 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                >
                  <div className={`washi-tape ${washiTapeColor}`}></div>

                  <div>
                    {/* Top Badges & Like Heart */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] text-[11px] font-bold border border-[var(--dominant)] flex items-center gap-1">
                          <span>⭐</span>
                          {char.badgeLabel || char.title}
                        </span>
                        {charIs18Plus && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black shadow-xs">
                            18+
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={(e) => handleLikeClick(e, char.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isLiked
                            ? 'bg-[var(--dominant)] text-[var(--text-main)] shadow-xs scale-105'
                            : 'bg-[var(--grad-end)] text-[var(--text-main)] hover:bg-[var(--grad-end)] border border-[var(--dominant)]/60'
                        }`}
                        title="Bắn tim cho bé rắn"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : 'text-pink-500'}`} />
                        <span>{char.likesCount}</span>
                      </button>
                    </div>

                    {/* Artwork Avatar */}
                    <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square bg-[var(--grad-end)] border border-[var(--dominant)]/40 group-hover:shadow-md transition-all">
                      <CharacterAvatar
                        avatarUrl={char.avatarUrl}
                        name={char.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/55 text-white text-[10px] font-semibold backdrop-blur-xs flex items-center gap-1">
                        <Baby className="w-3 h-3 text-[var(--dominant)]" />
                        {char.gender} • {char.age}
                      </div>

                      {/* Music indicator */}
                      {char.youtubeMusicUrl && (
                        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white/95 text-red-500 text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs border border-red-200">
                          <Music className="w-3 h-3 animate-bounce" />
                          <span>Có Nhạc</span>
                        </div>
                      )}
                    </div>

                    {/* Name & Title */}
                    <h3 className="font-['Comfortaa'] font-bold text-xl text-[var(--text-main)] group-hover:text-purple-700 transition-colors flex items-center gap-1.5">
                      <span>{char.name}</span>
                      <span className="text-sm">🐍</span>
                    </h3>
                    <p className="text-xs font-semibold text-[var(--text-main)] mb-2.5">
                      {char.nickname} • {char.title}
                    </p>

                    {/* Snack pill */}
                    <div className="bg-[var(--grad-end)] p-2.5 rounded-2xl mb-3 text-xs text-[var(--text-main)]/80 border border-[var(--dominant)]/50 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[var(--text-main)] flex items-center gap-1">
                          <span>🧸</span> Thích:
                        </span>
                        <span className="font-bold text-[var(--text-main)] text-[11px] truncate max-w-[140px]">
                          {char.likes || 'Sữa ấm & bánh quy'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center border-t border-[var(--dominant)]/40 text-xs font-bold text-purple-700">
                    <span>Xem hồ sơ & nghe nhạc</span>
                    <span>👉</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 3: CAROUSEL MODE */}
        {viewMode === 'carousel' && filteredCharacters.length > 0 && (
          <div className="relative py-4">
            {(() => {
              const char = filteredCharacters[carouselIndex] || filteredCharacters[0];
              const isLiked = !!userLikes[char.id];
              const charIs18Plus = is18Plus(char);

              return (
                <div className="max-w-2xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[var(--dominant)]/15 border-2 border-[var(--dominant)] flex flex-col md:flex-row items-center gap-6 relative">
                  <div className="washi-tape washi-tape-purple"></div>

                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-2 border-[var(--dominant)] shrink-0">
                    <CharacterAvatar
                      avatarUrl={char.avatarUrl}
                      name={char.name}
                      className="w-full h-full object-cover"
                    />
                    {charIs18Plus && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black shadow-xs">
                        18+
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-['Comfortaa'] font-bold text-2xl text-[var(--text-main)] mb-1">
                      {char.name}
                    </h3>
                    <p className="text-xs font-bold text-purple-700 mb-2">
                      {char.nickname} &bull; {char.title}
                    </p>
                    <p className="text-xs text-[var(--text-main)]/90 italic bg-[var(--grad-end)] p-2.5 rounded-xl border border-[var(--dominant)]/40 mb-3">
                      &ldquo;{char.personality}&rdquo;
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <button
                        onClick={() => handleCardClick(char)}
                        className="px-4 py-2 rounded-xl bg-[var(--dominant)] text-[var(--text-main)] font-extrabold text-xs shadow-xs hover:brightness-105 cursor-pointer flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem Chi Tiết</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={prevCarousel}
                disabled={carouselIndex === 0}
                className="p-2.5 rounded-full bg-white shadow-md border border-[var(--dominant)] text-[var(--text-main)] disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-[var(--text-main)]">
                {carouselIndex + 1} / {filteredCharacters.length}
              </span>
              <button
                onClick={nextCarousel}
                disabled={carouselIndex >= filteredCharacters.length - 1}
                className="p-2.5 rounded-full bg-white shadow-md border border-[var(--dominant)] text-[var(--text-main)] disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Empty State when no characters match filter or search */}
        {filteredCharacters.length === 0 && (
          <div className="text-center py-16 px-4 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-[var(--dominant)] shadow-sm max-w-md mx-auto my-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl animate-bounce-gentle">
              🐍
            </div>
            <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)] mb-1">
              Chưa tìm thấy bé rắn nào!
            </h3>
            <p className="text-xs text-[var(--text-main)]/80 mb-4">
              Không có bé rắn nào khớp với bộ lọc &quot;{selectedTag}&quot; hoặc từ khóa tìm kiếm.
            </p>
            <button
              onClick={() => {
                sound.playChime('pop');
                setSelectedTag('#Tất Cả');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[var(--dominant)] hover:bg-[var(--accent)] text-[var(--text-main)] font-bold text-xs transition-all cursor-pointer shadow-xs"
            >
              🔄 Hiển Thị Tất Cả Các Bé
            </button>
          </div>
        )}

      </div>

      {/* Character Detail Modal */}
      <CharacterModal
        character={activeModalChar}
        onClose={() => setActiveModalChar(null)}
        onToggleLike={onToggleLike}
        isLiked={activeModalChar ? !!userLikes[activeModalChar.id] : false}
        onPlayMusic={onPlayMusic}
        inboxMessages={inboxMessages}
        isAdminLoggedIn={isAdminLoggedIn}
        onDeleteInboxMessage={onDeleteInboxMessage}
        onLikeInboxMessage={onLikeInboxMessage}
        onWriteLetter={onSelectRecipientForLetter}
      />

      {/* Random Bé Chồng Modal ("Random Bé Chồng Định Mệnh") */}
      <RandomHusbandModal
        isOpen={isRandomModalOpen}
        characters={characters}
        onClose={() => setIsRandomModalOpen(false)}
        onSelectCharacter={handleCardClick}
        onPlayMusic={(char) => {
          if (onPlayMusic) onPlayMusic(char);
        }}
      />

      {/* 18+ Age Verification Modal */}
      <AgeVerificationModal
        isOpen={isAgeModalOpen}
        character={pending18PlusChar}
        onConfirm={handleConfirmAge}
        onCancel={handleCancelAge}
      />

    </section>
  );
};
