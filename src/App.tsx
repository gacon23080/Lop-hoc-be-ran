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
import { useFirebaseData, firebaseActions } from './utils/firebaseHooks';

export default function App() {
  // Sync Data via Firebase
  const { characters, bulletinPosts, creatorProfile, inboxMessages, stickyNotes, setInboxMessages, setStickyNotes } = useFirebaseData();
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>(() => storage.getUserLikes());

  // Music Player State
  const [activeMusicCharacter, setActiveMusicCharacter] = useState<Character | null>(null);

  // Admin Modal & Authentication State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [selectedInboxRecipient, setSelectedInboxRecipient] = useState<string>('Tất cả');

  const handleSelectRecipientForLetter = (charName: string) => {
    setSelectedInboxRecipient(charName);
    const inboxEl = document.getElementById('inbox-section');
    if (inboxEl) {
      inboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    storage.saveUserLikes(userLikes);
  }, [userLikes]);

  // Handler: Toggle Character Like
  const handleToggleCharacterLike = (charId: string) => {
    const isCurrentlyLiked = !!userLikes[charId];
    const character = characters.find(c => c.id === charId);
    if (!character) return;

    setUserLikes((prev) => ({
      ...prev,
      [charId]: !isCurrentlyLiked
    }));

    if (isCurrentlyLiked) {
      firebaseActions.unlikeCharacter(charId, character.likesCount);
    } else {
      firebaseActions.likeCharacter(charId, character.likesCount);
    }
  };

  // Handler: Add New Inbox Message
  const handleAddInboxMessage = (
    newMsgData: Omit<InboxMessage, 'id' | 'timestamp' | 'status' | 'likesCount'>
  ) => {
    const newMsgId = 'msg-' + Date.now();
    const visitorId = storage.getVisitorId();
    const newMsg: InboxMessage = {
      ...newMsgData,
      id: newMsgId,
      timestamp: 'Vừa xong',
      status: 'approved',
      likesCount: 0,
      senderId: newMsgData.senderId || visitorId
    };
    storage.addMySentLetterId(newMsgId);
    firebaseActions.addInboxMessage(newMsg);
  };

  // Handler: Like an Inbox Message
  const handleLikeInboxMessage = (messageId: string) => {
    const msg = inboxMessages.find(m => m.id === messageId);
    if (msg) {
      firebaseActions.likeInboxMessage(messageId, msg.likesCount);
    }
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
    firebaseActions.addStickyNote(newNote);
  };

  // Handler: Like Sticky Note
  const handleLikeStickyNote = (noteId: string) => {
    const note = stickyNotes.find(n => n.id === noteId);
    if (note) {
      firebaseActions.likeStickyNote(noteId, note.likes);
    }
  };

  // Admin CRUD Handlers
  const handleSaveCharacter = (characterToSave: Character) => {
    firebaseActions.saveCharacter(characterToSave);
  };

  const handleDeleteCharacter = (charId: string) => {
    firebaseActions.deleteCharacter(charId);
  };

  const handleApproveInboxMessage = (msgId: string, replyText?: string) => {
    firebaseActions.updateInboxMessage(msgId, {
      status: 'approved',
      reply: replyText || '',
      repliedAt: 'Vừa cập nhật'
    });
  };

  const handleDeleteInboxMessage = (msgId: string) => {
    firebaseActions.deleteInboxMessage(msgId);
    storage.deleteInboxMessage(msgId);
    setInboxMessages(prev => prev.filter(m => m.id !== msgId));
  };

  const handleSaveBulletinPosts = (newPosts: BulletinPost[]) => {
    firebaseActions.saveBulletinPosts(newPosts);
  };

  const handleSaveCreatorProfile = (newProfile: CreatorProfile) => {
    firebaseActions.saveCreatorProfile(newProfile);
  };

  const handleDeleteStickyNote = (noteId: string) => {
    firebaseActions.deleteStickyNote(noteId);
    storage.deleteStickyNote(noteId);
    setStickyNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const handleResetDefaults = () => {
    storage.resetAllToDefault();
    // Re-seed firebase
    const cProfile = storage.getCreatorProfile();
    firebaseActions.saveCreatorProfile(cProfile);
    
    storage.getCharacters().forEach(c => firebaseActions.saveCharacter(c));
    firebaseActions.saveBulletinPosts(storage.getBulletinPosts());
    storage.getInboxMessages().forEach(m => firebaseActions.addInboxMessage(m));
    storage.getStickyNotes().forEach(n => firebaseActions.addStickyNote(n));
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
        totalStudents={creatorProfile?.totalStudents || characters.length || 0}
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
          totalStudents={creatorProfile?.totalStudents || characters.length || 0}
          inboxMessages={inboxMessages}
          isAdminLoggedIn={isAdminLoggedIn}
          onDeleteInboxMessage={handleDeleteInboxMessage}
          onLikeInboxMessage={handleLikeInboxMessage}
          onSelectRecipientForLetter={handleSelectRecipientForLetter}
        />

        {/* 4. Anonymous Secret Inbox ("Hộp Thư Ẩn Danh Lớp Mầm Non") */}
        <SecretInboxSection
          messages={inboxMessages}
          characters={characters}
          onSubmitMessage={handleAddInboxMessage}
          onLikeMessage={handleLikeInboxMessage}
          isAdminLoggedIn={isAdminLoggedIn}
          onDeleteMessage={handleDeleteInboxMessage}
          initialRecipient={selectedInboxRecipient}
        />

        {/* 5. Interactive Fan Wall ("Bức Tường Sticky Note") */}
        <StickyFanWall
          notes={stickyNotes}
          onAddNote={handleAddStickyNote}
          onLikeNote={handleLikeStickyNote}
          isAdminLoggedIn={isAdminLoggedIn}
          onDeleteNote={handleDeleteStickyNote}
        />
      </main>

      {/* 6. Secured Admin Dashboard (Password Protected with khanhvi23082010) */}
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
        facebookUrl={creatorProfile?.facebookUrl || ''}
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
