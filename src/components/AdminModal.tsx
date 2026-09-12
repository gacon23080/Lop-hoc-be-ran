import React, { useState, useRef } from 'react';
import {
  Lock,
  Unlock,
  X,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  Sparkles,
  Save,
  MessageSquare,
  Baby,
  Sliders,
  CheckCircle2,
  Upload,
  Music,
  ExternalLink,
  StickyNote as StickyIcon
} from 'lucide-react';
import {
  Character,
  InboxMessage,
  BulletinPost,
  CreatorProfile,
  StickyNote
} from '../types';
import { sound } from '../utils/audio';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;

  characters: Character[];
  onSaveCharacter: (char: Character) => void;
  onDeleteCharacter: (charId: string) => void;

  inboxMessages: InboxMessage[];
  onApproveInboxMessage: (msgId: string, replyText?: string) => void;
  onDeleteInboxMessage: (msgId: string) => void;

  bulletinPosts: BulletinPost[];
  onSaveBulletinPosts: (posts: BulletinPost[]) => void;

  creatorProfile: CreatorProfile;
  onSaveCreatorProfile: (profile: CreatorProfile) => void;

  stickyNotes: StickyNote[];
  onDeleteStickyNote: (noteId: string) => void;

  onResetDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLoginSuccess,
  onLogout,
  characters,
  onSaveCharacter,
  onDeleteCharacter,
  inboxMessages,
  onApproveInboxMessage,
  onDeleteInboxMessage,
  bulletinPosts,
  onSaveBulletinPosts,
  creatorProfile,
  onSaveCreatorProfile,
  stickyNotes,
  onDeleteStickyNote,
  onResetDefaults
}) => {
  // Login form state (no hints or exposed passwords)
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'characters' | 'inbox' | 'classroom' | 'stickies'>('characters');

  // Character editing/creating state
  const [editingChar, setEditingChar] = useState<Character | null>(null);
  const [isCreatingChar, setIsCreatingChar] = useState(false);

  // File input refs for image upload
  const charImageInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  // Inbox reply modal state
  const [replyingMsg, setReplyingMsg] = useState<InboxMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  // Classroom settings draft state
  const [draftProfile, setDraftProfile] = useState<CreatorProfile>(creatorProfile);
  const [draftBulletin, setDraftBulletin] = useState<BulletinPost[]>(bulletinPosts);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle password submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'khanhvi23082010') {
      sound.playChime('admin');
      setLoginError(false);
      setPasswordInput('');
      onLoginSuccess();
    } else {
      sound.playChime('pop');
      setLoginError(true);
    }
  };

  // Initialize new blank character
  const handleStartCreateChar = () => {
    sound.playChime('pop');
    setEditingChar({
      id: 'char-' + Date.now(),
      name: '',
      nickname: '',
      title: 'Học Sinh Mới',
      gender: 'Bé Trai',
      age: '4 tuổi',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      youtubeMusicUrl: '',
      customLinkUrl: '',
      customLinkName: 'Link ggai',
      tags: ['#Chữa lành', '#Hài hước'],
      personality: 'Vui vẻ, hoạt bát, ngoan ngoãn và thích kết bạn với mọi người.',
      likes: 'Bánh ngọt, sữa ấm',
      dislikes: 'Bị bạn giấu đồ chơi',
      obedienceRate: 95,
      likesCount: 0,
      fullBio: 'Bé rắn mới chuyển tới lớp Mầm Non Rắn Con.',
      badgeLabel: 'Bé Mới Đến'
    });
    setIsCreatingChar(true);
  };

  // Upload character image from local machine
  const handleCharImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingChar) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      if (typeof loadEvt.target?.result === 'string') {
        setEditingChar({ ...editingChar, avatarUrl: loadEvt.target.result });
        showToast('Đã tải ảnh lên thành công!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload profile image from local machine
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      if (typeof loadEvt.target?.result === 'string') {
        setDraftProfile({ ...draftProfile, avatarUrl: loadEvt.target.result });
        showToast('Đã cập nhật ảnh đại diện cô giáo!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCharSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChar || !editingChar.name.trim()) return;

    sound.playChime('bell');
    onSaveCharacter(editingChar);
    setEditingChar(null);
    setIsCreatingChar(false);
    showToast('Đã lưu thông tin bé rắn thành công!');
  };

  const handleOpenReplyModal = (msg: InboxMessage) => {
    setReplyingMsg(msg);
    setReplyText(msg.reply || '');
  };

  const handleSaveReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingMsg) return;

    sound.playChime('bell');
    onApproveInboxMessage(replyingMsg.id, replyText.trim());
    setReplyingMsg(null);
    setReplyText('');
    showToast('Đã duyệt và lưu phản hồi thành công!');
  };

  const handleSaveClassroomSettings = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime('bell');
    onSaveCreatorProfile(draftProfile);
    onSaveBulletinPosts(draftBulletin);
    showToast('Đã cập nhật thông tin lớp học và bảng tin!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl bg-[var(--grad-end)] rounded-3xl shadow-2xl border-4 border-[var(--dominant)]/60 overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[var(--text-main)] text-[var(--text-main)] px-5 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-[var(--text-main)]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[var(--dominant)] via-[#D8B4E5] to-[var(--grad-start)] px-6 py-4 text-[var(--text-main)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center text-lg backdrop-blur-xs">
              {isAdminLoggedIn ? <Unlock className="w-5 h-5 text-[var(--text-main)]" /> : <Lock className="w-5 h-5 text-[var(--text-main)]" />}
            </div>
            <div>
              <h2 className="font-['Comfortaa'] font-bold text-lg sm:text-xl">
                Phòng Quản Trị Lớp Mầm Non Rắn Con
              </h2>
              <p className="text-[var(--text-main)]/85 text-xs">
                {isAdminLoggedIn ? 'Đã xác thực quyền quản trị viên lớp học' : 'Khu vực dành riêng cho Ban Giám Hiệu & Cô Chủ Nhiệm'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={() => { sound.playChime('pop'); onLogout(); }}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-semibold text-[var(--text-main)] cursor-pointer transition-all"
              >
                Đăng Xuất
              </button>
            )}
            <button
              onClick={() => { sound.playChime('pop'); onClose(); }}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-[var(--text-main)] cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOT LOGGED IN: Password Authentication Screen */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-[var(--grad-end)] border-2 border-[var(--dominant)] shadow-inner flex items-center justify-center text-3xl mb-4">
              🔐
            </div>
            <h3 className="font-['Comfortaa'] font-bold text-xl text-[var(--text-main)] mb-2">
              Xác Thực Quản Trị Viên
            </h3>
            <p className="text-xs text-[var(--text-main)]/80 mb-6 leading-relaxed">
              Vui lòng nhập mã bảo mật của Cô Chủ Nhiệm để mở quyền chỉnh sửa nhân vật, quản lý thư ẩn danh và cập nhật bảng tin lớp.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  id="admin-password-input"
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
                  placeholder="Nhập mật khẩu quản trị..."
                  className={`w-full px-4 py-3 rounded-2xl bg-white border-2 text-center text-sm font-bold text-[var(--text-main)] tracking-widest outline-hidden transition-all ${
                    loginError ? 'border-red-400 bg-red-50/50' : 'border-[var(--dominant)] focus:border-[var(--dominant)]'
                  }`}
                  autoFocus
                />
                {loginError && (
                  <p className="text-xs text-red-500 font-semibold mt-2">
                    Mật khẩu không chính xác. Vui lòng kiểm tra lại!
                  </p>
                )}
              </div>

              <button
                type="submit"
                id="btn-admin-submit-login"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] font-bold text-sm shadow-md shadow-[var(--dominant)]/25 hover:brightness-105 transition-all cursor-pointer"
              >
                Mở Khóa Quản Trị
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN: Admin Control Panels */
          <div className="flex flex-col flex-1 min-h-0">
            
            {/* TABS NAVIGATION */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-[var(--dominant)]/50 bg-white/50 shrink-0 overflow-x-auto scrollbar-none">
              <button
                onClick={() => { sound.playChime('pop'); setActiveTab('characters'); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 border-x-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'characters'
                    ? 'bg-[var(--grad-end)] text-[var(--text-main)] border-[var(--dominant)] shadow-xs'
                    : 'bg-transparent text-[var(--text-main)]/60 border-transparent hover:text-[var(--text-main)]'
                }`}
              >
                <Baby className="w-4 h-4" />
                <span>Bé Rắn Lớp Học ({characters.length})</span>
              </button>

              <button
                onClick={() => { sound.playChime('pop'); setActiveTab('inbox'); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 border-x-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'inbox'
                    ? 'bg-[var(--grad-end)] text-[var(--text-main)] border-[var(--dominant)] shadow-xs'
                    : 'bg-transparent text-[var(--text-main)]/60 border-transparent hover:text-[var(--text-main)]'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hộp Thư Ẩn Danh ({inboxMessages.length})</span>
              </button>

              <button
                onClick={() => { sound.playChime('pop'); setActiveTab('classroom'); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 border-x-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'classroom'
                    ? 'bg-[var(--grad-end)] text-[var(--text-main)] border-[var(--dominant)] shadow-xs'
                    : 'bg-transparent text-[var(--text-main)]/60 border-transparent hover:text-[var(--text-main)]'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Tùy Chỉnh Lớp & Bảng Tin</span>
              </button>

              <button
                onClick={() => { sound.playChime('pop'); setActiveTab('stickies'); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 border-x-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'stickies'
                    ? 'bg-[var(--grad-end)] text-[var(--text-main)] border-[var(--dominant)] shadow-xs'
                    : 'bg-transparent text-[var(--text-main)]/60 border-transparent hover:text-[var(--text-main)]'
                }`}
              >
                <StickyIcon className="w-4 h-4" />
                <span>Sticky Note ({stickyNotes.length})</span>
              </button>
            </div>

            {/* TAB BODY (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* TAB 1: CHARACTERS CRUD */}
              {activeTab === 'characters' && (
                <div className="space-y-6">
                  {/* Class Size Quick Editor */}
                  <div className="bg-white/60 p-4 rounded-2xl border-2 border-[var(--dominant)] flex flex-wrap items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-[var(--dominant)] flex items-center justify-center text-xl shadow-2xs">
                        🏫
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                          <span>Sĩ Số Lớp Mầm Non Rắn Con</span>
                          <span className="px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--text-main)] text-[10px] border border-[var(--dominant)]">
                            Hiện tại: {draftProfile.totalStudents} bé
                          </span>
                        </div>
                        <div className="text-[11px] text-[var(--text-main)]">
                          Sĩ số này hiển thị công khai trên thanh thông báo lớp học và hồ sơ trường mầm non
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-[var(--dominant)]">
                        <span className="text-xs font-bold text-[var(--text-main)]">Sĩ số:</span>
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={draftProfile.totalStudents}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setDraftProfile(prev => ({ ...prev, totalStudents: val }));
                          }}
                          className="w-14 text-center text-xs font-bold text-[var(--text-main)] outline-hidden"
                        />
                        <span className="text-xs text-[var(--text-main)]/70 font-medium">bé</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSaveCreatorProfile(draftProfile);
                          showToast(`Đã lưu sĩ số lớp: ${draftProfile.totalStudents} bé!`);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] text-xs font-bold shadow-xs hover:brightness-105 cursor-pointer flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Lưu Sĩ Số</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                        Danh Sách Bé Rắn Trong Lớp ({characters.length} bé)
                      </h3>
                      <p className="text-xs text-[var(--text-main)]/70">
                        Chỉnh sửa hình ảnh, nhạc YouTube, link ggai và xóa/thêm bé rắn
                      </p>
                    </div>

                    <button
                      onClick={handleStartCreateChar}
                      id="btn-admin-add-character"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] font-bold text-xs shadow-xs hover:brightness-105 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm Bé Rắn Mới</span>
                    </button>
                  </div>

                  {/* Character Table/Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {characters.map((char) => (
                      <div
                        key={char.id}
                        className="bg-white rounded-2xl p-4 border border-[var(--dominant)]/50 shadow-xs flex items-center justify-between gap-4 hover:border-[var(--dominant)]/60 transition-all"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={char.avatarUrl}
                            alt={char.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-2xl object-cover border border-[var(--dominant)]/50 shrink-0 bg-white/60"
                          />
                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-sm text-[var(--text-main)] truncate">
                                {char.name}
                              </h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--text-main)] font-bold shrink-0 border border-[var(--dominant)]">
                                {char.gender}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-main)] font-medium truncate">
                              {char.nickname} • {char.title}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-[var(--text-main)]/70 pt-0.5">
                              {char.youtubeMusicUrl ? (
                                <span className="text-[var(--text-main)] font-semibold flex items-center gap-0.5">
                                  <Music className="w-3 h-3" /> Có nhạc
                                </span>
                              ) : (
                                <span className="text-gray-400">Chưa gắn nhạc</span>
                              )}
                              {char.customLinkUrl && (
                                <span className="text-[var(--text-main)] font-semibold flex items-center gap-0.5">
                                  <ExternalLink className="w-3 h-3" /> {char.customLinkName || 'Link'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => { sound.playChime('pop'); setEditingChar(char); setIsCreatingChar(false); }}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/60 hover:bg-[var(--accent)] text-[var(--text-main)] border border-[var(--dominant)] text-xs font-semibold cursor-pointer transition-all"
                            title="Sửa bé rắn"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Sửa</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc muốn xóa bé "${char.name}" khỏi danh sách lớp không?`)) {
                                sound.playChime('pop');
                                onDeleteCharacter(char.id);
                                showToast(`Đã xóa bé ${char.name}`);
                              }
                            }}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 text-xs font-semibold cursor-pointer transition-all"
                            title="Xóa bé rắn"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Xóa</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: INBOX MANAGER */}
              {activeTab === 'inbox' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                      Hộp Thư Ẩn Danh Cần Duyệt & Trả Lời
                    </h3>
                    <p className="text-xs text-[var(--text-main)]/70">
                      Xem thư từ độc giả, viết câu trả lời từ Cô Giáo hoặc các bé rắn và duyệt lên bảng công khai
                    </p>
                  </div>

                  <div className="space-y-3">
                    {inboxMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                          msg.status === 'approved'
                            ? 'bg-white border-[var(--dominant)]'
                            : 'bg-amber-50/50 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                msg.status === 'approved'
                                  ? 'bg-[var(--accent)] text-[var(--text-main)] border border-[var(--dominant)]'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {msg.status === 'approved' ? '✓ Đã Duyệt Công Khai' : '⏳ Chờ Duyệt'}
                            </span>
                            <span className="text-xs font-bold text-[var(--text-main)]">
                              Chủ đề: {msg.category}
                            </span>
                          </div>
                          <span className="text-[11px] text-[var(--text-main)]/50">
                            {msg.timestamp}
                          </span>
                        </div>

                        <div className="bg-[var(--grad-end)] p-3 rounded-xl border border-[var(--dominant)]/40 text-xs text-[var(--text-main)] mb-3">
                          <p className="font-bold text-[var(--text-main)] mb-1">
                            Người gửi: {msg.senderNickname} • Gửi đến: {msg.recipient}
                          </p>
                          <p>{msg.content}</p>
                        </div>

                        {msg.reply && (
                          <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200 text-xs text-[var(--text-main)] mb-3">
                            <span className="font-bold text-[var(--text-main)] block mb-0.5">
                              Câu trả lời từ {msg.recipient}:
                            </span>
                            <p className="italic">{msg.reply}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            onClick={() => handleOpenReplyModal(msg)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--dominant)] text-[var(--text-main)] text-xs font-bold hover:brightness-105 cursor-pointer shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{msg.reply ? 'Sửa Câu Trả Lời' : 'Trả Lời & Duyệt'}</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm('Xóa thư này khỏi danh sách?')) {
                                sound.playChime('pop');
                                onDeleteInboxMessage(msg.id);
                                showToast('Đã xóa thư');
                              }
                            }}
                            className="p-1.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer"
                            title="Xóa thư"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {inboxMessages.length === 0 && (
                      <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-[var(--dominant)] text-xs text-[var(--text-main)]/70">
                        Chưa có thư nào trong hòm thư. Người truy cập có thể tự gửi thư ở trang chính!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CLASSROOM CUSTOMIZATION & BULLETIN */}
              {activeTab === 'classroom' && (
                <form onSubmit={handleSaveClassroomSettings} className="space-y-6">
                  
                  {/* Creator Info Settings */}
                  <div className="bg-white rounded-2xl p-5 border border-[var(--dominant)]/40 space-y-4">
                    <h4 className="font-['Comfortaa'] font-bold text-base text-[var(--text-main)] flex items-center gap-2">
                      <span>👩‍🏫</span> Thông Tin Cô Giáo Chủ Nhiệm & Profile
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                          Tên Creator / Tác Giả
                        </label>
                        <input
                          type="text"
                          value={draftProfile.name}
                          onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                          Chức Danh
                        </label>
                        <input
                          type="text"
                          value={draftProfile.title}
                          onChange={(e) => setDraftProfile({ ...draftProfile, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                          Huy hiệu / Badge
                        </label>
                        <input
                          type="text"
                          value={draftProfile.badge}
                          onChange={(e) => setDraftProfile({ ...draftProfile, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                          Link Facebook Mầm Non Rắn Con
                        </label>
                        <input
                          type="url"
                          value={draftProfile.facebookUrl}
                          onChange={(e) => setDraftProfile({ ...draftProfile, facebookUrl: e.target.value })}
                          placeholder="https://www.facebook.com/profile.php?id=61563686069080"
                          className="w-full px-3 py-2 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1 flex items-center gap-1">
                          <span>🏫</span> Sĩ số lớp học (Tổng số bé ngoan)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={draftProfile.totalStudents}
                          onChange={(e) => setDraftProfile({ ...draftProfile, totalStudents: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 rounded-xl bg-white/60 border border-[var(--dominant)] text-xs font-bold text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                        />
                      </div>

                      {/* Profile Image with URL & File Upload */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                          Ảnh đại diện Cô Giáo (URL hoặc Tải lên từ máy)
                        </label>
                        <div className="flex items-center gap-3">
                          <img
                            src={draftProfile.avatarUrl}
                            alt="Avatar cô giáo"
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-xl object-cover border border-[var(--dominant)]/40 bg-[var(--grad-end)] shrink-0"
                          />
                          <input
                            type="text"
                            value={draftProfile.avatarUrl}
                            onChange={(e) => setDraftProfile({ ...draftProfile, avatarUrl: e.target.value })}
                            placeholder="Dán link ảnh https://..."
                            className="flex-1 px-3 py-2 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                          />
                          <button
                            type="button"
                            onClick={() => profileImageInputRef.current?.click()}
                            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--grad-end)] hover:bg-[var(--accent)] text-[var(--text-main)] text-xs font-bold border border-[var(--dominant)]/50 transition-all cursor-pointer shrink-0"
                          >
                            <Upload className="w-3.5 h-3.5 text-[var(--text-main)]" />
                            <span>Tải Ảnh</span>
                          </button>
                          <input
                            ref={profileImageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileImageUpload}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                          Khẩu hiệu lớp học (Motto)
                        </label>
                        <input
                          type="text"
                          value={draftProfile.classMotto}
                          onChange={(e) => setDraftProfile({ ...draftProfile, classMotto: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                          Tiểu sử / Lời giới thiệu
                        </label>
                        <textarea
                          rows={2}
                          value={draftProfile.bio}
                          onChange={(e) => setDraftProfile({ ...draftProfile, bio: e.target.value })}
                          className="w-full p-3 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bulletin Board Modules Editor with Link ggai & Display Button Name */}
                  <div className="bg-white rounded-2xl p-5 border border-[var(--dominant)]/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-['Comfortaa'] font-bold text-base text-[var(--text-main)] flex items-center gap-2">
                        <span>📌</span> Chỉnh Sửa 3 Mục Bảng Tin Lớp & Link ggai
                      </h4>
                      <span className="text-[11px] text-[var(--text-main)] font-medium">Hỗ trợ gắn link ngoài & tên nút</span>
                    </div>

                    <div className="space-y-4">
                      {draftBulletin.map((post, postIdx) => (
                        <div key={post.id} className="p-4 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[var(--text-main)] uppercase">
                              Mục: {post.title}
                            </span>
                            <input
                              type="text"
                              value={post.badgeText}
                              onChange={(e) => {
                                const newBulletin = [...draftBulletin];
                                newBulletin[postIdx].badgeText = e.target.value;
                                setDraftBulletin(newBulletin);
                              }}
                              placeholder="Huy hiệu nhỏ..."
                              className="px-2.5 py-1 rounded-lg bg-white border border-[var(--dominant)]/40 text-[11px] font-bold text-[var(--text-main)]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[var(--text-main)] mb-0.5">
                              Tiêu đề phụ:
                            </label>
                            <input
                              type="text"
                              value={post.subtitle}
                              onChange={(e) => {
                                const newBulletin = [...draftBulletin];
                                newBulletin[postIdx].subtitle = e.target.value;
                                setDraftBulletin(newBulletin);
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[var(--dominant)]/40 text-xs text-[var(--text-main)]"
                            />
                          </div>

                          {/* Link ggai and Custom Button Name */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                              <label className="block text-[11px] font-semibold text-[var(--text-main)] mb-0.5 flex items-center gap-1">
                                <ExternalLink className="w-3 h-3 text-[var(--text-main)]" />
                                Link ggai / Liên kết bản tin (tùy chọn):
                              </label>
                              <input
                                type="url"
                                value={post.customLinkUrl || ''}
                                onChange={(e) => {
                                  const newBulletin = [...draftBulletin];
                                  newBulletin[postIdx].customLinkUrl = e.target.value;
                                  setDraftBulletin(newBulletin);
                                }}
                                placeholder="https://..."
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[var(--dominant)]/40 text-xs text-[var(--text-main)]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[var(--text-main)] mb-0.5">
                                Tên nút hiển thị link:
                              </label>
                              <input
                                type="text"
                                value={post.customLinkName || ''}
                                onChange={(e) => {
                                  const newBulletin = [...draftBulletin];
                                  newBulletin[postIdx].customLinkName = e.target.value;
                                  setDraftBulletin(newBulletin);
                                }}
                                placeholder="Ví dụ: Link ggai Bản Tin, Đọc Ngay..."
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[var(--dominant)]/40 text-xs text-[var(--text-main)]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[var(--text-main)] mb-0.5">
                              Nội dung các dòng thông báo (Mỗi dòng 1 ý):
                            </label>
                            <textarea
                              rows={3}
                              value={post.content.join('\n')}
                              onChange={(e) => {
                                const newBulletin = [...draftBulletin];
                                newBulletin[postIdx].content = e.target.value.split('\n').filter(Boolean);
                                setDraftBulletin(newBulletin);
                              }}
                              className="w-full p-2.5 rounded-lg bg-white border border-[var(--dominant)]/40 text-xs text-[var(--text-main)] leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save & Reset Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Khôi phục toàn bộ dữ liệu mẫu ban đầu? Những gì bạn chỉnh sửa sẽ bị làm mới.')) {
                          sound.playChime('pop');
                          onResetDefaults();
                          showToast('Đã khôi phục dữ liệu mặc định!');
                        }
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Khôi Phục Dữ Liệu Gốc</span>
                    </button>

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] text-xs font-bold shadow-md hover:brightness-105 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lưu Cập Nhật Lớp Học</span>
                    </button>
                  </div>

                </form>
              )}

              {/* TAB 4: STICKY NOTE MANAGER */}
              {activeTab === 'stickies' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                        Quản Lý Bức Tường Sticky Note
                      </h3>
                      <p className="text-xs text-[var(--text-main)]/70">
                        Kiểm duyệt và xóa những mẩu giấy dán không phù hợp
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {stickyNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3.5 rounded-xl bg-white border border-[var(--dominant)]/40 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span>{note.sticker} {note.author}</span>
                            <span className="text-[10px] text-[var(--text-main)]/50">{note.createdAt}</span>
                          </div>
                          <p className="text-xs text-[var(--text-main)] line-clamp-3 mb-2">
                            {note.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs">
                          <span className="text-red-400 font-bold">♥ {note.likes}</span>
                          <button
                            onClick={() => {
                              sound.playChime('pop');
                              onDeleteStickyNote(note.id);
                              showToast('Đã xóa ghi chú');
                            }}
                            className="text-red-500 hover:underline text-[11px] font-bold cursor-pointer"
                          >
                            Xóa Note
                          </button>
                        </div>
                      </div>
                    ))}

                    {stickyNotes.length === 0 && (
                      <div className="col-span-full text-center py-10 bg-white rounded-2xl border border-dashed border-[var(--dominant)] text-xs text-[var(--text-main)]/70">
                        Bức tường đang để trống cho các bạn nhỏ và độc giả tự dán ghi chú!
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* SUB-MODAL: Character Create/Edit Form */}
      {editingChar && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[var(--grad-end)] rounded-3xl p-6 shadow-2xl border-3 border-[var(--dominant)] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--dominant)]/40">
              <h3 className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                {isCreatingChar ? '✨ Thêm Bé Rắn Mới Vào Lớp' : `✏️ Chỉnh Sửa Bé ${editingChar.name}`}
              </h3>
              <button
                onClick={() => setEditingChar(null)}
                className="w-8 h-8 rounded-full bg-[var(--dominant)]/30 flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--dominant)]/50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCharSubmit} className="space-y-4">
              
              {/* Avatar Upload & Preview */}
              <div className="bg-white p-4 rounded-2xl border border-[var(--dominant)]/40 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={editingChar.avatarUrl}
                  alt={editingChar.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--dominant)] bg-[var(--grad-end)] shrink-0"
                />
                <div className="flex-1 w-full space-y-2">
                  <label className="block text-xs font-bold text-[var(--text-main)]">
                    Ảnh đại diện của bé (Tải file từ máy hoặc dán link ảnh):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingChar.avatarUrl}
                      onChange={(e) => setEditingChar({ ...editingChar, avatarUrl: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 px-3 py-2 rounded-xl bg-[var(--grad-end)] border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                    />
                    <button
                      type="button"
                      onClick={() => charImageInputRef.current?.click()}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--dominant)] text-[var(--text-main)] text-xs font-bold hover:brightness-105 transition-all cursor-pointer shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Tải Ảnh Máy</span>
                    </button>
                    <input
                      ref={charImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCharImageUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Tên Bé Rắn
                  </label>
                  <input
                    type="text"
                    required
                    value={editingChar.name}
                    onChange={(e) => setEditingChar({ ...editingChar, name: e.target.value })}
                    placeholder="Ví dụ: Bạch Tiểu Ngân"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Biệt Danh
                  </label>
                  <input
                    type="text"
                    required
                    value={editingChar.nickname}
                    onChange={(e) => setEditingChar({ ...editingChar, nickname: e.target.value })}
                    placeholder="Ví dụ: Bé Bạch Xà"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Chức vụ / Danh hiệu trong lớp
                  </label>
                  <input
                    type="text"
                    value={editingChar.title}
                    onChange={(e) => setEditingChar({ ...editingChar, title: e.target.value })}
                    placeholder="Ví dụ: Lớp Trưởng Gương Mẫu"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Giới tính & Tuổi
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={editingChar.gender}
                      onChange={(e) => setEditingChar({ ...editingChar, gender: e.target.value as Character['gender'] })}
                      className="px-2 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)]"
                    >
                      <option value="Bé Trai">Bé Trai</option>
                      <option value="Bé Gái">Bé Gái</option>
                      <option value="Bé Rồng Bí Ẩn">Bé Rồng Bí Ẩn</option>
                    </select>
                    <input
                      type="text"
                      value={editingChar.age}
                      onChange={(e) => setEditingChar({ ...editingChar, age: e.target.value })}
                      placeholder="5 tuổi"
                      className="px-2 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)]"
                    />
                  </div>
                </div>

                {/* YouTube Music Link Field */}
                <div className="sm:col-span-2 bg-[var(--grad-end)] p-3 rounded-2xl border border-red-200">
                  <label className="block text-xs font-bold text-red-600 mb-1 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-red-500" />
                    Link Nhạc YouTube của Bé (Không bắt buộc, ấn vào char nhạc sẽ mở lên):
                  </label>
                  <input
                    type="url"
                    value={editingChar.youtubeMusicUrl || ''}
                    onChange={(e) => setEditingChar({ ...editingChar, youtubeMusicUrl: e.target.value })}
                    placeholder="Ví dụ: https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-red-200 text-xs text-[var(--text-main)] outline-hidden focus:border-red-400"
                  />
                </div>

                {/* Custom Link ggai & Display Name */}
                <div className="bg-[var(--grad-end)] p-3 rounded-2xl border border-[var(--dominant)]/50">
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Link ggai / Liên kết ngoài:
                  </label>
                  <input
                    type="url"
                    value={editingChar.customLinkUrl || ''}
                    onChange={(e) => setEditingChar({ ...editingChar, customLinkUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                  />
                </div>

                <div className="bg-[var(--grad-end)] p-3 rounded-2xl border border-[var(--dominant)]/50">
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Tên nút hiển thị link:
                  </label>
                  <input
                    type="text"
                    value={editingChar.customLinkName || ''}
                    onChange={(e) => setEditingChar({ ...editingChar, customLinkName: e.target.value })}
                    placeholder="Ví dụ: Link ggai, Xem truyện..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Hashtags (cách nhau bởi dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={editingChar.tags.join(', ')}
                    onChange={(e) =>
                      setEditingChar({
                        ...editingChar,
                        tags: e.target.value.split(',').map((t) => (t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`)).filter(Boolean)
                      })
                    }
                    placeholder="#Sweet romance, #Hài hước, #Chữa lành"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] outline-hidden focus:border-[var(--dominant)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Phiếu bé ngoan ({editingChar.obedienceRate}%)
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={editingChar.obedienceRate}
                    onChange={(e) => setEditingChar({ ...editingChar, obedienceRate: Number(e.target.value) })}
                    className="w-full accent-[var(--dominant)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Huy hiệu nổi bật
                  </label>
                  <input
                    type="text"
                    value={editingChar.badgeLabel || ''}
                    onChange={(e) => setEditingChar({ ...editingChar, badgeLabel: e.target.value })}
                    placeholder="Bé Ngoan Tuần Này"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Tính cách
                  </label>
                  <input
                    type="text"
                    value={editingChar.personality}
                    onChange={(e) => setEditingChar({ ...editingChar, personality: e.target.value })}
                    placeholder="Vui vẻ, nghịch ngợm..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Thích & Ghét
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editingChar.likes}
                      onChange={(e) => setEditingChar({ ...editingChar, likes: e.target.value })}
                      placeholder="Thích..."
                      className="px-2 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)]"
                    />
                    <input
                      type="text"
                      value={editingChar.dislikes}
                      onChange={(e) => setEditingChar({ ...editingChar, dislikes: e.target.value })}
                      placeholder="Ghét..."
                      className="px-2 py-2 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                    Tiểu sử & Câu chuyện lớp mầm
                  </label>
                  <textarea
                    rows={3}
                    value={editingChar.fullBio}
                    onChange={(e) => setEditingChar({ ...editingChar, fullBio: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] leading-relaxed"
                  />
                </div>

              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--dominant)]/50">
                {!isCreatingChar && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Bạn có chắc chắn muốn xóa bé "${editingChar.name}" khỏi lớp không?`)) {
                        sound.playChime('pop');
                        onDeleteCharacter(editingChar.id);
                        setEditingChar(null);
                        showToast(`Đã xóa bé ${editingChar.name}`);
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa Bé Rắn Này</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingChar(null)}
                    className="px-4 py-2 rounded-xl bg-[var(--grad-end)] text-xs font-bold text-[var(--text-main)] hover:bg-[var(--accent)] cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] text-xs font-bold shadow-md hover:brightness-105 cursor-pointer"
                  >
                    Lưu Thông Tin Bé
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL: Inbox Reply Editor */}
      {replyingMsg && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[var(--grad-end)] rounded-3xl p-6 shadow-2xl border-3 border-[var(--dominant)]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--dominant)]/40">
              <h3 className="font-['Comfortaa'] font-bold text-base text-[var(--text-main)]">
                👑 Viết Phản Hồi Cho Thư Bí Mật
              </h3>
              <button
                onClick={() => setReplyingMsg(null)}
                className="w-7 h-7 rounded-full bg-[var(--dominant)]/30 flex items-center justify-center text-[var(--text-main)] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[var(--dominant)]/40 text-xs text-[var(--text-main)] mb-4">
              <p className="font-bold text-[var(--text-main)] mb-1">
                {replyingMsg.senderNickname} (gửi {replyingMsg.recipient}):
              </p>
              <p className="italic">{replyingMsg.content}</p>
            </div>

            <form onSubmit={handleSaveReplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-1">
                  Nội dung phản hồi từ {replyingMsg.recipient}:
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Viết câu trả lời ấm áp, đáng yêu gửi lại bạn nhỏ..."
                  className="w-full p-3 rounded-xl bg-white border border-[var(--dominant)]/50 text-xs text-[var(--text-main)] leading-relaxed outline-hidden focus:border-[var(--dominant)]"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplyingMsg(null)}
                  className="px-4 py-2 rounded-xl bg-[var(--grad-end)] text-xs font-bold text-[var(--text-main)]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] text-xs font-bold shadow-md hover:brightness-105"
                >
                  Duyệt & Đăng Lên Bảng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
