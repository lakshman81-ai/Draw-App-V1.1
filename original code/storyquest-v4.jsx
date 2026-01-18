import React, { useState, useRef, useEffect } from 'react';

// ============================================
// 🎮 STORYQUEST - THE ADVENTURE BEGINS
// Version 4.0 - Pure Game Experience
// ============================================
// CORE RULE: If it sounds like school, remove it.
// Kids should feel: "I'm on an adventure!"
// NOT: "I'm completing tasks."
// ============================================

// ===== GAME CONFIGURATION (Future-proof architecture) =====
const GAME_CONFIG = {
  title: "StoryQuest",
  subtitle: "The Adventure Begins",
  
  // Narrative hooks for each screen
  narrativeHooks: {
    welcome: "A magical story is waiting… but it needs YOU.",
    questMap: "Your legend is being written...",
    storyForge: "The ancient forge awaits your words...",
    theater: "Behold! Your tale comes to life!",
    challenge: "Prove your story wisdom!",
    crystal: "The crystal reveals your destiny...",
    victory: "A new legend is born!"
  },
  
  // Celebration messages - high energy!
  celebrations: [
    "🔥 EPIC!",
    "⚡ LEGENDARY!",
    "💥 UNSTOPPABLE!",
    "🌟 BRILLIANT!",
    "👑 ROYAL MOVE!",
    "🚀 AMAZING!",
    "✨ MAGICAL!",
    "🎯 PERFECT!"
  ],
  
  // Encouraging unlock messages
  unlockMessages: {
    hero: "Your hero has awakened! 🦸",
    world: "A new world appears! 🌍",
    trouble: "The plot thickens! ⚡",
    victory: "Victory is near! ⚔️",
    ending: "Your legend is complete! 👑"
  },
  
  // Loading messages with personality
  loadingMessages: [
    "🧙 The Story Master is thinking...",
    "✨ Weaving your tale...",
    "🌟 Summoning characters...",
    "🔮 The magic is working...",
    "📖 Your story awakens...",
    "🎭 Heroes are gathering...",
    "⚔️ Adventures forming...",
    "🏰 Worlds appearing..."
  ]
};

// ===== QUEST CONFIGURATION =====
const QUESTS = [
  {
    id: 'hero',
    icon: '🦸',
    title: 'Awaken Your Hero',
    prompt: "Every legend needs a hero... Who will yours be?",
    badge: '🎭',
    badgeName: 'Hero Awakener',
    unlockMessage: "Your hero has awakened!",
    options: [
      { id: 'brave_knight', label: 'A Fearless Knight', emoji: '⚔️' },
      { id: 'clever_wizard', label: 'A Clever Wizard', emoji: '🧙' },
      { id: 'kind_princess', label: 'A Kind Princess', emoji: '👸' },
      { id: 'mighty_dragon', label: 'A Friendly Dragon', emoji: '🐉' },
      { id: 'smart_inventor', label: 'A Brilliant Inventor', emoji: '🔧' },
      { id: 'brave_explorer', label: 'A Bold Explorer', emoji: '🧭' },
      { id: 'magic_cat', label: 'A Magical Cat', emoji: '🐱' },
      { id: 'robot_friend', label: 'A Loyal Robot', emoji: '🤖' }
    ]
  },
  {
    id: 'world',
    icon: '🌍',
    title: 'Discover Your World',
    prompt: "Where will your adventure unfold?",
    badge: '🗺️',
    badgeName: 'World Builder',
    unlockMessage: "A new world appears!",
    options: [
      { id: 'enchanted_forest', label: 'An Enchanted Forest', emoji: '🌲' },
      { id: 'crystal_castle', label: 'A Crystal Castle', emoji: '🏰' },
      { id: 'underwater_kingdom', label: 'An Underwater Kingdom', emoji: '🌊' },
      { id: 'cloud_city', label: 'A City in the Clouds', emoji: '☁️' },
      { id: 'space_station', label: 'A Space Station', emoji: '🚀' },
      { id: 'dragon_mountain', label: 'Dragon Mountain', emoji: '⛰️' },
      { id: 'hidden_village', label: 'A Hidden Village', emoji: '🏘️' },
      { id: 'magic_school', label: 'A School of Magic', emoji: '✨' }
    ]
  },
  {
    id: 'trouble',
    icon: '⚡',
    title: 'Face the Danger',
    prompt: "Oh no! What sudden danger threatens your hero?",
    badge: '💥',
    badgeName: 'Plot Master',
    unlockMessage: "The plot thickens!",
    options: [
      { id: 'villain_attack', label: 'A villain attacks!', emoji: '👿' },
      { id: 'friend_lost', label: 'A friend vanishes!', emoji: '😰' },
      { id: 'treasure_stolen', label: 'Treasure is stolen!', emoji: '💎' },
      { id: 'dark_curse', label: 'A dark curse spreads!', emoji: '🌑' },
      { id: 'monster_awakes', label: 'A monster awakes!', emoji: '👹' },
      { id: 'magic_fades', label: 'Magic is fading!', emoji: '✨' },
      { id: 'storm_coming', label: 'A great storm comes!', emoji: '⛈️' },
      { id: 'portal_opens', label: 'A strange portal opens!', emoji: '🌀' }
    ]
  },
  {
    id: 'victory',
    icon: '⚔️',
    title: 'Find the Way',
    prompt: "How will your hero fight back?",
    badge: '🛡️',
    badgeName: 'Problem Solver',
    unlockMessage: "Victory is near!",
    options: [
      { id: 'team_up', label: 'Team up with friends!', emoji: '🤝' },
      { id: 'use_magic', label: 'Use secret magic!', emoji: '🪄' },
      { id: 'clever_trick', label: 'Think of a clever trick!', emoji: '💡' },
      { id: 'brave_stand', label: 'Make a brave stand!', emoji: '🦸' },
      { id: 'find_weakness', label: 'Find the weakness!', emoji: '🔍' },
      { id: 'kind_heart', label: 'Win with kindness!', emoji: '💖' },
      { id: 'ancient_secret', label: 'Discover a secret!', emoji: '🗝️' },
      { id: 'special_power', label: 'Unlock hidden power!', emoji: '⚡' }
    ]
  },
  {
    id: 'ending',
    icon: '👑',
    title: 'Write Your Legend',
    prompt: "How does your hero save the day?",
    badge: '🏆',
    badgeName: 'Legend Writer',
    unlockMessage: "Your legend is complete!",
    options: [
      { id: 'celebration', label: 'Everyone celebrates!', emoji: '🎉' },
      { id: 'new_friendship', label: 'New friends forever!', emoji: '👫' },
      { id: 'hero_rewarded', label: 'The hero is honored!', emoji: '🏆' },
      { id: 'peace_restored', label: 'Peace returns!', emoji: '🕊️' },
      { id: 'lesson_learned', label: 'Wisdom is gained!', emoji: '📚' },
      { id: 'next_adventure', label: 'New adventures await!', emoji: '🌅' },
      { id: 'magic_gift', label: 'A magical gift appears!', emoji: '🎁' },
      { id: 'home_sweet_home', label: 'Everyone goes home happy!', emoji: '🏠' }
    ]
  }
];

// Word Power-Ups
const WORD_POWERUPS = {
  'big': ['HUGE', 'ENORMOUS', 'MASSIVE', 'GIGANTIC'],
  'small': ['TINY', 'LITTLE', 'MINIATURE', 'PETITE'],
  'happy': ['JOYFUL', 'THRILLED', 'DELIGHTED', 'ECSTATIC'],
  'sad': ['GLOOMY', 'HEARTBROKEN', 'MISERABLE', 'SORROWFUL'],
  'good': ['AMAZING', 'FANTASTIC', 'WONDERFUL', 'EXCELLENT'],
  'bad': ['TERRIBLE', 'AWFUL', 'DREADFUL', 'HORRIBLE'],
  'said': ['SHOUTED', 'WHISPERED', 'EXCLAIMED', 'ANNOUNCED'],
  'walked': ['MARCHED', 'TIPTOED', 'STROLLED', 'DASHED'],
  'ran': ['SPRINTED', 'ZOOMED', 'RACED', 'RUSHED'],
  'scared': ['TERRIFIED', 'FRIGHTENED', 'ALARMED', 'PETRIFIED'],
  'nice': ['LOVELY', 'WONDERFUL', 'CHARMING', 'DELIGHTFUL'],
  'fast': ['LIGHTNING-QUICK', 'RAPID', 'SPEEDY', 'SWIFT'],
  'went': ['JOURNEYED', 'TRAVELED', 'VENTURED', 'HEADED'],
  'got': ['GRABBED', 'SNATCHED', 'OBTAINED', 'RECEIVED'],
  'very': ['INCREDIBLY', 'EXTREMELY', 'REMARKABLY', 'TRULY']
};

// Screens
const SCREENS = {
  WELCOME: 'welcome',
  ADVENTURE_SELECT: 'adventure_select',
  QUEST_MAP: 'quest_map',
  QUEST_ACTIVE: 'quest_active',
  STORY_FORGE: 'story_forge',
  STORY_LOADING: 'story_loading',
  STORY_THEATER: 'story_theater',
  CHALLENGE_ARENA: 'challenge_arena',
  CRYSTAL: 'crystal',
  VICTORY: 'victory'
};

// Adventure Modes
const ADVENTURES = {
  APPRENTICE: 'apprentice',
  EXPLORER: 'explorer',
  LEGEND: 'legend'
};

// ===== COMPONENTS =====

// Confetti Burst
const ConfettiBurst = ({ active }) => {
  if (!active) return null;
  const pieces = ['🎉', '⭐', '✨', '🌟', '💫', '🎊', '💥', '🔥', '👑', '🏆'];
  
  return (
    <div className="confetti-burst">
      {[...Array(40)].map((_, i) => (
        <span 
          key={i} 
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.3}s`,
            fontSize: `${18 + Math.random() * 24}px`
          }}
        >
          {pieces[Math.floor(Math.random() * pieces.length)]}
        </span>
      ))}
    </div>
  );
};

// Celebration Popup
const CelebrationPopup = ({ message, show }) => {
  if (!show) return null;
  return (
    <div className="celebration-popup">
      <div className="celebration-inner">
        <span className="celebration-text">{message}</span>
      </div>
    </div>
  );
};

// Story Guide (Mascot)
const StoryGuide = ({ mood = 'excited', size = 'medium', message, animate = true }) => {
  const sizes = { small: 70, medium: 110, large: 150 };
  const s = sizes[size];
  
  const moods = {
    excited: { eyes: '★', mouth: 'D', glow: '#FFE66D' },
    proud: { eyes: '♥', mouth: '◡', glow: '#FF6B6B' },
    mysterious: { eyes: '◐', mouth: '~', glow: '#9B59B6' },
    thinking: { eyes: '◑', mouth: '○', glow: '#4ECDC4' },
    celebrating: { eyes: '✧', mouth: 'D', glow: '#FFD700' }
  };
  
  const m = moods[mood] || moods.excited;
  
  return (
    <div className="guide-wrapper">
      <div className={`guide ${animate ? 'animate' : ''}`} style={{ width: s, height: s }}>
        <div className="guide-glow" style={{ background: m.glow }}></div>
        <div className="guide-body">
          <div className="guide-hat">🎩</div>
          <div className="guide-face">
            <div className="guide-eyes">
              <span>{m.eyes}</span>
              <span>{m.eyes}</span>
            </div>
            <div className="guide-mouth">{m.mouth}</div>
          </div>
          <div className="guide-wand">✨</div>
        </div>
      </div>
      {message && (
        <div className="guide-bubble">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

// Badge Component
const Badge = ({ icon, name, unlocked, size = 'medium' }) => {
  const sizes = { small: 55, medium: 75, large: 95 };
  const s = sizes[size];
  
  return (
    <div 
      className={`badge ${unlocked ? 'unlocked' : 'locked'}`} 
      style={{ width: s, height: s }}
    >
      <div className="badge-inner">
        <span className="badge-icon">{unlocked ? icon : '🔒'}</span>
        {unlocked && <div className="badge-shine"></div>}
      </div>
      <span className="badge-name">{unlocked ? name : '???'}</span>
    </div>
  );
};

// Progress Meter
const StoryMeter = ({ value, max, label }) => {
  const pct = (value / max) * 100;
  return (
    <div className="story-meter">
      <span className="meter-label">{label}</span>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${pct}%` }}>
          {pct > 0 && <span className="meter-spark">✨</span>}
        </div>
      </div>
      <span className="meter-count">{value}/{max}</span>
    </div>
  );
};

// ===== SCREENS =====

// Welcome Screen
const WelcomeScreen = ({ onStart }) => (
  <div className="screen welcome-screen">
    <div className="floating-icons">
      {['⚔️', '🏰', '🐉', '👑', '🌟', '🎭', '🔮', '📖'].map((e, i) => (
        <span key={i} className={`float-icon fi-${i}`}>{e}</span>
      ))}
    </div>
    
    <div className="welcome-content">
      <div className="logo-area">
        <span className="logo-book">📖</span>
        <h1 className="game-title">
          <span>Story</span>
          <span className="title-highlight">Quest</span>
        </h1>
        <p className="game-subtitle">The Adventure Begins</p>
      </div>
      
      <StoryGuide mood="excited" size="large" />
      
      <div className="narrative-hook">
        <p>{GAME_CONFIG.narrativeHooks.welcome}</p>
      </div>
      
      <button className="btn btn-hero" onClick={onStart}>
        <span className="btn-icon">⚔️</span>
        <span>Begin Your Quest!</span>
      </button>
      
      <div className="badge-preview">
        <p>Collect all badges:</p>
        <div className="badge-row">
          {QUESTS.map(q => <span key={q.id} className="mini-badge">{q.badge}</span>)}
        </div>
      </div>
    </div>
  </div>
);

// Adventure Select Screen
const AdventureSelectScreen = ({ onSelect }) => (
  <div className="screen adventure-screen">
    <StoryGuide mood="mysterious" message="Choose your path, adventurer..." />
    
    <h2 className="screen-title">Pick Your Adventure!</h2>
    
    <div className="adventure-grid">
      <button className="adventure-card apprentice" onClick={() => onSelect(ADVENTURES.APPRENTICE)}>
        <div className="card-glow"></div>
        <span className="card-icon">🌱</span>
        <h3>Story Apprentice</h3>
        <p>Your guide helps you every step!</p>
        <ul>
          <li>🎯 Guided quests</li>
          <li>💡 Helpful hints</li>
          <li>⭐ Easy badges</li>
        </ul>
      </button>
      
      <button className="adventure-card explorer" onClick={() => onSelect(ADVENTURES.EXPLORER)}>
        <div className="card-glow"></div>
        <div className="popular-tag">⭐ Popular!</div>
        <span className="card-icon">🧭</span>
        <h3>Story Explorer</h3>
        <p>Some hints along the way!</p>
        <ul>
          <li>🗺️ Find your path</li>
          <li>💫 Some guidance</li>
          <li>⭐⭐ More rewards</li>
        </ul>
      </button>
      
      <button className="adventure-card legend" onClick={() => onSelect(ADVENTURES.LEGEND)}>
        <div className="card-glow"></div>
        <span className="card-icon">👑</span>
        <h3>Story Legend</h3>
        <p>Forge your own legendary tale!</p>
        <ul>
          <li>⚔️ Total freedom</li>
          <li>🔥 No hand-holding</li>
          <li>⭐⭐⭐ Legend status</li>
        </ul>
      </button>
    </div>
  </div>
);

// Quest Map Screen
const QuestMapScreen = ({ 
  completed, 
  current, 
  badges,
  onSelectQuest,
  onStartStory 
}) => {
  const allDone = completed.length === QUESTS.length;
  
  return (
    <div className="screen quest-map-screen">
      <div className="map-header">
        <h2 className="screen-title">🗺️ Quest Map</h2>
        <StoryMeter value={completed.length} max={QUESTS.length} label="Story Power" />
      </div>
      
      <p className="map-narrative">{GAME_CONFIG.narrativeHooks.questMap}</p>
      
      <div className="quest-trail">
        {QUESTS.map((quest, i) => {
          const isDone = completed.includes(quest.id);
          const isCurrent = current === i && !isDone;
          const isLocked = i > completed.length;
          
          return (
            <div key={quest.id} className="quest-node-wrap">
              <button
                className={`quest-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={() => !isLocked && onSelectQuest(i)}
                disabled={isLocked}
              >
                <span className="node-icon">
                  {isDone ? '✅' : isLocked ? '🔒' : quest.icon}
                </span>
                <span className="node-title">
                  {isLocked ? 'Locked' : quest.title}
                </span>
                {isDone && <span className="node-badge">{quest.badge}</span>}
              </button>
              
              {i < QUESTS.length - 1 && (
                <div className={`trail-line ${isDone ? 'lit' : ''}`}>
                  <span></span><span></span><span></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="badges-area">
        <h3>🏆 Your Badges</h3>
        <div className="badges-grid">
          {QUESTS.map(q => (
            <Badge 
              key={q.id}
              icon={q.badge}
              name={q.badgeName}
              unlocked={badges.includes(q.id)}
              size="small"
            />
          ))}
        </div>
      </div>
      
      {allDone && (
        <button className="btn btn-hero glow" onClick={onStartStory}>
          <span className="btn-icon">✨</span>
          <span>Bring My Story to Life!</span>
        </button>
      )}
      
      {!allDone && completed.length > 0 && (
        <p className="unlock-hint">
          ✨ {QUESTS.length - completed.length} more quest{QUESTS.length - completed.length > 1 ? 's' : ''} to unlock your story!
        </p>
      )}
    </div>
  );
};

// Quest Active Screen
const QuestActiveScreen = ({
  quest,
  questIndex,
  adventure,
  selection,
  onComplete,
  onBack
}) => {
  const [selected, setSelected] = useState(selection || null);
  const [custom, setCustom] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState('');
  
  const handleSelect = (id) => {
    setSelected(id);
    setCustom('');
    
    // Trigger celebration
    setCelebrationMsg(GAME_CONFIG.celebrations[Math.floor(Math.random() * GAME_CONFIG.celebrations.length)]);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1200);
  };
  
  const handleCustom = (text) => {
    setCustom(text);
    setSelected(null);
  };
  
  const canGo = selected || custom.length > 3;
  
  const handleGo = () => {
    onComplete(quest.id, selected || custom, questIndex);
  };
  
  return (
    <div className="screen quest-active-screen">
      <ConfettiBurst active={showCelebration} />
      <CelebrationPopup message={celebrationMsg} show={showCelebration} />
      
      <div className="quest-top-bar">
        <button className="btn-back" onClick={onBack}>← Map</button>
        <span className="quest-progress">Quest {questIndex + 1} of {QUESTS.length}</span>
      </div>
      
      <div className="quest-main">
        <div className="quest-header">
          <span className="quest-icon-big">{quest.icon}</span>
          <h2 className="quest-title">{quest.title}</h2>
          <div className="quest-reward">
            <span>Unlock:</span> {quest.badge} {quest.badgeName}
          </div>
        </div>
        
        <StoryGuide mood="excited" size="small" message={quest.prompt} />
        
        <div className="options-grid">
          {quest.options.map(opt => (
            <button
              key={opt.id}
              className={`option-card ${selected === opt.id ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.id)}
            >
              <span className="opt-emoji">{opt.emoji}</span>
              <span className="opt-label">{opt.label}</span>
              {selected === opt.id && <span className="opt-check">✓</span>}
            </button>
          ))}
        </div>
        
        {adventure !== ADVENTURES.APPRENTICE && (
          <div className="custom-section">
            <p>— or create your own —</p>
            <input
              type="text"
              placeholder="Type something amazing..."
              value={custom}
              onChange={(e) => handleCustom(e.target.value)}
              maxLength={50}
            />
          </div>
        )}
      </div>
      
      <button 
        className={`btn btn-hero ${canGo ? '' : 'disabled'}`}
        onClick={handleGo}
        disabled={!canGo}
      >
        <span className="btn-icon">{canGo ? '⚡' : '🔒'}</span>
        <span>{canGo ? "Lock It In!" : "Pick something first!"}</span>
      </button>
    </div>
  );
};

// Story Forge Screen
const StoryForgeScreen = ({
  choices,
  adventure,
  onComplete,
  onBack
}) => {
  const [paragraphs, setParagraphs] = useState([]);
  const [powerUp, setPowerUp] = useState(null);
  const [powerUpIndex, setPowerUpIndex] = useState(null);
  const [isReading, setIsReading] = useState(false);
  
  useEffect(() => {
    generateStarters();
  }, [choices]);
  
  const getText = (questId) => {
    const choice = choices[questId];
    if (!choice) return '';
    if (typeof choice === 'string') return choice;
    const quest = QUESTS.find(q => q.id === questId);
    const opt = quest?.options.find(o => o.id === choice);
    return opt?.label || '';
  };
  
  const generateStarters = () => {
    const hero = getText('hero');
    const world = getText('world');
    const trouble = getText('trouble');
    const victory = getText('victory');
    const ending = getText('ending');
    
    setParagraphs([
      `Once upon a time, ${hero.toLowerCase().replace('a ', '')} lived ${world.toLowerCase()}.`,
      `One day, something terrible happened! ${trouble}`,
      `But the hero was brave. ${victory}`,
      `And so, ${ending.toLowerCase()}`,
      `The End.`
    ]);
  };
  
  const handleChange = (i, text) => {
    const updated = [...paragraphs];
    updated[i] = text;
    setParagraphs(updated);
    checkPowerUp(text, i);
  };
  
  const checkPowerUp = (text, i) => {
    const words = text.toLowerCase().split(/\s+/);
    for (const w of words) {
      const clean = w.replace(/[.,!?'"]/g, '');
      if (WORD_POWERUPS[clean]) {
        setPowerUp({ word: clean, options: WORD_POWERUPS[clean] });
        setPowerUpIndex(i);
        return;
      }
    }
    if (powerUpIndex === i) {
      setPowerUp(null);
      setPowerUpIndex(null);
    }
  };
  
  const applyPowerUp = (original, replacement) => {
    const updated = [...paragraphs];
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    updated[powerUpIndex] = updated[powerUpIndex].replace(regex, replacement.toLowerCase());
    setParagraphs(updated);
    setPowerUp(null);
    setPowerUpIndex(null);
  };
  
  const handleReadAloud = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const text = paragraphs.join(' ');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.onend = () => setIsReading(false);
    setIsReading(true);
    speechSynthesis.speak(utterance);
  };
  
  return (
    <div className="screen forge-screen">
      <div className="forge-header">
        <button className="btn-back" onClick={onBack}>← Map</button>
        <h2 className="screen-title">⚒️ Story Forge</h2>
        <button className={`btn-tool ${isReading ? 'active' : ''}`} onClick={handleReadAloud}>
          {isReading ? '⏹️ Stop' : '🔊 Hear It'}
        </button>
      </div>
      
      <p className="forge-narrative">{GAME_CONFIG.narrativeHooks.storyForge}</p>
      
      <div className="forge-content">
        <div className="paragraphs">
          {paragraphs.map((p, i) => (
            <div key={i} className="paragraph-box">
              <span className="para-num">{i + 1}</span>
              <textarea
                value={p}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              
              {powerUpIndex === i && powerUp && (
                <div className="powerup-box">
                  <div className="powerup-header">
                    <span>⚡</span> LEVEL UP! Boost "{powerUp.word}":
                  </div>
                  <div className="powerup-options">
                    {powerUp.options.map((opt, j) => (
                      <button key={j} onClick={() => applyPowerUp(powerUp.word, opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="forge-sidebar">
          <h3>📜 Your Story</h3>
          <div className="summary-list">
            {QUESTS.map(q => (
              <div key={q.id} className="summary-item">
                <span>{q.icon}</span>
                <span>{q.title}</span>
                <span>✅</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button className="btn btn-hero glow" onClick={() => onComplete(paragraphs)}>
        <span className="btn-icon">✨</span>
        <span>Bring My Story to Life!</span>
      </button>
    </div>
  );
};

// Story Loading Screen (Dramatic!)
const StoryLoadingScreen = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % GAME_CONFIG.loadingMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="screen loading-screen">
      <div className="loading-content">
        <div className="magic-circle">
          <div className="circle-ring"></div>
          <div className="circle-ring ring2"></div>
          <span className="circle-icon">📖</span>
        </div>
        
        <p className="loading-msg">{GAME_CONFIG.loadingMessages[msgIndex]}</p>
        
        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>
        
        <p className="loading-sub">Something magical is happening...</p>
      </div>
    </div>
  );
};

// Story Theater Screen
const StoryTheaterScreen = ({ story, onChallenge, onBack }) => {
  const [part, setPart] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [showReveal, setShowReveal] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowReveal(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!story?.sections) {
    return (
      <div className="screen theater-screen">
        <StoryGuide mood="thinking" message="Something went wrong! Let's go back." />
        <button className="btn btn-hero" onClick={onBack}>← Go Back</button>
      </div>
    );
  }
  
  const section = story.sections[part];
  const isLast = part === story.sections.length - 1;
  const isFirst = part === 0;
  
  const handleRead = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const text = `${section.heading}. ${section.text}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.onend = () => setIsReading(false);
    setIsReading(true);
    speechSynthesis.speak(utterance);
  };
  
  return (
    <div className="screen theater-screen">
      {showReveal && (
        <div className="story-reveal">
          <span className="reveal-icon">✨</span>
          <h2>Your Story Awakens!</h2>
        </div>
      )}
      
      <div className="theater-header">
        <h1 className="story-title">{story.title}</h1>
        <button className={`btn-tool ${isReading ? 'active' : ''}`} onClick={handleRead}>
          {isReading ? '⏹️' : '🔊'}
        </button>
      </div>
      
      <div className="theater-progress">
        {story.sections.map((_, i) => (
          <span key={i} className={`gem ${i === part ? 'active' : ''} ${i < part ? 'done' : ''}`}>
            {i < part ? '💎' : i === part ? '✨' : '◇'}
          </span>
        ))}
      </div>
      
      <div className="theater-stage">
        <span className="part-label">Part {part + 1}</span>
        <h2 className="part-title">{section.heading}</h2>
        <p className="part-text">{section.text}</p>
        <span className="part-illustration">{section.illustration}</span>
      </div>
      
      <div className="theater-nav">
        <button 
          className="btn btn-secondary" 
          onClick={() => setPart(p => p - 1)}
          disabled={isFirst}
        >
          ← Back
        </button>
        
        {isLast ? (
          <button className="btn btn-hero glow" onClick={onChallenge}>
            <span className="btn-icon">⚔️</span>
            <span>Challenge Arena!</span>
          </button>
        ) : (
          <button className="btn btn-hero" onClick={() => setPart(p => p + 1)}>
            <span>Next →</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Challenge Arena Screen
const ChallengeArenaScreen = ({ challenges, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  if (!challenges?.length) {
    return (
      <div className="screen arena-screen">
        <StoryGuide mood="thinking" message="No challenges found!" />
      </div>
    );
  }
  
  const challenge = challenges[current];
  const isLast = current === challenges.length - 1;
  const isCorrect = selected === challenge.correctAnswer;
  
  const handleAnswer = (ans) => {
    if (showResult) return;
    setSelected(ans);
    setShowResult(true);
    setAnswers({ ...answers, [current]: ans });
    
    if (ans === challenge.correctAnswer) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };
  
  const handleNext = () => {
    if (isLast) {
      const score = Object.entries({ ...answers, [current]: selected }).filter(
        ([i, a]) => challenges[i]?.correctAnswer === a
      ).length;
      onComplete(score, challenges.length, answers);
    } else {
      setCurrent(c => c + 1);
      setShowResult(false);
      setSelected(null);
    }
  };
  
  const renderPrompt = () => {
    if (challenge.type === 'synonym') {
      return (
        <>
          <p className="challenge-text">Find a word that means the <span className="hl-same">SAME</span> as:</p>
          <div className="target-word">{challenge.targetWord}</div>
        </>
      );
    }
    if (challenge.type === 'antonym') {
      return (
        <>
          <p className="challenge-text">Find the <span className="hl-opp">OPPOSITE</span> of:</p>
          <div className="target-word opposite">{challenge.targetWord}</div>
        </>
      );
    }
    if (challenge.type === 'fill-blank') {
      return (
        <>
          <p className="challenge-text">Fill in the magic word!</p>
          <div className="fill-sentence">
            {challenge.sentence.split('_____').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={`blank ${showResult ? 'filled' : ''}`}>
                    {showResult ? challenge.correctAnswer : '___'}
                  </span>
                )}
              </span>
            ))}
          </div>
        </>
      );
    }
    return <p className="challenge-text">{challenge.question}</p>;
  };
  
  return (
    <div className="screen arena-screen">
      <ConfettiBurst active={showConfetti} />
      
      <div className="arena-header">
        <h2 className="screen-title">⚔️ Challenge Arena</h2>
        <div className="arena-progress">
          {challenges.map((_, i) => (
            <span 
              key={i} 
              className={`dot ${i === current ? 'current' : ''} ${i < current ? 'done' : ''}`}
              style={{
                background: i < current 
                  ? (answers[i] === challenges[i].correctAnswer ? '#4ECDC4' : '#FF6B6B')
                  : undefined
              }}
            />
          ))}
        </div>
        <span className="arena-count">Challenge {current + 1} of {challenges.length}</span>
      </div>
      
      <div className="arena-card">
        <div className="challenge-prompt">{renderPrompt()}</div>
        
        <div className="challenge-options">
          {challenge.options.map((opt, i) => {
            const isSel = selected === opt;
            const isRight = opt === challenge.correctAnswer;
            
            return (
              <button
                key={i}
                className={`challenge-opt ${isSel ? 'selected' : ''} ${showResult && isRight ? 'correct' : ''} ${showResult && isSel && !isRight ? 'wrong' : ''}`}
                onClick={() => handleAnswer(opt)}
                disabled={showResult}
              >
                <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                <span className="opt-text">{opt}</span>
                {showResult && isRight && <span className="opt-result">✓</span>}
                {showResult && isSel && !isRight && <span className="opt-result">✗</span>}
              </button>
            );
          })}
        </div>
        
        {showResult && (
          <div className={`result-box ${isCorrect ? 'success' : 'try'}`}>
            <span className="result-icon">{isCorrect ? '🎉' : '💪'}</span>
            <div className="result-content">
              <strong>{isCorrect ? 'LEGENDARY!' : 'Almost!'}</strong>
              {!isCorrect && <p>The answer was: <span>{challenge.correctAnswer}</span></p>}
              {challenge.explanation && <p className="result-explain">{challenge.explanation}</p>}
            </div>
          </div>
        )}
      </div>
      
      {showResult && (
        <button className="btn btn-hero" onClick={handleNext}>
          <span className="btn-icon">{isLast ? '🏆' : '⚡'}</span>
          <span>{isLast ? 'See My Score!' : "Let's Go!"}</span>
        </button>
      )}
    </div>
  );
};

// Crystal Screen (Reflection - Disguised)
const CrystalScreen = ({ onComplete }) => {
  const [responses, setResponses] = useState({
    power: '',
    dragon: '',
    next: ''
  });
  
  const canGo = responses.power || responses.dragon || responses.next;
  
  return (
    <div className="screen crystal-screen">
      <div className="crystal-header">
        <span className="crystal-icon">🔮</span>
        <h2 className="screen-title">Crystal of Wisdom</h2>
        <p className="crystal-sub">{GAME_CONFIG.narrativeHooks.crystal}</p>
      </div>
      
      <StoryGuide mood="mysterious" size="small" message="Gaze into the crystal..." />
      
      <div className="crystal-card">
        <div className="crystal-q">
          <span className="q-icon">⭐</span>
          <label>What was your greatest power today?</label>
          <textarea
            placeholder="I was really good at..."
            value={responses.power}
            onChange={(e) => setResponses({ ...responses, power: e.target.value })}
          />
        </div>
        
        <div className="crystal-q">
          <span className="q-icon">🐉</span>
          <label>What dragon did you have to fight?</label>
          <textarea
            placeholder="The hardest part was..."
            value={responses.dragon}
            onChange={(e) => setResponses({ ...responses, dragon: e.target.value })}
          />
        </div>
        
        <div className="crystal-q">
          <span className="q-icon">🚀</span>
          <label>What new power will you unlock next time?</label>
          <textarea
            placeholder="Next time I'll try..."
            value={responses.next}
            onChange={(e) => setResponses({ ...responses, next: e.target.value })}
          />
        </div>
      </div>
      
      <button 
        className={`btn btn-hero glow ${canGo ? '' : 'disabled'}`}
        onClick={() => onComplete(responses)}
        disabled={!canGo}
      >
        <span className="btn-icon">✨</span>
        <span>Reveal My Destiny!</span>
      </button>
    </div>
  );
};

// Victory Screen
const VictoryScreen = ({ score, total, badges, reflection, onReplay, onNew }) => {
  const pct = Math.round((score / total) * 100);
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  
  let title, emoji, mood;
  if (pct >= 80) {
    title = "LEGENDARY HERO!";
    emoji = "👑";
    mood = "celebrating";
  } else if (pct >= 50) {
    title = "BRAVE ADVENTURER!";
    emoji = "⚔️";
    mood = "proud";
  } else {
    title = "RISING HERO!";
    emoji = "🌟";
    mood = "excited";
  }
  
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
  
  return (
    <div className="screen victory-screen">
      <ConfettiBurst active={showConfetti} />
      
      <div className="victory-content">
        <div className="victory-banner">
          <span className="victory-emoji">{emoji}</span>
          <h1 className="victory-title">{title}</h1>
        </div>
        
        <StoryGuide mood={mood} size="large" />
        
        <div className="score-area">
          <div className="score-ring">
            <span className="score-num">{score}</span>
            <span className="score-sep">/</span>
            <span className="score-total">{total}</span>
          </div>
          <div className="stars">
            {[1, 2, 3].map(i => (
              <span key={i} className={`star ${i <= stars ? 'earned' : ''}`}>⭐</span>
            ))}
          </div>
        </div>
        
        <div className="badges-earned">
          <h3>🏆 Badges Earned</h3>
          <div className="badges-row">
            {QUESTS.map(q => (
              <Badge
                key={q.id}
                icon={q.badge}
                name={q.badgeName}
                unlocked={badges.includes(q.id)}
                size="medium"
              />
            ))}
          </div>
        </div>
        
        {reflection && (reflection.power || reflection.dragon || reflection.next) && (
          <div className="wisdom-box">
            <h4>🔮 Crystal Wisdom</h4>
            {reflection.power && <p><strong>Your Power:</strong> {reflection.power}</p>}
            {reflection.dragon && <p><strong>Dragon Fought:</strong> {reflection.dragon}</p>}
            {reflection.next && <p><strong>Next Quest:</strong> {reflection.next}</p>}
          </div>
        )}
        
        <div className="victory-actions">
          <button className="btn btn-secondary" onClick={onReplay}>
            🔄 Play Again
          </button>
          <button className="btn btn-hero glow" onClick={onNew}>
            <span className="btn-icon">✨</span>
            <span>New Adventure!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Story Generator
const generateStory = async (choices) => {
  await new Promise(r => setTimeout(r, 3000));
  
  const getText = (id) => {
    const choice = choices[id];
    if (!choice) return '';
    if (typeof choice === 'string') return choice;
    const quest = QUESTS.find(q => q.id === id);
    const opt = quest?.options.find(o => o.id === choice);
    return opt?.label || '';
  };
  
  const hero = getText('hero');
  const world = getText('world');
  const trouble = getText('trouble');
  const victory = getText('victory');
  const ending = getText('ending');
  
  return {
    title: "The Epic Adventure",
    sections: [
      {
        heading: "The Beginning",
        text: `Once upon a time, ${hero.toLowerCase()} lived ${world.toLowerCase()}. Every day was full of wonder and magic.`,
        illustration: "🌟"
      },
      {
        heading: "The Danger",
        text: `But one day, something terrible happened! ${trouble} Everyone was scared!`,
        illustration: "⚡"
      },
      {
        heading: "The Battle",
        text: `But our hero was brave! ${victory} It wasn't easy, but they never gave up.`,
        illustration: "⚔️"
      },
      {
        heading: "The Victory",
        text: `Finally, the hero won! ${ending} Everyone cheered!`,
        illustration: "🎉"
      },
      {
        heading: "The End",
        text: `And so our hero's adventure came to a happy end. But new adventures were always waiting just around the corner...`,
        illustration: "🌅"
      }
    ],
    challenges: [
      {
        type: 'mcq',
        question: "Who is the hero of this story?",
        options: [hero, "A scary monster", "A grumpy wizard", "A sleepy dragon"],
        correctAnswer: hero,
        explanation: "That's right! You created this hero!"
      },
      {
        type: 'mcq',
        question: "Where does the adventure happen?",
        options: ["In a boring office", world, "Under a rock", "In a closet"],
        correctAnswer: world,
        explanation: "You built this amazing world!"
      },
      {
        type: 'sequence',
        question: "What happens FIRST in the story?",
        options: ["The hero wins", "We meet the hero", "Danger happens", "The celebration"],
        correctAnswer: "We meet the hero",
        explanation: "Stories always start by meeting the hero!"
      },
      {
        type: 'fill-blank',
        sentence: "Every day was full of wonder and _____.",
        options: ["magic", "homework", "vegetables", "rocks"],
        correctAnswer: "magic",
        explanation: "Magic makes stories exciting!"
      },
      {
        type: 'synonym',
        targetWord: "brave",
        context: "But our hero was brave!",
        options: ["scared", "courageous", "sleepy", "hungry"],
        correctAnswer: "courageous",
        explanation: "Brave and courageous both mean not being afraid!"
      }
    ]
  };
};

// ===== MAIN APP =====
export default function StoryQuestApp() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [adventure, setAdventure] = useState(ADVENTURES.EXPLORER);
  const [currentQuest, setCurrentQuest] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [choices, setChoices] = useState({});
  const [badges, setBadges] = useState([]);
  const [story, setStory] = useState(null);
  const [score, setScore] = useState({ score: 0, total: 0 });
  const [answers, setAnswers] = useState({});
  const [reflection, setReflection] = useState(null);
  
  const handleStart = () => setScreen(SCREENS.ADVENTURE_SELECT);
  
  const handleAdventure = (adv) => {
    setAdventure(adv);
    setScreen(SCREENS.QUEST_MAP);
  };
  
  const handleSelectQuest = (i) => {
    setCurrentQuest(i);
    setScreen(SCREENS.QUEST_ACTIVE);
  };
  
  const handleQuestComplete = (id, choice, index) => {
    setChoices({ ...choices, [id]: choice });
    
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
      setBadges([...badges, id]);
    }
    
    if (index < QUESTS.length - 1) {
      setCurrentQuest(index + 1);
    } else {
      setScreen(SCREENS.QUEST_MAP);
    }
  };
  
  const handleStartStory = () => setScreen(SCREENS.STORY_FORGE);
  
  const handleForgeComplete = async (paragraphs) => {
    setScreen(SCREENS.STORY_LOADING);
    
    try {
      const generated = await generateStory(choices);
      generated.sections = generated.sections.map((s, i) => ({
        ...s,
        text: paragraphs[i] || s.text
      }));
      setStory(generated);
      setScreen(SCREENS.STORY_THEATER);
    } catch (e) {
      console.error(e);
      setScreen(SCREENS.QUEST_MAP);
    }
  };
  
  const handleChallenge = () => {
    setAnswers({});
    setScreen(SCREENS.CHALLENGE_ARENA);
  };
  
  const handleChallengeComplete = (s, t, ans) => {
    setScore({ score: s, total: t });
    setAnswers(ans);
    setScreen(SCREENS.CRYSTAL);
  };
  
  const handleCrystalComplete = (r) => {
    setReflection(r);
    setScreen(SCREENS.VICTORY);
  };
  
  const handleReplay = () => setScreen(SCREENS.STORY_THEATER);
  
  const handleNew = () => {
    setStory(null);
    setChoices({});
    setCompleted([]);
    setBadges([]);
    setCurrentQuest(0);
    setAnswers({});
    setReflection(null);
    setScreen(SCREENS.ADVENTURE_SELECT);
  };
  
  const goToMap = () => setScreen(SCREENS.QUEST_MAP);
  
  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700;800&display=swap');
        
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .app {
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0f0f2f 100%);
          background-attachment: fixed;
          color: white;
          overflow-x: hidden;
        }
        
        .screen {
          min-height: 100vh;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.6s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* ===== CONFETTI ===== */
        .confetti-burst {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        
        .confetti-piece {
          position: absolute;
          top: -60px;
          animation: fall 2.5s ease-out forwards;
        }
        
        @keyframes fall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        
        /* ===== CELEBRATION POPUP ===== */
        .celebration-popup {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9998;
          pointer-events: none;
        }
        
        .celebration-inner {
          background: linear-gradient(135deg, #FFE66D, #FF6B6B);
          padding: 25px 50px;
          border-radius: 20px;
          animation: popBounce 0.4s ease;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        
        .celebration-text {
          font-family: 'Bangers', cursive;
          font-size: 42px;
          color: white;
          text-shadow: 3px 3px 0 rgba(0,0,0,0.3);
        }
        
        @keyframes popBounce {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        /* ===== GUIDE (MASCOT) ===== */
        .guide-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px 0;
        }
        
        .guide {
          position: relative;
        }
        
        .guide.animate {
          animation: guideBob 2.5s ease-in-out infinite;
        }
        
        @keyframes guideBob {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .guide-glow {
          position: absolute;
          inset: -15px;
          border-radius: 50%;
          opacity: 0.3;
          filter: blur(20px);
        }
        
        .guide-body {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #FFE66D, #FFC107);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 4px solid rgba(255,255,255,0.4);
          box-shadow: 0 15px 50px rgba(0,0,0,0.4);
        }
        
        .guide-hat {
          position: absolute;
          top: -30px;
          font-size: 40px;
          animation: hatTilt 3s ease-in-out infinite;
        }
        
        @keyframes hatTilt {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        
        .guide-face {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .guide-eyes {
          display: flex;
          gap: 18px;
          font-size: 26px;
          color: #333;
        }
        
        .guide-mouth {
          font-size: 22px;
          color: #333;
        }
        
        .guide-wand {
          position: absolute;
          bottom: 8px;
          right: -12px;
          font-size: 28px;
          animation: wandWave 1.5s ease-in-out infinite;
        }
        
        @keyframes wandWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        
        .guide-bubble {
          background: linear-gradient(135deg, #FFE66D, #FFC107);
          padding: 18px 28px;
          border-radius: 25px;
          margin-top: 20px;
          max-width: 350px;
          text-align: center;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .guide-bubble::before {
          content: '';
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          border: 14px solid transparent;
          border-bottom-color: #FFE66D;
        }
        
        .guide-bubble p {
          color: #333;
          font-weight: 700;
          font-size: 17px;
          line-height: 1.4;
        }
        
        /* ===== BADGE ===== */
        .badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        
        .badge-inner {
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 3px solid rgba(255,255,255,0.2);
          transition: all 0.3s;
        }
        
        .badge.unlocked .badge-inner {
          background: linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,165,0,0.3));
          border-color: #FFD700;
          box-shadow: 0 0 20px rgba(255,215,0,0.4);
        }
        
        .badge.locked {
          opacity: 0.5;
        }
        
        .badge-icon {
          font-size: 32px;
        }
        
        .badge-shine {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        .badge-name {
          font-size: 11px;
          font-weight: 700;
          text-align: center;
          color: rgba(255,255,255,0.8);
        }
        
        /* ===== STORY METER ===== */
        .story-meter {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255,255,255,0.1);
          padding: 12px 22px;
          border-radius: 30px;
          border: 2px solid rgba(255,255,255,0.15);
        }
        
        .meter-label {
          font-weight: 700;
          font-size: 14px;
        }
        
        .meter-track {
          width: 130px;
          height: 14px;
          background: rgba(255,255,255,0.15);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        
        .meter-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ECDC4, #44A08D);
          border-radius: 10px;
          transition: width 0.5s ease;
          position: relative;
        }
        
        .meter-spark {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          animation: pulse 1s ease infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .meter-count {
          font-weight: 800;
          color: #4ECDC4;
          font-size: 14px;
        }
        
        /* ===== BUTTONS ===== */
        .btn {
          padding: 18px 40px;
          border: none;
          border-radius: 50px;
          font-family: 'Nunito', sans-serif;
          font-size: 20px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .btn-hero {
          background: linear-gradient(135deg, #4ECDC4, #44A08D);
          color: white;
          box-shadow: 0 8px 30px rgba(78,205,196,0.5);
        }
        
        .btn-hero:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(78,205,196,0.6);
        }
        
        .btn-hero.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-hero.glow {
          animation: btnGlow 2s ease-in-out infinite;
        }
        
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 8px 30px rgba(78,205,196,0.5); }
          50% { box-shadow: 0 8px 50px rgba(78,205,196,0.8); }
        }
        
        .btn-secondary {
          background: rgba(255,255,255,0.12);
          color: white;
          border: 2px solid rgba(255,255,255,0.25);
        }
        
        .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .btn-back {
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.2);
          color: white;
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .btn-back:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .btn-tool {
          background: rgba(255,255,255,0.12);
          border: 2px solid rgba(255,255,255,0.2);
          color: white;
          padding: 12px 22px;
          border-radius: 25px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .btn-tool:hover, .btn-tool.active {
          background: rgba(78,205,196,0.3);
          border-color: #4ECDC4;
        }
        
        .btn-icon {
          font-size: 24px;
        }
        
        /* ===== SCREEN TITLE ===== */
        .screen-title {
          font-family: 'Bangers', cursive;
          font-size: 48px;
          text-shadow: 4px 4px 0 rgba(0,0,0,0.3);
          letter-spacing: 3px;
          margin-bottom: 20px;
        }
        
        /* ===== WELCOME SCREEN ===== */
        .welcome-screen {
          text-align: center;
          position: relative;
        }
        
        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .float-icon {
          position: absolute;
          font-size: 50px;
          opacity: 0.5;
          animation: floatAround 5s ease-in-out infinite;
        }
        
        .fi-0 { top: 5%; left: 5%; animation-delay: 0s; }
        .fi-1 { top: 10%; right: 8%; animation-delay: 0.6s; }
        .fi-2 { top: 50%; left: 2%; animation-delay: 1.2s; }
        .fi-3 { top: 60%; right: 5%; animation-delay: 1.8s; }
        .fi-4 { top: 30%; left: 8%; animation-delay: 2.4s; }
        .fi-5 { top: 75%; left: 15%; animation-delay: 3s; }
        .fi-6 { top: 20%; right: 2%; animation-delay: 3.6s; }
        .fi-7 { top: 85%; right: 12%; animation-delay: 4.2s; }
        
        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -25px) rotate(15deg); }
        }
        
        .welcome-content {
          position: relative;
          z-index: 1;
        }
        
        .logo-area {
          margin-bottom: 15px;
        }
        
        .logo-book {
          font-size: 90px;
          display: block;
          animation: bookFloat 3s ease-in-out infinite;
        }
        
        @keyframes bookFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        
        .game-title {
          font-family: 'Bangers', cursive;
          font-size: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          text-shadow: 5px 5px 0 rgba(0,0,0,0.3);
        }
        
        .title-highlight {
          color: #FFE66D;
        }
        
        .game-subtitle {
          font-size: 26px;
          color: rgba(255,255,255,0.8);
          margin-top: 5px;
        }
        
        .narrative-hook {
          background: rgba(255,255,255,0.08);
          padding: 20px 35px;
          border-radius: 20px;
          margin: 25px 0;
          border: 2px solid rgba(255,255,255,0.1);
        }
        
        .narrative-hook p {
          font-size: 22px;
          font-style: italic;
          color: rgba(255,255,255,0.9);
        }
        
        .badge-preview {
          margin-top: 35px;
          opacity: 0.7;
        }
        
        .badge-preview p {
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .badge-row {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        
        .mini-badge {
          font-size: 28px;
        }
        
        /* ===== ADVENTURE SELECT ===== */
        .adventure-screen {
          text-align: center;
        }
        
        .adventure-grid {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }
        
        .adventure-card {
          background: rgba(255,255,255,0.06);
          border: 3px solid rgba(255,255,255,0.12);
          border-radius: 30px;
          padding: 40px 30px;
          width: 280px;
          cursor: pointer;
          transition: all 0.4s;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .card-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .adventure-card:hover .card-glow {
          opacity: 1;
        }
        
        .apprentice .card-glow { background: radial-gradient(circle, rgba(78,205,196,0.15) 0%, transparent 70%); }
        .explorer .card-glow { background: radial-gradient(circle, rgba(255,230,109,0.15) 0%, transparent 70%); }
        .legend .card-glow { background: radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%); }
        
        .adventure-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        
        .apprentice:hover { border-color: #4ECDC4; }
        .explorer:hover { border-color: #FFE66D; }
        .legend:hover { border-color: #FF6B6B; }
        
        .card-icon {
          font-size: 70px;
          display: block;
          margin-bottom: 15px;
        }
        
        .adventure-card h3 {
          font-family: 'Bangers', cursive;
          font-size: 28px;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }
        
        .adventure-card p {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
        }
        
        .adventure-card ul {
          list-style: none;
          text-align: left;
          font-size: 14px;
        }
        
        .adventure-card li {
          padding: 6px 0;
          color: rgba(255,255,255,0.8);
        }
        
        .popular-tag {
          position: absolute;
          top: 18px;
          right: 18px;
          background: linear-gradient(135deg, #FF6B6B, #ee5253);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
        }
        
        /* ===== QUEST MAP ===== */
        .quest-map-screen {
          max-width: 950px;
          width: 100%;
        }
        
        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 15px;
        }
        
        .map-narrative {
          text-align: center;
          font-size: 18px;
          color: rgba(255,255,255,0.7);
          font-style: italic;
          margin-bottom: 30px;
        }
        
        .quest-trail {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 40px;
        }
        
        .quest-node-wrap {
          display: flex;
          align-items: center;
        }
        
        .quest-node {
          background: rgba(255,255,255,0.08);
          border: 3px solid rgba(255,255,255,0.15);
          border-radius: 25px;
          padding: 25px 20px;
          width: 140px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          position: relative;
        }
        
        .quest-node:hover:not(.locked) {
          transform: scale(1.08);
          border-color: rgba(255,255,255,0.4);
        }
        
        .quest-node.current {
          border-color: #4ECDC4;
          background: rgba(78,205,196,0.15);
          animation: currentGlow 2s ease-in-out infinite;
        }
        
        @keyframes currentGlow {
          0%, 100% { box-shadow: 0 0 25px rgba(78,205,196,0.3); }
          50% { box-shadow: 0 0 40px rgba(78,205,196,0.6); }
        }
        
        .quest-node.done {
          border-color: #44A08D;
          background: rgba(68,160,141,0.15);
        }
        
        .quest-node.locked {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        .node-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 10px;
        }
        
        .node-title {
          font-size: 13px;
          font-weight: 700;
        }
        
        .node-badge {
          position: absolute;
          top: -12px;
          right: -12px;
          font-size: 28px;
          animation: badgePop 1s ease-in-out infinite;
        }
        
        @keyframes badgePop {
          0%, 100% { transform: scale(1) rotate(-5deg); }
          50% { transform: scale(1.15) rotate(5deg); }
        }
        
        .trail-line {
          display: flex;
          gap: 6px;
          margin: 0 8px;
          opacity: 0.3;
        }
        
        .trail-line.lit {
          opacity: 1;
        }
        
        .trail-line span {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
        }
        
        .trail-line.lit span {
          background: #4ECDC4;
        }
        
        .badges-area {
          background: rgba(255,255,255,0.06);
          border-radius: 25px;
          padding: 30px;
          margin-bottom: 30px;
        }
        
        .badges-area h3 {
          font-family: 'Bangers', cursive;
          font-size: 26px;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .badges-grid {
          display: flex;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        
        .unlock-hint {
          text-align: center;
          color: rgba(255,255,255,0.6);
          font-size: 16px;
          margin-top: 20px;
        }
        
        /* ===== QUEST ACTIVE ===== */
        .quest-active-screen {
          max-width: 850px;
          width: 100%;
        }
        
        .quest-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 30px;
        }
        
        .quest-progress {
          background: rgba(255,255,255,0.1);
          padding: 10px 22px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 14px;
        }
        
        .quest-main {
          background: rgba(255,255,255,0.06);
          border-radius: 35px;
          padding: 45px;
          margin-bottom: 30px;
          border: 2px solid rgba(255,255,255,0.1);
        }
        
        .quest-header {
          text-align: center;
          margin-bottom: 25px;
        }
        
        .quest-icon-big {
          font-size: 80px;
          display: block;
        }
        
        .quest-title {
          font-family: 'Bangers', cursive;
          font-size: 40px;
          margin: 15px 0;
          letter-spacing: 2px;
        }
        
        .quest-reward {
          background: rgba(255,215,0,0.15);
          display: inline-block;
          padding: 10px 25px;
          border-radius: 25px;
          font-size: 15px;
          color: rgba(255,255,255,0.8);
        }
        
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 18px;
          margin: 30px 0;
        }
        
        .option-card {
          background: rgba(255,255,255,0.06);
          border: 3px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 22px 18px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          position: relative;
        }
        
        .option-card:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.1);
          transform: scale(1.04);
        }
        
        .option-card.selected {
          border-color: #4ECDC4;
          background: rgba(78,205,196,0.15);
        }
        
        .opt-emoji {
          font-size: 45px;
          display: block;
          margin-bottom: 12px;
        }
        
        .opt-label {
          font-weight: 700;
          font-size: 15px;
        }
        
        .opt-check {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #4ECDC4;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          animation: checkPop 0.3s ease;
        }
        
        @keyframes checkPop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        
        .custom-section {
          margin-top: 30px;
          text-align: center;
        }
        
        .custom-section p {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        .custom-section input {
          width: 100%;
          max-width: 420px;
          padding: 18px 25px;
          border-radius: 20px;
          border: 3px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: white;
          font-size: 17px;
          font-family: 'Nunito', sans-serif;
          text-align: center;
        }
        
        .custom-section input::placeholder {
          color: rgba(255,255,255,0.4);
        }
        
        .custom-section input:focus {
          outline: none;
          border-color: #4ECDC4;
        }
        
        /* ===== STORY FORGE ===== */
        .forge-screen {
          max-width: 1150px;
          width: 100%;
        }
        
        .forge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .forge-narrative {
          text-align: center;
          color: rgba(255,255,255,0.6);
          font-style: italic;
          margin-bottom: 25px;
        }
        
        .forge-content {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 30px;
          margin-bottom: 30px;
        }
        
        @media (max-width: 900px) {
          .forge-content { grid-template-columns: 1fr; }
        }
        
        .paragraphs {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        
        .paragraph-box {
          background: rgba(255,255,255,0.06);
          border-radius: 22px;
          padding: 22px;
          position: relative;
        }
        
        .para-num {
          position: absolute;
          top: -12px;
          left: 22px;
          background: linear-gradient(135deg, #4ECDC4, #44A08D);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 15px;
        }
        
        .paragraph-box textarea {
          width: 100%;
          min-height: 110px;
          padding: 18px;
          border-radius: 15px;
          border: 3px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.25);
          color: white;
          font-size: 17px;
          font-family: 'Nunito', sans-serif;
          line-height: 1.7;
          resize: vertical;
        }
        
        .paragraph-box textarea:focus {
          outline: none;
          border-color: #4ECDC4;
        }
        
        .powerup-box {
          background: linear-gradient(135deg, rgba(78,205,196,0.2), rgba(68,160,141,0.2));
          border: 3px solid #4ECDC4;
          border-radius: 18px;
          padding: 18px;
          margin-top: 18px;
          animation: powerupSlide 0.3s ease;
        }
        
        @keyframes powerupSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .powerup-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          margin-bottom: 14px;
        }
        
        .powerup-header span:first-child {
          font-size: 24px;
          animation: zap 0.5s ease infinite;
        }
        
        @keyframes zap {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        
        .powerup-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .powerup-options button {
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 25px;
          padding: 10px 20px;
          color: white;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
        }
        
        .powerup-options button:hover {
          background: #4ECDC4;
          transform: scale(1.08);
        }
        
        .forge-sidebar {
          background: rgba(255,255,255,0.06);
          border-radius: 22px;
          padding: 25px;
          height: fit-content;
          position: sticky;
          top: 20px;
        }
        
        .forge-sidebar h3 {
          font-family: 'Bangers', cursive;
          font-size: 24px;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .summary-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .summary-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: rgba(255,255,255,0.06);
          border-radius: 14px;
          font-size: 14px;
        }
        
        .summary-item span:first-child {
          font-size: 24px;
        }
        
        .summary-item span:last-child {
          margin-left: auto;
          color: #4ECDC4;
        }
        
        /* ===== LOADING ===== */
        .loading-screen {
          text-align: center;
        }
        
        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .magic-circle {
          position: relative;
          width: 140px;
          height: 140px;
          margin-bottom: 35px;
        }
        
        .circle-ring {
          position: absolute;
          inset: 0;
          border: 5px solid rgba(255,255,255,0.1);
          border-top-color: #4ECDC4;
          border-radius: 50%;
          animation: spin 1.2s linear infinite;
        }
        
        .circle-ring.ring2 {
          inset: 15px;
          border-top-color: #FFE66D;
          animation-direction: reverse;
          animation-duration: 1.5s;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .circle-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 55px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loading-msg {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 30px;
          animation: fadeInOut 2s ease-in-out infinite;
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .loading-bar {
          width: 280px;
          height: 12px;
          background: rgba(255,255,255,0.15);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        
        .loading-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ECDC4, #44A08D);
          border-radius: 10px;
          animation: loadBar 3s ease-in-out infinite;
        }
        
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .loading-sub {
          color: rgba(255,255,255,0.5);
          font-size: 15px;
          font-style: italic;
        }
        
        /* ===== STORY THEATER ===== */
        .theater-screen {
          max-width: 900px;
          width: 100%;
        }
        
        .story-reveal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: revealFade 2s ease forwards;
        }
        
        @keyframes revealFade {
          0%, 70% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        
        .reveal-icon {
          font-size: 100px;
          animation: revealPulse 0.8s ease infinite;
        }
        
        @keyframes revealPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .story-reveal h2 {
          font-family: 'Bangers', cursive;
          font-size: 48px;
          margin-top: 20px;
          animation: revealSlide 0.5s ease;
        }
        
        @keyframes revealSlide {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .theater-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        
        .story-title {
          font-family: 'Bangers', cursive;
          font-size: 48px;
          letter-spacing: 3px;
        }
        
        .theater-progress {
          display: flex;
          justify-content: center;
          gap: 18px;
          margin-bottom: 30px;
        }
        
        .gem {
          font-size: 28px;
          transition: all 0.3s;
        }
        
        .gem.active {
          transform: scale(1.4);
        }
        
        .theater-stage {
          background: rgba(255,255,255,0.06);
          border-radius: 30px;
          padding: 45px;
          margin-bottom: 30px;
          border: 2px solid rgba(255,255,255,0.1);
          text-align: center;
        }
        
        .part-label {
          font-size: 14px;
          color: #4ECDC4;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 4px;
        }
        
        .part-title {
          font-family: 'Bangers', cursive;
          font-size: 38px;
          margin: 15px 0 25px;
          letter-spacing: 2px;
        }
        
        .part-text {
          font-size: 22px;
          line-height: 1.8;
          color: rgba(255,255,255,0.9);
        }
        
        .part-illustration {
          font-size: 70px;
          display: block;
          margin-top: 30px;
        }
        
        .theater-nav {
          display: flex;
          justify-content: space-between;
        }
        
        /* ===== CHALLENGE ARENA ===== */
        .arena-screen {
          max-width: 800px;
          width: 100%;
          text-align: center;
        }
        
        .arena-header {
          margin-bottom: 30px;
        }
        
        .arena-progress {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 15px 0;
        }
        
        .dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          transition: all 0.3s;
        }
        
        .dot.current {
          background: #4ECDC4;
          transform: scale(1.4);
          box-shadow: 0 0 20px rgba(78,205,196,0.6);
        }
        
        .arena-count {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
        }
        
        .arena-card {
          background: rgba(255,255,255,0.06);
          border-radius: 30px;
          padding: 40px;
          margin-bottom: 30px;
          border: 2px solid rgba(255,255,255,0.1);
        }
        
        .challenge-prompt {
          margin-bottom: 30px;
        }
        
        .challenge-text {
          font-size: 22px;
          margin-bottom: 18px;
        }
        
        .hl-same {
          color: #4ECDC4;
          font-weight: 800;
        }
        
        .hl-opp {
          color: #FF6B6B;
          font-weight: 800;
        }
        
        .target-word {
          font-family: 'Bangers', cursive;
          font-size: 48px;
          background: rgba(78,205,196,0.15);
          padding: 18px 40px;
          border-radius: 20px;
          display: inline-block;
          letter-spacing: 3px;
        }
        
        .target-word.opposite {
          background: rgba(255,107,107,0.15);
        }
        
        .fill-sentence {
          font-size: 22px;
          line-height: 1.9;
          background: rgba(255,255,255,0.06);
          padding: 25px;
          border-radius: 18px;
        }
        
        .blank {
          display: inline-block;
          min-width: 110px;
          border-bottom: 4px solid #4ECDC4;
          margin: 0 6px;
          padding: 3px 12px;
          transition: all 0.3s;
        }
        
        .blank.filled {
          background: rgba(78,205,196,0.15);
          border-radius: 8px;
          color: #4ECDC4;
          font-weight: 800;
        }
        
        .challenge-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .challenge-opt {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 20px 28px;
          background: rgba(255,255,255,0.06);
          border: 3px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
        }
        
        .challenge-opt:hover:not(:disabled) {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.1);
        }
        
        .challenge-opt.selected {
          border-color: #4ECDC4;
          background: rgba(78,205,196,0.12);
        }
        
        .challenge-opt.correct {
          border-color: #4ECDC4;
          background: rgba(78,205,196,0.2);
        }
        
        .challenge-opt.wrong {
          border-color: #FF6B6B;
          background: rgba(255,107,107,0.2);
        }
        
        .opt-letter {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
        }
        
        .opt-text {
          flex: 1;
          font-size: 18px;
        }
        
        .opt-result {
          font-size: 26px;
          font-weight: 800;
        }
        
        .result-box {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 25px;
          border-radius: 20px;
          margin-top: 25px;
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .result-box.success {
          background: rgba(78,205,196,0.15);
          border: 3px solid #4ECDC4;
        }
        
        .result-box.try {
          background: rgba(255,230,109,0.15);
          border: 3px solid #FFE66D;
        }
        
        .result-icon {
          font-size: 50px;
        }
        
        .result-content {
          text-align: left;
        }
        
        .result-content strong {
          font-family: 'Bangers', cursive;
          font-size: 28px;
          letter-spacing: 1px;
        }
        
        .result-content span {
          color: #4ECDC4;
          font-weight: 700;
        }
        
        .result-explain {
          color: rgba(255,255,255,0.7);
          font-size: 15px;
          margin-top: 8px;
        }
        
        /* ===== CRYSTAL ===== */
        .crystal-screen {
          max-width: 750px;
          width: 100%;
          text-align: center;
        }
        
        .crystal-header {
          margin-bottom: 25px;
        }
        
        .crystal-icon {
          font-size: 90px;
          display: block;
          animation: crystalGlow 2s ease-in-out infinite;
        }
        
        @keyframes crystalGlow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 15px rgba(155,89,182,0.5)); }
          50% { filter: brightness(1.4) drop-shadow(0 0 35px rgba(155,89,182,0.8)); }
        }
        
        .crystal-sub {
          color: rgba(255,255,255,0.6);
          font-size: 17px;
          font-style: italic;
          margin-top: 10px;
        }
        
        .crystal-card {
          background: rgba(255,255,255,0.06);
          border-radius: 30px;
          padding: 35px;
          margin: 30px 0;
          border: 2px solid rgba(255,255,255,0.1);
        }
        
        .crystal-q {
          margin-bottom: 28px;
          text-align: left;
        }
        
        .crystal-q:last-child {
          margin-bottom: 0;
        }
        
        .q-icon {
          font-size: 35px;
          display: block;
          margin-bottom: 12px;
        }
        
        .crystal-q label {
          display: block;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 14px;
        }
        
        .crystal-q textarea {
          width: 100%;
          min-height: 80px;
          padding: 18px;
          border-radius: 15px;
          border: 3px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.2);
          color: white;
          font-size: 16px;
          font-family: 'Nunito', sans-serif;
          resize: vertical;
        }
        
        .crystal-q textarea:focus {
          outline: none;
          border-color: #9B59B6;
        }
        
        .crystal-q textarea::placeholder {
          color: rgba(255,255,255,0.4);
        }
        
        /* ===== VICTORY ===== */
        .victory-screen {
          text-align: center;
        }
        
        .victory-content {
          max-width: 600px;
          width: 100%;
        }
        
        .victory-banner {
          margin-bottom: 20px;
        }
        
        .victory-emoji {
          font-size: 100px;
          display: block;
          animation: victoryBounce 1s ease infinite;
        }
        
        @keyframes victoryBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .victory-title {
          font-family: 'Bangers', cursive;
          font-size: 56px;
          letter-spacing: 4px;
          text-shadow: 5px 5px 0 rgba(0,0,0,0.3);
        }
        
        .score-area {
          margin: 35px 0;
        }
        
        .score-ring {
          display: inline-flex;
          align-items: baseline;
          background: white;
          padding: 25px 55px;
          border-radius: 100px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.4);
          margin-bottom: 18px;
        }
        
        .score-num {
          font-family: 'Bangers', cursive;
          font-size: 75px;
          color: #4ECDC4;
        }
        
        .score-sep {
          font-size: 50px;
          color: #999;
          margin: 0 12px;
        }
        
        .score-total {
          font-family: 'Bangers', cursive;
          font-size: 50px;
          color: #999;
        }
        
        .stars {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        
        .star {
          font-size: 50px;
          opacity: 0.25;
          transition: all 0.5s;
        }
        
        .star.earned {
          opacity: 1;
          animation: starEarn 0.5s ease backwards;
        }
        
        .star.earned:nth-child(1) { animation-delay: 0.2s; }
        .star.earned:nth-child(2) { animation-delay: 0.4s; }
        .star.earned:nth-child(3) { animation-delay: 0.6s; }
        
        @keyframes starEarn {
          0% { transform: scale(0) rotate(-180deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .badges-earned {
          background: rgba(255,255,255,0.06);
          border-radius: 25px;
          padding: 30px;
          margin-bottom: 30px;
        }
        
        .badges-earned h3 {
          font-family: 'Bangers', cursive;
          font-size: 28px;
          margin-bottom: 20px;
        }
        
        .badges-row {
          display: flex;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        
        .wisdom-box {
          background: rgba(155,89,182,0.15);
          border: 3px solid rgba(155,89,182,0.4);
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .wisdom-box h4 {
          color: #9B59B6;
          text-align: center;
          margin-bottom: 18px;
          font-size: 20px;
        }
        
        .wisdom-box p {
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 10px;
        }
        
        .victory-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 700px) {
          .game-title {
            font-size: 52px;
            flex-wrap: wrap;
          }
          
          .screen-title {
            font-size: 36px;
          }
          
          .adventure-grid {
            flex-direction: column;
            align-items: center;
          }
          
          .adventure-card {
            width: 100%;
            max-width: 340px;
          }
          
          .options-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .quest-node {
            width: 110px;
            padding: 18px 12px;
          }
          
          .node-icon {
            font-size: 32px;
          }
          
          .trail-line {
            display: none;
          }
          
          .quest-trail {
            gap: 10px;
          }
          
          .btn {
            padding: 16px 32px;
            font-size: 18px;
          }
          
          .victory-title {
            font-size: 40px;
          }
          
          .score-num {
            font-size: 55px;
          }
          
          .forge-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      {screen === SCREENS.WELCOME && <WelcomeScreen onStart={handleStart} />}
      {screen === SCREENS.ADVENTURE_SELECT && <AdventureSelectScreen onSelect={handleAdventure} />}
      {screen === SCREENS.QUEST_MAP && (
        <QuestMapScreen
          completed={completed}
          current={currentQuest}
          badges={badges}
          onSelectQuest={handleSelectQuest}
          onStartStory={handleStartStory}
        />
      )}
      {screen === SCREENS.QUEST_ACTIVE && (
        <QuestActiveScreen
          quest={QUESTS[currentQuest]}
          questIndex={currentQuest}
          adventure={adventure}
          selection={choices[QUESTS[currentQuest]?.id]}
          onComplete={handleQuestComplete}
          onBack={goToMap}
        />
      )}
      {screen === SCREENS.STORY_FORGE && (
        <StoryForgeScreen
          choices={choices}
          adventure={adventure}
          onComplete={handleForgeComplete}
          onBack={goToMap}
        />
      )}
      {screen === SCREENS.STORY_LOADING && <StoryLoadingScreen />}
      {screen === SCREENS.STORY_THEATER && (
        <StoryTheaterScreen
          story={story}
          onChallenge={handleChallenge}
          onBack={goToMap}
        />
      )}
      {screen === SCREENS.CHALLENGE_ARENA && (
        <ChallengeArenaScreen
          challenges={story?.challenges || []}
          onComplete={handleChallengeComplete}
        />
      )}
      {screen === SCREENS.CRYSTAL && <CrystalScreen onComplete={handleCrystalComplete} />}
      {screen === SCREENS.VICTORY && (
        <VictoryScreen
          score={score.score}
          total={score.total}
          badges={badges}
          reflection={reflection}
          onReplay={handleReplay}
          onNew={handleNew}
        />
      )}
    </div>
  );
}
