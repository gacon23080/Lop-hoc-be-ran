import {
  Character,
  BulletinPost,
  CreatorProfile,
  InboxMessage,
  StickyNote
} from '../types';
import {
  INITIAL_CHARACTERS,
  INITIAL_BULLETIN_POSTS,
  INITIAL_CREATOR_PROFILE,
  INITIAL_INBOX_MESSAGES,
  INITIAL_STICKY_NOTES
} from '../data/initialData';

const KEYS = {
  CHARACTERS: 'mamnon_ran_characters_v2',
  BULLETIN: 'mamnon_ran_bulletin',
  PROFILE: 'mamnon_ran_profile',
  INBOX: 'mamnon_ran_inbox',
  STICKY: 'mamnon_ran_sticky',
  ADMIN_AUTH: 'mamnon_ran_admin_auth',
  USER_LIKES: 'mamnon_ran_user_likes',
};

export const storage = {
  getCharacters: (): Character[] => {
    try {
      const data = localStorage.getItem(KEYS.CHARACTERS);
      return data ? JSON.parse(data) : INITIAL_CHARACTERS;
    } catch {
      return INITIAL_CHARACTERS;
    }
  },
  saveCharacters: (characters: Character[]) => {
    try {
      localStorage.setItem(KEYS.CHARACTERS, JSON.stringify(characters));
    } catch (e) {
      console.error('Failed to save characters to localStorage', e);
    }
  },

  getBulletinPosts: (): BulletinPost[] => {
    try {
      const data = localStorage.getItem(KEYS.BULLETIN);
      return data ? JSON.parse(data) : INITIAL_BULLETIN_POSTS;
    } catch {
      return INITIAL_BULLETIN_POSTS;
    }
  },
  saveBulletinPosts: (posts: BulletinPost[]) => {
    try {
      localStorage.setItem(KEYS.BULLETIN, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save bulletin posts to localStorage', e);
    }
  },

  getCreatorProfile: (): CreatorProfile => {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      if (data) {
        const parsed: CreatorProfile = JSON.parse(data);
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('unsplash.com/photo-1534528741775-53994a69daeb')) {
          parsed.avatarUrl = INITIAL_CREATOR_PROFILE.avatarUrl;
        }
        // Ensure Facebook profile link matches user's request
        parsed.facebookUrl = 'https://www.facebook.com/profile.php?id=61563686069080';
        return parsed;
      }
      return INITIAL_CREATOR_PROFILE;
    } catch {
      return INITIAL_CREATOR_PROFILE;
    }
  },
  saveCreatorProfile: (profile: CreatorProfile) => {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save creator profile to localStorage', e);
    }
  },

  getInboxMessages: (): InboxMessage[] => {
    try {
      const data = localStorage.getItem(KEYS.INBOX);
      if (!data) return INITIAL_INBOX_MESSAGES;
      const parsed: InboxMessage[] = JSON.parse(data);
      // Filter out legacy hardcoded sample messages
      const userCreated = parsed.filter(m => !['msg-1', 'msg-2', 'msg-3', 'msg-4'].includes(m.id));
      return userCreated;
    } catch {
      return INITIAL_INBOX_MESSAGES;
    }
  },
  saveInboxMessages: (messages: InboxMessage[]) => {
    try {
      localStorage.setItem(KEYS.INBOX, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save inbox messages to localStorage', e);
    }
  },

  getStickyNotes: (): StickyNote[] => {
    try {
      const data = localStorage.getItem(KEYS.STICKY);
      if (!data) return INITIAL_STICKY_NOTES;
      const parsed: StickyNote[] = JSON.parse(data);
      // Filter out legacy hardcoded sample notes
      const userCreated = parsed.filter(n => !['sticky-1', 'sticky-2', 'sticky-3', 'sticky-4', 'sticky-5'].includes(n.id));
      return userCreated;
    } catch {
      return INITIAL_STICKY_NOTES;
    }
  },
  saveStickyNotes: (notes: StickyNote[]) => {
    try {
      localStorage.setItem(KEYS.STICKY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save sticky notes to localStorage', e);
    }
  },

  getUserLikes: (): Record<string, boolean> => {
    try {
      const data = localStorage.getItem(KEYS.USER_LIKES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },
  saveUserLikes: (likes: Record<string, boolean>) => {
    try {
      localStorage.setItem(KEYS.USER_LIKES, JSON.stringify(likes));
    } catch (e) {
      console.error('Failed to save user likes to localStorage', e);
    }
  },

  resetAllToDefault: () => {
    try {
      localStorage.setItem(KEYS.CHARACTERS, JSON.stringify(INITIAL_CHARACTERS));
      localStorage.setItem(KEYS.BULLETIN, JSON.stringify(INITIAL_BULLETIN_POSTS));
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(INITIAL_CREATOR_PROFILE));
      localStorage.setItem(KEYS.INBOX, JSON.stringify(INITIAL_INBOX_MESSAGES));
      localStorage.setItem(KEYS.STICKY, JSON.stringify(INITIAL_STICKY_NOTES));
    } catch (e) {
      console.error('Failed to reset data', e);
    }
  }
};
