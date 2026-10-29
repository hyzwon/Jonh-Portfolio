import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem } from '../utils/mediaUtils';
import { INITIAL_VIDEOS, INITIAL_GRAPHICS, portraitDirector, heroCinematic } from '../data/initialPortfolio';

interface PortfolioContextType {
  items: PortfolioItem[];
  videos: PortfolioItem[];
  graphics: PortfolioItem[];
  profilePhoto: string;
  heroPhoto: string;
  isCreatorMode: boolean;
  unlockModalOpen: boolean;
  creatorStudioOpen: boolean;
  studioActiveTab: 'videos' | 'graphics' | 'photos' | 'guide';
  openUnlockModal: () => void;
  closeUnlockModal: () => void;
  openCreatorStudio: (tab?: 'videos' | 'graphics' | 'photos' | 'guide') => void;
  closeCreatorStudio: () => void;
  verifyPinAndLogin: (pin: string) => boolean;
  logoutCreatorMode: () => void;
  updateProfilePhoto: (url: string) => void;
  updateHeroPhoto: (url: string) => void;
  resetPhotosToDefault: () => void;
  addItem: (item: Omit<PortfolioItem, 'id'>) => PortfolioItem;
  updateItem: (id: string, updates: Partial<PortfolioItem>) => void;
  deleteItem: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetToDefaults: () => void;
  exportPortfolioJson: () => void;
  importPortfolioJson: (jsonData: string) => boolean;
}

const STORAGE_KEY_ITEMS = 'jp_portfolio_items_v3';
const STORAGE_KEY_PROFILE_PHOTO = 'jp_portfolio_profile_photo';
const STORAGE_KEY_HERO_PHOTO = 'jp_portfolio_hero_photo';
const STORAGE_KEY_PIN = 'jp_portfolio_admin_pin';
const STORAGE_KEY_AUTH = 'jp_portfolio_admin_session';
const DEFAULT_PIN = '1234';

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      // Clear old v2 key if it had broken GCS URLs
      localStorage.removeItem('jp_portfolio_items_v2');
      const stored = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If any old item has commondatastorage, replace with fresh INITIAL_VIDEOS
          const hasBrokenGcs = parsed.some(
            (p: PortfolioItem) => p.mediaUrl && p.mediaUrl.includes('commondatastorage.googleapis.com')
          );
          if (!hasBrokenGcs) {
            return parsed;
          }
        }
      }
    } catch {
      // ignore JSON parse error
    }
    return [...INITIAL_VIDEOS, ...INITIAL_GRAPHICS];
  });

  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(() => {
    try {
      // Check URL query param first (?studio=true or ?admin=true)
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || urlParams.get('studio') === 'true') {
        sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
        return true;
      }
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_PROFILE_PHOTO) || portraitDirector;
    } catch {
      return portraitDirector;
    }
  });

  const [heroPhoto, setHeroPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_HERO_PHOTO) || heroCinematic;
    } catch {
      return heroCinematic;
    }
  });

  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [creatorStudioOpen, setCreatorStudioOpen] = useState(false);
  const [studioActiveTab, setStudioActiveTab] = useState<'videos' | 'graphics' | 'photos' | 'guide'>('videos');

  const updateProfilePhoto = (newUrl: string) => {
    setProfilePhoto(newUrl);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE_PHOTO, newUrl);
    } catch (e) {
      console.warn('Could not save profile photo to storage:', e);
    }
  };

  const updateHeroPhoto = (newUrl: string) => {
    setHeroPhoto(newUrl);
    try {
      localStorage.setItem(STORAGE_KEY_HERO_PHOTO, newUrl);
    } catch (e) {
      console.warn('Could not save hero photo to storage:', e);
    }
  };

  const resetPhotosToDefault = () => {
    setProfilePhoto(portraitDirector);
    setHeroPhoto(heroCinematic);
    try {
      localStorage.removeItem(STORAGE_KEY_PROFILE_PHOTO);
      localStorage.removeItem(STORAGE_KEY_HERO_PHOTO);
    } catch (e) {
      console.warn('Could not clear photo storage:', e);
    }
  };

  // Keyboard shortcut listener: Ctrl + Shift + U or Cmd + Shift + U to unlock Creator Studio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        if (isCreatorMode) {
          setCreatorStudioOpen(true);
        } else {
          setUnlockModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreatorMode]);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }
  }, [items]);

  const openUnlockModal = () => setUnlockModalOpen(true);
  const closeUnlockModal = () => setUnlockModalOpen(false);

  const openCreatorStudio = (tab: 'videos' | 'graphics' | 'photos' | 'guide' = 'videos') => {
    setStudioActiveTab(tab);
    setCreatorStudioOpen(true);
  };
  const closeCreatorStudio = () => setCreatorStudioOpen(false);

  const verifyPinAndLogin = (enteredPin: string): boolean => {
    const savedPin = localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
    if (enteredPin === savedPin) {
      setIsCreatorMode(true);
      sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
      setUnlockModalOpen(false);
      setCreatorStudioOpen(true);
      return true;
    }
    return false;
  };

  const logoutCreatorMode = () => {
    setIsCreatorMode(false);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    setCreatorStudioOpen(false);
  };

  const addItem = (newItemData: Omit<PortfolioItem, 'id'>): PortfolioItem => {
    const newItem: PortfolioItem = {
      ...newItemData,
      id: `${newItemData.type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<PortfolioItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item))
    );
  };

  const resetToDefaults = () => {
    const defaultData = [...INITIAL_VIDEOS, ...INITIAL_GRAPHICS];
    setItems(defaultData);
    localStorage.removeItem(STORAGE_KEY_ITEMS);
  };

  const exportPortfolioJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jonh_paul_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importPortfolioJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        setItems(parsed);
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON', e);
    }
    return false;
  };

  const videos = items.filter((item) => item.type === 'video');
  const graphics = items.filter((item) => item.type === 'graphic');

  return (
    <PortfolioContext.Provider
      value={{
        items,
        videos,
        graphics,
        profilePhoto,
        heroPhoto,
        isCreatorMode,
        unlockModalOpen,
        creatorStudioOpen,
        studioActiveTab,
        openUnlockModal,
        closeUnlockModal,
        openCreatorStudio,
        closeCreatorStudio,
        verifyPinAndLogin,
        logoutCreatorMode,
        updateProfilePhoto,
        updateHeroPhoto,
        resetPhotosToDefault,
        addItem,
        updateItem,
        deleteItem,
        toggleFeatured,
        resetToDefaults,
        exportPortfolioJson,
        importPortfolioJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
