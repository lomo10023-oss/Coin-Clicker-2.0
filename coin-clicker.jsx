import React, { useState, useEffect, useMemo } from 'react';
import { Package, Coins, Trophy, ShoppingBag } from 'lucide-react';

const CHARACTERS = {
  common: [
    { id: 1, name: 'Blue Blob', emoji: '🔵', rarity: 'Common' },
    { id: 2, name: 'Red Blob', emoji: '🔴', rarity: 'Common' },
    { id: 3, name: 'Green Blob', emoji: '🟢', rarity: 'Common' },
    { id: 4, name: 'Yellow Blob', emoji: '🟡', rarity: 'Common' },
    { id: 5, name: 'Orange Blob', emoji: '🟠', rarity: 'Common' },
    { id: 6, name: 'Brown Blob', emoji: '🟤', rarity: 'Common' },
    { id: 7, name: 'White Blob', emoji: '⚪', rarity: 'Common' },
    { id: 8, name: 'Black Blob', emoji: '⚫', rarity: 'Common' },
    { id: 9, name: 'Smiley', emoji: '😊', rarity: 'Common' },
    { id: 10, name: 'Star', emoji: '⭐', rarity: 'Common' },
    { id: 11, name: 'Moon', emoji: '🌙', rarity: 'Common' },
    { id: 12, name: 'Cloud', emoji: '☁️', rarity: 'Common' },
  ],
  uncommon: [
    { id: 13, name: 'Purple Star', emoji: '🟣', rarity: 'Uncommon' },
    { id: 14, name: 'Orange Fire', emoji: '🔶', rarity: 'Uncommon' },
    { id: 15, name: 'Pink Heart', emoji: '💗', rarity: 'Uncommon' },
    { id: 16, name: 'Four Leaf', emoji: '🍀', rarity: 'Uncommon' },
    { id: 17, name: 'Mushroom', emoji: '🍄', rarity: 'Uncommon' },
    { id: 18, name: 'Cherry', emoji: '🍒', rarity: 'Uncommon' },
    { id: 19, name: 'Lemon', emoji: '🍋', rarity: 'Uncommon' },
    { id: 20, name: 'Watermelon', emoji: '🍉', rarity: 'Uncommon' },
    { id: 21, name: 'Lightning', emoji: '⚡', rarity: 'Uncommon' },
    { id: 22, name: 'Snowflake', emoji: '❄️', rarity: 'Uncommon' },
    { id: 23, name: 'Sunflower', emoji: '🌻', rarity: 'Uncommon' },
    { id: 24, name: 'Rose', emoji: '🌹', rarity: 'Uncommon' },
  ],
  rare: [
    { id: 25, name: 'Golden Crown', emoji: '👑', rarity: 'Rare' },
    { id: 26, name: 'Diamond Gem', emoji: '💎', rarity: 'Rare' },
    { id: 27, name: 'Rainbow', emoji: '🌈', rarity: 'Rare' },
    { id: 28, name: 'Trophy', emoji: '🏆', rarity: 'Rare' },
    { id: 29, name: 'Crystal Ball', emoji: '🔮', rarity: 'Rare' },
    { id: 30, name: 'Magic Wand', emoji: '🪄', rarity: 'Rare' },
    { id: 31, name: 'Ghost', emoji: '👻', rarity: 'Rare' },
    { id: 32, name: 'Alien', emoji: '👽', rarity: 'Rare' },
    { id: 33, name: 'Robot', emoji: '🤖', rarity: 'Rare' },
    { id: 34, name: 'Ninja', emoji: '🥷', rarity: 'Rare' },
    { id: 35, name: 'Wizard', emoji: '🧙', rarity: 'Rare' },
    { id: 36, name: 'Mermaid', emoji: '🧜', rarity: 'Rare' },
  ],
  epic: [
    { id: 37, name: 'Dragon', emoji: '🐉', rarity: 'Epic' },
    { id: 38, name: 'Unicorn', emoji: '🦄', rarity: 'Epic' },
    { id: 39, name: 'T-Rex', emoji: '🦖', rarity: 'Epic' },
    { id: 40, name: 'Lion', emoji: '🦁', rarity: 'Epic' },
    { id: 41, name: 'Eagle', emoji: '🦅', rarity: 'Epic' },
    { id: 42, name: 'Shark', emoji: '🦈', rarity: 'Epic' },
    { id: 43, name: 'Tiger', emoji: '🐯', rarity: 'Epic' },
    { id: 44, name: 'Wolf', emoji: '🐺', rarity: 'Epic' },
    { id: 45, name: 'Rocket', emoji: '🚀', rarity: 'Epic' },
    { id: 46, name: 'UFO', emoji: '🛸', rarity: 'Epic' },
  ],
  legendary: [
    { id: 47, name: 'Galaxy', emoji: '🌌', rarity: 'Legendary' },
    { id: 48, name: 'Phoenix', emoji: '🔥', rarity: 'Legendary' },
    { id: 49, name: 'Sun God', emoji: '☀️', rarity: 'Legendary' },
    { id: 50, name: 'Earth', emoji: '🌍', rarity: 'Legendary' },
    { id: 51, name: 'Explosion', emoji: '💥', rarity: 'Legendary' },
    { id: 52, name: 'Infinity', emoji: '♾️', rarity: 'Legendary' },
    { id: 53, name: 'Angel', emoji: '😇', rarity: 'Legendary' },
    { id: 54, name: 'Demon', emoji: '😈', rarity: 'Legendary' },
  ],
  // SEASONAL CHARACTERS
  halloween: [
    { id: 55, name: 'Jack O Lantern', emoji: '🎃', rarity: 'Uncommon', seasonal: 'Halloween' },
    { id: 56, name: 'Candy Corn', emoji: '🍬', rarity: 'Common', seasonal: 'Halloween' },
    { id: 57, name: 'Vampire', emoji: '🧛', rarity: 'Rare', seasonal: 'Halloween' },
    { id: 58, name: 'Zombie', emoji: '🧟', rarity: 'Rare', seasonal: 'Halloween' },
    { id: 59, name: 'Black Cat', emoji: '🐱', rarity: 'Uncommon', seasonal: 'Halloween' },
    { id: 60, name: 'Witch', emoji: '🧙‍♀️', rarity: 'Epic', seasonal: 'Halloween' },
    { id: 61, name: 'Skull', emoji: '💀', rarity: 'Rare', seasonal: 'Halloween' },
    { id: 62, name: 'Grim Reaper', emoji: '☠️', rarity: 'Legendary', seasonal: 'Halloween' },
  ],
  thanksgiving: [
    { id: 63, name: 'Turkey', emoji: '🦃', rarity: 'Uncommon', seasonal: 'Thanksgiving' },
    { id: 64, name: 'Pumpkin Pie', emoji: '🥧', rarity: 'Common', seasonal: 'Thanksgiving' },
    { id: 65, name: 'Corn', emoji: '🌽', rarity: 'Common', seasonal: 'Thanksgiving' },
    { id: 66, name: 'Autumn Leaf', emoji: '🍂', rarity: 'Uncommon', seasonal: 'Thanksgiving' },
    { id: 67, name: 'Harvest Basket', emoji: '🧺', rarity: 'Rare', seasonal: 'Thanksgiving' },
    { id: 68, name: 'Pilgrim Hat', emoji: '🎩', rarity: 'Epic', seasonal: 'Thanksgiving' },
  ],
  christmas: [
    { id: 69, name: 'Santa', emoji: '🎅', rarity: 'Epic', seasonal: 'Christmas' },
    { id: 70, name: 'Christmas Tree', emoji: '🎄', rarity: 'Uncommon', seasonal: 'Christmas' },
    { id: 71, name: 'Gift Box', emoji: '🎁', rarity: 'Common', seasonal: 'Christmas' },
    { id: 72, name: 'Snowman', emoji: '⛄', rarity: 'Rare', seasonal: 'Christmas' },
    { id: 73, name: 'Reindeer', emoji: '🦌', rarity: 'Rare', seasonal: 'Christmas' },
    { id: 74, name: 'Candy Cane', emoji: '🍭', rarity: 'Common', seasonal: 'Christmas' },
    { id: 75, name: 'Gingerbread', emoji: '🍪', rarity: 'Uncommon', seasonal: 'Christmas' },
    { id: 76, name: 'Mrs Claus', emoji: '🤶', rarity: 'Epic', seasonal: 'Christmas' },
    { id: 77, name: 'Christmas Star', emoji: '⭐', rarity: 'Legendary', seasonal: 'Christmas' },
  ],
  spring: [
    { id: 78, name: 'Cherry Blossom', emoji: '🌸', rarity: 'Uncommon', seasonal: 'Spring' },
    { id: 79, name: 'Tulip', emoji: '🌷', rarity: 'Common', seasonal: 'Spring' },
    { id: 80, name: 'Baby Chick', emoji: '🐣', rarity: 'Common', seasonal: 'Spring' },
    { id: 81, name: 'Butterfly', emoji: '🦋', rarity: 'Rare', seasonal: 'Spring' },
    { id: 82, name: 'Bunny', emoji: '🐰', rarity: 'Uncommon', seasonal: 'Spring' },
    { id: 83, name: 'Ladybug', emoji: '🐞', rarity: 'Rare', seasonal: 'Spring' },
    { id: 84, name: 'Rainbow Flower', emoji: '🌺', rarity: 'Epic', seasonal: 'Spring' },
  ],
  summer: [
    { id: 85, name: 'Sun', emoji: '🌞', rarity: 'Common', seasonal: 'Summer' },
    { id: 86, name: 'Beach Ball', emoji: '🏖️', rarity: 'Common', seasonal: 'Summer' },
    { id: 87, name: 'Ice Cream', emoji: '🍦', rarity: 'Uncommon', seasonal: 'Summer' },
    { id: 88, name: 'Sunglasses', emoji: '😎', rarity: 'Uncommon', seasonal: 'Summer' },
    { id: 89, name: 'Flamingo', emoji: '🦩', rarity: 'Rare', seasonal: 'Summer' },
    { id: 90, name: 'Surfboard', emoji: '🏄', rarity: 'Rare', seasonal: 'Summer' },
    { id: 91, name: 'Tropical Fish', emoji: '🐠', rarity: 'Epic', seasonal: 'Summer' },
  ],
  fall: [
    { id: 92, name: 'Maple Leaf', emoji: '🍁', rarity: 'Common', seasonal: 'Fall' },
    { id: 93, name: 'Acorn', emoji: '🌰', rarity: 'Common', seasonal: 'Fall' },
    { id: 94, name: 'Squirrel', emoji: '🐿️', rarity: 'Uncommon', seasonal: 'Fall' },
    { id: 95, name: 'Apple', emoji: '🍎', rarity: 'Uncommon', seasonal: 'Fall' },
    { id: 96, name: 'Owl', emoji: '🦉', rarity: 'Rare', seasonal: 'Fall' },
    { id: 97, name: 'Harvest Moon', emoji: '🌕', rarity: 'Epic', seasonal: 'Fall' },
  ],
  winter: [
    { id: 98, name: 'Snowflake Crystal', emoji: '❄️', rarity: 'Common', seasonal: 'Winter' },
    { id: 99, name: 'Mittens', emoji: '🧤', rarity: 'Common', seasonal: 'Winter' },
    { id: 100, name: 'Hot Cocoa', emoji: '☕', rarity: 'Uncommon', seasonal: 'Winter' },
    { id: 101, name: 'Penguin', emoji: '🐧', rarity: 'Uncommon', seasonal: 'Winter' },
    { id: 102, name: 'Polar Bear', emoji: '🐻‍❄️', rarity: 'Rare', seasonal: 'Winter' },
    { id: 103, name: 'Ice Castle', emoji: '🏰', rarity: 'Epic', seasonal: 'Winter' },
    { id: 104, name: 'Aurora', emoji: '🌌', rarity: 'Legendary', seasonal: 'Winter' },
  ],
  // ADMIN PACK - Ultra Rare Characters
  admin: [
    { id: 105, name: 'Golden Dragon', emoji: '🐲', rarity: 'Legendary', special: 'Admin' },
    { id: 106, name: 'Rainbow Unicorn', emoji: '🦄', rarity: 'Legendary', special: 'Admin' },
    { id: 107, name: 'Crown Jewel', emoji: '👑', rarity: 'Legendary', special: 'Admin' },
    { id: 108, name: 'Starlight', emoji: '✨', rarity: 'Legendary', special: 'Admin' },
    { id: 109, name: 'Crystal Heart', emoji: '💖', rarity: 'Legendary', special: 'Admin' },
    { id: 110, name: 'Time Master', emoji: '⏰', rarity: 'Legendary', special: 'Admin' },
  ]
};

const PACKS = [
  { id: 1, name: 'Basic Pack', cost: 200, chances: { common: 0.7, uncommon: 0.25, rare: 0.05 } },
  { id: 2, name: 'Silver Pack', cost: 750, chances: { common: 0.4, uncommon: 0.4, rare: 0.15, epic: 0.05 } },
  { id: 3, name: 'Gold Pack', cost: 1500, chances: { common: 0.2, uncommon: 0.35, rare: 0.3, epic: 0.13, legendary: 0.02 } },
  { id: 4, name: 'Mega Pack', cost: 5000, chances: { common: 0.1, uncommon: 0.2, rare: 0.4, epic: 0.25, legendary: 0.05 } },
  // SEASONAL PACKS
  { id: 5, name: '🎃 Halloween Pack', cost: 1000, seasonal: 'halloween', chances: { common: 0.3, uncommon: 0.35, rare: 0.25, epic: 0.08, legendary: 0.02 } },
  { id: 6, name: '🦃 Thanksgiving Pack', cost: 800, seasonal: 'thanksgiving', chances: { common: 0.35, uncommon: 0.35, rare: 0.2, epic: 0.1 } },
  { id: 7, name: '🎄 Christmas Pack', cost: 1200, seasonal: 'christmas', chances: { common: 0.25, uncommon: 0.3, rare: 0.25, epic: 0.15, legendary: 0.05 } },
  { id: 8, name: '🌸 Spring Pack', cost: 900, seasonal: 'spring', chances: { common: 0.3, uncommon: 0.35, rare: 0.25, epic: 0.1 } },
  { id: 9, name: '🌞 Summer Pack', cost: 900, seasonal: 'summer', chances: { common: 0.3, uncommon: 0.35, rare: 0.25, epic: 0.1 } },
  { id: 10, name: '🍂 Fall Pack', cost: 800, seasonal: 'fall', chances: { common: 0.35, uncommon: 0.35, rare: 0.2, epic: 0.1 } },
  { id: 11, name: '❄️ Winter Pack', cost: 1000, seasonal: 'winter', chances: { common: 0.25, uncommon: 0.3, rare: 0.25, epic: 0.15, legendary: 0.05 } },
  // ADMIN PACK
  { id: 12, name: '👑 Admin Pack', cost: 2500, special: 'admin', chances: { legendary: 1.0 } },
];

const RARITIES = {
  Common: { color: '#94a3b8', bg: '#f1f5f9', multiplier: 0.05 },
  Uncommon: { color: '#22c55e', bg: '#dcfce7', multiplier: 0.10 },
  Rare: { color: '#3b82f6', bg: '#dbeafe', multiplier: 0.20 },
  Epic: { color: '#a855f7', bg: '#f3e8ff', multiplier: 0.40 },
  Legendary: { color: '#f59e0b', bg: '#fef3c7', multiplier: 0.75 }
};

const ACHIEVEMENTS = [
  // Coin Achievements
  { id: 1, name: 'First Coin', description: 'Earn your first coin', emoji: '💰', requirement: { type: 'coins', value: 1 }, reward: 50 },
  { id: 2, name: 'Coin Collector', description: 'Earn 10,000 coins', emoji: '💵', requirement: { type: 'coins', value: 10000 }, reward: 500 },
  { id: 3, name: 'Coin Master', description: 'Earn 100,000 coins', emoji: '💸', requirement: { type: 'coins', value: 100000 }, reward: 2000 },
  { id: 4, name: 'Coin Tycoon', description: 'Earn 1,000,000 coins', emoji: '🤑', requirement: { type: 'coins', value: 1000000 }, reward: 10000 },
  
  // Click Achievements
  { id: 5, name: 'Clicker', description: 'Click 100 times', emoji: '👆', requirement: { type: 'clicks', value: 100 }, reward: 100 },
  { id: 6, name: 'Speed Clicker', description: 'Click 1,000 times', emoji: '⚡', requirement: { type: 'clicks', value: 1000 }, reward: 500 },
  { id: 7, name: 'Click Master', description: 'Click 10,000 times', emoji: '🖱️', requirement: { type: 'clicks', value: 10000 }, reward: 2000 },
  
  // Pack Achievements
  { id: 8, name: 'First Pack', description: 'Open your first pack', emoji: '📦', requirement: { type: 'packs', value: 1 }, reward: 100 },
  { id: 9, name: 'Pack Opener', description: 'Open 10 packs', emoji: '🎁', requirement: { type: 'packs', value: 10 }, reward: 500 },
  { id: 10, name: 'Pack Addict', description: 'Open 100 packs', emoji: '🎉', requirement: { type: 'packs', value: 100 }, reward: 5000 },
  
  // Collection Achievements
  { id: 11, name: 'Collector', description: 'Collect 10 characters', emoji: '🎨', requirement: { type: 'collection', value: 10 }, reward: 500 },
  { id: 12, name: 'Serious Collector', description: 'Collect 25 characters', emoji: '🏆', requirement: { type: 'collection', value: 25 }, reward: 1000 },
  { id: 13, name: 'Completionist', description: 'Collect 50 characters', emoji: '👑', requirement: { type: 'collection', value: 50 }, reward: 5000 },
  { id: 14, name: 'Full Collection', description: 'Collect all 110 characters', emoji: '🌟', requirement: { type: 'collection', value: 110 }, reward: 25000 },
  
  // Rarity Achievements
  { id: 15, name: 'Legendary Hunter', description: 'Collect 5 legendary characters', emoji: '⭐', requirement: { type: 'legendary', value: 5 }, reward: 2000 },
  { id: 16, name: 'Epic Collection', description: 'Collect 10 epic characters', emoji: '💜', requirement: { type: 'epic', value: 10 }, reward: 1500 },
  
  // Rebirth Achievements
  { id: 17, name: 'Reborn', description: 'Rebirth for the first time', emoji: '♻️', requirement: { type: 'rebirths', value: 1 }, reward: 1000 },
  { id: 18, name: 'Rebirth Master', description: 'Rebirth 5 times', emoji: '🔄', requirement: { type: 'rebirths', value: 5 }, reward: 5000 },
  { id: 19, name: 'Eternal', description: 'Rebirth 10 times', emoji: '♾️', requirement: { type: 'rebirths', value: 10 }, reward: 15000 },
  
  // Special Achievements
  { id: 20, name: 'First Upgrade', description: 'Buy your first upgrade', emoji: '⬆️', requirement: { type: 'upgrades', value: 1 }, reward: 50 },
  { id: 21, name: 'Power Player', description: 'Buy 50 upgrades', emoji: '💪', requirement: { type: 'upgrades', value: 50 }, reward: 3000 },
];

export default function CoinClicker() {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('coinClicker_coins');
    return saved ? parseInt(saved) : 0;
  });
  const [coinsPerClick, setCoinsPerClick] = useState(() => {
    const saved = localStorage.getItem('coinClicker_coinsPerClick');
    return saved ? parseInt(saved) : 5;
  });
  const [autoCoins, setAutoCoins] = useState(() => {
    const saved = localStorage.getItem('coinClicker_autoCoins');
    return saved ? parseInt(saved) : 0;
  });
  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem('coinClicker_collection');
    return saved ? JSON.parse(saved) : [];
  });
  // Track character counts for duplicates
  const [characterCounts, setCharacterCounts] = useState(() => {
    const saved = localStorage.getItem('coinClicker_characterCounts');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeTab, setActiveTab] = useState('clicker');
  const [openingPack, setOpeningPack] = useState(null);
  const [newCharacter, setNewCharacter] = useState(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [rebirths, setRebirths] = useState(() => {
    const saved = localStorage.getItem('coinClicker_rebirths');
    return saved ? parseInt(saved) : 0;
  });
  const [prestigePoints, setPrestigePoints] = useState(() => {
    const saved = localStorage.getItem('coinClicker_prestigePoints');
    return saved ? parseInt(saved) : 0;
  });
  const [coinMultiplier, setCoinMultiplier] = useState(() => {
    const saved = localStorage.getItem('coinClicker_coinMultiplier');
    return saved ? parseFloat(saved) : 1;
  });
  const [clickMultiplier, setClickMultiplier] = useState(() => {
    const saved = localStorage.getItem('coinClicker_clickMultiplier');
    return saved ? parseFloat(saved) : 1;
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('coinClicker_unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
  });
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('coinClicker_stats');
    return saved ? JSON.parse(saved) : {
      totalCoinsEarned: 0,
      totalClicks: 0,
      totalPacksOpened: 0,
      totalUpgrades: 0
    };
  });
  const [newAchievement, setNewAchievement] = useState(null);

  // Save game state whenever it changes
  useEffect(() => {
    localStorage.setItem('coinClicker_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('coinClicker_coinsPerClick', coinsPerClick.toString());
  }, [coinsPerClick]);

  useEffect(() => {
    localStorage.setItem('coinClicker_autoCoins', autoCoins.toString());
  }, [autoCoins]);

  useEffect(() => {
    localStorage.setItem('coinClicker_collection', JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    localStorage.setItem('coinClicker_characterCounts', JSON.stringify(characterCounts));
  }, [characterCounts]);

  useEffect(() => {
    localStorage.setItem('coinClicker_rebirths', rebirths.toString());
  }, [rebirths]);

  useEffect(() => {
    localStorage.setItem('coinClicker_prestigePoints', prestigePoints.toString());
  }, [prestigePoints]);

  useEffect(() => {
    localStorage.setItem('coinClicker_coinMultiplier', coinMultiplier.toString());
  }, [coinMultiplier]);

  useEffect(() => {
    localStorage.setItem('coinClicker_clickMultiplier', clickMultiplier.toString());
  }, [clickMultiplier]);

  useEffect(() => {
    localStorage.setItem('coinClicker_unlockedAchievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  useEffect(() => {
    localStorage.setItem('coinClicker_stats', JSON.stringify(stats));
  }, [stats]);

  // Calculate collection bonus multiplier
  const collectionBonus = useMemo(() => {
    let bonus = 0;
    collection.forEach(char => {
      if (RARITIES[char.rarity]) {
        bonus += RARITIES[char.rarity].multiplier;
      }
    });
    return 1 + bonus; // Start at 1x, add bonus
  }, [collection]);

  // Auto-generate coins
  useEffect(() => {
    if (autoCoins > 0) {
      const interval = setInterval(() => {
        const coinsToAdd = autoCoins * coinMultiplier * collectionBonus;
        setCoins(prev => prev + coinsToAdd);
        setStats(prev => ({ ...prev, totalCoinsEarned: prev.totalCoinsEarned + coinsToAdd }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoCoins, coinMultiplier, collectionBonus]);

  // Check for newly unlocked achievements
  const checkAchievements = () => {
    ACHIEVEMENTS.forEach(achievement => {
      // Skip if already unlocked
      if (unlockedAchievements.includes(achievement.id)) return;
      
      let unlocked = false;
      
      switch (achievement.requirement.type) {
        case 'coins':
          unlocked = stats.totalCoinsEarned >= achievement.requirement.value;
          break;
        case 'clicks':
          unlocked = stats.totalClicks >= achievement.requirement.value;
          break;
        case 'packs':
          unlocked = stats.totalPacksOpened >= achievement.requirement.value;
          break;
        case 'collection':
          unlocked = collection.length >= achievement.requirement.value;
          break;
        case 'legendary':
          const legendaryCount = collection.filter(c => c.rarity === 'Legendary').length;
          unlocked = legendaryCount >= achievement.requirement.value;
          break;
        case 'epic':
          const epicCount = collection.filter(c => c.rarity === 'Epic').length;
          unlocked = epicCount >= achievement.requirement.value;
          break;
        case 'rebirths':
          unlocked = rebirths >= achievement.requirement.value;
          break;
        case 'upgrades':
          unlocked = stats.totalUpgrades >= achievement.requirement.value;
          break;
      }
      
      if (unlocked) {
        setUnlockedAchievements(prev => [...prev, achievement.id]);
        setCoins(prev => prev + achievement.reward);
        setNewAchievement(achievement);
        setTimeout(() => setNewAchievement(null), 4000);
      }
    });
  };

  // Check achievements whenever relevant stats change
  useEffect(() => {
    checkAchievements();
  }, [stats, collection, rebirths]);

  const handleClick = () => {
    const baseCoins = coinsPerClick * clickMultiplier * collectionBonus;
    setCoins(coins + baseCoins);
    setStats(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      totalCoinsEarned: prev.totalCoinsEarned + baseCoins
    }));
  };

  const openPack = (pack) => {
    if (coins < pack.cost) return;
    
    setCoins(coins - pack.cost);
    setOpeningPack(pack);
    setStats(prev => ({ ...prev, totalPacksOpened: prev.totalPacksOpened + 1 }));
    
    setTimeout(() => {
      const character = getRandomCharacter(pack.chances, pack.seasonal, pack.special);
      setNewCharacter(character);
      
      // Add to collection if not already there
      if (!collection.find(c => c.id === character.id)) {
        setCollection([...collection, character]);
      }
      
      // Track duplicate count
      setCharacterCounts(prev => ({
        ...prev,
        [character.id]: (prev[character.id] || 0) + 1
      }));
      
      setTimeout(() => {
        setOpeningPack(null);
        setNewCharacter(null);
      }, 3000);
    }, 1000);
  };

  const getRandomCharacter = (chances, seasonal = null, special = null) => {
    // Special handling for admin pack
    if (special === 'admin') {
      const adminChars = CHARACTERS.admin;
      return adminChars[Math.floor(Math.random() * adminChars.length)];
    }
    
    const rand = Math.random();
    let cumulative = 0;
    
    for (const [rarity, chance] of Object.entries(chances)) {
      cumulative += chance;
      if (rand <= cumulative) {
        // If this is a seasonal pack, only pull from seasonal characters
        if (seasonal) {
          const seasonalChars = CHARACTERS[seasonal];
          const rarityFiltered = seasonalChars.filter(c => c.rarity.toLowerCase() === rarity.toLowerCase());
          if (rarityFiltered.length > 0) {
            return rarityFiltered[Math.floor(Math.random() * rarityFiltered.length)];
          }
          // Fallback to any seasonal character if no match
          return seasonalChars[Math.floor(Math.random() * seasonalChars.length)];
        }
        
        // Regular packs - pull from standard rarity tiers
        const chars = CHARACTERS[rarity];
        if (chars) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
      }
    }
    
    return CHARACTERS.common[0];
  };

  const buyUpgrade = (type) => {
    if (type === 'click') {
      const cost = coinsPerClick * 20;
      if (coins >= cost) {
        setCoins(coins - cost);
        setCoinsPerClick(coinsPerClick + 5);
        setStats(prev => ({ ...prev, totalUpgrades: prev.totalUpgrades + 1 }));
      }
    } else if (type === 'auto') {
      const cost = (autoCoins + 1) * 100;
      if (coins >= cost) {
        setCoins(coins - cost);
        setAutoCoins(autoCoins + 5);
        setStats(prev => ({ ...prev, totalUpgrades: prev.totalUpgrades + 1 }));
      }
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === '2345') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const adminAddCoins = (amount) => {
    setCoins(coins + amount);
  };

  const adminUnlockAll = () => {
    const allCharacters = Object.values(CHARACTERS).flat();
    setCollection(allCharacters);
  };

  const adminResetGame = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      localStorage.clear();
      setCoins(0);
      setCoinsPerClick(5);
      setAutoCoins(0);
      setCollection([]);
      setCharacterCounts({});
      setRebirths(0);
      setPrestigePoints(0);
      setCoinMultiplier(1);
      setClickMultiplier(1);
      setIsAdminAuthenticated(false);
      setAdminPassword('');
      setIsAdminPanelOpen(false);
      setActiveTab('clicker');
      alert('Game reset!');
    }
  };

  const handleRebirth = () => {
    const requiredCoins = 50000 * Math.pow(2, rebirths);
    if (coins < requiredCoins) {
      alert('Not enough coins for rebirth!');
      return;
    }
    
    // Calculate prestige points gained
    const pointsGained = rebirths + 1;
    
    // Reset temporary progress (but keep collection and counts)
    setCoins(0);
    setCoinsPerClick(5);
    setAutoCoins(0);
    // Don't reset collection or characterCounts - they persist!
    
    // Increase permanent stats
    setRebirths(rebirths + 1);
    setPrestigePoints(prestigePoints + pointsGained);
    
    alert(`Rebirth successful! You gained ${pointsGained} Prestige Point${pointsGained > 1 ? 's' : ''}!`);
  };

  const buyPrestigeUpgrade = (type) => {
    if (type === 'coin') {
      const cost = Math.floor(5 * Math.pow(1.5, (coinMultiplier - 1) * 2));
      if (prestigePoints >= cost) {
        setPrestigePoints(prestigePoints - cost);
        setCoinMultiplier(coinMultiplier + 0.5);
      }
    } else if (type === 'click') {
      const cost = Math.floor(3 * Math.pow(1.5, (clickMultiplier - 1) * 2));
      if (prestigePoints >= cost) {
        setPrestigePoints(prestigePoints - cost);
        setClickMultiplier(clickMultiplier + 0.25);
      }
    }
  };

  const sellDuplicate = (character) => {
    const count = characterCounts[character.id] || 0;
    if (count <= 1) return; // Can't sell if only have 1
    
    // Sell value based on rarity
    const sellValues = {
      'Common': 50,
      'Uncommon': 150,
      'Rare': 400,
      'Epic': 1000,
      'Legendary': 3000
    };
    
    const sellValue = sellValues[character.rarity] || 50;
    setCoins(coins + sellValue);
    
    // Decrease count
    setCharacterCounts(prev => ({
      ...prev,
      [character.id]: prev[character.id] - 1
    }));
  };

  // Determine which seasonal packs are available based on current date
  const getAvailableSeasonalPacks = () => {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const day = now.getDate();
    
    const availablePacks = [];
    
    // Halloween (October 1 - November 7)
    if ((month === 9) || (month === 10 && day <= 7)) {
      availablePacks.push('halloween');
    }
    
    // Thanksgiving (November 1 - November 30)
    if (month === 10) {
      availablePacks.push('thanksgiving');
    }
    
    // Christmas (December 1 - January 7)
    if (month === 11 || (month === 0 && day <= 7)) {
      availablePacks.push('christmas');
    }
    
    // Winter (December 1 - February 28/29)
    if (month === 11 || month === 0 || month === 1) {
      availablePacks.push('winter');
    }
    
    // Spring (March 1 - May 31)
    if (month === 2 || month === 3 || month === 4) {
      availablePacks.push('spring');
    }
    
    // Summer (June 1 - August 31)
    if (month === 5 || month === 6 || month === 7) {
      availablePacks.push('summer');
    }
    
    // Fall (September 1 - November 30)
    if (month === 8 || month === 9 || month === 10) {
      availablePacks.push('fall');
    }
    
    return availablePacks;
  };

  // Check if admin pack should be available (Tuesdays only)
  const isAdminPackAvailable = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Sunday, 1=Monday, 2=Tuesday, etc.
    return dayOfWeek === 2; // Tuesday
  };

  const availableSeasons = getAvailableSeasonalPacks();
  const adminPackAvailable = isAdminPackAvailable();

  const rarityCount = Object.keys(RARITIES).reduce((acc, rarity) => {
    acc[rarity] = collection.filter(c => c.rarity === rarity).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Rebirth Button - Top Left Corner */}
        <button
          onClick={() => setActiveTab('rebirth')}
          className={`fixed top-4 left-4 rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-all z-50 text-2xl font-bold ${
            activeTab === 'rebirth'
              ? 'bg-white text-purple-600 scale-110'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
          }`}
          title="Rebirth"
        >
          ⭐
        </button>

        {/* Admin Panel Toggle Button - Top Right Corner */}
        <button
          onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
          className="fixed top-4 right-4 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:bg-red-700 transition-all z-50 text-2xl font-bold"
          title="Admin Panel"
        >
          🔧
        </button>

        {/* Admin Panel - Dropdown */}
        {isAdminPanelOpen && (
          <div className="fixed top-20 right-4 bg-white rounded-xl shadow-2xl p-4 z-40 max-w-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-red-600">Admin Panel</h3>
              <button
                onClick={() => setIsAdminPanelOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            
            {!isAdminAuthenticated ? (
              <div>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-2 text-sm"
                  placeholder="Password"
                />
                <button
                  onClick={handleAdminLogin}
                  className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold text-sm"
                >
                  Login
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-green-50 p-2 rounded-lg mb-3 text-center">
                  <p className="text-green-700 font-semibold text-xs">✓ Access Granted</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => adminAddCoins(1000)}
                    className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-bold text-sm"
                  >
                    💰 +1K
                  </button>

                  <button
                    onClick={() => adminAddCoins(10000)}
                    className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-bold text-sm"
                  >
                    💰 +10K
                  </button>

                  <button
                    onClick={() => adminAddCoins(100000)}
                    className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-bold text-sm"
                  >
                    💰 +100K
                  </button>

                  <button
                    onClick={adminUnlockAll}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold text-sm"
                  >
                    🎁 Unlock All
                  </button>

                  <button
                    onClick={() => {
                      setCoinsPerClick(coinsPerClick + 100);
                    }}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm"
                  >
                    ⚡ +100 Click
                  </button>

                  <button
                    onClick={() => {
                      setAutoCoins(autoCoins + 100);
                    }}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-sm"
                  >
                    🤖 +100 Auto
                  </button>

                  <button
                    onClick={adminResetGame}
                    className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold text-sm"
                  >
                    🗑️ Reset
                  </button>

                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="text-xs font-bold text-gray-700 mb-1">👑 Admin Pack</div>
                    {adminPackAvailable ? (
                      <div className="bg-green-50 p-1.5 rounded text-xs">
                        <div className="font-semibold text-green-700">✓ Available Today!</div>
                        <div className="text-gray-600">Admin Pack is in the shop</div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-1.5 rounded text-xs">
                        <div className="font-semibold text-gray-700">🔒 Locked</div>
                        <div className="text-gray-600">Returns every Tuesday</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Coin Clicker 2.0
          </h1>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-yellow-600">
            <Coins className="w-8 h-8" />
            {coins.toLocaleString()} Coins
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            {(coinsPerClick * clickMultiplier * collectionBonus).toFixed(1)} per click • {(autoCoins * coinMultiplier * collectionBonus).toFixed(1)}/sec auto
          </div>
          {(rebirths > 0 || collection.length > 0) && (
            <div className="text-center mt-3">
              {rebirths > 0 && (
                <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold mb-2">
                  ⭐ {rebirths} Rebirths | 💎 {prestigePoints} Prestige Points
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                {rebirths > 0 && `Prestige: x${coinMultiplier.toFixed(1)} coins, x${clickMultiplier.toFixed(2)} click`}
                {rebirths > 0 && collection.length > 0 && ' • '}
                {collection.length > 0 && `Collection Bonus: x${collectionBonus.toFixed(2)}`}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'clicker', label: 'Clicker', icon: Coins },
            { id: 'shop', label: 'Shop', icon: ShoppingBag },
            { id: 'collection', label: 'Collection', icon: Trophy },
            { id: 'achievements', label: 'Achievements', icon: '🏅' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {typeof tab.icon === 'string' ? <span className="text-xl">{tab.icon}</span> : <tab.icon className="w-5 h-5" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Clicker Tab */}
        {activeTab === 'clicker' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <button
                onClick={handleClick}
                className="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-150 text-8xl flex items-center justify-center mx-auto"
              >
                🪙
              </button>
              <p className="mt-6 text-xl text-gray-600">Click the coin to earn!</p>
              
              <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Click Power</div>
                  <div className="text-2xl font-bold text-blue-600">+{coinsPerClick}</div>
                  <button
                    onClick={() => buyUpgrade('click')}
                    className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold"
                  >
                    Upgrade ({coinsPerClick * 20} coins)
                  </button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Auto Clicker</div>
                  <div className="text-2xl font-bold text-green-600">{autoCoins}/sec</div>
                  <button
                    onClick={() => buyUpgrade('auto')}
                    className="mt-2 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
                  >
                    Upgrade ({(autoCoins + 1) * 100} coins)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shop Tab */}
        {activeTab === 'shop' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Character Packs</h2>
            
            {/* Regular Packs */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4">🎲 Regular Packs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PACKS.filter(pack => !pack.seasonal && !pack.special).map(pack => (
                  <div key={pack.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="w-8 h-8 text-purple-600" />
                      <h3 className="text-2xl font-bold text-gray-800">{pack.name}</h3>
                    </div>
                    
                    <div className="mb-4 space-y-1">
                      {Object.entries(pack.chances).map(([rarity, chance]) => (
                        <div key={rarity} className="flex justify-between text-sm">
                          <span className="font-semibold capitalize" style={{ color: RARITIES[rarity.charAt(0).toUpperCase() + rarity.slice(1)].color }}>
                            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                          </span>
                          <span className="text-gray-600">{(chance * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => openPack(pack)}
                      disabled={coins < pack.cost || openingPack}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        coins >= pack.cost && !openingPack
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-5 h-5" />
                      Open Pack ({pack.cost} coins)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Packs */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-2">✨ Seasonal Packs</h3>
              <p className="text-sm text-gray-500 mb-4">Limited time packs based on the current season!</p>
              
              {PACKS.filter(pack => pack.seasonal && availableSeasons.includes(pack.seasonal)).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PACKS.filter(pack => pack.seasonal && availableSeasons.includes(pack.seasonal)).map(pack => (
                    <div key={pack.id} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-bold text-gray-800">{pack.name}</h4>
                      </div>
                      
                      <div className="mb-3 space-y-1 text-xs">
                        {Object.entries(pack.chances).map(([rarity, chance]) => (
                          <div key={rarity} className="flex justify-between">
                            <span className="font-semibold capitalize" style={{ color: RARITIES[rarity.charAt(0).toUpperCase() + rarity.slice(1)].color }}>
                              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                            </span>
                            <span className="text-gray-600">{(chance * 100).toFixed(0)}%</span>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => openPack(pack)}
                        disabled={coins < pack.cost || openingPack}
                        className={`w-full py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-sm ${
                          coins >= pack.cost && !openingPack
                            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-4 h-4" />
                        {pack.cost} coins
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🔒</div>
                  <div className="text-xl font-bold text-gray-600 mb-2">No Seasonal Packs Available</div>
                  <div className="text-sm text-gray-500">Seasonal packs will appear when their season arrives!</div>
                </div>
              )}
            </div>

            {/* Admin Pack */}
            {adminPackAvailable && (
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-2">👑 Admin Pack - Tuesday Only!</h3>
                <p className="text-sm text-gray-500 mb-4">Ultra rare legendary characters! Available every Tuesday.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PACKS.filter(pack => pack.special === 'admin').map(pack => (
                    <div key={pack.id} className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl p-6 border-2 border-red-300 shadow-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Package className="w-8 h-8 text-red-600" />
                        <h3 className="text-2xl font-bold text-gray-800">{pack.name}</h3>
                      </div>
                      
                      <div className="mb-4 bg-red-100 p-3 rounded-lg">
                        <div className="text-sm font-semibold text-red-700 mb-1">⭐ Special Drop Rates ⭐</div>
                        <div className="text-xs text-red-600">100% Legendary Admin Characters!</div>
                      </div>
                      
                      <div className="mb-4 text-xs text-gray-600 bg-white p-2 rounded">
                        🗓️ Available all day Tuesday
                      </div>
                      
                      <button
                        onClick={() => openPack(pack)}
                        disabled={coins < pack.cost || openingPack}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                          coins >= pack.cost && !openingPack
                            ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white hover:from-red-700 hover:to-yellow-700 shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-5 h-5" />
                        Open Pack ({pack.cost} coins)
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collection Tab */}
        {activeTab === 'collection' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Your Collection</h2>
            <div className="text-center text-lg mb-2 text-gray-600">
              {collection.length} / {Object.values(CHARACTERS).flat().length} Characters
            </div>
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                🎁 Collection Bonus: x{collectionBonus.toFixed(2)} Coins
              </div>
              <p className="text-xs text-gray-500 mt-2">Each character gives a permanent coin multiplier!</p>
            </div>
            
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {Object.entries(rarityCount).map(([rarity, count]) => (
                <div key={rarity} className="px-4 py-2 rounded-lg" style={{ backgroundColor: RARITIES[rarity].bg }}>
                  <span className="font-bold" style={{ color: RARITIES[rarity].color }}>
                    {rarity}: {count} (+{(RARITIES[rarity].multiplier * 100).toFixed(0)}% each)
                  </span>
                </div>
              ))}
            </div>
            
            {Object.entries(CHARACTERS).map(([category, chars]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xl font-bold mb-3 capitalize" style={{ color: chars[0].seasonal ? '#059669' : RARITIES[chars[0].rarity].color }}>
                  {chars[0].seasonal ? `${chars[0].seasonal} 🎉` : chars[0].rarity}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {chars.map(char => {
                    const owned = collection.find(c => c.id === char.id);
                    const count = characterCounts[char.id] || 0;
                    const sellValues = {
                      'Common': 50,
                      'Uncommon': 150,
                      'Rare': 400,
                      'Epic': 1000,
                      'Legendary': 3000
                    };
                    return (
                      <div
                        key={char.id}
                        className={`p-4 rounded-xl text-center transition-all ${
                          owned
                            ? 'bg-gradient-to-br shadow-lg'
                            : 'bg-gray-100 opacity-50'
                        }`}
                        style={owned ? {
                          backgroundColor: RARITIES[char.rarity].bg,
                          borderColor: RARITIES[char.rarity].color,
                          borderWidth: '2px'
                        } : {}}
                      >
                        <div className="text-5xl mb-2">{owned ? char.emoji : '❓'}</div>
                        <div className="font-bold text-sm">{owned ? char.name : '???'}</div>
                        {owned && count > 0 && (
                          <div className="mt-2">
                            <div className="text-xs font-semibold text-gray-600 mb-1">
                              Owned: {count}
                            </div>
                            {count > 1 && (
                              <button
                                onClick={() => sellDuplicate(char)}
                                className="w-full py-1 px-2 bg-yellow-500 text-white rounded text-xs font-bold hover:bg-yellow-600"
                              >
                                Sell (+{sellValues[char.rarity]} coins)
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">🏅 Achievements</h2>
            <div className="text-center text-lg mb-6 text-gray-600">
              {unlockedAchievements.length} / {ACHIEVEMENTS.length} Unlocked
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map(achievement => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                let progress = 0;
                let current = 0;
                
                // Calculate progress
                switch (achievement.requirement.type) {
                  case 'coins':
                    current = stats.totalCoinsEarned;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                  case 'clicks':
                    current = stats.totalClicks;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                  case 'packs':
                    current = stats.totalPacksOpened;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                  case 'collection':
                    current = collection.length;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                  case 'legendary':
                    current = collection.filter(c => c.rarity === 'Legendary').length;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                  case 'epic':
                    current = collection.filter(c => c.rarity === 'Epic').length;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                  case 'rebirths':
                    current = rebirths;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                  case 'upgrades':
                    current = stats.totalUpgrades;
                    progress = Math.min((current / achievement.requirement.value) * 100, 100);
                    break;
                }
                
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-center mb-3">
                      <div className={`text-5xl mb-2 ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.emoji}
                      </div>
                      <div className={`font-bold text-lg ${isUnlocked ? 'text-yellow-700' : 'text-gray-600'}`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.description}
                      </div>
                    </div>
                    
                    {!isUnlocked && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{current} / {achievement.requirement.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className={`text-center text-sm font-bold ${isUnlocked ? 'text-green-600' : 'text-gray-500'}`}>
                      {isUnlocked ? '✓ Unlocked' : `Reward: ${achievement.reward} coins`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rebirth Tab */}
        {activeTab === 'rebirth' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">⭐ Rebirth System ⭐</h2>
            <p className="text-center text-gray-600 mb-6">Reset your progress for permanent upgrades!</p>
            
            <div className="max-w-2xl mx-auto">
              {/* Rebirth Button */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    Rebirth #{rebirths + 1}
                  </div>
                  <div className="text-lg text-gray-700 mb-2">
                    Cost: {(50000 * Math.pow(2, rebirths)).toLocaleString()} Coins
                  </div>
                  <div className="text-md text-gray-600">
                    Gain: {rebirths + 1} Prestige Point{rebirths + 1 > 1 ? 's' : ''}
                  </div>
                </div>
                <button
                  onClick={handleRebirth}
                  disabled={coins < (50000 * Math.pow(2, rebirths))}
                  className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
                    coins >= (50000 * Math.pow(2, rebirths))
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  ⭐ Rebirth Now!
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  ⚠️ This will reset coins, upgrades, and collection
                </p>
              </div>

              {/* Prestige Stats */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-center mb-4 text-blue-600">💎 Your Prestige Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{rebirths}</div>
                    <div className="text-sm text-gray-600">Total Rebirths</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-600">{prestigePoints}</div>
                    <div className="text-sm text-gray-600">Prestige Points</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">x{coinMultiplier.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">Coin Multiplier</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">x{clickMultiplier.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Click Multiplier</div>
                  </div>
                </div>
              </div>

              {/* Prestige Upgrades */}
              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-center mb-4 text-yellow-600">🎁 Permanent Upgrades</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-bold text-green-600">Auto Coin Multiplier</div>
                        <div className="text-sm text-gray-600">Current: x{coinMultiplier.toFixed(1)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {Math.floor(5 * Math.pow(1.5, (coinMultiplier - 1) * 2))} PP
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => buyPrestigeUpgrade('coin')}
                      disabled={prestigePoints < Math.floor(5 * Math.pow(1.5, (coinMultiplier - 1) * 2))}
                      className={`w-full py-2 rounded-lg font-bold ${
                        prestigePoints >= Math.floor(5 * Math.pow(1.5, (coinMultiplier - 1) * 2))
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Upgrade to x{(coinMultiplier + 0.5).toFixed(1)}
                    </button>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-bold text-blue-600">Click Power Multiplier</div>
                        <div className="text-sm text-gray-600">Current: x{clickMultiplier.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {Math.floor(3 * Math.pow(1.5, (clickMultiplier - 1) * 2))} PP
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => buyPrestigeUpgrade('click')}
                      disabled={prestigePoints < Math.floor(3 * Math.pow(1.5, (clickMultiplier - 1) * 2))}
                      className={`w-full py-2 rounded-lg font-bold ${
                        prestigePoints >= Math.floor(3 * Math.pow(1.5, (clickMultiplier - 1) * 2))
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Upgrade to x{(clickMultiplier + 0.25).toFixed(2)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pack Opening Animation */}
        {openingPack && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="text-center">
              {!newCharacter ? (
                <div className="animate-bounce">
                  <Package className="w-32 h-32 text-white mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white">Opening {openingPack.name}...</div>
                </div>
              ) : (
                <div className="animate-scale-in">
                  <div className="text-9xl mb-4">{newCharacter.emoji}</div>
                  <div className="text-4xl font-bold text-white mb-2">{newCharacter.name}</div>
                  <div
                    className="text-2xl font-bold px-6 py-2 rounded-full inline-block"
                    style={{ 
                      backgroundColor: RARITIES[newCharacter.rarity].bg,
                      color: RARITIES[newCharacter.rarity].color
                    }}
                  >
                    {newCharacter.rarity}
                  </div>
                  {!collection.find(c => c.id === newCharacter.id) ? (
                    <div className="mt-4 text-yellow-400 text-xl font-bold animate-pulse">
                      ✨ NEW! ✨
                    </div>
                  ) : (
                    <div className="mt-4 text-blue-400 text-xl font-bold">
                      📦 Duplicate! (Owned: {characterCounts[newCharacter.id] || 1})
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Achievement Unlocked Notification */}
        {newAchievement && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-6 shadow-2xl border-4 border-yellow-300 max-w-md">
              <div className="text-center">
                <div className="text-6xl mb-2">{newAchievement.emoji}</div>
                <div className="text-2xl font-bold mb-1">Achievement Unlocked!</div>
                <div className="text-xl font-semibold mb-2">{newAchievement.name}</div>
                <div className="text-sm mb-3">{newAchievement.description}</div>
                <div className="bg-white/20 rounded-lg py-2 px-4 inline-block">
                  <div className="font-bold">+{newAchievement.reward} Coins!</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}