import React, { useState, useEffect } from 'react';
import { Send, MessageSquareHeart, Heart, Sparkles, CheckCircle2, User, HelpCircle, Filter, Lock, Globe, Trash2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InboxMessage, Character } from '../types';
import { sound } from '../utils/audio';
import { storage } from '../utils/storage';

interface SecretInboxSectionProps {
  messages: InboxMessage[];
  characters: Character[];
  onSubmitMessage: (newMessage: Omit<InboxMessage, 'id' | 'timestamp' | 'status' | 'likesCount'>) => void;
  onLikeMessage: (messageId: string) => void;
  isAdminLoggedIn?: boolean;
  onDeleteMessage?: (messageId: string) => void;
  initialRecipient?: string;
}

export const SecretInboxSection: React.FC<SecretInboxSectionProps> = ({
  messages,
  characters,
  onSubmitMessage,
  onLikeMessage,
  isAdminLoggedIn,
  onDeleteMessage,
  initialRecipient
}) => {
  const [recipient, setRecipient] = useState<string>(initialRecipient || 'Tất cả');
  const [senderNickname, setSenderNickname] = useState<string>('');
  const [category, setCategory] = useState<InboxMessage['category']>('Tỏ tình');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeMailboxTab, setActiveMailboxTab] = useState<'public' | 'private'>('public');

  useEffect(() => {
    if (initialRecipient) {
      setRecipient(initialRecipient);
    }
  }, [initialRecipient]);

  // Visitor ID & sent letters tracking from localStorage
  const visitorId = storage.getVisitorId();
  const mySentLetterIds = storage.getMySentLetterIds();

  // 1. PUBLIC SHOWCASE: Strictly only messages where recipient is "Tất cả" (or legacy "Tất cả lớp Mầm Non")
  const publicMessages = messages.filter((m) => {
    const isPublicRecipient = m.recipient === 'Tất cả' || m.recipient === 'Tất cả lớp Mầm Non';
    if (!isPublicRecipient) return false;
    return m.status === 'approved' || isAdminLoggedIn;
  });

  // 2. PRIVATE TO TEACHER: Only letters sent to "Cô Giáo Chủ Nhiệm"
  // For visitor: only messages they sent (matched by senderId or localStorage mySentLetterIds)
  // For admin: can see all letters sent to Cô Giáo
  const privateLettersToTeacher = messages.filter((m) => {
    if (m.recipient !== 'Cô Giáo Chủ Nhiệm') return false;
    if (isAdminLoggedIn) return true;
    return (m.senderId && m.senderId === visitorId) || mySentLetterIds.includes(m.id);
  });

  // Check if visitor has private replies to notify them
  const hasNewPrivateReplies = privateLettersToTeacher.some((m) => !!m.reply);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    sound.playChime('paper');

    setTimeout(() => {
      const curRecipient = recipient;
      onSubmitMessage({
        recipient: curRecipient,
        senderNickname: senderNickname.trim() || 'Bé Ẩn Danh Dễ Thương',
        category,
        content: content.trim(),
        senderId: visitorId
      });

      setContent('');
      setSenderNickname('');
      setIsSubmitting(false);

      if (curRecipient === 'Tất cả') {
        setSuccessMessage('Đã gửi thư tới Tất cả thành công! Thư sẽ được duyệt và đăng công khai trên hòm thư chung nha! 🌸');
        setActiveMailboxTab('public');
      } else if (curRecipient === 'Cô Giáo Chủ Nhiệm') {
        setSuccessMessage('Đã gửi thư riêng tới Cô Giáo thành công! Thư được giữ bí mật 100%, chỉ Cô Giáo đọc được. Hãy xem câu trả lời tại tab "Thư Riêng Của Bạn" nha! 💌');
        setActiveMailboxTab('private');
      } else {
        setSuccessMessage(`Đã gửi thư riêng cho bé ${curRecipient}! Thư sẽ được hiển thị trong sổ hồ sơ chi tiết của bé (mục Các Nhân Vật) nha! 🐍✨`);
      }

      sound.playChime('love');
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['var(--dominant)', 'var(--dominant)', 'var(--dominant)', 'var(--grad-start)']
      });

      setTimeout(() => setSuccessMessage(null), 6000);
    }, 400);
  };

  const categories: InboxMessage['category'][] = [
    'Tỏ tình',
    'Gợi ý cốt truyện',
    'Hỏi thăm sức khỏe',
    'Tâm sự tuổi hồng',
    'Câu hỏi bí mật'
  ];

  return (
    <section id="inbox-section" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] font-bold text-xs mb-2 border border-[var(--dominant)]">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[var(--text-main)]" />
            <span>Hòm Thư Bé Ngoan Lớp Mầm</span>
          </div>
          <h2 className="font-['Comfortaa'] font-bold text-2xl sm:text-4xl text-[var(--text-main)]">
            Hộp Thư Ẩn Danh Lớp Mầm Non Rắn Con
          </h2>
          <p className="text-sm text-[var(--text-main)]/80 font-medium mt-1">
            Gửi tâm sự, câu hỏi khó đỡ hay lời tỏ tình 100% ẩn danh tới Cô Chủ Nhiệm và các bé rắn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FORM: Send Anonymous Fan Mail (5 cols) */}
          <div className="lg:col-span-5 bg-white/95 rounded-3xl p-6 sm:p-7 shadow-xl shadow-[var(--dominant)]/10 border-2 border-[var(--dominant)]/60 relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--dominant)] to-[var(--accent)] flex items-center justify-center text-xl text-[var(--text-main)] shadow-xs">
                📬
              </div>
              <div>
                <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                  Viết Thư Ẩn Danh
                </h3>
                <p className="text-xs text-[var(--text-main)]/70">
                  Không để lộ danh tính thật • Bảo mật theo đối tượng nhận
                </p>
              </div>
            </div>

            {successMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-[var(--accent)] border border-[var(--dominant)] text-[var(--text-main)] text-xs flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[var(--text-main)] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-semibold">
                  {successMessage}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Recipient Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1.5 flex items-center justify-between">
                  <span>Gửi tới ai?</span>
                  <span className="text-[11px] font-normal text-[var(--text-main)]/70">
                    {recipient === 'Tất cả' && '🌟 Công khai'}
                    {recipient === 'Cô Giáo Chủ Nhiệm' && '🔒 Chỉ Cô đọc & phản hồi riêng'}
                    {recipient !== 'Tất cả' && recipient !== 'Cô Giáo Chủ Nhiệm' && '🐍 Hiện trong trang của bé'}
                  </span>
                </label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/60 text-xs font-bold text-[var(--text-main)] focus:border-[var(--dominant)] focus:bg-white outline-hidden cursor-pointer"
                >
                  <option value="Tất cả">🌟 Tất cả (Công khai trên Bảng Tin Hòm Thư)</option>
                  <option value="Cô Giáo Chủ Nhiệm">🔒 Cô Giáo Chủ Nhiệm (Bí mật - Chỉ Cô Giáo đọc & phản hồi riêng cho bạn)</option>
                  <optgroup label="Thư gửi riêng cho từng bé (Hiện trong hồ sơ của bé)">
                    {characters.map((char) => (
                      <option key={char.id} value={char.name}>
                        🐍 Bé {char.name} ({char.nickname})
                      </option>
                    ))}
                  </optgroup>
                </select>

                {/* Recipient Scope Helper Hint */}
                <div className="mt-2 p-2.5 rounded-xl bg-[var(--grad-end)]/70 border border-[var(--dominant)]/40 text-[11px] text-[var(--text-main)] leading-relaxed">
                  {recipient === 'Tất cả' && (
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span><strong>Chế độ công khai:</strong> Thư gửi &quot;Tất cả&quot; sẽ được kiểm duyệt và hiển thị công khai trên Bảng Tin Hòm Thư cho toàn thể lớp cùng đọc.</span>
                    </span>
                  )}
                  {recipient === 'Cô Giáo Chủ Nhiệm' && (
                    <span className="flex items-center gap-1.5 text-purple-900 font-medium">
                      <Lock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span><strong>Bí mật 100%:</strong> Chỉ tài khoản Admin Cô Giáo mới đọc được. Cô sẽ phản hồi riêng và chỉ thiết bị của bạn xem được tại tab <strong>&quot;Thư Riêng Của Bạn&quot;</strong>!</span>
                    </span>
                  )}
                  {recipient !== 'Tất cả' && recipient !== 'Cô Giáo Chủ Nhiệm' && (
                    <span className="flex items-center gap-1.5 text-emerald-900 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Hồ sơ nhân vật:</strong> Thư gửi riêng cho bé <strong>{recipient}</strong> sẽ hiển thị trực tiếp trong sổ hồ sơ chi tiết của bé (khi bấm vào thẻ bé ở mục Các Nhân Vật)!</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Category Pills */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1.5">
                  Chủ đề thư
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-xs font-bold'
                          : 'bg-[var(--grad-end)] text-[var(--text-main)] hover:bg-[var(--grad-end)] border border-[var(--dominant)]/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nickname (optional) */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                  Biệt danh ẩn danh của bạn (tùy chọn)
                </label>
                <input
                  type="text"
                  value={senderNickname}
                  onChange={(e) => setSenderNickname(e.target.value)}
                  placeholder="Ví dụ: Bé Hâm Mộ Giấu Tên, Chị Gái Qua Đường..."
                  maxLength={30}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/60 text-xs text-[var(--text-main)] focus:border-[var(--dominant)] focus:bg-white outline-hidden"
                />
              </div>

              {/* Message Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">
                    Nội dung thư
                  </label>
                  <span className="text-[11px] text-[var(--text-main)]/60">
                    {content.length}/500
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  maxLength={500}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết lời nhắn nhủ, tỏ tình, gợi ý tình tiết hoặc thắc mắc của bạn..."
                  className="w-full p-3.5 rounded-2xl bg-[var(--grad-end)] border border-[var(--dominant)]/60 text-xs text-[var(--text-main)] focus:border-[var(--dominant)] focus:bg-white outline-hidden resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] font-bold text-sm shadow-md shadow-[var(--dominant)]/25 hover:brightness-105 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang bỏ phong bì...' : 'Thả Thư Vào Hòm'}</span>
              </button>
            </form>
          </div>

          {/* DISPLAY QUEUE: Showcase Tabs (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-7 shadow-xl shadow-[var(--dominant)]/10 border-2 border-[var(--dominant)]/60">
              
              {/* Top Selector Tabs */}
              <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-[var(--dominant)]/40">
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Tab 1: Public mailbox (Only "Tất cả") */}
                  <button
                    onClick={() => { sound.playChime('pop'); setActiveMailboxTab('public'); }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeMailboxTab === 'public'
                        ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] shadow-xs'
                        : 'bg-[var(--grad-end)] text-[var(--text-main)]/70 hover:text-[var(--text-main)] border border-[var(--dominant)]/40'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Hòm Thư Công Khai ({publicMessages.length})</span>
                  </button>

                  {/* Tab 2: Private letters to Teacher */}
                  <button
                    onClick={() => { sound.playChime('pop'); setActiveMailboxTab('private'); }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                      activeMailboxTab === 'private'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Thư Riêng Bạn Gửi Cô Giáo ({privateLettersToTeacher.length})</span>
                    {hasNewPrivateReplies && (
                      <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping absolute -top-0.5 -right-0.5"></span>
                    )}
                  </button>

                </div>
              </div>

              {/* TAB 1: PUBLIC SHOWCASE (STRICTLY ONLY 'Tất cả') */}
              {activeMailboxTab === 'public' && (
                <div>
                  {publicMessages.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-[var(--grad-end)] rounded-2xl border-2 border-dashed border-[var(--dominant)]">
                      <div className="text-3xl mb-2 animate-bounce">💌</div>
                      <p className="font-['Comfortaa'] text-sm font-bold text-[var(--text-main)] mb-1">
                        Hòm thư công khai đang chờ lá thư đầu tiên gửi &quot;Tất cả&quot;!
                      </p>
                      <p className="text-xs text-[var(--text-main)]/70 leading-relaxed max-w-sm mx-auto">
                        Chỉ những lá thư chọn người nhận là <strong>&quot;Tất cả&quot;</strong> mới được duyệt và hiển thị công khai tại đây. Thư gửi Cô Giáo sẽ được giữ bí mật, còn thư gửi các bé sẽ nằm trong hồ sơ của từng bé! 🌸🍼🐍
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                      {publicMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="bg-[var(--grad-end)] rounded-2xl p-4 sm:p-5 border border-[var(--dominant)]/50 shadow-xs hover:border-[var(--dominant)]/60 transition-all space-y-3 relative"
                        >
                          {/* Admin Quick Delete */}
                          {isAdminLoggedIn && onDeleteMessage && (
                            <button
                              onClick={() => {
                                if (window.confirm('Admin: Bạn có chắc muốn xóa lá thư công khai này?')) {
                                  sound.playChime('pop');
                                  onDeleteMessage(msg.id);
                                }
                              }}
                              className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all cursor-pointer"
                              title="Xóa thư này (Quyền Admin)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Message Meta */}
                          <div className="flex items-center justify-between text-xs pr-7">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[var(--text-main)] bg-white px-2.5 py-0.5 rounded-full border border-[var(--dominant)]/50">
                                {msg.category}
                              </span>
                              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Công khai cả lớp
                              </span>
                            </div>
                            <span className="text-[11px] text-[var(--text-main)]/60">
                              {msg.timestamp}
                            </span>
                          </div>

                          {/* Question / Fan note content */}
                          <div className="bg-white p-3.5 rounded-xl border border-[var(--dominant)]/40 text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                            <span className="font-bold text-[var(--text-main)] mr-1">
                              {msg.senderNickname}:
                            </span>
                            <span>{msg.content}</span>
                          </div>

                          {/* Reply Bubble */}
                          {msg.reply && (
                            <div className="relative bg-gradient-to-r from-[var(--grad-start)] to-[var(--grad-start)] p-3.5 rounded-xl border border-[var(--dominant)] text-xs sm:text-sm text-[var(--text-main)] leading-relaxed ml-3 sm:ml-5">
                              <div className="flex items-center gap-1.5 font-bold text-[var(--text-main)] text-xs mb-1">
                                <span>👑</span>
                                <span>Phản hồi từ Cô Chủ Nhiệm & Cả Lớp:</span>
                              </div>
                              <p className="italic">{msg.reply}</p>
                            </div>
                          )}

                          {/* Footer: Like counter */}
                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-[11px] text-[var(--text-main)] bg-[var(--accent)] px-2.5 py-0.5 rounded-full border border-[var(--dominant)] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-[var(--text-main)]" /> {msg.reply ? 'Đã phản hồi' : 'Đã duyệt công khai'}
                            </span>

                            <button
                              onClick={() => { sound.playChime('love'); onLikeMessage(msg.id); }}
                              className="flex items-center gap-1 text-xs font-bold text-[var(--text-main)] hover:text-[var(--text-main)] bg-white px-2.5 py-1 rounded-full border border-[var(--dominant)] cursor-pointer shadow-2xs"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current text-pink-500" />
                              <span>{msg.likesCount} Thả tim</span>
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PRIVATE TO TEACHER (ONLY VISITOR + ADMIN) */}
              {activeMailboxTab === 'private' && (
                <div>
                  <div className="mb-4 p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Hộp Thư Riêng Bí Mật:</strong> Đây là các lá thư bạn gửi trực tiếp cho Cô Giáo Chủ Nhiệm. Thư này không hiển thị công khai. Chỉ tài khoản Admin Cô Giáo đọc được và câu trả lời riêng cho bạn sẽ hiển thị ngay bên dưới!
                    </p>
                  </div>

                  {privateLettersToTeacher.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-purple-50/50 rounded-2xl border-2 border-dashed border-purple-200">
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mx-auto mb-3 shadow-2xs">
                        🔒
                      </div>
                      <p className="font-['Comfortaa'] text-sm font-bold text-purple-900 mb-1">
                        Bạn chưa gửi lá thư bí mật nào cho Cô Giáo!
                      </p>
                      <p className="text-xs text-purple-700/80 leading-relaxed max-w-sm mx-auto mb-4">
                        Khi bạn gửi thư ở cột bên trái và chọn người nhận là <strong>&quot;Cô Giáo Chủ Nhiệm&quot;</strong>, thư sẽ được bảo mật tuyệt đối và xuất hiện riêng tại đây để bạn chờ phản hồi từ Cô nha!
                      </p>
                      <button
                        onClick={() => setRecipient('Cô Giáo Chủ Nhiệm')}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-xs hover:bg-purple-700 cursor-pointer"
                      >
                        Chọn Viết Thư Riêng Cho Cô Ngay
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                      {privateLettersToTeacher.map((msg) => (
                        <div
                          key={msg.id}
                          className="bg-purple-50/70 rounded-2xl p-4 sm:p-5 border-2 border-purple-200 shadow-xs space-y-3 relative"
                        >
                          {/* Delete Button (Owner or Admin) */}
                          {onDeleteMessage && (
                            <button
                              onClick={() => {
                                if (window.confirm('Xóa lá thư riêng tư này?')) {
                                  sound.playChime('pop');
                                  onDeleteMessage(msg.id);
                                }
                              }}
                              className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/80 hover:bg-red-500 text-red-500 hover:text-white transition-all cursor-pointer border border-purple-200"
                              title="Xóa thư riêng này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Header */}
                          <div className="flex items-center justify-between text-xs pr-7">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-purple-900 bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                                {msg.category}
                              </span>
                              <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                                <Lock className="w-3 h-3 text-purple-600" /> Thư riêng Cô Chủ Nhiệm
                              </span>
                            </div>
                            <span className="text-[11px] text-purple-800/60">
                              {msg.timestamp}
                            </span>
                          </div>

                          {/* Sent content */}
                          <div className="bg-white p-3.5 rounded-xl border border-purple-200 text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                            <span className="font-bold text-purple-950 mr-1">
                              {msg.senderNickname} (Bạn):
                            </span>
                            <span>{msg.content}</span>
                          </div>

                          {/* Cô Giáo's Private Reply */}
                          {msg.reply ? (
                            <div className="bg-white p-4 rounded-xl border-2 border-purple-300 shadow-xs text-xs sm:text-sm text-purple-950 leading-relaxed ml-2 sm:ml-4">
                              <div className="flex items-center gap-1.5 font-bold text-purple-900 text-xs mb-1.5 pb-1 border-b border-purple-100">
                                <span>👩‍🏫</span>
                                <span>Lời phản hồi riêng tư từ Cô Giáo Chủ Nhiệm:</span>
                                {msg.repliedAt && (
                                  <span className="text-[10px] text-purple-600/70 font-normal ml-auto">
                                    {msg.repliedAt}
                                  </span>
                                )}
                              </div>
                              <p className="font-medium text-purple-950 whitespace-pre-wrap">
                                {msg.reply}
                              </p>
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-spin" />
                              <span>
                                Đã chuyển tới bàn làm việc của Cô Giáo. Cô sẽ đọc và viết thư phản hồi riêng cho bạn sớm nhất nha! 💌
                              </span>
                            </div>
                          )}

                          <div className="text-[10px] text-purple-700/60 flex items-center justify-between pt-1">
                            <span>Mã thư: #{msg.id.slice(-6)} (Bảo mật cho bạn)</span>
                            {msg.reply && (
                              <span className="font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Cô đã hồi đáp
                              </span>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
