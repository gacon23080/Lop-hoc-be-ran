import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Character, BulletinPost, CreatorProfile, InboxMessage, StickyNote } from '../types';
import { storage } from './storage';

export function useFirebaseData() {
  const [characters, setCharacters] = useState<Character[]>(() => storage.getCharacters());
  const [bulletinPosts, setBulletinPosts] = useState<BulletinPost[]>(() => storage.getBulletinPosts());
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile>(() => storage.getCreatorProfile());
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>(() => storage.getInboxMessages());
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(() => storage.getStickyNotes());
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

  // Setup listeners
  useEffect(() => {
    // 1. Characters
    const unsubChars = onSnapshot(collection(db, 'characters'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Character);
      if(snapshot.docs.length > 0 || isFirebaseLoaded) {
        setCharacters(data);
        storage.saveCharacters(data);
      }
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'characters'));

    // 2. BulletinPosts
    const unsubPosts = onSnapshot(collection(db, 'bulletinPosts'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as BulletinPost);
      if(snapshot.docs.length > 0 || isFirebaseLoaded) {
         setBulletinPosts(data);
         storage.saveBulletinPosts(data);
      }
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'bulletinPosts'));

    // 3. Creator Profile
    const unsubProfile = onSnapshot(doc(db, 'config', 'creatorProfile'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as CreatorProfile;
        setCreatorProfile(data);
        storage.saveCreatorProfile(data);
      }
    }, (err) => handleFirestoreError(err, OperationType.GET, 'config/creatorProfile'));

    // 4. Inbox Messages
    const unsubInbox = onSnapshot(collection(db, 'inboxMessages'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as InboxMessage).sort((a,b) => b.likesCount - a.likesCount); // simplistic sort
      setInboxMessages(data);
      storage.saveInboxMessages(data);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'inboxMessages'));

    // 5. Sticky Notes
    const unsubSticky = onSnapshot(collection(db, 'stickyNotes'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as StickyNote).sort((a,b) => b.likes - a.likes);
      setStickyNotes(data);
      storage.saveStickyNotes(data);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'stickyNotes'));

    setTimeout(() => setIsFirebaseLoaded(true), 2000);

    return () => {
      unsubChars();
      unsubPosts();
      unsubProfile();
      unsubInbox();
      unsubSticky();
    };
  }, []);

  return {
    characters,
    bulletinPosts,
    creatorProfile,
    inboxMessages,
    stickyNotes,
    setInboxMessages,
    setStickyNotes
  };
}

export const firebaseActions = {
  // Characters
  async saveCharacter(character: Character) {
    try {
      await setDoc(doc(db, 'characters', character.id), character);
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'characters'); }
  },
  async deleteCharacter(charId: string) {
    try {
      await deleteDoc(doc(db, 'characters', charId));
    } catch (err) { handleFirestoreError(err, OperationType.DELETE, 'characters'); }
  },
  async likeCharacter(charId: string, currentLikes: number) {
    try {
      await updateDoc(doc(db, 'characters', charId), { likesCount: currentLikes + 1 });
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'characters'); }
  },
  async unlikeCharacter(charId: string, currentLikes: number) {
    try {
      await updateDoc(doc(db, 'characters', charId), { likesCount: Math.max(0, currentLikes - 1) });
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'characters'); }
  },

  // Inbox
  async addInboxMessage(msg: InboxMessage) {
    try {
      await setDoc(doc(db, 'inboxMessages', msg.id), msg);
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'inboxMessages'); }
  },
  async likeInboxMessage(msgId: string, currentLikes: number) {
    try {
      await updateDoc(doc(db, 'inboxMessages', msgId), { likesCount: currentLikes + 1 });
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'inboxMessages'); }
  },
  async updateInboxMessage(msgId: string, updates: Partial<InboxMessage>) {
    try {
      await updateDoc(doc(db, 'inboxMessages', msgId), updates);
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'inboxMessages'); }
  },
  async deleteInboxMessage(msgId: string) {
    try {
      await deleteDoc(doc(db, 'inboxMessages', msgId));
    } catch (err) { handleFirestoreError(err, OperationType.DELETE, 'inboxMessages'); }
  },

  // Sticky Notes
  async addStickyNote(note: StickyNote) {
    try {
      await setDoc(doc(db, 'stickyNotes', note.id), note);
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'stickyNotes'); }
  },
  async likeStickyNote(noteId: string, currentLikes: number) {
    try {
      await updateDoc(doc(db, 'stickyNotes', noteId), { likes: currentLikes + 1 });
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'stickyNotes'); }
  },
  async deleteStickyNote(noteId: string) {
    try {
      await deleteDoc(doc(db, 'stickyNotes', noteId));
    } catch (err) { handleFirestoreError(err, OperationType.DELETE, 'stickyNotes'); }
  },

  // Bulletin Posts
  async saveBulletinPosts(posts: BulletinPost[]) {
    try {
      // Just rewrite all of them for simplicity
      for (const p of posts) {
        await setDoc(doc(db, 'bulletinPosts', p.id), p);
      }
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'bulletinPosts'); }
  },
  
  // Profile
  async saveCreatorProfile(profile: CreatorProfile) {
    try {
      await setDoc(doc(db, 'config', 'creatorProfile'), profile);
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'config/creatorProfile'); }
  }
};
