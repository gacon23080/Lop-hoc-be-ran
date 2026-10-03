import React from 'react';
import { ShieldAlert, X, Check, Lock, AlertTriangle } from 'lucide-react';
import { Character } from '../types';
import { sound } from '../utils/audio';

interface AgeVerificationModalProps {
  isOpen: boolean;
  character: Character | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  isOpen,
  character,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-red-300 overflow-hidden text-center">
        
        {/* Top danger warning stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-pink-500 to-amber-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playChime('pop');
            onCancel();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 18+ Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-3xl bg-red-50 border-2 border-red-200 flex items-center justify-center text-red-500 mb-4 shadow-inner">
          <span className="text-2xl font-black font-['Comfortaa'] tracking-tighter">18+</span>
        </div>

        {/* Title */}
        <h3 className="font-['Comfortaa'] font-extrabold text-xl sm:text-2xl text-gray-800 mb-2">
          Xác Minh Độ Tuổi
        </h3>

        {/* Character Preview */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Nhân vật: {character.name} ({character.nickname})</span>
        </div>

        {/* Notice text */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
          Nhân vật này có gắn nhãn <strong>18+</strong> hoặc các câu chuyện, hình ảnh dành riêng cho độc giả trưởng thành. Vui lòng xác nhận bạn đã đủ 18 tuổi để tiếp tục khám phá!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              sound.playChime('pop');
              onCancel();
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Quay Lại (Dưới 18 Tuổi)
          </button>

          <button
            onClick={() => {
              sound.playChime('levelUp');
              onConfirm();
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-red-500/25 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Tôi Đã Đủ 18 Tuổi</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-400 mt-4">
          Lớp Mầm Non Rắn Con &bull; Tuân thủ giới hạn độ tuổi độc giả 🌸
        </p>

      </div>
    </div>
  );
};
