import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCreator } from './components/HeroCreator';
import { CharacterSection } from './components/CharacterSection';
import { SecretInboxSection } from './components/SecretInboxSection';
import { StickyFanWall } from './components/StickyFanWall';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { YouTubeMusicPlayer } from './components/YouTubeMusicPlayer';
import { CuteSnakeMascot } from './components/CuteSnakeMascot';
import { CuteClickSparkles } from './components/CuteClickSparkles';

import {
  Character,
  BulletinPost,
  CreatorProfile,
  InboxMessage,
  StickyNote
} from './types';
import { storage } from './utils/storage';

export default function App() {
  // Application Data States
  const [characters, setCharacters] = useState<Character[]>(() => storage.getCharacters());
  const [bulletinPosts, setBulletinPosts] = useState<BulletinPost[]>(() => storage.getBulletinPosts());
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile>(() => storage.getCreatorProfile());
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>(() => storage.getInboxMessages());
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(() => storage.getStickyNotes());
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>(() => storage.getUserLikes());

  // Music Player State
  const [activeMusicCharacter, setActiveMusicCharacter] = useState<Character | null>(null);

  // Admin Modal & Authentication State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Sync states to storage whenever changed
  useEffect(() => {
    storage.saveCharacters(characters);
  }, [characters]);

  useEffect(() => {
    storage.saveBulletinPosts(bulletinPosts);
  }, [bulletinPosts]);

  useEffect(() => {
    storage.saveCreatorProfile(creatorProfile);
  }, [creatorProfile]);

  useEffect(() => {
    storage.saveInboxMessages(inboxMessages);
  }, [inboxMessages]);

  useEffect(() => {
    storage.saveStickyNotes(stickyNotes);
  }, [stickyNotes]);

  useEffect(() => {
    storage.saveUserLikes(userLikes);
  }, [userLikes]);

  // Handler: Toggle Character Like
  const handleToggleCharacterLike = (charId: string) => {
    const isCurrentlyLiked = !!userLikes[charId];
    setUserLikes((prev) => ({
      ...prev,
      [charId]: !isCurrentlyLiked
    }));

    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id === charId) {
          return {
            ...c,
            likesCount: isCurrentlyLiked ? Math.max(0, c.likesCount - 1) : c.likesCount + 1
          };
        }
        return c;
      })
    );
  };

  // Handler: Add New Inbox Message
  const handleAddInboxMessage = (
    newMsgData: Omit<InboxMessage, 'id' | 'timestamp' | 'status' | 'likesCount'>
  ) => {
    const newMsg: InboxMessage = {
      ...newMsgData,
      id: 'msg-' + Date.now(),
      timestamp: 'Vừa xong',
      status: 'approved', // Auto-approves so user sees their message immediately in the queue!
      likesCount: 0
    };
    setInboxMessages((prev) => [newMsg, ...prev]);
  };

  // Handler: Like an Inbox Message
  const handleLikeInboxMessage = (messageId: string) => {
    setInboxMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          return { ...msg, likesCount: msg.likesCount + 1 };
        }
        return msg;
      })
    );
  };

  // Handler: Add Sticky Note
  const handleAddStickyNote = (
    newNoteData: Omit<StickyNote, 'id' | 'likes' | 'createdAt' | 'rotationDeg'>
  ) => {
    const randomRotations = [-2.5, -1.8, -1, 1, 1.8, 2.5];
    const pickedRotation = randomRotations[Math.floor(Math.random() * randomRotations.length)];

    const newNote: StickyNote = {
      ...newNoteData,
      id: 'sticky-' + Date.now(),
      likes: 1,
      createdAt: 'Vừa xong',
      rotationDeg: pickedRotation
    };
    setStickyNotes((prev) => [newNote, ...prev]);
  };

  // Handler: Like Sticky Note
  const handleLikeStickyNote = (noteId: string) => {
    setStickyNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return { ...n, likes: n.likes + 1 };
        }
        return n;
      })
    );
  };

  // Admin CRUD Handlers
  const handleSaveCharacter = (characterToSave: Character) => {
    setCharacters((prev) => {
      const exists = prev.some((c) => c.id === characterToSave.id);
      if (exists) {
        return prev.map((c) => (c.id === characterToSave.id ? characterToSave : c));
      }
      return [characterToSave, ...prev];
    });
  };

  const handleDeleteCharacter = (charId: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== charId));
  };

  const handleApproveInboxMessage = (msgId: string, replyText?: string) => {
    setInboxMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          return {
            ...m,
            status: 'approved',
            reply: replyText || m.reply,
            repliedAt: 'Vừa cập nhật'
          };
        }
        return m;
      })
    );
  };

  const handleDeleteInboxMessage = (msgId: string) => {
    setInboxMessages((prev) => prev.filter((m) => m.id !== msgId));
  };

  const handleSaveBulletinPosts = (newPosts: BulletinPost[]) => {
    setBulletinPosts(newPosts);
  };

  const handleSaveCreatorProfile = (newProfile: CreatorProfile) => {
    setCreatorProfile(newProfile);
  };

  const handleDeleteStickyNote = (noteId: string) => {
    setStickyNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const handleResetDefaults = () => {
    storage.resetAllToDefault();
    setCharacters(storage.getCharacters());
    setBulletinPosts(storage.getBulletinPosts());
    setCreatorProfile(storage.getCreatorProfile());
    setInboxMessages(storage.getInboxMessages());
    setStickyNotes(storage.getStickyNotes());
  };

  // Quick navigation smooth scrolls
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-preschool-pattern flex flex-col text-[var(--text-main)]">
      
      {/* 1. Sticky / Glassmorphic Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        totalStudents={creatorProfile.totalStudents || characters.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Creator Profile & Bulletin Board Section */}
        <HeroCreator
          profile={creatorProfile}
          bulletinPosts={bulletinPosts}
          onExploreCharacters={() => scrollTo('characters-section')}
          onOpenInbox={() => scrollTo('inbox-section')}
          onOpenSticky={() => scrollTo('sticky-section')}
        />

        {/* 3. Character Showcase & Tagging System ("Bé Rắn Của Lớp") */}
        <CharacterSection
          characters={characters}
          onToggleLike={handleToggleCharacterLike}
          userLikes={userLikes}
          onPlayMusic={(char) => setActiveMusicCharacter(char)}
          totalStudents={creatorProfile.totalStudents || characters.length}
        />

        {/* 4. Anonymous Secret Inbox ("Hộp Thư Ẩn Danh Lớp Mầm Non") */}
        <SecretInboxSection
          messages={inboxMessages}
          characters={characters}
          onSubmitMessage={handleAddInboxMessage}
          onLikeMessage={handleLikeInboxMessage}
        />

        {/* 5. Interactive Fan Wall ("Bức Tường Sticky Note") */}
        <StickyFanWall
          notes={stickyNotes}
          onAddNote={handleAddStickyNote}
          onLikeNote={handleLikeStickyNote}
        />
      </main>

      {/* 6. Secured Admin Dashboard (Password Protected with 2308) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
        onLogout={() => setIsAdminLoggedIn(false)}
        characters={characters}
        onSaveCharacter={handleSaveCharacter}
        onDeleteCharacter={handleDeleteCharacter}
        inboxMessages={inboxMessages}
        onApproveInboxMessage={handleApproveInboxMessage}
        onDeleteInboxMessage={handleDeleteInboxMessage}
        bulletinPosts={bulletinPosts}
        onSaveBulletinPosts={handleSaveBulletinPosts}
        creatorProfile={creatorProfile}
        onSaveCreatorProfile={handleSaveCreatorProfile}
        stickyNotes={stickyNotes}
        onDeleteStickyNote={handleDeleteStickyNote}
        onResetDefaults={handleResetDefaults}
      />

      {/* Footer */}
      <Footer
        facebookUrl={creatorProfile.facebookUrl}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Floating Interactive YouTube Music Player */}
      <YouTubeMusicPlayer
        activeCharacter={activeMusicCharacter}
        onClose={() => setActiveMusicCharacter(null)}
      />

      {/* Floating Interactive Baby Snake Mascot */}
      <CuteSnakeMascot />

      {/* Interactive Pastel Hearts/Sparkles on tap/click */}
      <CuteClickSparkles />

    </div>
  );
}
