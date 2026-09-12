import React, { useState } from 'react';
import { Send, MessageSquareHeart, Heart, Sparkles, CheckCircle2, User, HelpCircle, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InboxMessage, Character } from '../types';
import { sound } from '../utils/audio';

interface SecretInboxSectionProps {
  messages: InboxMessage[];
  characters: Character[];
  onSubmitMessage: (newMessage: Omit<InboxMessage, 'id' | 'timestamp' | 'status' | 'likesCount'>) => void;
  onLikeMessage: (messageId: string) => void;
}

export const SecretInboxSection: React.FC<SecretInboxSectionProps> = ({
  messages,
  characters,
  onSubmitMessage,
  onLikeMessage
}) => {
  const [recipient, setRecipient] = useState<string>('Cô Giáo Chủ Nhiệm');
  const [senderNickname, setSenderNickname] = useState<string>('');
  const [category, setCategory] = useState<InboxMessage['category']>('Tỏ tình');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);
  const [filterRecipient, setFilterRecipient] = useState<string>('Tất cả');

  // Approved messages for display queue
  const approvedMessages = messages.filter((m) => m.status === 'approved');

  const filteredApprovedMessages = approvedMessages.filter((m) => {
    if (filterRecipient === 'Tất cả') return true;
    return m.recipient === filterRecipient;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    sound.playChime('paper');

    setTimeout(() => {
      onSubmitMessage({
        recipient,
        senderNickname: senderNickname.trim() || 'Bé Ẩn Danh Dễ Thương',
        category,
        content: content.trim()
      });

      setContent('');
      setSenderNickname('');
      setIsSubmitting(false);
      setShowSuccessNotice(true);
      sound.playChime('love');

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['var(--dominant)', 'var(--dominant)', 'var(--dominant)', 'var(--grad-start)']
      });

      setTimeout(() => setShowSuccessNotice(false), 5000);
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
            Hộp Thư Ẩn Danh Lớp Mầm Non
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
                  Không để lộ danh tính thật • Hoàn toàn bảo mật
                </p>
              </div>
            </div>

            {showSuccessNotice && (
              <div className="mb-4 p-3.5 rounded-2xl bg-[var(--accent)] border border-[var(--dominant)] text-[var(--text-main)] text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[var(--text-main)] shrink-0" />
                <span>
                  Đã gửi thư thành công vào hòm thư lớp! Cô Giáo sẽ duyệt và trả lời sớm nha!
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Recipient Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1.5">
                  Gửi tới ai trong lớp?
                </label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/60 text-xs font-bold text-[var(--text-main)] focus:border-[var(--dominant)] focus:bg-white outline-hidden cursor-pointer"
                >
                  <option value="Cô Giáo Chủ Nhiệm">✨ Cô Giáo Chủ Nhiệm (Xà Nữ Bắt Chồng)</option>
                  <optgroup label="Các Bé Rắn">
                    {characters.map((char) => (
                      <option key={char.id} value={char.name}>
                        🐍 {char.name} ({char.nickname})
                      </option>
                    ))}
                  </optgroup>
                </select>
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

          {/* DISPLAY QUEUE: Approved Fan Mail Showcase (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-7 shadow-xl shadow-[var(--dominant)]/10 border-2 border-[var(--dominant)]/60">
              
              {/* Filter bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--dominant)]/40">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💌</span>
                  <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                    Thư Đã Được Phản Hồi ({approvedMessages.length})
                  </h3>
                </div>

                {/* Filter by recipient */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[var(--text-main)]" />
                  <select
                    value={filterRecipient}
                    onChange={(e) => setFilterRecipient(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs font-semibold text-[var(--text-main)] focus:border-[var(--dominant)] outline-hidden cursor-pointer"
                  >
                    <option value="Tất cả">Tất cả người nhận</option>
                    <option value="Cô Giáo Chủ Nhiệm">Cô Giáo Chủ Nhiệm</option>
                    {characters.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Messages List */}
              {filteredApprovedMessages.length === 0 ? (
                <div className="text-center py-12 px-4 bg-[var(--grad-end)] rounded-2xl border-2 border-dashed border-[var(--dominant)]">
                  <div className="text-3xl mb-2 animate-bounce">💌</div>
                  <p className="font-['Comfortaa'] text-sm font-bold text-[var(--text-main)] mb-1">
                    Hòm thư công khai đang chờ câu hỏi đầu tiên!
                  </p>
                  <p className="text-xs text-[var(--text-main)]/70 leading-relaxed max-w-sm mx-auto">
                    Mọi câu hỏi, lời nhắn nhủ hay tâm sự dễ thương bạn gửi ở cột bên trái sẽ được Cô Chủ Nhiệm và các bé rắn trả lời và đăng tải tại đây nha! 🐍✨
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {filteredApprovedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-[var(--grad-end)] rounded-2xl p-4 sm:p-5 border border-[var(--dominant)]/50 shadow-xs hover:border-[var(--dominant)]/60 transition-all space-y-3"
                    >
                      {/* Message Meta */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--text-main)] bg-[var(--grad-end)] px-2.5 py-0.5 rounded-full border border-[var(--dominant)]">
                            {msg.category}
                          </span>
                          <span className="text-[var(--text-main)]/60 font-medium">
                            Tới: <strong className="text-[var(--text-main)]">{msg.recipient}</strong>
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

                      {/* Creator Reply Bubble */}
                      {msg.reply && (
                        <div className="relative bg-gradient-to-r from-[var(--grad-start)] to-[var(--grad-start)] p-3.5 rounded-xl border border-[var(--dominant)] text-xs sm:text-sm text-[var(--text-main)] leading-relaxed ml-3 sm:ml-5">
                          <div className="flex items-center gap-1.5 font-bold text-[var(--text-main)] text-xs mb-1">
                            <span>👑</span>
                            <span>Phản hồi từ {msg.recipient}:</span>
                          </div>
                          <p className="italic">{msg.reply}</p>
                        </div>
                      )}

                      {/* Footer: Like counter */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-[11px] text-[var(--text-main)] bg-[var(--accent)] px-2.5 py-0.5 rounded-full border border-[var(--dominant)] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[var(--text-main)]" /> Đã phản hồi
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
          </div>

        </div>

      </div>
    </section>
  );
};
