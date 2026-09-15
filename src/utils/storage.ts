import {
  Character,
  BulletinPost,
  CreatorProfile,
  InboxMessage,
  StickyNote,
  PetCareState
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
  VISITOR_ID: 'mamnon_ran_visitor_id',
  MY_SENT_LETTERS: 'mamnon_ran_my_sent_letters',
  PET_CARE_PREFIX: 'mamnon_ran_pet_care_',
  SELECTED_PET_ID: 'mamnon_ran_selected_pet_id',
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

  getVisitorId: (): string => {
    try {
      let id = localStorage.getItem(KEYS.VISITOR_ID);
      if (!id) {
        id = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem(KEYS.VISITOR_ID, id);
      }
      return id;
    } catch {
      return 'visitor_default';
    }
  },

  getMySentLetterIds: (): string[] => {
    try {
      const data = localStorage.getItem(KEYS.MY_SENT_LETTERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addMySentLetterId: (msgId: string) => {
    try {
      const current = storage.getMySentLetterIds();
      if (!current.includes(msgId)) {
        current.push(msgId);
        localStorage.setItem(KEYS.MY_SENT_LETTERS, JSON.stringify(current));
      }
    } catch (e) {
      console.error('Failed to save sent letter id', e);
    }
  },

  getPetCareState: (petId: string): PetCareState => {
    const now = Date.now();
    const defaultState: PetCareState = {
      petId,
      hunger: 80,
      happiness: 85,
      cleanliness: 90,
      energy: 95,
      friendshipPoints: 20,
      level: 1,
      accessory: 'none',
      isSleeping: false,
      totalInteractions: 0,
      lastUpdated: now,
      lastFedAt: now,
      lastBathedAt: now,
      lastPattedAt: now,
      isAdopted: false,
      isDeceased: false
    };

    try {
      const data = localStorage.getItem(KEYS.PET_CARE_PREFIX + petId);
      if (!data) return defaultState;
      const parsed: PetCareState = JSON.parse(data);

      // Ensure timestamp fields exist
      if (!parsed.lastFedAt) parsed.lastFedAt = parsed.lastUpdated || now;
      if (!parsed.lastBathedAt) parsed.lastBathedAt = parsed.lastUpdated || now;
      if (!parsed.lastPattedAt) parsed.lastPattedAt = parsed.lastUpdated || now;

      // Check if pet is adopted and has not been fed for 7 days (7 * 24 * 60 * 60 * 1000 ms)
      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
      if (parsed.isAdopted && !parsed.isDeceased) {
        if (now - parsed.lastFedAt >= SEVEN_DAYS_MS) {
          parsed.isDeceased = true;
          parsed.deceasedAt = parsed.lastFedAt + SEVEN_DAYS_MS;
          parsed.hunger = 0;
          parsed.happiness = 0;
        }
      }

      // Time-based decay for hunger, cleanliness, happiness
      const hoursElapsed = Math.min(168, Math.max(0, (now - (parsed.lastUpdated || now)) / (1000 * 60 * 60)));
      if (hoursElapsed > 0.5 && !parsed.isSleeping && !parsed.isDeceased) {
        // Natural hunger drop
        const hungerDrop = Math.round(hoursElapsed * 2.5);
        parsed.hunger = Math.max(0, parsed.hunger - hungerDrop);

        // Natural dirtiness over time if not bathed
        const hoursSinceBathed = (now - parsed.lastBathedAt) / (1000 * 60 * 60);
        parsed.cleanliness = Math.max(10, Math.round(100 - hoursSinceBathed * 1.8));

        // Happiness drops if neglected without pats or if dirty/hungry
        const hoursSincePatted = (now - parsed.lastPattedAt) / (1000 * 60 * 60);
        let happinessPenalty = 0;
        if (parsed.hunger < 30) happinessPenalty += 15;
        if (parsed.cleanliness < 40) happinessPenalty += 15;
        if (hoursSincePatted > 12) happinessPenalty += Math.round((hoursSincePatted - 12) * 1.5);
        parsed.happiness = Math.max(15, Math.round(parsed.happiness - happinessPenalty));

        parsed.lastUpdated = now;
      }
      return parsed;
    } catch {
      return defaultState;
    }
  },

  savePetCareState: (state: PetCareState) => {
    try {
      localStorage.setItem(KEYS.PET_CARE_PREFIX + state.petId, JSON.stringify({
        ...state,
        lastUpdated: Date.now()
      }));
    } catch (e) {
      console.error('Failed to save pet care state', e);
    }
  },

  getSelectedPetId: (): string => {
    try {
      return localStorage.getItem(KEYS.SELECTED_PET_ID) || 'mascot-tim';
    } catch {
      return 'mascot-tim';
    }
  },

  saveSelectedPetId: (petId: string) => {
    try {
      localStorage.setItem(KEYS.SELECTED_PET_ID, petId);
    } catch (e) {
      console.error('Failed to save selected pet id', e);
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
