import { Character, BulletinPost, CreatorProfile, InboxMessage, StickyNote } from '../types';
import creatorAvatarImg from '../assets/images/regenerated_image_1789144186610.png';

export const INITIAL_CREATOR_PROFILE: CreatorProfile = {
  name: 'Xà nữ bắt chồng (Rắn)',
  penName: 'Cô Giáo Chủ Nhiệm',
  title: 'Chủ Nhiệm Lớp Mầm Non Rắn Con',
  badge: 'Cô Giáo Chủ Nhiệm',
  avatarUrl: creatorAvatarImg,
  facebookUrl: 'https://www.facebook.com/profile.php?id=61563686069080',
  bio: 'Người mẹ kiêm bảo mẫu tận tâm của đàn rắn con siêu nghịch ngợm. Chuyên sáng tác các câu chuyện ngọt ngào, hài hước, chữa lành tâm hồn cho mọi độc giả thân thương!',
  classMotto: 'Học hết sức, ngủ trưa hết mình, thấy crush là phải bắt về lớp!',
  totalStudents: 12,
  establishedDate: 'Lớp 2024 - Khóa Mầm Non Yêu Thương',
};

export const INITIAL_BULLETIN_POSTS: BulletinPost[] = [
  {
    id: 'bulletin-1',
    type: 'announcement',
    title: 'Bản Tin Tuần Này',
    subtitle: 'Kế hoạch sinh hoạt lớp & phát phiếu bé ngoan',
    content: [
      '🌸 Thứ 2: Khởi động tuần mới với bài thể dục vươn vai của các bé rắn con.',
      '🍓 Thứ 4: Tiệc bánh kem dâu tây & sữa nóng giờ ăn xế.',
      '🎨 Thứ 6: Buổi tập vẽ tranh: "Bắt bạn cùng bàn về làm bạn đời tương lai".',
      '⭐ Chủ Nhật: Tổng kết điểm hoa bé ngoan và phát kẹo mút cầu vồng!'
    ],
    updatedAt: 'Hôm nay lúc 08:30',
    icon: 'Sparkles',
    badgeText: 'Tin Mới Nhất',
    customLinkUrl: 'https://www.facebook.com/profile.php?id=61563686069080',
    customLinkName: 'Link ggai Bản Tin Lớp'
  },
  {
    id: 'bulletin-2',
    type: 'greeting',
    title: 'Lời Chào Từ Cô Giáo',
    subtitle: 'Gửi các bạn nhỏ và các cô chú ghé thăm',
    content: [
      'Chào mừng các bạn nhỏ và quý phụ huynh ghé thăm vườn trẻ Mầm Non Rắn Con!',
      'Nơi đây luôn tràn ngập tiếng cười giòn tan, kẹo ngọt và những mẩu chuyện manh nha lãng mạn đáng yêu nhất.',
      'Hãy để lại một chiếc thư ẩn danh hoặc dán một tờ giấy note lên tường để nhắn nhủ với các bé nha!',
      'Yêu thương và thơm má mọi người thật nhiều moah moah~ 🍼'
    ],
    updatedAt: 'Đã ghim đầu bảng',
    icon: 'HeartHandshake',
    badgeText: 'Tâm Tình Cô Giáo',
    customLinkUrl: 'https://www.facebook.com/profile.php?id=61563686069080',
    customLinkName: 'Ghé Trang Cô Chủ Nhiệm'
  },
  {
    id: 'bulletin-3',
    type: 'rules',
    title: 'Nội Quy Lớp Mầm Non',
    subtitle: '5 điều bé ngoan cần nhớ khi đến lớp',
    content: [
      '1. Không được nghịch cắn đuôi bạn khi đang ngủ trưa.',
      '2. Thấy bạn nhỏ dễ thương phải rủ chia kẹo chứ không được giấu một mình.',
      '3. Uống hết một bình sữa ấm trước khi vào giờ kể chuyện.',
      '4. Ngoan ngoãn lễ phép, gặp người lớn phải khoanh tay chào thật to.',
      '5. Luôn mỉm cười và tặng nụ cười đáng yêu cho các cô chú độc giả.'
    ],
    updatedAt: 'Nội quy thường niên',
    icon: 'ShieldCheck',
    badgeText: 'Bé Ngoan Ghi Nhớ',
    customLinkUrl: 'https://www.facebook.com/profile.php?id=61563686069080',
    customLinkName: 'Xem Sổ Bé Ngoan'
  }
];

export const INITIAL_CHARACTERS: Character[] = [];

// Hiện tại thư phản hồi & sticky note để trống để người truy cập tự hỏi và dán giấy note!
export const INITIAL_INBOX_MESSAGES: InboxMessage[] = [];

export const INITIAL_STICKY_NOTES: StickyNote[] = [];
