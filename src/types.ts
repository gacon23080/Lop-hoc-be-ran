export interface Character {
  id: string;
  name: string;
  nickname: string;
  title: string; // e.g. "Lớp Trưởng Gương Mẫu", "Bé Út Nghịch Ngợm"
  gender: 'Bé Trai' | 'Bé Gái' | 'Bé Rồng Bí Ẩn';
  age: string;
  avatarUrl: string;
  youtubeMusicUrl?: string; // Link nhạc YouTube (không bắt buộc, ấn vào sẽ mở nhạc)
  customLinkUrl?: string; // Link ggai hoặc link tài liệu/truyện
  customLinkName?: string; // Tên nút hiển thị link (e.g. "Mở Link ggai", "Xem hồ sơ gốc")
  tags: string[]; // e.g. ["#Hài hước", "#Sweet romance", "#Chữa lành"]
  personality: string;
  likes: string; // e.g. "Bánh kem dâu, được cô xoa đầu"
  dislikes: string; // e.g. "Uống thuốc đắng, dậy sớm"
  obedienceRate: number; // 0 - 100%
  likesCount: number;
  bestFriends: string[];
  fullBio: string;
  badgeLabel?: string; // e.g. "Bé Ngoan Tuần Này", "Cây Hài Của Lớp"
}

export type BulletinType = 'announcement' | 'greeting' | 'rules';

export interface BulletinPost {
  id: string;
  type: BulletinType;
  title: string;
  subtitle: string;
  content: string[];
  updatedAt: string;
  icon: string;
  badgeText: string;
  customLinkUrl?: string; // Link ggai hoặc link bài viết ngoài
  customLinkName?: string; // Tên nút hiển thị bản tin
}

export interface CreatorProfile {
  name: string;
  penName: string;
  title: string;
  badge: string;
  avatarUrl: string;
  facebookUrl: string;
  bio: string;
  classMotto: string;
  totalStudents: number;
  establishedDate: string;
}

export interface InboxMessage {
  id: string;
  recipient: string; // "Cô Giáo Chủ Nhiệm" or Character Name
  senderNickname: string;
  category: 'Tỏ tình' | 'Gợi ý cốt truyện' | 'Hỏi thăm sức khỏe' | 'Tâm sự tuổi hồng' | 'Câu hỏi bí mật';
  content: string;
  timestamp: string;
  status: 'approved' | 'pending' | 'rejected';
  reply?: string;
  repliedAt?: string;
  likesCount: number;
}

export type StickyColor = 'yellow' | 'pink' | 'purple' | 'green' | 'blue';

export interface StickyNote {
  id: string;
  author: string;
  content: string;
  color: StickyColor;
  sticker: string;
  likes: number;
  createdAt: string;
  rotationDeg: number;
}
