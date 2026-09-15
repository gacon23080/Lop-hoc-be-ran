import React from 'react';
import { X, Heart, Sparkles, Shield, Users, Music, ExternalLink, Award, Baby, Cookie, Trash2, Send } from 'lucide-react';
import { Character, InboxMessage } from '../types';
import { sound } from '../utils/audio';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
  onToggleLike: (charId: string) => void;
  isLiked: boolean;
  onPlayMusic?: (char: Character) => void;
  inboxMessages?: InboxMessage[];
  isAdminLoggedIn?: boolean;
  onDeleteInboxMessage?: (msgId: string) => void;
  onLikeInboxMessage?: (msgId: string) => void;
  onWriteLetter?: (charName: string) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
  onToggleLike,
  isLiked,
  onPlayMusic,
  inboxMessages = [],
  isAdminLoggedIn,
  onDeleteInboxMessage,
  onLikeInboxMessage,
  onWriteLetter
}) => {
  if (!character) return null;

  // Filter letters sent specifically to this character
  const characterLetters = inboxMessages.filter(
    (m) => m.recipient === character.name && (m.status === 'approved' || isAdminLoggedIn)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[var(--grad-end)] rounded-3xl shadow-2xl border-3 border-[var(--dominant)] overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cute Washi tape */}
        <div className="washi-tape washi-tape-purple"></div>

        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[var(--dominant)] via-[var(--dominant)] to-[var(--accent)] p-6 text-[var(--text-main)]">
          <button
            onClick={() => { sound.playChime('pop'); onClose(); }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/30 hover:bg-white/50 text-[var(--text-main)] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/25 text-xs font-bold backdrop-blur-xs border border-white/30 flex items-center gap-1">
              <Baby className="w-3.5 h-3.5" />
              {character.gender} • {character.age}
            </span>
            {character.badgeLabel && (
              <span className="px-3 py-1 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] text-xs font-bold shadow-xs flex items-center gap-1">
                <Award className="w-3 h-3 text-[var(--text-main)]" />
                {character.badgeLabel}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-900 text-xs font-bold shadow-xs">
              ⭐ Đạt Hoa Bé Ngoan
            </span>
          </div>

          <h2 className="font-['Comfortaa'] font-bold text-2xl sm:text-3xl flex items-center gap-2">
            <span>{character.name}</span>
            <span className="text-xl">🐍</span>
          </h2>
          <p className="text-[var(--text-main)]/95 font-medium text-sm">
            {character.nickname} • <span className="underline decoration-purple-200">{character.title}</span>
          </p>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Hero & Actions */}
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="relative shrink-0">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl p-1.5 bg-gradient-to-tr from-[var(--dominant)] to-[var(--accent)] shadow-lg shadow-[var(--dominant)]/20">
                <img
                  src={character.avatarUrl}
                  alt={character.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl bg-white"
                />
              </div>
              <button
                onClick={() => { sound.playChime('love'); onToggleLike(character.id); }}
                className={`absolute -bottom-3 -right-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer ${
                  isLiked
                    ? 'bg-[var(--dominant)] text-[var(--text-main)] border-2 border-white'
                    : 'bg-white text-[var(--text-main)] hover:bg-[var(--grad-end)] border border-[var(--dominant)]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : 'text-pink-500'}`} />
                <span>{character.likesCount} yêu thích</span>
              </button>
            </div>

            <div className="flex-1 space-y-3 w-full text-center sm:text-left">
              
              {/* Media Action Buttons (Music YouTube & Custom Link ggai) */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {character.youtubeMusicUrl && (
                  <button
                    onClick={() => {
                      sound.playChime('bell');
                      if (onPlayMusic) onPlayMusic(character);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-200 transition-all cursor-pointer shadow-xs"
                    title="Mở máy nghe nhạc YouTube"
                  >
                    <Music className="w-4 h-4 text-red-500 animate-bounce" />
                    <span>Mở Nhạc Của Bé (YouTube)</span>
                  </button>
                )}

                {character.customLinkUrl && (
                  <a
                    href={character.customLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playChime('pop')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs font-bold hover:brightness-105 transition-all cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{character.customLinkName || 'Link ggai'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Hashtag List */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {character.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-[var(--grad-end)] text-[var(--text-main)] text-xs font-bold border border-[var(--dominant)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Obedience Meter ("Điểm Phiếu Bé Ngoan") */}
              <div className="bg-white/90 p-3 rounded-2xl border border-[var(--dominant)]/60">
                <div className="flex items-center justify-between text-xs font-bold text-[var(--text-main)] mb-1.5">
                  <span className="flex items-center gap-1 text-[var(--text-main)]">
                    <Shield className="w-3.5 h-3.5 text-[var(--text-main)]" />
                    Điểm ngoan ngoãn trong lớp mầm non:
                  </span>
                  <span className="text-[var(--text-main)]">{character.obedienceRate}% (Đạt hoa bé ngoan)</span>
                </div>
                <div className="w-full h-2.5 bg-[var(--grad-end)] rounded-full overflow-hidden border border-[var(--dominant)]/50">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] rounded-full transition-all duration-500"
                    style={{ width: `${character.obedienceRate}%` }}
                  ></div>
                </div>
              </div>

            </div>
          </div>

          {/* Full Bio */}
          <div className="bg-white p-5 rounded-2xl border border-[var(--dominant)]/50 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Sổ bé ngoan & Kỷ niệm lớp học
            </h4>
            <p className="text-sm text-[var(--text-main)] leading-relaxed">
              {character.fullBio}
            </p>
          </div>

          {/* Personality, Likes, Dislikes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[var(--grad-end)] p-4 rounded-2xl border border-[var(--dominant)]/50">
              <span className="text-xs font-bold text-[var(--text-main)] block mb-1 flex items-center gap-1">
                <span>🧸</span> Tính nết lúc ở trường:
              </span>
              <p className="text-xs text-[var(--text-main)]/90 leading-relaxed">
                {character.personality}
              </p>
            </div>
            <div className="bg-[var(--grad-end)] p-4 rounded-2xl border border-[var(--dominant)]/50">
              <span className="text-xs font-bold text-[var(--text-main)] block mb-1 flex items-center gap-1">
                <Cookie className="w-3.5 h-3.5 text-[var(--text-main)]" /> Thích & Ghét:
              </span>
              <p className="text-xs text-[var(--text-main)]/90 leading-relaxed">
                <strong>Thích:</strong> {character.likes}
                <br />
                <strong>Ghét:</strong> {character.dislikes}
              </p>
            </div>
          </div>

          {/* Hộp Thư Riêng Gửi Bé (Chỉ hiện trong trang nhân vật) */}
          <div className="bg-white p-5 rounded-2xl border border-[var(--dominant)]/50 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] flex items-center gap-1.5">
                  <span>💌</span>
                  <span>Hộp Thư Gửi Riêng Bé {character.name} ({characterLetters.length})</span>
                </h4>
                <p className="text-[11px] text-[var(--text-main)]/70 mt-0.5">
                  Các lá thư người truy cập gửi riêng cho bé {character.name}
                </p>
              </div>

              {onWriteLetter && (
                <button
                  onClick={() => {
                    sound.playChime('pop');
                    onClose();
                    onWriteLetter(character.name);
                  }}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs font-bold shadow-xs hover:brightness-105 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Viết Thư Cho Bé</span>
                </button>
              )}
            </div>

            {characterLetters.length === 0 ? (
              <div className="p-4 rounded-xl bg-[var(--grad-end)] border border-dashed border-[var(--dominant)] text-center text-xs text-[var(--text-main)]/70">
                <p className="font-semibold mb-1">Bé {character.name} chưa nhận được lá thư riêng nào!</p>
                <p className="text-[11px]">
                  Bạn có thể bấm nút &quot;Viết Thư Cho Bé&quot; ở trên để gửi lời chúc, tỏ tình hoặc nhắn nhủ ngọt ngào nha! 🐍✨
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {characterLetters.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3.5 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/40 text-xs space-y-2 relative"
                  >
                    {/* Admin Delete */}
                    {isAdminLoggedIn && onDeleteInboxMessage && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Admin: Xóa thư gửi bé ${character.name}?`)) {
                            sound.playChime('pop');
                            onDeleteInboxMessage(msg.id);
                          }
                        }}
                        className="absolute top-2 right-2 p-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-2xs"
                        title="Xóa thư (Quyền Admin)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="flex items-center justify-between text-[11px] pr-6">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold bg-white px-2 py-0.5 rounded-md border border-[var(--dominant)]/40 text-[var(--text-main)]">
                          {msg.senderNickname}
                        </span>
                        <span className="text-[10px] text-[var(--text-main)]/70 bg-white/60 px-1.5 py-0.5 rounded">
                          {msg.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--text-main)]/60">{msg.timestamp}</span>
                    </div>

                    <p className="bg-white p-2.5 rounded-lg border border-[var(--dominant)]/30 text-[var(--text-main)] leading-relaxed">
                      {msg.content}
                    </p>

                    {/* Character Reply */}
                    {msg.reply && (
                      <div className="bg-gradient-to-r from-[var(--grad-start)] to-[var(--grad-start)] p-2.5 rounded-lg border border-[var(--dominant)] text-[11px] leading-relaxed">
                        <span className="font-bold text-[var(--text-main)] block mb-0.5 flex items-center gap-1">
                          <span>🐍</span> Bé {character.name} đáp lời:
                        </span>
                        <p className="italic text-[var(--text-main)]">{msg.reply}</p>
                      </div>
                    )}

                    {onLikeInboxMessage && (
                      <div className="flex items-center justify-end pt-1">
                        <button
                          onClick={() => { sound.playChime('love'); onLikeInboxMessage(msg.id); }}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[11px] font-bold text-[var(--text-main)] border border-[var(--dominant)]/50 hover:scale-105 cursor-pointer"
                        >
                          <Heart className="w-3 h-3 text-pink-500 fill-current" />
                          <span>{msg.likesCount}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[var(--dominant)]/40 flex items-center justify-between">
          <div className="text-xs text-[var(--text-main)] font-medium">
            Mầm Non Rắn Con 🐍 Nơi lưu giữ nụ cười trẻ thơ
          </div>

          <button
            onClick={() => { sound.playChime('pop'); onClose(); }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs font-bold hover:brightness-105 transition-all cursor-pointer shadow-xs"
          >
            Đóng Hồ Sơ
          </button>
        </div>
      </div>
    </div>
  );
};
