import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Heart,
  Baby,
  Moon,
  Sun,
  Utensils,
  Bath,
  Gamepad2,
  Trophy,
  Star,
  Check,
  RotateCcw,
  Zap,
  Smile,
  Shield,
  Gift,
  Award,
  ChevronRight,
  Flame,
  Volume2,
  HeartHandshake,
  ScrollText,
  AlertTriangle,
  RefreshCw,
  X,
  Clock,
  BadgeCheck,
  Calendar,
  Ghost
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  MascotPet,
  PetCareState,
  AccessoryType,
  Character
} from '../types';
import {
  DEFAULT_MASCOTS,
  NURSERY_FOODS,
  ACCESSORY_OPTIONS,
  
  getFriendshipInfo,
  FoodItem,
  AccessoryOption,
  
} from '../data/mascots';
import { InteractiveMascotSnake, MascotMood } from './InteractiveMascotSnake';
import { storage } from '../utils/storage';
import { sound } from '../utils/audio';

interface PlaygroundSectionProps {
  characters?: Character[];
  onSelectCharacterProfile?: (char: Character) => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface Firefly {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  characters = []
}) => {
  // Mascots List: Default Mascots + Character Adapters
  const allMascots: MascotPet[] = [
    ...DEFAULT_MASCOTS,
    ...characters.map((c) => ({
      id: `char-${c.id}`,
      name: c.name,
      species: `Bé Rắn ${c.gender} • ${c.nickname}`,
      badge: c.title,
      description: c.personality || c.fullBio,
      gender: c.gender === 'Bé Rồng Bí Ẩn' ? 'Phi Giới Tính' : c.gender,
      primaryColor: c.gender === 'Bé Gái' ? '#FBCFE8' : '#BAE6FD',
      secondaryColor: '#FAF5FF',
      strokeColor: c.gender === 'Bé Gái' ? '#831843' : '#0369A1',
      characterId: c.id,
      avatarUrl: c.avatarUrl,
      quotes: [
        `Xin chào mẹ ơi, con là ${c.name} nè! (◕‿◕) ✨`,
        `Hôm nay con được đi học ở Mầm Non Rắn Con vui ghê! 🎒`,
        `Con thích nhất là: ${c.likes || 'Được cô xoa đầu khen thưởng'} 💕`,
        `Bạn ơi cho con xin miếng bánh ngon với nè! 🍓`,
        `Con hứa sẽ luôn là bé rắn ngoan ngoãn vâng lời cô giáo! 🌸`
      ],
      favoriteFood: c.likes || 'Bánh dâu sữa',
      favoriteFoodIcon: '🍰',
      favoriteToy: 'Bóng mầm non',
      favoriteToyIcon: '🎾'
    }))
  ];

  // Active Pet Selection
  const [selectedPetId, setSelectedPetId] = useState<string>(() => storage.getSelectedPetId());
  const [petCategory, setPetCategory] = useState<'mascot' | 'classroom'>('mascot');

  // Pet Care State
  const [careState, setCareState] = useState<PetCareState>(() => storage.getPetCareState(selectedPetId));
  const [currentMood, setCurrentMood] = useState<MascotMood>('happy');
  const [isWiggling, setIsWiggling] = useState(false);
  const [speechQuote, setSpeechQuote] = useState<string>('');
  const [speechVisible, setSpeechVisible] = useState(true);

  // Adoption Modals & States
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showSwitchPetModal, setShowSwitchPetModal] = useState(false);
  const [customNicknameInput, setCustomNicknameInput] = useState('');
  const [isFriendshipPulsing, setIsFriendshipPulsing] = useState(false);
  const [showSimDrawer, setShowSimDrawer] = useState(false);

  // Active Tool Drawer Tab: 'none' | 'feed' | 'bathe' | 'play' | 'dress' | 'diary'
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'feed' | 'bathe' | 'play' | 'dress' | 'diary'>('none');

  // Interactive Floating Elements
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [soapBubbles, setSoapBubbles] = useState<Bubble[]>([]);

  // Mini Game: Firefly Catcher (Bắt Đom Đóm Phát Sáng)
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(15);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const playAreaRef = useRef<HTMLDivElement | null>(null);

  // Mini Game: Rock Paper Scissors (Oẳn Tù Tì)
  const [rpsState, setRpsState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [rpsPlayerChoice, setRpsPlayerChoice] = useState<'rock'|'paper'|'scissors'|null>(null);
  const [rpsMascotChoice, setRpsMascotChoice] = useState<'rock'|'paper'|'scissors'|null>(null);
  const [rpsResult, setRpsResult] = useState<'win'|'lose'|'draw'|null>(null);

  // Care Diary History
  const [careDiary, setCareDiary] = useState<string[]>(() => [
    'Bé vừa gia nhập nhà trẻ Mầm Non Rắn Con! Hãy chăm sóc bé thật chu đáo nhé 🌸'
  ]);

  // Find active pet metadata
  const currentPet = allMascots.find((p) => p.id === selectedPetId) || allMascots[0];
  const friendshipInfo = getFriendshipInfo(careState.friendshipPoints);

  // Time-based calculations for hunger, starvation, dirt, and sadness
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const lastFedTime = careState.lastFedAt || careState.lastUpdated || now;
  const msSinceFed = now - lastFedTime;
  const daysWithoutFood = Math.floor(msSinceFed / (24 * 60 * 60 * 1000));
  const hoursWithoutFood = Math.floor((msSinceFed % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const daysRemaining = Math.max(0, 7 - daysWithoutFood);
  const isDangerouslyStarving = careState.isAdopted && !careState.isDeceased && daysWithoutFood >= 5;
  const isDirty = careState.cleanliness < 45;
  const isSad = (careState.happiness < 40 || now - (careState.lastPattedAt || now) > 8 * 60 * 60 * 1000) && !careState.isSleeping && !careState.isDeceased;

  // Starvation Check Effect: 7 days without food results in deceased state
  useEffect(() => {
    if (careState.isAdopted && !careState.isDeceased) {
      const currentTime = Date.now();
      const fedTime = careState.lastFedAt || careState.lastUpdated || currentTime;
      if (currentTime - fedTime >= SEVEN_DAYS_MS) {
        setCareState((prev) => ({
          ...prev,
          isDeceased: true,
          deceasedAt: fedTime + SEVEN_DAYS_MS,
          hunger: 0,
          happiness: 0
        }));
        addDiaryLog(`🕊️ Bé ${careState.customNickname || currentPet.name} đã qua đời vì 7 ngày không được cho ăn...`);
      }
    }
  }, [careState.isAdopted, careState.isDeceased, careState.lastFedAt]);

  // Synchronize state when selected pet changes
  useEffect(() => {
    storage.saveSelectedPetId(selectedPetId);
    const loadedState = storage.getPetCareState(selectedPetId);
    setCareState(loadedState);

    // Initial greeting quote
    const quotes = currentPet.quotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechQuote(randomQuote);
  }, [selectedPetId]);

  // Persist care state to localStorage
  useEffect(() => {
    storage.savePetCareState(careState);
  }, [careState]);

  // Handle Speech Balloon Rotation
  const triggerSpeech = (customText?: string) => {
    setSpeechVisible(false);
    setTimeout(() => {
      if (customText) {
        setSpeechQuote(customText);
      } else {
        const quotes = currentPet.quotes;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setSpeechQuote(randomQuote);
      }
      setSpeechVisible(true);
    }, 200);
  };

  // Add Log Entry
  const addDiaryLog = (entry: string) => {
    setCareDiary((prev) => [
      `[${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}] ${entry}`,
      ...prev.slice(0, 7)
    ]);
  };

  // Exp & Friendship Level Up Checker
  const addExp = (points: number) => {
    setCareState((prev) => {
      const newPoints = prev.friendshipPoints + points;
      const prevInfo = getFriendshipInfo(prev.friendshipPoints);
      const newInfo = getFriendshipInfo(newPoints);

      if (newInfo.level > prevInfo.level) {
        sound.playChime('levelUp');
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
        addDiaryLog(`🎉 Bé đạt Cấp Thân Thiết ${newInfo.level}: "${newInfo.title}"! Nhận quà tặng tình bạn!`);
        triggerSpeech(`Oa oa! Bé và bạn vừa thân thiết hơn rồi nè! Yêu bạn nhiều lắm! (≧◡≦) ♡`);
      }

      return {
        ...prev,
        friendshipPoints: newPoints,
        level: newInfo.level,
        totalInteractions: prev.totalInteractions + 1
      };
    });
  };

  // Action: Pet & Tickle (Xoa đầu cưng nựng)
  const handlePetSnake = (e: React.MouseEvent) => {
    if (careState.isDeceased) return;

    sound.playChime('love');
    setIsWiggling(true);
    setCurrentMood('loved');

    // Spawn floating heart particle
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 20 - 10);
    const y = e.clientY - rect.top - 20;
    const heartId = Date.now() + Math.random();

    setFloatingHearts((prev) => [...prev, { id: heartId, x, y }]);

    // Heart flies up and disappears; automatically adds to friendship bar!
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
      setIsFriendshipPulsing(true);
      setTimeout(() => setIsFriendshipPulsing(false), 700);
    }, 600);

    const currentTime = Date.now();
    // Update stats
    setCareState((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 6),
      energy: Math.max(10, prev.energy - 1),
      lastPattedAt: currentTime
    }));
    addExp(3);

    triggerSpeech(`A nhột quá hì hì~ Được bạn xoa đầu cưng ghê ó! (✿◠‿◠)`);

    setTimeout(() => {
      setIsWiggling(false);
      if (!careState.isSleeping) setCurrentMood('happy');
    }, 800);
  };

  // Action: Feed Food Item (Cho ăn)
  const handleFeedFood = (food: FoodItem) => {
    if (careState.isDeceased) return;

    sound.playChime('munch');
    setCurrentMood('eating');
    setIsWiggling(true);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 }
    });

    const currentTime = Date.now();
    setCareState((prev) => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + food.hungerBoost),
      happiness: Math.min(100, prev.happiness + food.happinessBoost),
      isSleeping: false,
      lastFedAt: currentTime
    }));

    addExp(10);
    addDiaryLog(`Cho bé ăn ${food.name} (${food.icon}) ngon lành (+10 EXP)`);
    triggerSpeech(`Măm măm~ ${food.name} ngon tuyệt cú mèo luôn! Cảm ơn bạn nha! 😋`);

    setTimeout(() => {
      setIsWiggling(false);
      setCurrentMood('happy');
    }, 1200);
  };

  // Action: Bathe Snake (Tắm rửa)
  const handleBathe = () => {
    if (careState.isDeceased) return;

    sound.playChime('splash');
    setCurrentMood('bathing');
    setIsWiggling(true);

    // Generate floating bubbles
    const newBubbles: Bubble[] = Array.from({ length: 9 }).map((_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: 24 + Math.random() * 28
    }));
    setSoapBubbles(newBubbles);

    const currentTime = Date.now();
    setCareState((prev) => ({
      ...prev,
      cleanliness: 100,
      happiness: Math.min(100, prev.happiness + 15),
      isSleeping: false,
      lastBathedAt: currentTime
    }));

    addExp(12);
    addDiaryLog(`Tắm bọt xà phòng thơm lừng cho bé sạch bong (+12 EXP)`);
    triggerSpeech(`Bọt xà phòng thơm phức luôn nè! Bạn bấm vỡ bong bóng cùng bé đi! 🫧✨`);

    setTimeout(() => {
      setIsWiggling(false);
      setCurrentMood('happy');
    }, 1500);
  };

  // Action: Adopt Pet (Nhận nuôi bé)
  const handleAdoptPet = (nickname?: string) => {
    const currentTime = Date.now();
    const finalName = (nickname || customNicknameInput).trim() || currentPet.name;

    setCareState((prev) => ({
      ...prev,
      isAdopted: true,
      adoptedAt: currentTime,
      customNickname: finalName,
      lastFedAt: currentTime,
      lastBathedAt: currentTime,
      lastPattedAt: currentTime,
      isDeceased: false,
      deceasedAt: undefined
    }));

    sound.playChime('levelUp');
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    addDiaryLog(`💖 Bạn đã chính thức nhận nuôi bé ${finalName}! Chúc mừng hai bạn gắn kết!`);
    triggerSpeech(`Oa oa! Bé đã chính thức được bạn nhận nuôi rồi! Yêu bạn nhiều lắm ạ! (≧◡≦) ♡`);
    setShowAdoptionModal(false);
    setShowCertificateModal(true);
  };

  // Action: Revive Pet (Nuôi lại từ đầu)
  const handleRevivePet = () => {
    const currentTime = Date.now();
    setCareState((prev) => ({
      ...prev,
      isDeceased: false,
      deceasedAt: undefined,
      hunger: 85,
      cleanliness: 95,
      happiness: 90,
      energy: 95,
      friendshipPoints: 15,
      level: 1,
      lastFedAt: currentTime,
      lastBathedAt: currentTime,
      lastPattedAt: currentTime,
      lastUpdated: currentTime
    }));

    sound.playChime('levelUp');
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    addDiaryLog(`🌱 Bé ${careState.customNickname || currentPet.name} đã được tái sinh và nuôi lại từ đầu!`);
    triggerSpeech(`Oa oa! Bé đã được tái sinh khỏe mạnh rồi nè! Cảm ơn bạn đã cứu bé! (✿◠‿◠)`);
  };

  // Action: Unadopt Pet / Switch Pet (Chọn bé mới / Hủy nhận nuôi)
  const handleUnadoptPet = () => {
    setCareState((prev) => ({
      ...prev,
      isAdopted: false,
      customNickname: undefined,
      isDeceased: false,
      deceasedAt: undefined
    }));

    addDiaryLog(`🕊️ Bạn đã gửi bé ${careState.customNickname || currentPet.name} về lại nhà trẻ chung.`);
    setShowSwitchPetModal(false);
  };

  // Simulation helpers for testing:
  const handleSimulate7Days = () => {
    const pastSevenDays = Date.now() - (7.2 * 24 * 60 * 60 * 1000);
    setCareState((prev) => ({
      ...prev,
      isAdopted: true,
      lastFedAt: pastSevenDays,
      isDeceased: true,
      deceasedAt: Date.now(),
      hunger: 0,
      happiness: 0
    }));
    addDiaryLog('🧪 [Thử nghiệm] Mô phỏng 7 ngày không cho ăn -> Bé hóa thiên thần!');
  };

  const handleSimulateDirtyAndSad = () => {
    const pastThreeDays = Date.now() - (3 * 24 * 60 * 60 * 1000);
    setCareState((prev) => ({
      ...prev,
      cleanliness: 20,
      happiness: 25,
      lastBathedAt: pastThreeDays,
      lastPattedAt: pastThreeDays
    }));
    addDiaryLog('🧪 [Thử nghiệm] Mô phỏng bé bị bẩn lấm lem & buồn thiu do thiếu quan tâm!');
  };

  const handleRestoreStats = () => {
    const currentTime = Date.now();
    setCareState((prev) => ({
      ...prev,
      hunger: 100,
      cleanliness: 100,
      happiness: 100,
      energy: 100,
      isDeceased: false,
      lastFedAt: currentTime,
      lastBathedAt: currentTime,
      lastPattedAt: currentTime
    }));
    addDiaryLog('🌱 [Thử nghiệm] Nạp đầy 100% tất cả chỉ số khỏe mạnh!');
  };

  // Pop a soap bubble
  const handlePopBubble = (bubbleId: number) => {
    sound.playChime('pop');
    setSoapBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
    setCareState((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 2)
    }));
  };

  // Action: Toggle Sleep / Nap
  const handleToggleSleep = () => {
    if (careState.isSleeping) {
      // Wake up
      sound.playChime('bell');
      setCareState((prev) => ({
        ...prev,
        isSleeping: false,
        energy: 100
      }));
      setCurrentMood('happy');
      addDiaryLog('Bé vừa thức giấc sau giấc ngủ ngon, tràn đầy năng lượng 100%!');
      triggerSpeech('Oa... Ngủ đã mắt quá! Bé đã nạp đầy năng lượng rồi nè! ☀️');
    } else {
      // Go to sleep
      sound.playChime('snore');
      setCareState((prev) => ({
        ...prev,
        isSleeping: true,
        energy: Math.min(100, prev.energy + 20)
      }));
      setCurrentMood('sleeping');
      addDiaryLog('Đắp chăn hoa nhỏ ru bé ngủ ngoan khò khò...');
      triggerSpeech('Buồn ngủ quá gùi... Chúc bạn ngủ ngon nha~ Khò khò... (˘ᵕ˘) zzz');
    }
  };

  // Action: Play Toy (Tung bóng len)
  const handlePlayToy = () => {
    sound.playChime('toy');
    setCurrentMood('playing');
    setIsWiggling(true);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 }
    });

    setCareState((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(10, prev.energy - 12),
      isSleeping: false
    }));

    addExp(15);
    addDiaryLog(`Tung bóng len đùa giỡn cùng bé siêu vui vẻ (+15 EXP)`);
    triggerSpeech(`Lăn bóng len bắt trúng phóc luôn nè! Chơi vui quá xá bạn ơi! 🎾🎉`);

    setTimeout(() => {
      setIsWiggling(false);
      setCurrentMood('happy');
    }, 1200);
  };

  // Mini Game: RPS (Oẳn Tù Tì)
  const handleStartRps = () => {
    setRpsState('playing');
    setRpsPlayerChoice(null);
    setRpsMascotChoice(null);
    setRpsResult(null);
    sound.playChime('bell');
    triggerSpeech('Oẳn tù tì ra cái gì ra cái này! ✊🖐️✌️ Bạn chọn gì nè?');
  };

  const handlePlayRps = (choice: 'rock'|'paper'|'scissors') => {
    setRpsPlayerChoice(choice);
    const choices: ('rock'|'paper'|'scissors')[] = ['rock', 'paper', 'scissors'];
    const mascotChoice = choices[Math.floor(Math.random() * choices.length)];
    setRpsMascotChoice(mascotChoice);

    let result: 'win'|'lose'|'draw' = 'draw';
    if (
      (choice === 'rock' && mascotChoice === 'scissors') ||
      (choice === 'paper' && mascotChoice === 'rock') ||
      (choice === 'scissors' && mascotChoice === 'paper')
    ) {
      result = 'win';
    } else if (choice === mascotChoice) {
      result = 'draw';
    } else {
      result = 'lose';
    }
    setRpsResult(result);
    setRpsState('result');

    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 800);

    if (result === 'win') {
      sound.playChime('levelUp');
      addDiaryLog('Chơi oẳn tù tì thắng bé! (+20 Hạnh phúc, +25 EXP)');
      triggerSpeech('Oa, bạn thắng rồi! Giỏi quá đi! 🎉💖');
      setCareState((prev) => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.max(0, prev.energy - 5)
      }));
      addExp(25);
    } else if (result === 'lose') {
      sound.playChime('pop');
      addDiaryLog('Chơi oẳn tù tì nhường bé thắng! (+30 Hạnh phúc, +10 EXP)');
      triggerSpeech('Hehe, con thắng rồi nè! Vui quá là vui! 🥰');
      setCareState((prev) => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 30),
        energy: Math.max(0, prev.energy - 5)
      }));
      addExp(10);
    } else {
      sound.playChime('bell');
      addDiaryLog('Chơi oẳn tù tì hòa nhau! (+5 Hạnh phúc, +5 EXP)');
      triggerSpeech('Hòa nhau rồi! Trùng hợp quá nè! 😆');
      setCareState((prev) => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 5),
        energy: Math.max(0, prev.energy - 5)
      }));
      addExp(5);
    }
  };

  // Action: Start Firefly Mini-Game
  const handleStartGame = () => {
    setIsGameActive(true);
    setGameScore(0);
    setGameTimeLeft(15);
    sound.playChime('bell');
    addDiaryLog('Bắt đầu mini-game: Bắt Đom Đóm Phát Sáng!');
    triggerSpeech('Cùng bắt đom đóm trong vườn đêm với bé nào! Cố lên nha! 🌟');

    // Spawn initial fireflies
    const initialFireflies: Firefly[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
      size: 26 + Math.random() * 12
    }));
    setFireflies(initialFireflies);
  };

  // Game loop timer
  useEffect(() => {
    if (!isGameActive) return;

    const timer = setInterval(() => {
      setGameTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameActive(false);
          // End game rewards
          sound.playChime('levelUp');
          confetti({ particleCount: 60, spread: 80 });
          addExp(gameScore * 3);
          addDiaryLog(`Hoàn thành mini-game bắt đom đóm! Điểm số: ${gameScore} (+${gameScore * 3} EXP)`);
          triggerSpeech(`Tuyệt vời quá! Bạn và bé bắt được tận ${gameScore} chú đom đóm dạ quang! 🏆✨`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive, gameScore]);

  // Move fireflies
  useEffect(() => {
    if (!isGameActive) return;

    const moveInterval = setInterval(() => {
      setFireflies((prev) =>
        prev.map((f) => {
          let nextX = f.x + f.speedX;
          let nextY = f.y + f.speedY;
          let sX = f.speedX;
          let sY = f.speedY;

          if (nextX < 5 || nextX > 85) sX = -sX;
          if (nextY < 10 || nextY > 80) sY = -sY;

          return {
            ...f,
            x: Math.max(5, Math.min(85, nextX)),
            y: Math.max(10, Math.min(80, nextY)),
            speedX: sX,
            speedY: sY
          };
        })
      );
    }, 80);

    return () => clearInterval(moveInterval);
  }, [isGameActive]);

  // Catch a firefly
  const handleCatchFirefly = (id: number) => {
    sound.playChime('bell');
    setGameScore((prev) => prev + 1);
    setCurrentMood('playing');
    setIsWiggling(true);

    // Replace caught firefly with a new one
    setFireflies((prev) => [
      ...prev.filter((f) => f.id !== id),
      {
        id: Date.now() + Math.random(),
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 70,
        speedX: (Math.random() - 0.5) * 5,
        speedY: (Math.random() - 0.5) * 5,
        size: 26 + Math.random() * 12
      }
    ]);

    setTimeout(() => setIsWiggling(false), 300);
  };

  // Action: Select Accessory
  const handleSelectAccessory = (acc: AccessoryOption) => {
    if (friendshipInfo.level < acc.unlockLevel) {
      sound.playChime('pop');
      alert(`Phụ kiện này sẽ mở khóa khi tình bạn đạt Cấp ${acc.unlockLevel}! Hãy chăm sóc bé thêm nhé! ⭐`);
      return;
    }

    sound.playChime('bell');
    setCareState((prev) => ({
      ...prev,
      accessory: acc.id
    }));
    addDiaryLog(`Đeo phụ kiện ${acc.name} (${acc.icon}) cho bé`);
    triggerSpeech(`Oa! Đeo ${acc.name} vào trông con xinh xắn đáng yêu hông nè? 💖`);
  };

  return (
    <section id="playground-section" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background soft ambient decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-[var(--accent)]/30 via-pink-100/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-purple-700 text-xs sm:text-sm font-bold shadow-xs border border-purple-200 mb-4 backdrop-blur-xs">
          <Baby className="w-4 h-4 text-pink-500 animate-bounce" />
          <span>KHU VUI CHƠI & NHÀ TRẺ MẦM NON RẮN CON</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-3 tracking-tight">
          Chọn Bé Rắn Mascot & Tự Tay Chăm Sóc
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-main)]/75 max-w-2xl mx-auto font-medium leading-relaxed">
          Ghé thăm nhà trẻ mầm non, chọn bé rắn bạn yêu thương nhất để cho ăn bánh dâu, tắm bọt xà phòng, chơi bắt đom đóm và tăng điểm tri kỷ!
        </p>
      </div>

      {/* Mascot Selector Bar */}
      <div className="mb-6">
        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPetCategory('mascot')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              petCategory === 'mascot'
                ? 'bg-[#E9D5FF] text-[#581C87] shadow-sm border border-[#D8B4E5]'
                : 'bg-[#F8F6F4] text-[#4A3E3D]/80 hover:bg-[#E9D5FF]/50 border border-[#D8B4E5]/30'
            }`}
          >
            <Baby className="w-4 h-4" />
            <span>Dàn Bé Rắn Mascot ({DEFAULT_MASCOTS.length})</span>
          </button>

          {characters.length > 0 && (
            <button
              type="button"
              onClick={() => setPetCategory('classroom')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                petCategory === 'classroom'
                  ? 'bg-[#E9D5FF] text-[#581C87] shadow-sm border border-[#D8B4E5]'
                  : 'bg-[#F8F6F4] text-[#4A3E3D]/80 hover:bg-[#E9D5FF]/50 border border-[#D8B4E5]/30'
              }`}
            >
              <Smile className="w-4 h-4" />
              <span>Các Bé Học Sinh Trong Lớp ({characters.length})</span>
            </button>
          )}
        </div>

        {/* Horizontal Scrolling Mascots Grid */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-[#E8A0BF]/30">
          {(petCategory === 'mascot'
            ? DEFAULT_MASCOTS
            : allMascots.filter((m) => m.id.startsWith('char-'))
          ).map((mascot) => {
            const isSelected = mascot.id === selectedPetId;
            const mascotCare = storage.getPetCareState(mascot.id);
            const isAdoptedMascot = mascotCare.isAdopted;
            const isDeceasedMascot = mascotCare.isDeceased;

            return (
              <button
                key={mascot.id}
                type="button"
                onClick={() => {
                  sound.playChime('pop');
                  setSelectedPetId(mascot.id);
                }}
                className={`flex-shrink-0 flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer border text-left ${
                  isSelected
                    ? 'bg-white border-[#E8A0BF] shadow-md ring-2 ring-[#E8A0BF]/40 scale-102'
                    : 'bg-[#F8F6F4] border-[#E8A0BF]/20 hover:bg-white hover:border-[#E8A0BF]/50'
                }`}
              >
                {/* Mini Mascot Avatar */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center p-1 relative overflow-hidden border border-black/5"
                  style={{ backgroundColor: mascot.primaryColor + '35' }}
                >
                  {mascot.avatarUrl ? (
                    <img
                      src={mascot.avatarUrl}
                      alt={mascot.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-10 h-10">
                      <InteractiveMascotSnake
                        primaryColor={mascot.primaryColor}
                        secondaryColor={mascot.secondaryColor}
                        strokeColor={mascot.strokeColor}
                        mood={isDeceasedMascot ? 'sad' : 'happy'}
                        accessory="none"
                        
                        isAngel={isDeceasedMascot}
                        isChick={mascot.id === 'mascot-gacon' || mascot.species.toLowerCase().includes('gà con')}
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#E8A0BF] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-xs sm:text-sm text-[#4A3E3D] truncate">
                      {mascot.name}
                    </span>
                    {isAdoptedMascot && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#E8A0BF]/20 text-[#4A3E3D] flex items-center gap-0.5">
                        <Heart className="w-2.5 h-2.5 fill-[#E8A0BF] text-[#E8A0BF]" />
                        <span>Đã nhận nuôi</span>
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#E8A0BF]/15 text-[#E8A0BF]">
                        Đang xem
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#4A3E3D]/70 block truncate">
                    {mascot.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ADOPTION STATUS & SIMULATION CONTROL BAR */}
      <div className="mb-6 space-y-3">
        {/* Adoption Card Banner */}
        <div className="p-4 rounded-3xl bg-[#F8F6F4] border border-[#E8A0BF]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8A0BF] text-white flex items-center justify-center text-xl shadow-xs flex-shrink-0">
              {careState.isAdopted ? '💖' : '🏡'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-[#4A3E3D]">
                  {careState.isAdopted ? (
                    <>
                      Bé đã được bạn nhận nuôi: <span className="text-[#E8A0BF]">{careState.customNickname || currentPet.name}</span>
                    </>
                  ) : (
                    <>
                      Bạn đang ghé thăm nhà trẻ chung: <span className="text-[#E8A0BF]">{currentPet.name}</span>
                    </>
                  )}
                </h3>
                {careState.isAdopted && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E8A0BF]/20 text-[#4A3E3D] text-[11px] font-bold">
                    Có Giấy Chứng Nhận
                  </span>
                )}
              </div>
              <p className="text-xs text-[#4A3E3D]/70 mt-0.5">
                {careState.isAdopted ? (
                  careState.isDeceased ? (
                    <span className="text-[#4A3E3D] font-medium">
                      🕊️ Bé đã hóa thành thiên thần nhỏ vì quá 7 ngày không được ăn. Bạn có thể nuôi lại bé hoặc nhận nuôi bé mới!
                    </span>
                  ) : (
                    <span className="text-[#4A3E3D]/80">
                      🍖 Lần ăn gần nhất: {daysWithoutFood === 0 ? 'Hôm nay' : `${daysWithoutFood} ngày trước`} • Còn{' '}
                      <strong className={daysRemaining <= 2 ? 'text-red-500 font-bold' : 'text-emerald-600'}>
                        {daysRemaining} ngày an toàn
                      </strong>{' '}
                      trước khi bé đói nguy hiểm!
                    </span>
                  )
                ) : (
                  <span>
                    Nhận nuôi bé để đặt tên riêng, nhận giấy chứng nhận và gắn kết lâu dài (không bắt buộc).
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
            {careState.isAdopted ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F8F6F4] text-[#4A3E3D] text-xs font-bold border border-[#E8A0BF]/30 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ScrollText className="w-3.5 h-3.5 text-[#E8A0BF]" />
                  <span>Giấy Chứng Nhận</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSwitchPetModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#E8A0BF]/10 hover:bg-[#E8A0BF]/20 text-[#4A3E3D] text-xs font-bold cursor-pointer transition-colors"
                >
                  Đổi Bé Khác
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCustomNicknameInput(currentPet.name);
                  setShowAdoptionModal(true);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-[#E8A0BF] hover:bg-[#D98EB3] text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-102"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Nhận Nuôi Bé {currentPet.name}</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable Testing & Simulation Tools */}
        <div className="flex items-center justify-between text-xs text-[var(--text-main)]/60 px-2">
          <button
            type="button"
            onClick={() => setShowSimDrawer(!showSimDrawer)}
            className="hover:text-purple-600 transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>🧪 Công cụ thử nghiệm tình huống (7 ngày đói, Lấm lem, Buồn thiu)</span>
            <span className="text-[10px]">{showSimDrawer ? '▲ Ẩn' : '▼ Hiện'}</span>
          </button>
        </div>

        {showSimDrawer && (
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <span>🧪 Phím thử nhanh:</span>
            </span>
            <button
              type="button"
              onClick={handleSimulate7Days}
              className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] cursor-pointer"
              title="Thử nghiệm kịch bản 7 ngày không cho ăn dẫn đến bé qua đời hóa thiên thần"
            >
              🕊️ Thử 7 ngày đói (Bé qua đời)
            </button>
            <button
              type="button"
              onClick={handleSimulateDirtyAndSad}
              className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] cursor-pointer"
              title="Thử nghiệm kịch bản bé bị lấm lem bùn đất và buồn vì thiếu vuốt ve"
            >
              🧼 Thử Lấm Lem & Buồn Thiu
            </button>
            <button
              type="button"
              onClick={handleRestoreStats}
              className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
              title="Nạp đầy 100% tất cả chỉ số khỏe mạnh"
            >
              🌱 Nạp Đầy 100% Tất Cả Chỉ Số
            </button>
          </div>
        )}
      </div>

      {/* MAIN DAYCARE STAGE & CONTROL BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT / CENTER: Interactive Playpen (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Status Warning Banners */}
          {isDangerouslyStarving && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center justify-between gap-2 text-xs font-bold animate-pulse shadow-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Cảnh báo đói: Đã {daysWithoutFood} ngày bé chưa được ăn! Quá 7 ngày bé sẽ qua đời!</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveDrawer('feed')}
                className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer flex-shrink-0 shadow-2xs"
              >
                Cho Ăn Ngay 🍖
              </button>
            </div>
          )}

          {!careState.isDeceased && isDirty && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-2 text-xs shadow-xs">
              <span className="flex items-center gap-1.5 font-bold">
                <span>🧼</span>
                <span>Bé đang bị bẩn, lấm lem bùn đất! Hãy bấm "Tắm Rửa" để bé sạch sẽ nhé!</span>
              </span>
              <button
                type="button"
                onClick={handleBathe}
                className="px-3 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[11px] cursor-pointer flex-shrink-0 shadow-2xs"
              >
                Tắm Ngay 🫧
              </button>
            </div>
          )}

          {!careState.isDeceased && isSad && (
            <div className="p-3 rounded-2xl bg-pink-50 border border-pink-200 text-pink-900 flex items-center justify-between gap-2 text-xs shadow-xs">
              <span className="flex items-center gap-1.5 font-bold">
                <span>🥺</span>
                <span>Bé đang buồn thiu vì chưa được xoa đầu vuốt ve! Hãy nhấp vào đầu bé nhé!</span>
              </span>
              <span className="text-[11px] text-pink-700 italic font-semibold">Nhấp vào bé 💕</span>
            </div>
          )}

          {/* Daycare Playpen Stage */}
          <div
            ref={playAreaRef}
            className={`relative rounded-3xl p-6 sm:p-8 border-3 transition-all duration-700 overflow-hidden shadow-lg select-none min-h-[440px] sm:min-h-[480px] flex flex-col items-center justify-between ${
              careState.isDeceased
                ? 'bg-gradient-to-b from-[#2e1065] via-[#3b0764] to-[#1e1b4b] border-purple-400/50 text-purple-100'
                : careState.isSleeping
                ? 'bg-gradient-to-b from-[#1E1B4B] via-[#2E1065] to-[#3B0764] border-purple-500/40 text-purple-100'
                : 'bg-gradient-to-b from-amber-50/60 via-pink-50/40 to-emerald-50/50 border-[var(--dominant)]/40 text-[var(--text-main)]'
            }`}
          >
            {/* Top Stage Badges & Toggle Mode */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-xs text-xs font-bold flex items-center gap-1.5 border border-purple-200/50 shadow-xs">
                  <span className="text-base">{currentPet.favoriteToyIcon}</span>
                  <span>{careState.customNickname || currentPet.name}</span>
                  <span className="text-[11px] font-normal text-purple-600">({currentPet.species})</span>
                </span>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-pink-100/90 text-pink-800 border border-pink-200/60 hidden sm:inline-flex items-center gap-1">
                  <Heart className="w-3 h-3 text-pink-600 fill-pink-600" />
                  {friendshipInfo.badge} {friendshipInfo.title}
                </span>
              </div>

              {/* Day / Night Sleep Mode Toggle Button */}
              {!careState.isDeceased && (
                <button
                  type="button"
                  onClick={handleToggleSleep}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    careState.isSleeping
                      ? 'bg-amber-400 text-amber-950 hover:bg-amber-300'
                      : 'bg-indigo-900/90 text-indigo-100 hover:bg-indigo-800 border border-indigo-700'
                  }`}
                  title={careState.isSleeping ? 'Đánh thức bé dậy' : 'Đắp chăn ru bé ngủ'}
                >
                  {careState.isSleeping ? (
                    <>
                      <Sun className="w-3.5 h-3.5 animate-spin" />
                      <span>Đánh Thức Dậy ☀️</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5" />
                      <span>Ru Ngủ 💤</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Night-time Sky Ambient (Stars and Moon) */}
            {careState.isSleeping && !careState.isDeceased && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-6 right-16 w-12 h-12 rounded-full bg-yellow-200/90 shadow-[0_0_30px_rgba(254,240,138,0.6)]" />
                <div className="absolute top-12 left-10 text-yellow-200/80 animate-pulse text-lg">✦</div>
                <div className="absolute top-20 right-32 text-yellow-100/70 animate-pulse text-xs">★</div>
                <div className="absolute bottom-24 left-16 text-yellow-200/60 animate-pulse text-sm">✦</div>
                <div className="absolute top-36 left-48 text-yellow-100/70 animate-pulse text-xs">★</div>
              </div>
            )}

            {/* Angel Heaven Ambient when Deceased */}
            {careState.isDeceased && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-purple-400/20 blur-3xl" />
                <div className="absolute top-12 left-12 text-yellow-200/70 text-2xl animate-pulse">☁️</div>
                <div className="absolute top-16 right-16 text-yellow-200/70 text-2xl animate-pulse">☁️</div>
                <div className="absolute bottom-16 left-20 text-yellow-100/80 text-xl">✨</div>
                <div className="absolute bottom-24 right-24 text-yellow-100/80 text-xl">✨</div>
              </div>
            )}

            {/* Speech Bubble Above Baby Snake */}
            <div className="w-full max-w-md my-auto flex flex-col items-center z-10 pt-4">
              <div
                onClick={() => !careState.isDeceased && triggerSpeech()}
                className={`relative px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xs text-[var(--text-main)] shadow-md border-2 border-[var(--dominant)]/40 text-xs sm:text-sm font-medium transition-all duration-300 max-w-[90%] text-center ${
                  careState.isDeceased
                    ? 'border-purple-400 bg-purple-50 text-purple-950'
                    : 'cursor-pointer hover:scale-102'
                } ${speechVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                <p className="font-bold text-pink-600 text-[11px] mb-0.5 flex items-center justify-center gap-1">
                  <span>{careState.customNickname || currentPet.name} {careState.isDeceased ? 'trên mây' : ''}:</span>
                </p>
                <p className="leading-relaxed italic">
                  {careState.isDeceased
                    ? 'Bé đã hóa thành thiên thần nhỏ trên mây do 7 ngày không được ăn... Bé nhớ bạn lắm! Hãy bấm "Nuôi Lại Từ Đầu" để đón bé về chơi nhé! 🕊️✨'
                    : speechQuote}
                </p>
                
                {/* Speech arrow */}
                <div className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 ${careState.isDeceased ? 'border-t-[#F8F6F4]' : 'border-t-white'}`} />
              </div>

              {/* CENTER MASCOT SNAKE RENDER */}
              <div className="relative mt-5 mb-2">
                <InteractiveMascotSnake
                  primaryColor={currentPet.primaryColor}
                  secondaryColor={currentPet.secondaryColor}
                  strokeColor={currentPet.strokeColor}
                  mood={careState.isDeceased ? 'sad' : currentMood}
                  accessory={careState.accessory}
                  
                  isWiggling={isWiggling}
                  isSleeping={careState.isSleeping}
                  cleanliness={careState.cleanliness}
                  happiness={careState.happiness}
                  isAngel={careState.isDeceased}
                  isChick={currentPet.id === 'mascot-gacon' || currentPet.species.toLowerCase().includes('gà con')}
                  onClick={handlePetSnake}
                  className="w-56 h-56 sm:w-64 sm:h-64"
                />

                {/* Night blanket overlay when sleeping */}
                {careState.isSleeping && !careState.isDeceased && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-44 h-16 rounded-t-3xl bg-[#E8A0BF]/85 border-2 border-[#E8A0BF]/90 shadow-md backdrop-blur-xs flex items-center justify-center text-[11px] font-bold text-[#4A3E3D] pointer-events-none animate-pulse">
                    🌸 Chăn hoa nhỏ êm ấm
                  </div>
                )}

                {/* Floating Heart Particles (Flies Up and Fades smoothly) */}
                {floatingHearts.map((h) => (
                  <div
                    key={h.id}
                    className="absolute text-[#E8A0BF] font-bold animate-float-fade pointer-events-none flex items-center gap-1 z-30"
                    style={{ left: `${h.x}px`, top: `${h.y}px` }}
                  >
                    <span>💖</span>
                    <span className="text-xs font-black">+3 EXP</span>
                  </div>
                ))}

                {/* Floating Soap Bubbles during Bathe */}
                {soapBubbles.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handlePopBubble(b.id)}
                    className="absolute rounded-full bg-cyan-200/60 border border-cyan-300 shadow-sm backdrop-blur-xs cursor-pointer hover:scale-125 transition-transform flex items-center justify-center text-cyan-800 text-[10px] font-bold"
                    style={{
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      width: `${b.size}px`,
                      height: `${b.size}px`
                    }}
                    title="Bấm để làm vỡ bong bóng xà phòng!"
                  >
                    🫧
                  </div>
                ))}

                {/* Mini-Game: Catch Fireflies Overlay */}
                {isGameActive && (
                  <div className="absolute inset-0 z-30 pointer-events-auto">
                    {fireflies.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleCatchFirefly(f.id)}
                        className="absolute rounded-full p-2 bg-yellow-300/90 text-yellow-950 font-bold text-xs shadow-[0_0_20px_rgba(253,224,71,0.9)] animate-pulse transition-transform hover:scale-130 cursor-pointer flex items-center justify-center border border-white"
                        style={{
                          left: `${f.x}%`,
                          top: `${f.y}%`,
                          width: `${f.size}px`,
                          height: `${f.size}px`
                        }}
                        title="Bắt đom đóm!"
                      >
                        🌟
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Interaction Hint or Deceased Action Bar */}
              {careState.isDeceased ? (
                <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 z-20">
                  <button
                    type="button"
                    onClick={handleRevivePet}
                    className="px-4 py-2 rounded-2xl bg-[#E8A0BF] hover:bg-[#D98EB3] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer flex items-center gap-2 transition-transform hover:scale-103"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Nuôi Lại Bé Từ Đầu 🌱</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSwitchPetModal(true)}
                    className="px-4 py-2 rounded-2xl bg-[#F8F6F4] hover:bg-white text-[#4A3E3D] text-xs sm:text-sm font-bold shadow-sm cursor-pointer transition-colors border border-[#4A3E3D]/10"
                  >
                    Chọn Bé Mới Để Nuôi 🐣
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-[#4A3E3D]/60 text-center font-medium">
                  {careState.isSleeping
                    ? 'Bé đang ngủ ngon ngoan ngoãn. Nhấn "Đánh Thức Dậy" để chơi tiếp cùng bé nhé!'
                    : 'Chạm hoặc nhấp trực tiếp vào bé để xoa đầu, cưng nựng và tim sẽ tự bay vào thanh điểm tình bạn! 💕'}
                </p>
              )}
            </div>

            {/* Bottom Status Quick Summary */}
            <div className="w-full flex items-center justify-between text-xs pt-3 border-t border-[#4A3E3D]/10 z-10">
              <span className="font-bold flex items-center gap-1 text-[#4A3E3D]">
                <span>Khoái khẩu:</span>
                <span className="text-[#E8A0BF]">{currentPet.favoriteFoodIcon} {currentPet.favoriteFood}</span>
              </span>

              <span className="text-[11px] text-[#4A3E3D]/70">
                Tương tác: <strong>{careState.totalInteractions}</strong> lần
              </span>
            </div>
          </div>

          {/* Quick Action Care Bar */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveDrawer(activeDrawer === 'feed' ? 'none' : 'feed')}
              className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                activeDrawer === 'feed'
                  ? 'bg-[#E8A0BF] text-white border-[#E8A0BF] shadow-md scale-102'
                  : 'bg-white text-[#4A3E3D] border-[#E8A0BF]/30 hover:bg-[#E8A0BF]/10'
              }`}
            >
              <Utensils className={`w-4 h-4 sm:w-5 sm:h-5 ${activeDrawer === 'feed' ? 'text-white' : 'text-[#E8A0BF]'}`} />
              <span className="text-[10px] sm:text-xs font-bold">Cho Ăn</span>
            </button>

            <button
              type="button"
              onClick={handleBathe}
              className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                currentMood === 'bathing'
                  ? 'bg-cyan-500 text-white border-cyan-600 shadow-md scale-102'
                  : 'bg-white text-[#4A3E3D] border-[#E8A0BF]/30 hover:bg-cyan-50'
              }`}
            >
              <Bath className={`w-4 h-4 sm:w-5 sm:h-5 ${currentMood === 'bathing' ? 'text-white' : 'text-cyan-400'}`} />
              <span className="text-[10px] sm:text-xs font-bold">Tắm Rửa</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDrawer(activeDrawer === 'play' ? 'none' : 'play')}
              className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                activeDrawer === 'play'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                  : 'bg-white text-[#4A3E3D] border-[#E8A0BF]/30 hover:bg-amber-50'
              }`}
            >
              <Gamepad2 className={`w-4 h-4 sm:w-5 sm:h-5 ${activeDrawer === 'play' ? 'text-white' : 'text-amber-400'}`} />
              <span className="text-[10px] sm:text-xs font-bold">Vui Chơi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDrawer(activeDrawer === 'dress' ? 'none' : 'dress')}
              className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                activeDrawer === 'dress'
                  ? 'bg-[#E8A0BF] text-white border-[#E8A0BF] shadow-md scale-102'
                  : 'bg-white text-[#4A3E3D] border-[#E8A0BF]/30 hover:bg-[#E8A0BF]/10'
              }`}
            >
              <Gift className={`w-4 h-4 sm:w-5 sm:h-5 ${activeDrawer === 'dress' ? 'text-white' : 'text-[#E8A0BF]'}`} />
              <span className="text-[10px] sm:text-xs font-bold">Tủ Đồ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDrawer(activeDrawer === 'diary' ? 'none' : 'diary')}
              className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                activeDrawer === 'diary'
                  ? 'bg-[#E8A0BF] text-white border-[#E8A0BF] shadow-md scale-102'
                  : 'bg-white text-[#4A3E3D] border-[#E8A0BF]/30 hover:bg-[#E8A0BF]/10'
              }`}
            >
              <Award className={`w-4 h-4 sm:w-5 sm:h-5 ${activeDrawer === 'diary' ? 'text-white' : 'text-[#E8A0BF]'}`} />
              <span className="text-[10px] sm:text-xs font-bold">Nhật Ký</span>
            </button>
          </div>

          {/* EXPANDABLE DRAWER PANELS */}
          {activeDrawer === 'feed' && (
            <div className="bg-white rounded-3xl p-5 border border-[#E8A0BF]/30 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-[#4A3E3D] flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-[#E8A0BF]" />
                  <span>Chọn Món Ngon Cho Bé Ăn</span>
                </h4>
                <span className="text-[11px] text-[#4A3E3D]/60">Độ no hiện tại: {careState.hunger}%</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {NURSERY_FOODS.map((food) => (
                  <button
                    key={food.id}
                    type="button"
                    onClick={() => handleFeedFood(food)}
                    className="p-3 rounded-2xl bg-[#F8F6F4] hover:bg-[#E8A0BF]/10 border border-[#E8A0BF]/20 transition-all cursor-pointer flex flex-col items-center text-center group hover:scale-103"
                  >
                    <span className="text-2xl sm:text-3xl mb-1 group-hover:scale-110 transition-transform">
                      {food.icon}
                    </span>
                    <span className="font-bold text-xs text-[#4A3E3D] line-clamp-1">
                      {food.name}
                    </span>
                    <span className="text-[10px] text-[#E8A0BF] font-semibold mt-0.5">
                      +{food.hungerBoost} No
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeDrawer === 'play' && (
            <div className="bg-white rounded-3xl p-5 border border-[#E8A0BF]/30 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-[#4A3E3D] flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4 text-[#E8A0BF]" />
                  <span>Trò Chơi Mầm Non Rắn Con</span>
                </h4>
                {isGameActive && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E8A0BF]/20 text-[#4A3E3D] animate-pulse">
                    ⏱️ Còn {gameTimeLeft}s • Điểm: {gameScore}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Game 1: Tung bóng len */}
                <div className="p-4 rounded-2xl bg-[#F8F6F4] border border-[#E8A0BF]/20 flex flex-col justify-between">
                  <div>
                    <span className="text-2xl mb-1 block">🎾</span>
                    <h5 className="font-bold text-xs sm:text-sm text-[#4A3E3D] mb-1">
                      Tung Bóng Len Mây
                    </h5>
                    <p className="text-[11px] text-[#4A3E3D]/70 mb-3">
                      Lăn bóng len trêu đùa cùng bé để nạp đầy thanh Hạnh Phúc (+20 Vui vẻ, +15 EXP).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePlayToy}
                    className="w-full py-2 rounded-xl bg-[#E8A0BF] hover:bg-[#E8A0BF]/90 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Tung Bóng Ngay 🎾
                  </button>
                </div>

                {/* Game 2: Mini-game Bắt đom đóm */}
                <div className="p-4 rounded-2xl bg-[#F8F6F4] border border-[#E8A0BF]/20 flex flex-col justify-between">
                  <div>
                    <span className="text-2xl mb-1 block">🌟</span>
                    <h5 className="font-bold text-xs sm:text-sm text-[#4A3E3D] mb-1">
                      Bắt Đom Đóm Phát Sáng (15 Giây)
                    </h5>
                    <p className="text-[11px] text-[#4A3E3D]/70 mb-3">
                      Đom đóm bay lượn trên sân chơi, nhấp nhanh tay để bé nhảy bắt lấy và ghi điểm kỷ lục!
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isGameActive}
                    onClick={handleStartGame}
                    className={`w-full py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer ${
                      isGameActive
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#E8A0BF] hover:bg-[#E8A0BF]/90 text-white'
                    }`}
                  >
                    {isGameActive ? `Đang chơi (${gameTimeLeft}s)...` : 'Chơi Mini-Game 🌟'}
                  </button>
                </div>

                {/* Game 3: Oẳn Tù Tì (Kéo Búa Bao) */}
                <div className="p-4 rounded-2xl bg-[#F8F6F4] border border-[#E8A0BF]/20 flex flex-col justify-between">
                  <div>
                    <span className="text-2xl mb-1 block">✌️</span>
                    <h5 className="font-bold text-xs sm:text-sm text-[#4A3E3D] mb-1">
                      Kéo Búa Bao
                    </h5>
                    <p className="text-[11px] text-[#4A3E3D]/70 mb-3">
                      Chơi oẳn tù tì với bé! Tương tác trực tiếp và nhận phần thưởng bất ngờ.
                    </p>
                  </div>

                  {rpsState === 'idle' && (
                    <button
                      type="button"
                      onClick={handleStartRps}
                      className="w-full py-2 rounded-xl bg-[#60A5FA] hover:bg-[#3B82F6] text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Chơi Ngay ✌️
                    </button>
                  )}

                  {rpsState === 'playing' && (
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => handlePlayRps('rock')} className="w-10 h-10 bg-white rounded-xl shadow-xs text-xl hover:scale-110 transition-transform">✊</button>
                      <button onClick={() => handlePlayRps('paper')} className="w-10 h-10 bg-white rounded-xl shadow-xs text-xl hover:scale-110 transition-transform">🖐️</button>
                      <button onClick={() => handlePlayRps('scissors')} className="w-10 h-10 bg-white rounded-xl shadow-xs text-xl hover:scale-110 transition-transform">✌️</button>
                    </div>
                  )}

                  {rpsState === 'result' && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-2 text-xl">
                        <span>{rpsPlayerChoice === 'rock' ? '✊' : rpsPlayerChoice === 'paper' ? '🖐️' : '✌️'}</span>
                        <span className="text-[10px] font-bold text-gray-400">VS</span>
                        <span>{rpsMascotChoice === 'rock' ? '✊' : rpsMascotChoice === 'paper' ? '🖐️' : '✌️'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRpsState('idle')}
                        className="w-full py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] font-bold cursor-pointer"
                      >
                        Chơi Lại ↺
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeDrawer === 'dress' && (
            <div className="bg-white rounded-3xl p-5 border border-[#E8A0BF]/30 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-[#4A3E3D] flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#E8A0BF]" />
                  <span>Tủ Đồ Phụ Kiện Cho Bé</span>
                </h4>
                <span className="text-[11px] text-[#E8A0BF] font-semibold">
                  Tình bạn Cấp {friendshipInfo.level} ({friendshipInfo.title})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-84 overflow-y-auto pr-1">
                {ACCESSORY_OPTIONS.map((acc) => {
                  const isEquipped = careState.accessory === acc.id;
                  const isLocked = friendshipInfo.level < acc.unlockLevel;

                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleSelectAccessory(acc)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center relative ${
                        isEquipped
                          ? 'bg-[#E8A0BF]/20 border-[#E8A0BF] ring-2 ring-[#E8A0BF]/50'
                          : isLocked
                          ? 'bg-black/5 border-black/10 opacity-60'
                          : 'bg-[#F8F6F4] border-[#E8A0BF]/20 hover:bg-[#E8A0BF]/10'
                      }`}
                    >
                      <span className="text-2xl mb-1">{acc.icon}</span>
                      <span className="font-bold text-xs text-[#4A3E3D] line-clamp-1">
                        {acc.name}
                      </span>
                      {isLocked ? (
                        <span className="text-[10px] text-red-500 font-bold mt-1">
                          🔒 Cấp {acc.unlockLevel}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#E8A0BF] font-semibold mt-1">
                          {isEquipped ? '✓ Đang đội' : 'Chọn đội'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeDrawer === 'diary' && (
            <div className="bg-white rounded-3xl p-5 border border-[#E8A0BF]/30 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-[#4A3E3D] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#E8A0BF]" />
                  <span>Nhật Ký Chăm Sóc Đáng Yêu</span>
                </h4>
                <span className="text-[11px] text-[#4A3E3D]/60">Lưu lại kỷ niệm đẹp</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {careDiary.map((entry, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#F8F6F4] border border-[#4A3E3D]/10 text-xs text-[#4A3E3D] leading-relaxed"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Vitals & Friendship Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Friendship Card */}
          <div
            className={`p-6 rounded-3xl transition-all duration-500 relative overflow-hidden ${
              isFriendshipPulsing
                ? 'bg-[#E8A0BF]/10 border-2 border-[#E8A0BF] ring-4 ring-[#E8A0BF]/30 shadow-lg scale-102'
                : 'bg-white border border-[#E8A0BF]/30 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-[#E8A0BF] text-white flex items-center justify-center text-xl shadow-xs">
                  {friendshipInfo.badge}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#4A3E3D]">
                    Cấp {friendshipInfo.level}: {friendshipInfo.title}
                  </h3>
                  <span className="text-[11px] text-[#4A3E3D]/60">
                    Bé {careState.customNickname || currentPet.name} • {currentPet.badge}
                  </span>
                </div>
              </div>

              {isFriendshipPulsing && (
                <span className="px-2.5 py-1 rounded-full bg-[#E8A0BF] text-white text-[11px] font-bold animate-bounce shadow-xs flex items-center gap-1">
                  +3 EXP 💖
                </span>
              )}
            </div>

            {/* EXP Progress Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-[#4A3E3D]">Điểm Tình Bạn (EXP)</span>
                <span className="text-[#E8A0BF]">
                  {careState.friendshipPoints} / {friendshipInfo.maxExp} EXP
                </span>
              </div>
              <div className="w-full h-3 bg-[#E8A0BF]/20 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#E8A0BF] rounded-full transition-all duration-500"
                  style={{ width: `${friendshipInfo.progress}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-[#4A3E3D]/70 italic">
              ⭐ Mẹo mầm non: Mỗi lần xoa đầu vuốt ve, tim bay lên sẽ tự động cộng thẳng vào thanh điểm tình bạn!
            </p>
          </div>

          {/* Vitals Health & Mood Bars */}
          <div className="p-6 rounded-3xl bg-[#F8F6F4] border border-[#E8A0BF]/30 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-[#4A3E3D] flex items-center justify-between">
              <span>Chỉ Số Sức Khỏe & Tâm Trạng</span>
              <span className="text-[11px] font-normal text-[#4A3E3D]/60">Tự động cập nhật</span>
            </h4>

            {/* Hunger */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1 text-[#4A3E3D]">
                  <Utensils className="w-3.5 h-3.5 text-[#E8A0BF]" />
                  <span>Độ No Nê</span>
                </span>
                <span className={`font-bold ${careState.hunger < 25 ? 'text-red-500 animate-pulse' : 'text-[#4A3E3D]'}`}>
                  {careState.hunger}% {careState.hunger < 25 ? '(Đang rất đói!)' : '(No bụng)'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#4A3E3D]/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    careState.hunger < 25 ? 'bg-red-400' : 'bg-[#E8A0BF]'
                  }`}
                  style={{ width: `${careState.hunger}%` }}
                />
              </div>
            </div>

            {/* Happiness */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1 text-[#4A3E3D]">
                  <Heart className="w-3.5 h-3.5 text-[#E8A0BF] fill-[#E8A0BF]" />
                  <span>Chỉ Số Vui Vẻ (Vuốt ve)</span>
                </span>
                <span className={`font-bold ${isSad ? 'text-rose-500 animate-pulse' : 'text-[#4A3E3D]'}`}>
                  {careState.happiness}% {isSad ? '(Buồn vì thiếu vuốt ve)' : '(Hạnh phúc)'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#4A3E3D]/10">
                <div
                  className="h-full bg-[#E8A0BF] rounded-full transition-all duration-500"
                  style={{ width: `${careState.happiness}%` }}
                />
              </div>
            </div>

            {/* Cleanliness */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1 text-[#4A3E3D]">
                  <Bath className="w-3.5 h-3.5 text-[#E8A0BF]" />
                  <span>Độ Sạch Sẽ (Tắm rửa)</span>
                </span>
                <span className={`font-bold ${isDirty ? 'text-red-500 animate-pulse' : 'text-[#4A3E3D]'}`}>
                  {careState.cleanliness}% {isDirty ? '(Lấm lem bùn đất)' : '(Sạch sẽ thơm tho)'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#4A3E3D]/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isDirty ? 'bg-red-400' : 'bg-[#E8A0BF]'
                  }`}
                  style={{ width: `${careState.cleanliness}%` }}
                />
              </div>
            </div>

            {/* Energy */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1 text-[#4A3E3D]">
                  <Zap className="w-3.5 h-3.5 text-[#E8A0BF]" />
                  <span>Năng Lượng Tỉnh Táo</span>
                </span>
                <span className="text-[#4A3E3D] font-bold">
                  {careState.energy}% {careState.isSleeping ? '(Đang ngủ)' : ''}
                </span>
              </div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#4A3E3D]/10">
                <div
                  className="h-full bg-[#E8A0BF] rounded-full transition-all duration-500"
                  style={{ width: `${careState.energy}%` }}
                />
              </div>
            </div>
          </div>

          {/* Pet Personality & Description Card */}
          <div className="p-5 rounded-3xl bg-white border border-[#E8A0BF]/30 text-xs text-[#4A3E3D] shadow-xs">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#4A3E3D]/60 mb-1.5 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#E8A0BF]" />
              <span>Hồ Sơ Tính Cách Bé {careState.customNickname || currentPet.name}</span>
            </h5>
            <p className="leading-relaxed text-[#4A3E3D]/80 mb-3">
              {currentPet.description}
            </p>

            <div className="pt-2.5 border-t border-[#4A3E3D]/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="flex items-center gap-1 text-[#4A3E3D]/70">
                <span>Món khoái khẩu:</span>
                <strong className="text-[#E8A0BF]">{currentPet.favoriteFoodIcon} {currentPet.favoriteFood}</strong>
              </span>
              <span className="flex items-center gap-1 text-[#4A3E3D]/70">
                <span>Đồ chơi thích:</span>
                <strong className="text-[#E8A0BF]">{currentPet.favoriteToyIcon} {currentPet.favoriteToy}</strong>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ADOPTION FORM MODAL */}
      {showAdoptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#E8A0BF] relative text-left">
            <button
              type="button"
              onClick={() => setShowAdoptionModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F8F6F4] hover:bg-[#E8A0BF]/20 text-[#4A3E3D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E8A0BF] text-white mx-auto flex items-center justify-center text-2xl shadow-md mb-2">
                💖
              </div>
              <h3 className="font-bold text-xl text-[#4A3E3D]">
                Nhận Nuôi Bé Mascot
              </h3>
              <p className="text-xs text-[#4A3E3D]/70 mt-1">
                Tự nguyện nhận nuôi 1 trong các bé mascot đáng yêu để gắn kết lâu dài!
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#E8A0BF]/10 border border-[#E8A0BF]/30 mb-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1 border border-[#E8A0BF]/30">
                <InteractiveMascotSnake
                  primaryColor={currentPet.primaryColor}
                  secondaryColor={currentPet.secondaryColor}
                  strokeColor={currentPet.strokeColor}
                  mood="happy"
                  accessory="none"
                  
                  isChick={currentPet.id === 'mascot-gacon' || currentPet.species.toLowerCase().includes('gà con')}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#4A3E3D]">
                  {currentPet.name}
                </h4>
                <p className="text-xs text-[#E8A0BF] font-semibold">
                  {currentPet.species} • {currentPet.badge}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-[#4A3E3D] mb-1.5">
                Đặt Tên Riêng Cho Bé:
              </label>
              <input
                type="text"
                value={customNicknameInput}
                onChange={(e) => setCustomNicknameInput(e.target.value)}
                placeholder="Ví dụ: Bé Bông, Bé Mầm, Cục Cưng..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#4A3E3D]/20 focus:outline-none focus:ring-2 focus:ring-[#E8A0BF] text-sm font-medium bg-[#F8F6F4]"
                maxLength={30}
              />
            </div>

            <div className="p-3 rounded-xl bg-[#F8F6F4] border border-[#E8A0BF]/30 text-[11px] text-[#4A3E3D] space-y-1 mb-5">
              <p className="font-bold text-[#E8A0BF] flex items-center gap-1">
                <span>⚠️ Lưu ý quy tắc chăm sóc:</span>
              </p>
              <p>• 🍖 <strong>Cho ăn:</strong> Nếu không cho ăn trong 7 ngày, bé sẽ qua đời hóa thiên thần và phải nuôi lại từ đầu hoặc chọn bé mới.</p>
              <p>• 🧼 <strong>Tắm rửa:</strong> Không được tắm, bé sẽ bị bẩn lấm lem bùn đất.</p>
              <p>• 🥺 <strong>Vuốt ve:</strong> Không được xoa đầu, bé sẽ buồn thiu thèm được cưng nựng.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAdoptPet(customNicknameInput)}
                className="flex-1 py-2.5 rounded-xl bg-[#E8A0BF] hover:bg-[#D98EB3] text-white font-bold text-sm shadow-md cursor-pointer transition-transform hover:scale-102"
              >
                Xác Nhận Nhận Nuôi 💖
              </button>
              <button
                type="button"
                onClick={() => setShowAdoptionModal(false)}
                className="px-4 py-2.5 rounded-xl bg-[#F8F6F4] hover:bg-gray-200 text-[#4A3E3D] font-bold text-sm cursor-pointer"
              >
                Để Sau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADOPTION CERTIFICATE MODAL */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFFDF5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-[#E8A0BF]/50 relative text-center">
            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F8F6F4] hover:bg-[#E8A0BF]/20 text-[#4A3E3D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Certificate Header Decoration */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-[#E8A0BF]/20 text-[#4A3E3D] text-xs font-bold tracking-widest uppercase mb-3">
              <span>★ TRƯỜNG MẦM NON RẮN CON ★</span>
            </div>

            <h3 className="font-bold text-2xl sm:text-3xl text-[#4A3E3D] mb-1 tracking-tight">
              GIẤY CHỨNG NHẬN NHẬN NUÔI
            </h3>
            <p className="text-xs text-[#4A3E3D]/80 italic mb-6">
              Chứng nhận tình bạn và bảo trợ yêu thương chính thức
            </p>

            {/* Certificate Body Card */}
            <div className="p-5 rounded-2xl bg-white/90 border-2 border-dashed border-[#E8A0BF]/60 mb-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-3">
                <InteractiveMascotSnake
                  primaryColor={currentPet.primaryColor}
                  secondaryColor={currentPet.secondaryColor}
                  strokeColor={currentPet.strokeColor}
                  mood="loved"
                  accessory={careState.accessory}
                  
                  isChick={currentPet.id === 'mascot-gacon' || currentPet.species.toLowerCase().includes('gà con')}
                  className="w-full h-full"
                />
              </div>

              <h4 className="font-bold text-xl text-[#4A3E3D] mb-0.5">
                {careState.customNickname || currentPet.name}
              </h4>
              <p className="text-xs text-[#E8A0BF] font-semibold mb-2">
                Chủng loại: {currentPet.species}
              </p>

              <div className="w-full pt-3 border-t border-[#4A3E3D]/10 grid grid-cols-2 gap-2 text-left text-xs">
                <div>
                  <span className="text-[#4A3E3D]/60 block text-[10px]">Ngày Nhận Nuôi:</span>
                  <span className="font-bold text-[#4A3E3D]">
                    {new Date(careState.adoptedAt || Date.now()).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div>
                  <span className="text-[#4A3E3D]/60 block text-[10px]">Độ Thân Thiết:</span>
                  <span className="font-bold text-[#E8A0BF]">
                    Cấp {friendshipInfo.level} ({friendshipInfo.title})
                  </span>
                </div>
              </div>
            </div>

            {/* Seal and Promise */}
            <div className="flex items-center justify-between px-2 mb-6 text-xs text-[#4A3E3D]/80 font-medium italic">
              <span>"Hứa yêu thương và chăm sóc bé mỗi ngày"</span>
              <div className="w-12 h-12 rounded-full border-2 border-[#E8A0BF] bg-[#E8A0BF]/10 text-[#4A3E3D] flex items-center justify-center font-bold text-[10px] uppercase shadow-inner">
                Đã Duyệt
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#E8A0BF] hover:bg-[#D98EB3] text-white font-bold text-sm shadow-md cursor-pointer transition-transform hover:scale-102"
            >
              Cất Giữ Giấy Chứng Nhận 🌸
            </button>
          </div>
        </div>
      )}

      {/* SWITCH PET / UNADOPT MODAL */}
      {showSwitchPetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#F8F6F4] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8A0BF]/40 relative text-left">
            <button
              type="button"
              onClick={() => setShowSwitchPetModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white hover:bg-[#E8A0BF]/20 text-[#4A3E3D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-lg text-[#4A3E3D] mb-2">
              Quản Lý Nhận Nuôi
            </h3>
            <p className="text-xs text-[#4A3E3D]/70 mb-4">
              Bạn có thể nuôi lại bé {careState.customNickname || currentPet.name} từ đầu hoặc gửi bé về lại nhà trẻ chung để chọn nhận nuôi một bé mới tùy thích!
            </p>

            <div className="space-y-2">
              {careState.isDeceased ? (
                <button
                  type="button"
                  onClick={() => {
                    handleRevivePet();
                    setShowSwitchPetModal(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#4A3E3D] hover:bg-[#3A302F] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Nuôi Lại Bé Này Từ Đầu</span>
                </button>
              ) : null}

              <button
                type="button"
                onClick={handleUnadoptPet}
                className="w-full py-2.5 rounded-xl bg-[#E8A0BF]/10 hover:bg-[#E8A0BF]/20 text-[#4A3E3D] font-bold text-xs border border-[#E8A0BF]/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Gửi Bé Về Nhà Trẻ & Chọn Nhận Nuôi Bé Mới</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSwitchPetModal(false)}
                className="w-full py-2 rounded-xl bg-white hover:bg-gray-100 text-[#4A3E3D] font-bold text-xs cursor-pointer border border-[#4A3E3D]/10"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
