import React, { useState, useMemo } from 'react';
import { Search, Heart, LayoutGrid, SlidersHorizontal, Sparkles, ChevronLeft, ChevronRight, Eye, Tag, Music, ExternalLink, Baby, Shield, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Character, InboxMessage } from '../types';
import { CharacterModal } from './CharacterModal';
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
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeModalChar, setActiveModalChar] = useState<Character | null>(null);

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

    // Trigger cute mini confetti explosion from the target button
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x, y },
      colors: ['var(--dominant)', 'var(--accent)', 'var(--accent)', 'var(--dominant)'],
      disableForReducedMotion: true
    });
  };

  const handleCardClick = (char: Character) => {
    sound.playChime('pop');
    setActiveModalChar(char);
    // If character has music and user clicked to open details, trigger music
    if (char.youtubeMusicUrl && onPlayMusic) {
      onPlayMusic(char);
    }
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
    <section id="characters-section" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
              Khám phá hồ sơ bé ngoan, phiếu bé ngoan, nhạc giai điệu và link tài liệu của từng bé
            </p>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-2xl border border-[var(--dominant)]/60 shadow-xs self-start md:self-auto">
            <button
              onClick={() => { sound.playChime('pop'); setViewMode('grid'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-xs'
                  : 'text-[var(--text-main)]/80 hover:text-[var(--text-main)]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Lưới (Grid)</span>
            </button>
            <button
              onClick={() => { sound.playChime('pop'); setViewMode('carousel'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-xs'
                  : 'text-[var(--text-main)]/80 hover:text-[var(--text-main)]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Băng Chuyền (Carousel)</span>
            </button>
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

          {/* Hashtag Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Tag className="w-4 h-4 text-[var(--text-main)] shrink-0" />
            <div className="flex items-center gap-2 flex-nowrap">
              {allTags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => { sound.playChime('pop'); setSelectedTag(tag); setCarouselIndex(0); }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-md shadow-[var(--dominant)]/30 scale-105'
                        : 'bg-[var(--grad-end)] text-[var(--text-main)] hover:bg-[var(--grad-end)] border border-[var(--dominant)]/50'
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

        {/* VIEW 1: GRID MODE */}
        {viewMode === 'grid' && filteredCharacters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredCharacters.map((char, index) => {
              const isLiked = !!userLikes[char.id];
              const washiTapeColor = index % 3 === 0 ? 'washi-tape-purple' : index % 3 === 1 ? 'washi-tape-lilac' : 'washi-tape-purple';
              return (
                <div
                  key={char.id}
                  onClick={() => handleCardClick(char)}
                  className="group relative bg-white/95 rounded-3xl p-5 shadow-lg shadow-[var(--dominant)]/10 border-2 border-[var(--dominant)]/60 hover:border-[var(--dominant)] hover:shadow-xl hover:shadow-[var(--dominant)]/25 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                >
                  {/* Cute Washi Tape on card header */}
                  <div className={`washi-tape ${washiTapeColor}`}></div>

                  <div>
                    {/* Top Badges & Like Heart */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] text-[11px] font-bold border border-[var(--dominant)] flex items-center gap-1">
                        <span>⭐</span>
                        {char.badgeLabel || char.title}
                      </span>
                      
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
                      <img
                        src={char.avatarUrl}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/55 text-[var(--text-main)] text-[10px] font-semibold backdrop-blur-xs flex items-center gap-1">
                        <Baby className="w-3 h-3 text-[var(--dominant)]" />
                        {char.gender} • {char.age}
                      </div>

                      {/* Floating Letter Indicator if letters exist */}
                      {(() => {
                        const count = inboxMessages.filter(
                          (m) => m.recipient === char.name && (m.status === 'approved' || isAdminLoggedIn)
                        ).length;
                        if (count === 0) return null;
                        return (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-pink-500/95 text-white text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs">
                            <Mail className="w-3 h-3" />
                            <span>{count} thư</span>
                          </div>
                        );
                      })()}

                      {/* Floating Music Indicator if music is attached */}
                      {char.youtubeMusicUrl && (
                        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white/95 text-red-500 text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs border border-red-200">
                          <Music className="w-3 h-3 animate-bounce" />
                          <span>Có Nhạc</span>
                        </div>
                      )}
                    </div>

                    {/* Name & Title */}
                    <h3 className="font-['Comfortaa'] font-bold text-xl text-[var(--text-main)] group-hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5">
                      <span>{char.name}</span>
                      <span className="text-sm">🐍</span>
                    </h3>
                    <p className="text-xs font-semibold text-[var(--text-main)] mb-2.5">
                      {char.nickname} • {char.title}
                    </p>

                    {/* Cute favorite snack & seatmate pill */}
                    <div className="bg-[var(--grad-end)] p-2.5 rounded-2xl mb-3 text-xs text-[var(--text-main)]/80 border border-[var(--dominant)]/50 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[var(--text-main)] flex items-center gap-1">
                          <span>🧸</span> Thích:
                        </span>
                        <span className="font-bold text-[var(--text-main)] text-[11px] truncate max-w-[140px]">
                          {char.likes || 'Sữa ấm & bánh quy'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[var(--text-main)] flex items-center gap-1">
                          <span>⭐</span> Điểm bé ngoan:
                        </span>
                        <span className="font-bold text-[var(--text-main)] text-[11px]">
                          {char.obedienceRate || 10}/10 sao
                        </span>
                      </div>
                    </div>

                    {/* Quick Media Action Row: Music YouTube + Custom Link ggai */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {char.youtubeMusicUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playChime('bell');
                            if (onPlayMusic) onPlayMusic(char);
                          }}
                          className="flex items-center gap-1 px-3 py-1 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-200 transition-all cursor-pointer shadow-2xs"
                          title="Bật nhạc YouTube của bé"
                        >
                          <Music className="w-3 h-3" />
                          <span>Nhạc Của Bé</span>
                        </button>
                      )}

                      {char.customLinkUrl && (
                        <a
                          href={char.customLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playChime('pop');
                          }}
                          className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[var(--grad-end)] hover:bg-[var(--dominant)] text-[var(--text-main)] text-xs font-bold border border-[var(--dominant)] transition-all cursor-pointer shadow-2xs"
                        >
                          <Sparkles className="w-3 h-3 text-[var(--text-main)]" />
                          <span>{char.customLinkName || 'Link ggai'}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {char.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-[var(--grad-end)] text-[var(--text-main)] border border-[var(--dominant)]/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-3 border-t border-[var(--dominant)]/40 flex items-center justify-between">
                    <span className="text-xs text-[var(--text-main)]/80 flex items-center gap-1">
                      <span>🌸</span> Phiếu bé ngoan: <strong>{char.obedienceRate}%</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--text-main)] group-hover:underline">
                      <Eye className="w-3.5 h-3.5" />
                      Xem Hồ Sơ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: CAROUSEL MODE */}
        {viewMode === 'carousel' && filteredCharacters.length > 0 && (
          <div className="relative bg-white/95 rounded-3xl p-6 sm:p-10 shadow-xl shadow-[var(--dominant)]/15 border-2 border-[var(--dominant)]/60 max-w-3xl mx-auto">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                Bé Rắn {carouselIndex + 1} / {filteredCharacters.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevCarousel}
                  disabled={carouselIndex === 0}
                  className="w-9 h-9 rounded-xl bg-[var(--grad-end)] hover:bg-[var(--grad-end)] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[var(--text-main)] transition-all cursor-pointer border border-[var(--dominant)]"
                  aria-label="Trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextCarousel}
                  disabled={carouselIndex === filteredCharacters.length - 1}
                  className="w-9 h-9 rounded-xl bg-[var(--grad-end)] hover:bg-[var(--grad-end)] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[var(--text-main)] transition-all cursor-pointer border border-[var(--dominant)]"
                  aria-label="Sau"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Current Character Card Slide */}
            {(() => {
              const char = filteredCharacters[carouselIndex];
              const isLiked = !!userLikes[char.id];
              return (
                <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                  <div className="relative shrink-0">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-2 bg-gradient-to-tr from-[var(--dominant)] via-[var(--accent)] to-[var(--grad-start)] shadow-lg shadow-[var(--dominant)]/25">
                      <img
                        src={char.avatarUrl}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-2xl bg-[var(--grad-end)]"
                      />
                    </div>
                    <button
                      onClick={(e) => handleLikeClick(e, char.id)}
                      className={`absolute -bottom-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md ${
                        isLiked
                          ? 'bg-[var(--dominant)] text-[var(--text-main)]'
                          : 'bg-white text-[var(--text-main)] hover:bg-[var(--grad-end)] border border-[var(--dominant)]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : 'text-pink-500'}`} />
                      <span>{char.likesCount}</span>
                    </button>
                  </div>

                  <div className="flex-1 space-y-3 text-center md:text-left w-full">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="px-3 py-1 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] text-xs font-bold border border-[var(--dominant)]">
                        {char.badgeLabel || char.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] text-xs font-medium border border-[var(--dominant)]/50">
                        {char.gender} • {char.age}
                      </span>
                    </div>

                    <h3 className="font-['Comfortaa'] font-bold text-2xl sm:text-3xl text-[var(--text-main)]">
                      {char.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                      {char.nickname} • {char.title}
                    </p>

                    {/* Media Buttons in Carousel */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                      {char.youtubeMusicUrl && (
                        <button
                          onClick={() => {
                            sound.playChime('bell');
                            if (onPlayMusic) onPlayMusic(char);
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-200 shadow-2xs transition-all cursor-pointer"
                        >
                          <Music className="w-3.5 h-3.5" />
                          <span>Nhạc Của Bé (YouTube)</span>
                        </button>
                      )}

                      {char.customLinkUrl && (
                        <a
                          href={char.customLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playChime('pop')}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs font-bold shadow-2xs hover:brightness-105 transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{char.customLinkName || 'Link ggai'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Obedience Bar */}
                    <div className="bg-[var(--grad-end)] p-3 rounded-2xl border border-[var(--dominant)]/50">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text-main)] mb-1">
                        <span className="flex items-center gap-1 text-[var(--text-main)]">
                          <Shield className="w-3 h-3 text-[var(--text-main)]" />
                          Phiếu bé ngoan:
                        </span>
                        <span className="text-[var(--text-main)]">{char.obedienceRate}%</span>
                      </div>
                      <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[var(--dominant)]/40">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] rounded-full"
                          style={{ width: `${char.obedienceRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                      <button
                        onClick={() => handleCardClick(char)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs font-bold hover:brightness-105 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem Hồ Sơ Chi Tiết</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>

      {/* Character Modal */}
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
    </section>
  );
};
