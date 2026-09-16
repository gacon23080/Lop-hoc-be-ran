import React, { useState } from 'react';
import { Plus, Heart, Sparkles, MessageCircle, X, Smile, Trash2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StickyNote, StickyColor } from '../types';
import { sound } from '../utils/audio';

interface StickyFanWallProps {
  notes: StickyNote[];
  onAddNote: (note: Omit<StickyNote, 'id' | 'likes' | 'createdAt' | 'rotationDeg'>) => void;
  onLikeNote: (noteId: string) => void;
  isAdminLoggedIn?: boolean;
  onDeleteNote?: (noteId: string) => void;
}

export const StickyFanWall: React.FC<StickyFanWallProps> = ({
  notes,
  onAddNote,
  onLikeNote,
  isAdminLoggedIn,
  onDeleteNote
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<StickyColor>('pink');
  const [sticker, setSticker] = useState('🌸');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const triggerDelete = (noteId: string) => {
    sound.playChime('pop');
    onDeleteNote?.(noteId);
    setConfirmDeleteId(null);
    setActionToast('Đã xóa mẩu giấy note thành công!');
    setTimeout(() => setActionToast(null), 3000);
  };

  const STICKERS = ['🌸', '🐍', '⭐', '🍼', '🍎', '🍭', '🎀', '🧸', '🍰', '✨'];

  const COLOR_MAP: Record<StickyColor, { bg: string; border: string; tape: string; text: string }> = {
    yellow: {
      bg: 'bg-[#FFF9DE]',
      border: 'border-[#F0E6A5]',
      tape: 'bg-[#FFEAA7]/70',
      text: 'text-[var(--text-main)]'
    },
    pink: {
      bg: 'bg-[#FFEBF0]',
      border: 'border-[var(--accent)]',
      tape: 'bg-[var(--accent)]/80',
      text: 'text-[var(--text-main)]'
    },
    purple: {
      bg: 'bg-[var(--accent)]',
      border: 'border-[var(--dominant)]',
      tape: 'bg-[var(--dominant)]/80',
      text: 'text-[var(--text-main)]'
    },
    green: {
      bg: 'bg-[var(--grad-end)]',
      border: 'border-[var(--dominant)]',
      tape: 'bg-[var(--grad-start)]/80',
      text: 'text-[var(--text-main)]'
    },
    blue: {
      bg: 'bg-white/60',
      border: 'border-[var(--dominant)]',
      tape: 'bg-[var(--dominant)]/80',
      text: 'text-[var(--text-main)]'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    sound.playChime('paper');
    onAddNote({
      author: author.trim() || 'Bạn Nhỏ Dấu Tên',
      content: content.trim(),
      color,
      sticker
    });

    setAuthor('');
    setContent('');
    setModalOpen(false);

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['var(--dominant)', 'var(--dominant)', 'var(--dominant)', 'var(--grad-start)', 'var(--accent)']
    });
  };

  const handleLike = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    sound.playChime('love');
    onLikeNote(noteId);
  };

  return (
    <section id="sticky-section" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] font-bold text-xs mb-2 border border-[var(--dominant)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--text-main)]" />
              <span>Góc Lưu Niệm & Lời Chúc</span>
            </div>
            <h2 className="font-['Comfortaa'] font-bold text-2xl sm:text-4xl text-[var(--text-main)]">
              Bức Tường Sticky Note
            </h2>
            <p className="text-sm text-[var(--text-main)]/80 font-medium mt-1">
              Dán một chiếc giấy ghi chú nhỏ để gửi gắm tình cảm và cổ vũ cả lớp Mầm Non Rắn Con nhé!
            </p>
          </div>

          <button
            onClick={() => { sound.playChime('pop'); setModalOpen(true); }}
            id="btn-add-sticky-note"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] font-bold text-sm shadow-md shadow-[var(--dominant)]/25 hover:brightness-105 hover:-translate-y-0.5 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Dán Sticky Note Mới</span>
          </button>
        </div>

        {/* Admin status banner if logged in */}
        {isAdminLoggedIn && (
          <div className="mb-4 px-4 py-3 rounded-2xl bg-amber-50 border-2 border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-900 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-lg">🛡️</span>
              <span>Chế Độ Quản Trị Viên: Bạn có toàn quyền xóa các mẩu giấy note của người truy cập.</span>
            </div>
            <span className="text-[11px] text-amber-800/80 bg-amber-100 px-2.5 py-1 rounded-full self-start sm:self-auto font-medium">
              Bấm biểu tượng 🗑️ trên từng note để xóa ngay
            </span>
          </div>
        )}

        {/* Board Display (Corkboard/Preschool wall) */}
        <div className="relative bg-[var(--grad-end)] rounded-3xl p-6 sm:p-10 border-4 border-[var(--dominant)]/60 shadow-2xl shadow-[var(--dominant)]/10 min-h-[420px]">
          
          {/* Subtle corkboard / pattern effect */}
          <div className="absolute inset-0 opacity-25 pointer-events-none rounded-3xl bg-[radial-gradient(var(--dominant)_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
            {notes.map((note) => {
              const theme = COLOR_MAP[note.color] || COLOR_MAP.pink;
              const isConfirmingThis = confirmDeleteId === note.id;

              return (
                <div
                  key={note.id}
                  style={{ transform: `rotate(${note.rotationDeg}deg)` }}
                  className={`group relative ${theme.bg} ${theme.border} ${theme.text} rounded-2xl p-5 border-2 shadow-md hover:shadow-xl hover:scale-105 hover:rotate-0 transition-all duration-300 flex flex-col justify-between min-h-[190px]`}
                >
                  {/* Decorative washi tape on top */}
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-xs ${theme.tape} opacity-85 shadow-xs border border-white/50 backdrop-blur-xs`}
                  ></div>

                  {/* Admin Quick Delete Control */}
                  {isAdminLoggedIn && onDeleteNote && (
                    <div className="absolute top-2 right-2 z-20" onClick={(e) => e.stopPropagation()}>
                      {isConfirmingThis ? (
                        <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-lg border border-red-300 animate-scaleUp">
                          <button
                            onClick={() => triggerDelete(note.id)}
                            className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                            title="Xác nhận xóa mẩu note này"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Xóa</span>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-semibold transition-all cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(note.id)}
                          className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-600 hover:text-white transition-all cursor-pointer shadow-xs border border-red-300/40"
                          title="Xóa Note này (Quyền Admin)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  <div>
                    {/* Sticker & Author */}
                    <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">{note.sticker}</span>
                        <span className="font-bold text-xs truncate max-w-[130px]">
                          {note.author}
                        </span>
                      </div>
                      <span className="text-[10px] opacity-60">
                        {note.createdAt}
                      </span>
                    </div>

                    {/* Note Content */}
                    <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4 whitespace-pre-wrap font-['Comfortaa']">
                      {note.content}
                    </p>
                  </div>

                  {/* Footer with Like Button */}
                  <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                    <span className="text-[10px] opacity-60">
                      Gửi gắm yêu thương
                    </span>
                    <button
                      onClick={(e) => handleLike(e, note.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white text-xs font-bold text-red-500 shadow-2xs border border-white transition-all cursor-pointer"
                      title="Thả tim cho note"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{note.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {notes.length === 0 && (
            <div className="text-center py-16 px-4 max-w-md mx-auto relative z-10">
              <div className="w-16 h-16 rounded-3xl bg-white/80 border-2 border-[var(--dominant)] shadow-sm mx-auto flex items-center justify-center text-3xl mb-3 animate-bounce">
                📝
              </div>
              <p className="font-['Comfortaa'] text-base font-bold text-[var(--text-main)] mb-1.5">
                Bức tường lớp mầm đang đợi giấy dán của bạn!
              </p>
              <p className="text-xs text-[var(--text-main)]/70 mb-5 leading-relaxed">
                Hãy là người đầu tiên dán mẩu giấy sắc màu gửi lời nhắn, lời chúc ngoan hay cổ vũ tới các bé rắn và Cô Chủ Nhiệm nhé! 🌸🍼🐍
              </p>
              <button
                onClick={() => { sound.playChime('pop'); setModalOpen(true); }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] text-xs font-bold shadow-md hover:brightness-105 cursor-pointer transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Dán Mẩu Giấy Đầu Tiên Nào!</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Modal: Add Sticky Note */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-[var(--grad-end)] rounded-3xl p-6 shadow-2xl border-3 border-[var(--dominant)] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--dominant)]/50">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                  Viết Sticky Note Mới
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[var(--grad-end)] hover:bg-[var(--dominant)] flex items-center justify-center text-[var(--text-main)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nickname */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                  Biệt danh của bạn
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ví dụ: Fan bự của bé Bạch, Phụ huynh số 1..."
                  maxLength={25}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[var(--dominant)]/60 text-xs text-[var(--text-main)] focus:border-[var(--dominant)] outline-hidden"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1.5">
                  Chọn màu giấy note
                </label>
                <div className="flex gap-2">
                  {(Object.keys(COLOR_MAP) as StickyColor[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-9 h-9 rounded-xl border-2 transition-all cursor-pointer ${
                        COLOR_MAP[c].bg
                      } ${
                        color === c ? 'border-[var(--dominant)] scale-110 shadow-sm ring-2 ring-[var(--dominant)]/30' : 'border-transparent opacity-80'
                      }`}
                      aria-label={`Màu ${c}`}
                    />
                  ))}
                </div>
              </div>

              {/* Sticker Emoji Picker */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1.5">
                  Gắn sticker đáng yêu
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {STICKERS.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSticker(st)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-all cursor-pointer ${
                        sticker === st ? 'bg-white shadow-md border-2 border-[var(--dominant)] scale-110' : 'bg-white/60 hover:bg-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Content */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">
                    Lời nhắn nhủ cổ vũ (tối đa 150 chữ)
                  </label>
                  <span className="text-[10px] text-[var(--text-main)]/60">{content.length}/150</span>
                </div>
                <textarea
                  required
                  rows={3}
                  maxLength={150}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết điều gì đó thật ấm áp gửi tới lớp mầm non nha..."
                  className="w-full p-3 rounded-xl bg-white border border-[var(--dominant)]/60 text-xs text-[var(--text-main)] focus:border-[var(--dominant)] outline-hidden resize-none leading-relaxed"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!content.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] font-bold text-sm shadow-md hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
              >
                Dán Lên Tường Ngay!
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Action Toast Notification */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-gray-900/90 backdrop-blur-xs text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionToast}</span>
        </div>
      )}

    </section>
  );
};
