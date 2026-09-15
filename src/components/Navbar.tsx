import React, { useState } from 'react';
import { Lock, Sparkles, Menu, X, Heart, MessageSquareHeart, Baby, Newspaper, Gamepad2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  totalStudents: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  isAdminLoggedIn,
  totalStudents
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    sound.playChime('pop');
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--grad-end)]/95 border-b border-[var(--dominant)]/50 transition-all duration-300">
      {/* Preschool Bunting Garland / Cờ Đuôi Nheo Mầm Non Tím Pastel */}
      <div className="h-2.5 w-full flex items-center justify-center overflow-hidden gap-1 bg-gradient-to-r from-[var(--grad-end)] via-[var(--grad-start)] to-[var(--grad-end)]">
        <div className="w-full flex justify-around opacity-90">
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--accent)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--accent)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
          <span className="w-3 h-2.5 bg-[var(--dominant)] rounded-b-md"></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); sound.playChime('bell'); }}
          className="flex items-center gap-3 group focus:outline-hidden"
          id="nav-brand-logo"
        >
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--dominant)] via-[var(--dominant)] to-[var(--accent)] flex items-center justify-center text-2xl shadow-md shadow-[var(--dominant)]/30 transform group-hover:rotate-6 group-hover:scale-105 transition-all">
            <span role="img" aria-label="snake-mascot" className="animate-wiggle">🐍</span>
            <span className="absolute -top-1.5 -right-1 text-xs animate-bounce">🎀</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Comfortaa'] font-bold text-xl sm:text-2xl text-[var(--text-main)] tracking-tight group-hover:text-[var(--text-main)] transition-colors">
                Mầm Non Rắn Con
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] font-bold border border-[var(--dominant)]">
                <Sparkles className="w-3 h-3 text-[var(--text-main)]" />
                Lớp {totalStudents} Bé Ngoan
              </span>
            </div>
            <p className="text-xs text-[var(--text-main)]/80 font-medium hidden sm:block flex items-center gap-1">
              <span>🍼</span> Vũ trụ ngọt ngào của Rắn
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            id="nav-link-bulletin"
            onClick={() => scrollToSection('bulletin-section')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--text-main)] hover:text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all cursor-pointer"
          >
            <Newspaper className="w-4 h-4 text-[var(--text-main)]" />
            Bảng Tin Lớp
          </button>

          <button
            id="nav-link-characters"
            onClick={() => scrollToSection('characters-section')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--text-main)] hover:text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all cursor-pointer"
          >
            <Baby className="w-4 h-4 text-[var(--text-main)]" />
            Bé Rắn Của Lớp
          </button>

          <button
            id="nav-link-playground"
            onClick={() => scrollToSection('playground-section')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--text-main)] hover:text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all cursor-pointer bg-pink-100/40 border border-pink-200/50 text-pink-900"
          >
            <Gamepad2 className="w-4 h-4 text-pink-600 animate-pulse" />
            <span>Khu Vui Chơi</span>
          </button>

          <button
            id="nav-link-inbox"
            onClick={() => scrollToSection('inbox-section')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--text-main)] hover:text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all cursor-pointer"
          >
            <MessageSquareHeart className="w-4 h-4 text-[var(--text-main)]" />
            Hộp Thư Bí Mật
          </button>

          <button
            id="nav-link-sticky"
            onClick={() => scrollToSection('sticky-section')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--text-main)] hover:text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 text-[var(--text-main)]" />
            Góc Lưu Niệm
          </button>
        </nav>

        {/* Action Controls & Admin Lock Button */}
        <div className="flex items-center gap-2.5">
          <button
            id="nav-admin-btn"
            onClick={() => {
              sound.playChime('bell');
              onOpenAdmin();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer border ${
              isAdminLoggedIn
                ? 'bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] border-[var(--dominant)] hover:shadow-md'
                : 'bg-gradient-to-r from-[var(--dominant)] to-[var(--accent)] text-[var(--text-main)] hover:brightness-105 border-[var(--dominant)]/40 hover:shadow-md hover:shadow-[var(--dominant)]/30'
            }`}
            title="Khu Vực Quản Trị Viên"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAdminLoggedIn ? 'Admin Đang Mở' : 'Khu Vực Admin'}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/80 text-[var(--text-main)] hover:bg-[var(--grad-end)] border border-[var(--dominant)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-[var(--grad-end)]/98 backdrop-blur-lg border-b border-[var(--dominant)]/50 shadow-lg space-y-2 animate-fadeIn">
          <button
            onClick={() => scrollToSection('bulletin-section')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all"
          >
            <Newspaper className="w-5 h-5 text-[var(--text-main)]" />
            <span>Bảng Tin Lớp</span>
          </button>
          <button
            onClick={() => scrollToSection('characters-section')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all"
          >
            <Baby className="w-5 h-5 text-[var(--text-main)]" />
            <span>Bé Rắn Của Lớp</span>
          </button>
          <button
            onClick={() => scrollToSection('playground-section')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-pink-700 bg-pink-100/50 hover:bg-pink-100 transition-all border border-pink-200/60"
          >
            <Gamepad2 className="w-5 h-5 text-pink-600" />
            <span>Khu Vui Chơi (Chăm Sóc Mascot) 🎡</span>
          </button>
          <button
            onClick={() => scrollToSection('inbox-section')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all"
          >
            <MessageSquareHeart className="w-5 h-5 text-[var(--text-main)]" />
            <span>Hộp Thư Bí Mật</span>
          </button>
          <button
            onClick={() => scrollToSection('sticky-section')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-[var(--text-main)] hover:bg-[var(--grad-end)] transition-all"
          >
            <Heart className="w-5 h-5 text-[var(--text-main)]" />
            <span>Góc Lưu Niệm</span>
          </button>
        </div>
      )}
    </header>
  );
};
