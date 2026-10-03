import React, { useMemo } from 'react';

interface PurplePetal {
  id: number;
  left: number; // percentage 0 - 100
  size: number; // px 11 - 25
  duration: number; // seconds 8 - 18
  delay: number; // seconds
  drift: number; // px drift horizontal -70 to 140
  rotate: number; // deg 180 to 720
  opacity: number; // 0.38 to 0.65 (super light & airy)
  color: string; // ultra light lavender shades
}

interface DustMote {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export const DynamicAnimatedBackground: React.FC = () => {
  // 36 distinct, delicate super-light lavender (#E3D9F7) petals
  const petals = useMemo<PurplePetal[]>(() => {
    const lavenderColors = [
      '#E3D9F7', // Exact requested super light lavender
      '#ECE4FC', // Ultra pale lavender mist
      '#E8DEFB', // Soft ethereal lavender
      '#DFD2F5', // Delicate pastel lavender
      '#E5DCF8', // Creamy whisper lavender
      '#EBE2FA', // Pale lavender petal
      '#F2ECFD', // Whisper lilac lavender
      '#E1D5F6', // Gentle lavender blossom
    ];

    const list: PurplePetal[] = [];
    for (let i = 0; i < 36; i++) {
      list.push({
        id: i,
        left: (i * 2.85 + ((i * 17) % 23) * 1.6) % 100,
        size: 11 + ((i * 7) % 13), // 11px to 24px
        duration: 8.5 + ((i * 3) % 9), // 8.5s to 17.5s
        delay: (i * 0.45) % 14,
        drift: -60 + ((i * 31) % 180),
        rotate: 160 + ((i * 67) % 450),
        opacity: 0.38 + ((i % 4) * 0.08), // 0.38 to 0.62 (super soft and light)
        color: lavenderColors[i % lavenderColors.length]
      });
    }
    return list;
  }, []);

  // Floating classroom sunlight dust motes
  const dustMotes = useMemo<DustMote[]>(() => {
    const list: DustMote[] = [];
    for (let i = 0; i < 18; i++) {
      list.push({
        id: i,
        top: 10 + ((i * 17) % 80),
        left: 5 + ((i * 29) % 90),
        size: 3 + (i % 4),
        duration: 4 + (i % 5),
        delay: (i * 0.6) % 4
      });
    }
    return list;
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Anime Classroom Wall Background (Soft Pastel Lavender & Cream Morning Atmosphere) */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          background: 'linear-gradient(135deg, #f7f1fd 0%, #f4eafd 25%, #f9f4fd 50%, #fef8f2 75%, #f7effd 100%)',
          backgroundSize: '300% 300%',
          animation: 'dynamicGradientFlow 20s ease-in-out infinite alternate',
        }}
      />

      {/* 2. Anime Classroom Grid Windows on Upper Left */}
      <div className="absolute -top-10 left-4 sm:left-12 w-64 sm:w-80 h-96 border-4 border-white/70 rounded-3xl bg-white/20 backdrop-blur-[2px] shadow-lg shadow-purple-200/30 rotate-[-4deg] opacity-75 overflow-hidden">
        {/* Window grid panes */}
        <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-2 p-2">
          <div className="border border-white/60 rounded-xl bg-gradient-to-br from-white/40 to-purple-100/20" />
          <div className="border border-white/60 rounded-xl bg-gradient-to-br from-white/40 to-purple-100/20" />
          <div className="border border-white/60 rounded-xl bg-gradient-to-br from-white/40 to-purple-100/20" />
          <div className="border border-white/60 rounded-xl bg-gradient-to-br from-white/40 to-purple-100/20" />
          <div className="border border-white/60 rounded-xl bg-gradient-to-br from-white/40 to-purple-100/20" />
          <div className="border border-white/60 rounded-xl bg-gradient-to-br from-white/40 to-purple-100/20" />
        </div>
      </div>

      {/* 3. Warm Anime Classroom Sunlight Rays Streaming from the Window */}
      <div 
        className="absolute -top-20 left-16 sm:left-28 w-[450px] sm:w-[650px] h-[1000px] bg-gradient-to-b from-amber-100/35 via-purple-100/25 to-transparent rotate-[-28deg] transform-gpu blur-2xl opacity-75 will-change-transform"
        style={{
          animation: 'orbDrift1 16s ease-in-out infinite alternate',
        }}
      />
      <div 
        className="absolute top-10 right-10 sm:right-24 w-[380px] sm:w-[500px] h-[900px] bg-gradient-to-b from-purple-100/30 via-pink-100/20 to-transparent rotate-[-15deg] transform-gpu blur-3xl opacity-65 will-change-transform"
        style={{
          animation: 'orbDrift2 18s ease-in-out infinite alternate',
        }}
      />

      {/* 4. Classroom Wooden Baseboard & Floor at Bottom (Gỗ Sàn Lớp Học Anime) */}
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-[#e9dbcb]/40 via-[#f4ebe0]/20 to-transparent pointer-events-none">
        {/* Soft perspective floor plank lines */}
        <div className="absolute bottom-0 inset-x-0 h-2 bg-[#d7be9f]/45" />
        <div className="absolute bottom-4 inset-x-0 h-0.5 bg-[#dfcaa9]/35" />
        <div className="absolute bottom-12 inset-x-0 h-0.5 bg-[#dfcaa9]/25" />
        <div className="absolute bottom-24 inset-x-0 h-0.5 bg-[#dfcaa9]/15" />
      </div>

      {/* 5. Floating Ambient Purple Orbs */}
      <div 
        className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-purple-200/25 blur-3xl will-change-transform"
        style={{
          animation: 'orbDrift1 14s ease-in-out infinite alternate',
        }}
      />
      <div 
        className="absolute top-1/3 -right-24 w-[600px] h-[600px] rounded-full bg-violet-200/20 blur-3xl will-change-transform"
        style={{
          animation: 'orbDrift2 16s ease-in-out infinite alternate',
          animationDelay: '-4s',
        }}
      />
      <div 
        className="absolute bottom-1/4 -left-20 w-[620px] h-[620px] rounded-full bg-purple-100/25 blur-3xl will-change-transform"
        style={{
          animation: 'orbDrift3 15s ease-in-out infinite alternate',
          animationDelay: '-7s',
        }}
      />

      {/* 6. Warm Classroom Dust Motes Dancing in the Light */}
      {dustMotes.map((mote) => (
        <div
          key={mote.id}
          className="absolute rounded-full bg-amber-200/80 blur-[0.5px] pointer-events-none will-change-transform"
          style={{
            top: `${mote.top}%`,
            left: `${mote.left}%`,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            boxShadow: '0 0 6px rgba(253, 230, 138, 0.8)',
            animationName: 'soft-pulse',
            animationDuration: `${mote.duration}s`,
            animationIterationCount: 'infinite',
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}

      {/* 7. Falling Gentle SUPER-LIGHT LAVENDER (#E3D9F7) Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 pointer-events-none will-change-transform"
          style={{
            left: `${petal.left}%`,
            animationName: 'petalFall',
            animationDuration: `${petal.duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `-${petal.delay}s`,
            ['--petal-drift' as any]: `${petal.drift}px`,
            ['--petal-rotate' as any]: `${petal.rotate}deg`,
          }}
        >
          {/* Inner swaying wrapper for natural wind flutter */}
          <div
            style={{
              animationName: 'petalSway',
              animationDuration: `${petal.duration / 3.2}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: petal.id % 2 === 0 ? 'alternate' : 'alternate-reverse',
            }}
          >
            {/* Realistic Organic Sakura / Flower Petal SVG with delicate veins in SUPER LIGHT LAVENDER #E3D9F7 */}
            <svg
              width={petal.size}
              height={petal.size * 1.35}
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                opacity: petal.opacity,
                filter: 'drop-shadow(0px 1px 4px rgba(216, 195, 245, 0.25))'
              }}
            >
              <defs>
                <linearGradient id={`light-lavender-grad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="45%" stopColor={petal.color} stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#D5C5F2" stopOpacity="0.65" />
                </linearGradient>
              </defs>
              {/* Petal body */}
              <path
                d="M12 1C6 6 1 14 1 21C1 27 6 31 12 31C18 31 23 27 23 21C23 14 18 6 12 1Z"
                fill={`url(#light-lavender-grad-${petal.id})`}
              />
              {/* Petal natural inner vein highlight */}
              <path
                d="M12 4C10.5 11 9.5 19 12 28"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {/* Delicate tip notch */}
              <path
                d="M10 2C11 1 13 1 14 2"
                stroke="rgba(227, 217, 247, 0.8)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
