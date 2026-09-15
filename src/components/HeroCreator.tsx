import React, { useState } from 'react';
import { Sparkles, Heart, Send, ExternalLink, Calendar, Info, BookOpen, ShieldCheck, HeartHandshake, Smile, CheckCircle2 } from 'lucide-react';
import { CreatorProfile, BulletinPost } from '../types';
import { sound } from '../utils/audio';
import creatorAvatarImg from '../assets/images/regenerated_image_1789144186610.png';

interface HeroCreatorProps {
  profile: CreatorProfile;
  bulletinPosts: BulletinPost[];
  onExploreCharacters: () => void;
  onOpenInbox: () => void;
  onOpenSticky: () => void;
}

export const HeroCreator: React.FC<HeroCreatorProps> = ({
  profile,
  bulletinPosts,
  onExploreCharacters,
  onOpenInbox,
  onOpenSticky
}) => {
  const [activeBulletinTab, setActiveBulletinTab] = useState<string>(bulletinPosts[0]?.id || 'bulletin-1');

  const selectedPost = bulletinPosts.find((p) => p.id === activeBulletinTab) || bulletinPosts[0];

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Sparkles className="w-5 h-5 text-[var(--text-main)]" />;
      case 'greeting':
        return <HeartHandshake className="w-5 h-5 text-[var(--text-main)]" />;
      case 'rules':
        return <ShieldCheck className="w-5 h-5 text-[var(--text-main)]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[var(--text-main)]" />;
    }
  };

  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Decorative background clouds and playful floating purple preschool icons */}
      <div className="absolute top-10 left-8 text-4xl opacity-50 select-none animate-float pointer-events-none">
        💝
      </div>
      <div className="absolute top-16 right-10 text-3xl opacity-60 select-none animate-float-slow pointer-events-none">
        🌸
      </div>
      <div className="absolute bottom-6 left-1/4 text-2xl opacity-50 select-none animate-wiggle pointer-events-none">
        🐣
      </div>
      <div className="absolute top-36 right-1/4 text-3xl opacity-50 select-none animate-float-rev pointer-events-none">
        ✨
      </div>
      <div className="absolute top-28 left-1/3 text-2xl opacity-40 select-none animate-bounce-gentle pointer-events-none">
        🧸
      </div>
      <div className="absolute top-64 right-10 text-3xl opacity-50 select-none animate-wiggle pointer-events-none">
        🎨
      </div>
      <div className="absolute top-48 left-12 text-2xl opacity-50 select-none animate-float pointer-events-none">
        🪅
      </div>
      <div className="absolute bottom-12 right-1/3 text-4xl opacity-40 select-none animate-float-slow pointer-events-none">
        🍼
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Creator Profile Card (5 cols) - Pastel Purple Theme */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-white via-[var(--grad-end)] to-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[var(--dominant)]/15 border-2 border-[var(--dominant)]/70 backdrop-blur-xs transition-all hover:shadow-2xl hover:shadow-[var(--dominant)]/25">
              
              {/* Cute Washi Tape on Creator Card */}
              <div className="washi-tape washi-tape-purple"></div>

              {/* Glowing decorative frame */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--grad-start)] to-[var(--accent)] -z-10 blur-md opacity-75"></div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--dominant)] -z-10 blur-lg opacity-50"></div>

              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--accent)] text-[var(--text-main)] border border-[var(--dominant)] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--text-main)]" />
                  {profile.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--text-main)] bg-white/60 px-3 py-1 rounded-full border border-[var(--dominant)]/60 shadow-2xs">
                  <span>🏫</span> Sĩ số: {profile.totalStudents} bé ngoan
                </span>
              </div>

              {/* Avatar with soft glowing pastel purple frame */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1.5 bg-gradient-to-tr from-[var(--dominant)] via-[var(--accent)] to-[var(--grad-start)] shadow-lg shadow-[var(--dominant)]/35 transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={profile.avatarUrl && !profile.avatarUrl.includes('unsplash') ? profile.avatarUrl : creatorAvatarImg}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-2xl bg-[var(--grad-end)]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-[var(--dominant)] text-base">
                    🐍
                  </div>
                  <div className="absolute -top-2 -left-2 text-lg animate-bounce">
                    🎀
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="font-['Comfortaa'] font-bold text-2xl sm:text-3xl text-[var(--text-main)] leading-tight mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center justify-center sm:justify-start gap-1">
                    <span>✨</span> {profile.title}
                  </p>
                  <p className="text-xs text-[var(--text-main)]/85 leading-relaxed italic bg-[var(--grad-end)] p-2.5 rounded-2xl border border-[var(--dominant)]/40">
                    &ldquo;{profile.classMotto}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bio description */}
              <p className="text-sm text-[var(--text-main)]/90 leading-relaxed mb-6 bg-white/80 p-4 rounded-2xl border border-[var(--dominant)]/40 shadow-2xs">
                {profile.bio}
              </p>

              {/* Direct Social Link Button: Facebook Mầm Non Rắn Con */}
              <div className="mb-5">
                <a
                  href={profile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playChime('bell')}
                  id="btn-facebook-link"
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#1877F2] to-[#3b82f6] text-[var(--text-main)] font-bold text-sm shadow-md shadow-[#1877F2]/25 hover:shadow-lg hover:shadow-[#1877F2]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook Mầm Non Rắn Con</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>
              </div>

              {/* Quick Action Triggers */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { sound.playChime('pop'); onExploreCharacters(); }}
                  id="btn-quick-explore-snakes"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs sm:text-sm font-bold shadow-md shadow-[var(--dominant)]/25 hover:brightness-105 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>🐍</span>
                  <span>Xem Bé Rắn</span>
                </button>
                <button
                  onClick={() => { sound.playChime('pop'); onOpenInbox(); }}
                  id="btn-quick-send-letter"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[var(--grad-end)] text-[var(--text-main)] text-xs sm:text-sm font-bold shadow-xs hover:bg-[var(--dominant)] hover:-translate-y-0.5 transition-all cursor-pointer border border-[var(--dominant)]"
                >
                  <Send className="w-3.5 h-3.5 text-[var(--text-main)]" />
                  <span>Gửi Thư Bí Mật</span>
                </button>
              </div>

              <div className="mt-3 text-center">
                <button
                  onClick={() => { sound.playChime('paper'); onOpenSticky(); }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-main)] hover:underline cursor-pointer"
                >
                  <span>💌</span> Ghé Bức Tường Sticky Note để lại lời nhắn
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: Bulletin Board Section ("Bảng Tin Lớp") (7 cols) - Pastel Purple Theme */}
          <div id="bulletin-section" className="lg:col-span-7">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[var(--dominant)]/15 border-2 border-[var(--dominant)]/60 backdrop-blur-xs relative">
              
              <div className="washi-tape washi-tape-lilac"></div>

              {/* Bulletin Header with Pin Graphic */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--dominant)]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--grad-end)] flex items-center justify-center text-xl shadow-xs border border-[var(--dominant)]">
                    📌
                  </div>
                  <div>
                    <h2 className="font-['Comfortaa'] font-bold text-xl sm:text-2xl text-[var(--text-main)]">
                      Bảng Tin Lớp Mầm Non
                    </h2>
                    <p className="text-xs text-[var(--text-main)]/80 font-medium">
                      Thông báo chính thức, lời nhắn và nội quy từ Cô Giáo Chủ Nhiệm
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[var(--grad-end)] px-3 py-1 rounded-full text-xs font-semibold text-[var(--text-main)] border border-[var(--dominant)]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedPost.updatedAt}</span>
                </div>
              </div>

              {/* Interactive Tabs for the 3 Modules */}
              <div className="flex flex-wrap gap-2 mb-6">
                {bulletinPosts.map((post) => {
                  const isActive = post.id === activeBulletinTab;
                  return (
                    <button
                      key={post.id}
                      onClick={() => { sound.playChime('pop'); setActiveBulletinTab(post.id); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[var(--dominant)] via-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] shadow-md shadow-[var(--dominant)]/30 scale-102'
                          : 'bg-[var(--grad-end)] text-[var(--text-main)] hover:bg-[var(--grad-end)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      {getPostIcon(post.type)}
                      <span>{post.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Bulletin Content Display */}
              <div className="bg-[var(--grad-end)] rounded-2xl p-5 sm:p-6 border border-[var(--dominant)]/50 shadow-inner-xs min-h-[260px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] bg-[var(--grad-end)] px-3 py-1 rounded-full border border-[var(--dominant)]">
                      {selectedPost.badgeText}
                    </span>
                    <span className="text-xs text-[var(--text-main)] flex items-center gap-1 font-medium">
                      <Smile className="w-3.5 h-3.5 text-[var(--text-main)]" />
                      Từ Cô Chủ Nhiệm
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-1 font-['Comfortaa']">
                    {selectedPost.title}
                  </h3>
                  <p className="text-xs text-[var(--text-main)]/70 mb-4 font-medium">
                    {selectedPost.subtitle}
                  </p>

                  <div className="space-y-2.5">
                    {selectedPost.content.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-[var(--text-main)] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[var(--text-main)] shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* Custom link ggai for Bulletin Post */}
                  {selectedPost.customLinkUrl && (
                    <div className="mt-4 pt-3 border-t border-[var(--dominant)]/40 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-[var(--text-main)] italic flex items-center gap-1">
                        <span>📎</span> Tài liệu liên kết nhà trẻ:
                      </span>
                      <a
                        href={selectedPost.customLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playChime('bell')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs font-bold shadow-xs hover:shadow-md hover:scale-102 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{selectedPost.customLinkName || 'Link ggai'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer of card */}
                <div className="pt-4 mt-6 border-t border-[var(--dominant)]/40 flex items-center justify-between text-xs text-[var(--text-main)]/80">
                  <div className="flex items-center gap-1">
                    <span>💌</span>
                    <span>Độc giả có ý kiến đóng góp? Hãy dùng Hộp Thư Bí Mật!</span>
                  </div>
                  <button
                    onClick={() => { sound.playChime('pop'); onOpenInbox(); }}
                    className="text-[var(--text-main)] font-bold hover:underline cursor-pointer"
                  >
                    Gửi ngay &rarr;
                  </button>
                </div>
              </div>

              {/* Mini quick summary pills - Light purple theme */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="bg-[var(--grad-end)]/70 p-2.5 rounded-2xl border border-[var(--dominant)]">
                  <span className="block text-base font-bold text-[var(--text-main)] font-['Comfortaa']">
                    {profile.totalStudents} Bé
                  </span>
                  <span className="text-[11px] text-[var(--text-main)]/80 font-semibold flex items-center justify-center gap-1">
                    <span>👶</span> Sĩ Số Lớp
                  </span>
                </div>
                <div className="bg-[var(--grad-end)] p-2.5 rounded-2xl border border-[var(--dominant)]">
                  <span className="block text-base font-bold text-[var(--text-main)] font-['Comfortaa']">
                    100%
                  </span>
                  <span className="text-[11px] text-[var(--text-main)]/80 font-semibold flex items-center justify-center gap-1">
                    <span>🌸</span> Độ Đáng Yêu
                  </span>
                </div>
                <div className="bg-[var(--grad-end)]/70 p-2.5 rounded-2xl border border-[var(--dominant)]">
                  <span className="block text-base font-bold text-[var(--text-main)] font-['Comfortaa']">
                    24/7
                  </span>
                  <span className="text-[11px] text-[var(--text-main)]/80 font-semibold flex items-center justify-center gap-1">
                    <span>💜</span> Chữa Lành
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
