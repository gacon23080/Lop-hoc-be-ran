import { MascotPet, AccessoryType } from '../types';

export const DEFAULT_MASCOTS: MascotPet[] = [
  {
    id: 'mascot-tim',
    name: 'Bé Khoai Môn',
    species: 'Bé Rắn Tím Hoa Cà',
    badge: 'Mascot Đại Diện Trường 💜',
    description: 'Bé rắn tím hoa cà dịu dàng múp míp, là biểu tượng đại diện của trường Mầm Non Rắn Con. Bé ngoan ngoãn, ngậm ti giả xinh xắn và luôn thích được cô giáo xoa đầu cưng nựng.',
    gender: 'Bé Gái',
    primaryColor: '#D8B4E5', // Slightly darker pastel purple
    secondaryColor: '#F3E8FF', // Light purple cream
    strokeColor: '#581C87', // Deep grape purple
    quotes: [
      'Ưm... Khoai Môn chào cô giáo và các bạn mầm non ạ! (◕‿◕) 💜',
      'Bé ngoan ngoãn ngậm ti giả đợi giờ uống sữa ấm nè 🍼✨',
      'Hôm nay bé được cô khen là bé rắn chăm ngoan nhất trường! ⭐',
      'Xoa đầu cưng nựng bé một cái đi mà~ (≧◡≦) ♡',
      'Ti giả của bé có màu giống hệt bụng bé luôn nè, đáng yêu hông? 👶💜',
      'Khoai Môn thương bạn và trường Mầm Non Rắn Con nhiều lắm! 🌸'
    ],
    favoriteFood: 'Chè khoai môn dừa & Bánh mochi tím',
    favoriteFoodIcon: '🍠',
    favoriteToy: 'Thỏ bông tai dài màu tím',
    favoriteToyIcon: '🐰'
  },
  {
    id: 'mascot-nana',
    name: 'Bé Na Na',
    species: 'Bé Rắn Lục Mầm Cây',
    badge: 'Háu Ăn & Mê Sưởi Nắng 🌱',
    description: 'Bé rắn lục mầm non tròn trĩnh, thích cuộn tròn dưới tán lá cây sưởi nắng, ngậm ti giả ngủ nướng say sưa và mê ăn quả ngọt.',
    gender: 'Phi Giới Tính',
    primaryColor: '#86EFAC', // Green pastel
    secondaryColor: '#FEF08A', // Yellow pastel
    strokeColor: '#065F46', // Deep emerald
    quotes: [
      'Chít chít~ Bụng con đang kêu ùng ục nè bạn ơi! 🍓',
      'Được xoa bụng đã ghê, con muốn ngủ một giấc quá~ (˘ᵕ˘) zzz',
      'Con có chiếc mầm cây nhỏ xinh trên đầu nè, dễ thương hông? 🌱',
      'Hôm nay cô giáo chủ nhiệm khen con ngoan nhất lớp đó nha! ⭐',
      'Cho con xin thêm một quả dâu tây ngọt lịm nữa đi mờ~ (◕‿◕) ♡'
    ],
    favoriteFood: 'Dâu tây rừng & Sữa ấm',
    favoriteFoodIcon: '🍓',
    favoriteToy: 'Bóng len mây bồng bềnh',
    favoriteToyIcon: '🎾'
  },
  {
    id: 'mascot-bapcai',
    name: 'Bé Bắp Cải',
    species: 'Bé Rắn Hồng Mochi',
    badge: 'Điệu Đà & Ngọt Ngào 🎀',
    description: 'Bé rắn hồng phấn xinh xắn, thích soi gương, đeo nơ bướm và nghe cô giáo kể chuyện cổ tích trước khi ngủ.',
    gender: 'Bé Gái',
    primaryColor: '#FBCFE8', // Pink mochi
    secondaryColor: '#FFF1F2', // Soft milky strawberry
    strokeColor: '#831843', // Deep rose
    quotes: [
      'Nơ bướm của con có hợp với con hông nè? 🎀✨',
      'Tắm bọt bong bóng xà phòng thơm phức thích quá chừng! 🫧',
      'Bạn ơi kể chuyện cổ tích cho Bắp Cải nghe đi~ 📖🌸',
      'Con thương cô giáo và bạn nhiều lắm ó! (≧◡≦) 💕',
      'Bánh kem dâu tây là món ngon nhất trên trần đời! 🍰'
    ],
    favoriteFood: 'Bánh kem dâu & Sữa dâu',
    favoriteFoodIcon: '🍰',
    favoriteToy: 'Dải ruy băng lấp lánh',
    favoriteToyIcon: '🎀'
  },
  {
    id: 'mascot-mitom',
    name: 'Bé Mì Tôm',
    species: 'Bé Rắn Vàng Nắng',
    badge: 'Siêu Tăng Động & Lém Lỉnh ⚡',
    description: 'Hiếu động nhất trường Mầm Non Rắn Con, thích trườn nhảy lon ton, lắc lục lạc và chơi trò trốn tìm.',
    gender: 'Bé Trai',
    primaryColor: '#FED7AA', // Warm peach orange
    secondaryColor: '#FEF9C3', // Cream butter
    strokeColor: '#9A3412', // Warm amber brown
    quotes: [
      'Nhanh lên nào, chúng mình cùng chơi đuổi bắt đom đóm đi! 🌟',
      'Lắc lục lạc kêu leng keng vui tai quá bạn ơi! 🔔',
      'Con vừa trườn 10 vòng quanh sân trường mà chưa mệt tẹo nào! ⚡',
      'Phô mai béo ngậy đâu gùi, đưa cho con măm măm liền đi! 🧀',
      'Hì hì, con đang nấp sau bụi cây nè, đố bạn tìm được con á! 🌾'
    ],
    favoriteFood: 'Phô mai béo ngậy & Bánh giòn',
    favoriteFoodIcon: '🧀',
    favoriteToy: 'Lục lạc leng keng',
    favoriteToyIcon: '🔔'
  },
  {
    id: 'mascot-maynho',
    name: 'Bé Mây Nhỏ',
    species: 'Bé Rắn Bạch Tuyết',
    badge: 'Trầm Tĩnh & Thiên Thần ☁️',
    description: 'Thân hình trắng muốt như kẹo bông gòn, giọng nói thì thầm êm dịu, thích ngắm mây trôi và uống sữa ấm.',
    gender: 'Bé Gái',
    primaryColor: '#EDE9FE', // Pearl lavender
    secondaryColor: '#FAF5FF', // Pure snow
    strokeColor: '#4C1D95', // Deep royal purple
    quotes: [
      'Trời hôm nay nhiều mây trắng giống hệt con luôn nè~ ☁️',
      'Uống một ngụm sữa ấm xong thấy người ấm áp lạ kỳ... 🥛',
      'Con thích được đắp chăn hoa nhỏ rồi ngủ ngoan thin thít... 💤',
      'Bạn ơi, bạn có muốn nghe tiếng chuông gió reo êm tai hông? 🎐',
      'Mây Nhỏ sẽ luôn là bé ngoan bên cạnh bạn nha~ 🤍'
    ],
    favoriteFood: 'Kẹo dẻo mây & Sữa hạnh nhân',
    favoriteFoodIcon: '🍡',
    favoriteToy: 'Gối ôm bông mây êm ái',
    favoriteToyIcon: '☁️'
  },
  {
    id: 'mascot-caphe',
    name: 'Bé Cà Phê',
    species: 'Bé Rắn Mun Socola',
    badge: 'Ngầu Đét Nhưng Hay Ngượng 🕶️',
    description: 'Ngoài mặt làm vẻ lạnh lùng cool ngầu, nhưng bên trong cực kỳ hảo ngọt và rất thích được xoa đầu cưng nựng.',
    gender: 'Bé Trai',
    primaryColor: '#D7CCC8', // Warm chocolate latte
    secondaryColor: '#EFEBE9', // Warm milk foam
    strokeColor: '#4E342E', // Deep espresso brown
    quotes: [
      'Hừm... Đừng có nhìn chằm chằm người ta ngượng đấy nhớ... 🕶️',
      'Nhưng nếu là bánh sô-cô-la thì... con nhận cũng được! 🍫',
      'Kính râm của con trông có phong cách siêu ngầu hông nè? ✨',
      'Thôi được rồi... Cho bạn xoa đầu con một cái tí ti thôi đấy! (*ﾉωﾉ)',
      'Lớp Mầm Non Rắn Con này là số 1 quả đất luôn! 👑'
    ],
    favoriteFood: 'Sô-cô-la ngọt & Sữa ca cao',
    favoriteFoodIcon: '🍫',
    favoriteToy: 'Kính râm tí hon phong cách',
    favoriteToyIcon: '🕶️'
  },
  {
    id: 'mascot-bosua',
    name: 'Bé Bơ Sữa',
    species: 'Bé Rắn Bơ Ngọc Bích',
    badge: 'Béo Tròn Mê Bú Bình 🥑',
    description: 'Bé rắn màu xanh bơ ngọc bích múp míp, lúc nào cũng ôm khư khư bình sữa ấm trên tay, rất ngoan ngoãn dễ thương.',
    gender: 'Phi Giới Tính',
    primaryColor: '#BBF7D0', // Soft avocado green
    secondaryColor: '#FEF08A', // Butter yellow
    strokeColor: '#14532D', // Deep forest green
    quotes: [
      'Bình sữa ấm của con đâu rồi ta? Con muốn ti sữa cơ! 🍼🥑',
      'Bé Bơ Sữa tròn xoe như quả bơ sáp béo ngậy nè hì hì~ ✨',
      'Bạn ơi bế bé một chút đi, bé no bụng đi không nổi rùi! (˘◡˘)',
      'Hôm nay bé uống hết 2 bình sữa to bự lận đó nha! 🥛',
      'Chụt chụt~ Yêu bạn nhiều như yêu sữa ấm vậy á! 💕'
    ],
    favoriteFood: 'Bơ dầm sữa đặc & Bánh flan',
    favoriteFoodIcon: '🥑',
    favoriteToy: 'Bình sữa ngọc bích tí hon',
    favoriteToyIcon: '🍼'
  },
  {
    id: 'mascot-dautay',
    name: 'Bé Dâu Tây',
    species: 'Bé Rắn Đỏ Ruby',
    badge: 'Má Lúm & Cười Tít Mắt 🍓',
    description: 'Màu đỏ hồng ruby rực rỡ như trái dâu chín mọng, trên đầu cài bông hoa cúc nhỏ xíu, hễ gặp ai là cười toe toét.',
    gender: 'Bé Gái',
    primaryColor: '#FECDD3', // Strawberry rose
    secondaryColor: '#FFF1F2', // Soft milky cream
    strokeColor: '#9F1239', // Deep ruby rose
    quotes: [
      'Dâu Tây chào bạn nha! Hôm nay trời đẹp quá đi à! 🍓☀️',
      'Hoa cúc trên đầu con có thơm ngát hương hoa hông nè? 🌸',
      'Ai xoa đầu con là con cười tít mắt liền đó nghen! (◕‿◕) ✨',
      'Con vừa hái được rổ dâu rừng mọng nước chia cho cả lớp nè! 🧺',
      'Mầm non rắn con ngập tràn niềm vui và tiếng cười! 🎉'
    ],
    favoriteFood: 'Mứt dâu tây ngọt & Bánh kem tươi',
    favoriteFoodIcon: '🍓',
    favoriteToy: 'Vương miện hoa cúc vàng',
    favoriteToyIcon: '🌸'
  },
  {
    id: 'mascot-gacon',
    name: 'Bé Gà Con',
    species: 'Bé Gà Con Lông Xù',
    badge: 'Bạn Nhỏ Đáng Yêu 🐥',
    description: 'Bé gà con lông xù vàng ươm múp míp, là bạn nhỏ đáng yêu trong nhà trẻ mầm non. Bé thích chạy nhảy lon ton và luôn ngậm ti giả xinh xắn.',
    gender: 'Bé Trai',
    primaryColor: '#FDE047', // Yellow chick
    secondaryColor: '#FEF08A', // Light yellow belly
    strokeColor: '#854D0E', // Golden brown stroke
    quotes: [
      'Chíp chíp~ Bé Gà Con chào cô giáo và các bạn mầm non ạ! 🐥',
      'Bé ngoan ngoãn ngậm ti giả đợi giờ uống sữa bắp non nè 🍼✨',
      'Hôm nay bé được cô khen là bạn nhỏ chăm ngoan nhất trường! ⭐',
      'Xoa đầu cưng nựng bé một cái đi mà~ (≧◡≦) ♡',
      'Ti giả của bé có màu giống hệt bụng bé luôn nè, đáng yêu hông? 👶🐥',
      'Bạn cho bé một hạt kê thơm phức đi mà! 🌽'
    ],
    favoriteFood: 'Hạt kê vàng & Sữa bắp non',
    favoriteFoodIcon: '🌽',
    favoriteToy: 'Thỏ bông tai dài màu trắng',
    favoriteToyIcon: '🐰'
  },
  {
    id: 'mascot-bautroi',
    name: 'Bé Bầu Trời',
    species: 'Bé Rắn Lam Mây Sáng',
    badge: 'Yêu Thiên Nhiên & Ngắm Sao 🌌',
    description: 'Mang màu xanh ngọc của bầu trời buổi sớm mai, đôi mắt tinh anh ngắm nhìn vũ trụ, thích nghe tiếng chim hót và ngắm trăng sao.',
    gender: 'Bé Trai',
    primaryColor: '#BAE6FD', // Sky blue pastel
    secondaryColor: '#F0F9FF', // Cloud white
    strokeColor: '#0369A1', // Ocean deep blue
    quotes: [
      'Gió mát lành quá! Bầu trời xanh biếc đang vẫy gọi chúng mình kìa! 🪁',
      'Ban đêm con thích ngắm các vì sao lấp lánh trên cao lắm! 🌟',
      'Bạn có nghe tiếng chim sơn ca ríu rít ngoài vườn trường hông? 🐦',
      'Con ước mơ sau này sẽ được bay lên tận mây xanh thăm chị Hằng! 🚀',
      'Cảm ơn bạn đã luôn ở bên chăm sóc bé Bầu Trời nha! 💙'
    ],
    favoriteFood: 'Thạch đại dương mát lạnh & Nước dừa xiêm',
    favoriteFoodIcon: '🍧',
    favoriteToy: 'Kính thiên văn tí hon',
    favoriteToyIcon: '🔭'
  }
];

export interface FoodItem {
  id: string;
  name: string;
  icon: string;
  hungerBoost: number;
  happinessBoost: number;
  description: string;
}

export const NURSERY_FOODS: FoodItem[] = [
  {
    id: 'warm-milk',
    name: 'Bình Sữa Ấm',
    icon: '🍼',
    hungerBoost: 25,
    happinessBoost: 10,
    description: 'Sữa tươi mầm non béo ngậy thơm ngon'
  },
  {
    id: 'sweet-strawberry',
    name: 'Dâu Tây Rừng',
    icon: '🍓',
    hungerBoost: 20,
    happinessBoost: 15,
    description: 'Quả dâu chín mọng ngọt lịm tan trong miệng'
  },
  {
    id: 'rainbow-cake',
    name: 'Bánh Kem Cầu Vồng',
    icon: '🍰',
    hungerBoost: 30,
    happinessBoost: 20,
    description: 'Bánh kem 7 màu ngọt ngào xốp mịn'
  },
  {
    id: 'honey-apple',
    name: 'Táo Mật Giòn',
    icon: '🍎',
    hungerBoost: 18,
    happinessBoost: 12,
    description: 'Táo tươi giòn rụm bổ dưỡng vitamin'
  },
  {
    id: 'marshmallow',
    name: 'Kẹo Dẻo Mây',
    icon: '🍡',
    hungerBoost: 15,
    happinessBoost: 25,
    description: 'Kẹo dẻo bông tuyết ngọt ngào bay bổng'
  }
];

export interface AccessoryOption {
  id: AccessoryType;
  name: string;
  icon: string;
  description: string;
  unlockLevel: number;
}

export const ACCESSORY_OPTIONS: AccessoryOption[] = [
  { id: 'none', name: 'Tự nhiên (Không)', icon: '✨', description: 'Gương mặt mộc mạc tròn trĩnh', unlockLevel: 1 },
  { id: 'sprout', name: 'Mầm Cây Nhỏ', icon: '🌱', description: 'Mầm cây 2 lá nhún nhảy trên đỉnh đầu', unlockLevel: 1 },
  { id: 'bow', name: 'Nơ Bướm Hồng', icon: '🎀', description: 'Nơ tiểu thư dịu dàng quý phái', unlockLevel: 1 },
  { id: 'party_hat', name: 'Mũ Sinh Nhật', icon: '🎉', description: 'Mũ tiệc tùng chấm bi rực rỡ', unlockLevel: 2 },
  { id: 'flower', name: 'Hoa Cúc Cài', icon: '🌸', description: 'Hoa nở rực rỡ đón nắng mai', unlockLevel: 2 },
  { id: 'bunny_ears', name: 'Tai Thỏ Bông', icon: '🐰', description: 'Băng đô tai thỏ mềm mại đáng yêu', unlockLevel: 2 },
  { id: 'strawberry_pin', name: 'Kẹp Dâu Tây', icon: '🍓', description: 'Kẹp tóc dâu tây ngọt ngào', unlockLevel: 3 },
  { id: 'sunglasses', name: 'Kính Râm', icon: '🕶️', description: 'Kính râm siêu sao thời thượng', unlockLevel: 3 },
  { id: 'beanie', name: 'Mũ Len Ấm', icon: '🧶', description: 'Mũ len mùa đông ấp áp', unlockLevel: 4 },
  { id: 'crown', name: 'Vương Miện', icon: '👑', description: 'Vương miện vàng hoàng gia quý phái', unlockLevel: 4 },
  { id: 'star_clip', name: 'Kẹp Sao Băng', icon: '⭐', description: 'Kẹp tóc ngôi sao lấp lánh', unlockLevel: 5 },
  { id: 'wizard_hat', name: 'Mũ Phù Thủy', icon: '🧙', description: 'Mũ chóp nhọn đầy phép thuật', unlockLevel: 3 },
  { id: 'propeller_hat', name: 'Mũ Chong Chóng', icon: '🚁', description: 'Mũ chong chóng quay tít', unlockLevel: 2 },
  { id: 'kindergarten_hat', name: 'Mũ Vàng Mầm Non', icon: '🎒', description: 'Mũ vàng vành xanh đồng phục mầm non siêu cưng', unlockLevel: 1 },
  { id: 'cat_ears', name: 'Băng Đô Tai Mèo', icon: '🐱', description: 'Tai mèo hồng phấn rung rinh tinh nghịch', unlockLevel: 2 },
  { id: 'frog_hat', name: 'Mũ Bé Ếch Xanh', icon: '🐸', description: 'Mũ ếch xanh mắt ốc ngộ nghĩnh đáng yêu', unlockLevel: 2 },
  { id: 'round_glasses', name: 'Kính Tròn Giáo Sư', icon: '👓', description: 'Kính tròn tri thức Nobita chăm ngoan', unlockLevel: 3 },
  { id: 'apple_clip', name: 'Kẹp Táo Đỏ', icon: '🍎', description: 'Kẹp tóc quả táo đỏ mọng ngọt ngào', unlockLevel: 3 },
  { id: 'angel_halo', name: 'Vòng Hào Quang', icon: '✨', description: 'Hào quang thiên thần lấp lánh thuần khiết', unlockLevel: 4 },
  { id: 'headphone', name: 'Tai Nghe Nhạc', icon: '🎧', description: 'Tai nghe chụp tai sành điệu', unlockLevel: 4 },
  { id: 'flower_crown', name: 'Vòng Hoa Tiên Tử', icon: '🌺', description: 'Vòng hoa rực rỡ sắc màu', unlockLevel: 3 },
  { id: 'minnie_bow', name: 'Nơ Đỏ Chấm Bi', icon: '🎀', description: 'Nơ đỏ chấm bi trắng điệu đà dễ thương', unlockLevel: 1 },
  { id: 'grad_cap', name: 'Mũ Cử Nhân Nhí', icon: '🎓', description: 'Mũ tốt nghiệp trạng nguyên thông thái', unlockLevel: 3 },
  { id: 'panda_ears', name: 'Băng Đô Gấu Trúc', icon: '🐼', description: 'Đôi tai gấu trúc đen tròn ngộ nghĩnh', unlockLevel: 2 },
  { id: 'fried_egg', name: 'Kẹp Trứng Ốp La', icon: '🍳', description: 'Kẹp tóc trứng ốp la lòng đào béo ngậy', unlockLevel: 2 },
  { id: 'carrot_clip', name: 'Kẹp Cà Rốt Nhỏ', icon: '🥕', description: 'Củ cà rốt cam tươi mọng lá xanh', unlockLevel: 2 },
  { id: 'mushroom_hat', name: 'Mũ Nấm Đốm Đỏ', icon: '🍄', description: 'Mũ nấm cổ tích rừng xanh xinh xắn', unlockLevel: 3 },
  { id: 'unicorn_horn', name: 'Sừng Kỳ Lân Vàng', icon: '🦄', description: 'Sừng kỳ lân xoắn ốc phép thuật lấp lánh', unlockLevel: 4 },
  { id: 'pirate_hat', name: 'Mũ Thuyền Trưởng', icon: '🏴‍☠️', description: 'Mũ hải tặc phiêu lưu đại dương dũng cảm', unlockLevel: 4 },
  { id: 'sakura_pin', name: 'Kẹp Hoa Anh Đào', icon: '🌸', description: 'Cánh hoa anh đào mùa xuân Nhật Bản', unlockLevel: 1 },
  { id: 'cupcake_hat', name: 'Mũ Bánh Cupcake', icon: '🧁', description: 'Bánh kem kem dâu gắn quả cherry ngọt ngào', unlockLevel: 3 },
  { id: 'pacifier', name: 'Núm Ngậm Đặc Biệt', icon: '👶', description: 'Núm ngậm gắn sao hoàng gia', unlockLevel: 1 }
];

export const FRIENDSHIP_LEVELS = [
  { level: 1, title: 'Bạn Mới Gặp', minExp: 0, maxExp: 50, badge: '🌱' },
  { level: 2, title: 'Bạn Thân Mến', minExp: 50, maxExp: 120, badge: '🌸' },
  { level: 3, title: 'Bé Yêu Của Bạn', minExp: 120, maxExp: 220, badge: '💖' },
  { level: 4, title: 'Bảo Hộ Nhí', minExp: 220, maxExp: 350, badge: '⭐' },
  { level: 5, title: 'Tri Kỷ Ruột', minExp: 350, maxExp: 520, badge: '👑' },
  { level: 6, title: 'Gia Đình Nhỏ', minExp: 520, maxExp: 750, badge: '🏡' },
  { level: 7, title: 'Ngôi Sao May Mắn', minExp: 750, maxExp: 1000, badge: '✨' },
  { level: 8, title: 'Hộ Mệnh Mầm Non', minExp: 1000, maxExp: 99999, badge: '🏆' }
];

export const getFriendshipInfo = (exp: number) => {
  for (let i = FRIENDSHIP_LEVELS.length - 1; i >= 0; i--) {
    if (exp >= FRIENDSHIP_LEVELS[i].minExp) {
      return {
        ...FRIENDSHIP_LEVELS[i],
        progress: Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((exp - FRIENDSHIP_LEVELS[i].minExp) /
                (FRIENDSHIP_LEVELS[i].maxExp - FRIENDSHIP_LEVELS[i].minExp)) *
                100
            )
          )
        )
      };
    }
  }
  return { ...FRIENDSHIP_LEVELS[0], progress: 0 };
};
