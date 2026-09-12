import React from 'react';
import { Heart, Sparkles, ArrowUp, ExternalLink, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  facebookUrl: string;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ facebookUrl, onOpenAdmin }) => {
  const scrollToTop = () => {
    sound.playChime('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-white/85 border-t-2 border-[var(--dominant)]/50 backdrop-blur-md relative overflow-hidden">
      
      {/* Decorative top wave/cloud ribbon */}
      <div className="h-2 bg-gradient-to-r from-[var(--dominant)] via-[var(--accent)] to-[var(--grad-start)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--dominant)] to-[var(--grad-start)] flex items-center justify-center text-2xl shadow-md text-[var(--text-main)]">
              <span>🐍</span>
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-['Comfortaa'] font-bold text-lg text-[var(--text-main)]">
                  Mầm Non Rắn Con
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--grad-end)] text-[var(--text-main)] font-bold border border-[var(--dominant)]">
                  Bản Quyền Vũ Trụ Xà Nữ
                </span>
              </div>
              <p className="text-xs text-[var(--text-main)]/70 font-medium mt-0.5">
                Chủ Nhiệm: <strong>Xà nữ bắt chồng (Rắn)</strong> • Nơi nuôi dưỡng những câu chuyện chữa lành
              </p>
            </div>
          </div>

          {/* Social Links & Back to top */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playChime('bell')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs font-bold transition-all border border-[#1877F2]/20 cursor-pointer"
            >
              <span>Facebook Mầm Non Rắn Con</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => { sound.playChime('pop'); onOpenAdmin(); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--grad-end)] hover:bg-[var(--grad-end)] text-[var(--text-main)] text-xs font-bold transition-all border border-[var(--dominant)]/60 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[var(--text-main)]" />
              <span>Quản Trị Viên</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--dominant)] to-[var(--grad-start)] text-[var(--text-main)] flex items-center justify-center hover:scale-105 transition-all shadow-xs cursor-pointer"
              title="Cuộn lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-[var(--dominant)]/40 text-center text-xs text-[var(--text-main)]/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2024 - 2026 Mầm Non Rắn Con. Phát triển dành riêng cho cộng đồng độc giả yêu thích vũ trụ Xà Nữ.</p>
          <p className="flex items-center gap-1">
            Được tạo với <Heart className="w-3.5 h-3.5 text-pink-500 fill-current inline" /> và tình yêu thương vô tận
          </p>
        </div>
      </div>
    </footer>
  );
};
