import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SearchPage from './SearchPage';
import { ThemeProvider, useTheme } from './ThemeContext';
import IgFonts from './components/IgFonts';
import ResultsPage from './components/ResultsPage';
import IgBioSearchPage from './components/IgBioSearchPage';
import ContactPage from './components/ContactPage';
import InstallPrompt from './components/InstallPrompt';

// Bio data - This is now used as fallback data for the home page
// The main bio data comes from JSON files in SearchPage.jsx
const biosData = {
  categories: [
    {
      name: "Love",
      bios: [
        "💖ֆɨʍքʟɛ ֆɨ ʟօвременно զʊɛɛռ👑",
        "You + Me = Endless Love ♾️",
        "💕 Living my dream with you",
        "🔐 Locked in love",
        "❤️ Love is life 🖤",
        "😘 My queen: @username",
        "Two hearts, one love story 💑",
        "🌍 My world has just 3 letters: You",
        "🥰 You complete me 🧩",
        "💓 Love vibes only"
      ]
    },
    {
      name: "Attitude",
      bios: [
        "😎 Attitude level: WiFi — always connected",
        "👑 King by birth, lion by mindset",
        "🚫 Zero emotions, 100% focus",
        "✌️ Calm look, deadly thoughts",
        "I don't chase people — I chase dreams 🔥",
        "Too glam to give a damn ✨",
        "Self-made and unstoppable 💪",
        "No crown needed — my vibe says it all 👑",
        "Classy, sassy, & a bit smart-assy 💋",
        "Born original, never meant to fit in 🌟"
      ]
    },
    {
      name: "Funny",
      bios: [
        "Error 404: Bio unavailable 😂",
        "Professional napper 💤",
        "Fries over guys 🍟",
        "Fluent in sarcasm and movie quotes 🎬",
        "Microwave chef extraordinaire 🍲",
        "I'm on a seafood diet. I see food & I eat it 🐟",
        "I need two six-month vacations this year 🏖️",
        "My life's a joke; I'm the punchline 🤡",
        "Operator of the sarcasm machine 🛠️",
        "Catch flights, not feelings ✈️"
      ]
    },
    {
      name: "Travel",
      bios: [
        "✈️ Globe-trotter at heart",
        "Chasing sunsets & passport stamps 🌅",
        "Adventure seeker on a quest 🗺️",
        "🏝️ Beach vibes & high tides",
        "Road tripping to unknown destinations 🚗",
        "Lost & loving it 🌐",
        "Scaling mountains to surfing tides 🏔️🌊",
        "📸 Capturing moments one destination at a time",
        "Minimalist wayfarer 🎒",
        "Sunset collector 🌄"
      ]
    },
    {
      name: "Fitness",
      bios: [
        "🏋️‍♂️ Strong body, stronger mind",
        "Sweat is my superpower 💦",
        "Progress, not perfection 📈",
        "Train like a beast, look like a beauty 🦁",
        "Gym is my therapy session 🔥",
        "Unlock your potential with every rep 🔑",
        "No excuses, just results 💪",
        "Stronger every day 🚀",
        "Chasing gains & good vibes ✨",
        "Turning sweat into strength 🌟"
      ]
    },
    {
      name: "Motivational",
      bios: [
        "Dream big, work harder ✨",
        "Believe in yourself; you're halfway there 🌱",
        "Turning obstacles into opportunities 🔄",
        "Rising above challenges, one day at a time ⬆️",
        "Progress over perfection 🛤️",
        "Be the energy you want to attract ⚡",
        "Success starts with self-belief 💫",
        "Creating a life I love 🏡",
        "Mindset is everything 🧠",
        "Hustle + heart = success ❤️‍🔥"
      ]
    },
    {
      name: "Friendship",
      bios: [
        "Partners in crime since '99 👯",
        "Friends are the family we choose 🌟",
        "Adventure buddies forever ✈️",
        "Pizza lovers unite 🍕",
        "Sharing laughs & inside jokes 😂",
        "Trust, loyalty, love — that's us 💖",
        "Selfie queens 👑",
        "Making memories one hangout at a time 📸",
        "Side by side or miles apart, friends at heart ❤️",
        "Squad goals unlocked 🔓"
      ]
    },
    {
      name: "Business",
      bios: [
        "Building empires, not excuses 🏗️",
        "CEO of my own life 💼",
        "Turning ideas into income 💡💰",
        "Helping brands grow 🌱",
        "Results speak louder than words 📈",
        "Your trusted digital partner 🤝",
        "Making money moves daily 💵",
        "Quality over quantity, always ✔️",
        "Creating value, delivering excellence ⭐",
        "Let's collaborate — DM me 📩"
      ]
    },
    {
      name: "Aesthetic",
      bios: [
        "Chasing sunsets and making memories 🌅",
        "Quiet soul, loud thoughts 🌙",
        "Dreaming with my eyes open ✨",
        "Chaos, but make it cute 🌸",
        "Here for the vibes 🌈",
        "Stay soft, it confuses them 🌷",
        "Universe in my veins, stardust in my soul ✨",
        "Life in pastel tones 🎨",
        "Offline is the new luxury 📴",
        "Golden hour in a person 🌞"
      ]
    },
    {
      name: "Quotes",
      bios: [
        '"Be yourself; everyone else is already taken." – Oscar Wilde',
        '"Do what you love, love what you do."',
        '"The best way out is always through."',
        '"Not all those who wander are lost." – Tolkien',
        '"Happiness depends upon ourselves." – Aristotle',
        '"Create your own sunshine."',
        '"Dream big and dare to fail." – Norman Vaughan',
        '"What you think, you become." – Buddha',
        '"Life is a daring adventure or nothing at all." – Helen Keller',
        '"Believe you can and you\'re halfway there." – Roosevelt'
      ]
    }
  ]
};

// Universal Header Component
const Header = ({ showNavigation = true }) => {
  const location = window.location.pathname;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo with site name */}
        <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img 
            src={location === '/instagram-bio' || location.startsWith('/search') ? "/instagram-bio-logo.png" : "/ig-fonts-logo.png"} 
            alt="Logo" 
            className="logo-image"
          />
          <span className="site-name">
            {location === '/instagram-bio' || location.startsWith('/search') ? "Instagram Bio Search" : "IG Fonts"}
          </span>
        </div>
        
        {/* Hamburger menu for mobile */}
        <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        {/* Simple navigation menu for desktop */}
        {showNavigation && (
          <nav className="navigation" aria-label="Main navigation">
            <ul className="nav-list">
              <li className="nav-item">
                <button 
                  className={`nav-link ${location === '/' ? 'active' : ''}`}
                  onClick={() => navigate('/')}
                >
                  IG Fonts
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${location === '/instagram-bio' ? 'active' : ''}`}
                  onClick={() => navigate('/instagram-bio')}
                >
                  Instagram Bio
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${location === '/contact' ? 'active' : ''}`}
                  onClick={() => navigate('/contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        )}
        
        {/* Mobile menu */}
        {showNavigation && isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <button 
                  className={`mobile-nav-link ${location === '/' ? 'active' : ''}`}
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  IG Fonts
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className={`mobile-nav-link ${location === '/instagram-bio' ? 'active' : ''}`}
                  onClick={() => {
                    navigate('/instagram-bio');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Instagram Bio
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className={`mobile-nav-link ${location === '/contact' ? 'active' : ''}`}
                  onClick={() => {
                    navigate('/contact');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

// Popular Searches Component
const PopularSearches = ({ onKeywordClick }) => {
  const navigate = useNavigate(); // Add navigate hook
  const capitalizeWords = (text) => {
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Filter to only include the specified popular searches
  const filteredKeywords = [
    "instagram bio for girls",
    "instagram bio for boys", 
    "best bio for instagram",
    "cool bio for instagram",
    "attitude instagram bio",
    "instagram vip bio",
    "aesthetic bio for instagram",
    "instagram bio for boys stylish font",
    "instagram bio in marathi",
    "2 line instagram bio for boy",
    "love bio for instagram",
    "swag bio for instagram",
    "stylish bio for instagram",
    "vip bio for girls"
  ];

  const handleKeywordClick = (keyword) => {
    const formattedKeyword = keyword.replace(/\s+/g, '-').toLowerCase();
    const searchUrl = `/search/${formattedKeyword}`;
    navigate(searchUrl); // Use navigate instead of window.open
  };

  return (
    <div className="popular-searches">
      <h3 className="popular-searches-title">Popular Searches</h3>
      <div className="popular-searches-grid">
        {filteredKeywords.map((keyword, index) => (
          <button
            key={index}
            className="popular-search-tag"
            onClick={() => handleKeywordClick(keyword)}
          >
            {capitalizeWords(keyword)}
          </button>
        ))}
      </div>
    </div>
  );
};

// Bio Card Component
const BioCard = ({ bio, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bio);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = bio;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        onCopy();
        setTimeout(() => setCopied(false), 1500);
      } catch (fallbackErr) {
        console.error('Copy failed', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bio-card">
      <div className="bio-text">
        {bio.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < bio.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      <button className="copy-btn" onClick={handleCopy} aria-label={`Copy bio: ${bio}`}>
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-bottom">
          <p className="footer-text">© 2024 IG Fonts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Toast Component
const Toast = ({ show }) => {
  return (
    <div className={`toast ${show ? 'show' : 'hidden'}`}>
      <span className="toast-text">Copied to clipboard!</span>
    </div>
  );
};

// Home Page Component (now IG Fonts page)
const HomePage = () => {
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [flippedCards, setFlippedCards] = useState({}); // Add state for flip cards
  const navigate = useNavigate();

  // Function to toggle flip state
  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const formattedKeyword = searchTerm.trim().replace(/\s+/g, '-').toLowerCase();
      const searchUrl = `/search/${formattedKeyword}`;
      window.open(searchUrl, '_blank');
    }
  };

  const handleCopy = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  const handleGenerate = () => {
    if (inputText.trim()) {
      // Navigate to the results page with the input text as state
      navigate('/results', { state: { inputText } });
    }
  };

  return (
    <div className="app">
      <Header />
      
      <div className="hero-section">
        {/* IG Fonts Generator Widget */}
        <div className="ig-fonts-generator-widget">
          <div className="ig-fonts-header">
            <h2>IG Fonts Generator</h2>
            <p>Enter your text below (up to 220 characters) to generate 100+ different font styles for your Instagram bio</p>
          </div>
          
          <div className="ig-fonts-input-section">
            <textarea
              className="ig-fonts-textarea"
              placeholder="Enter your text here (up to 220 characters)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, 220))}
              maxLength={220}
            />
            <div className="ig-fonts-input-info">
              <span>{inputText.length}/220 characters</span>
            </div>
            <button 
              className="ig-fonts-generate-btn"
              onClick={handleGenerate}
              disabled={!inputText.trim()}
            >
              Generate Fonts
            </button>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="ig-fonts-seo-section">
        <div className="ig-fonts-seo-widget">
          {/* Sample IG Fonts and IG Bio for your Profile */}
          <article className="ig-fonts-article">
            <h2>Transform Your Instagram Presence with Unique Fonts</h2>
            
            <p>In today's digital landscape, standing out on social media is more important than ever. Your Instagram bio is often the first impression people have of you or your brand, making it crucial to make it memorable and unique. Our Instagram font generator tool helps you create eye-catching text that will make your profile stand out from the crowd.</p>
            
            <h3>Why Use Instagram Fonts and Font Generators?</h3>
            
            <p>Instagram fonts and font generators have become essential tools for anyone looking to enhance their social media presence. Here's why:</p>
            
            <ul>
              <li><strong>Unique Personal Branding:</strong> Custom fonts help you express your personality and create a distinctive brand identity</li>
              <li><strong>Increased Engagement:</strong> Eye-catching text draws more attention to your profile and posts</li>
              <li><strong>Professional Appearance:</strong> Well-designed fonts give your profile a polished, professional look</li>
              <li><strong>Better Readability:</strong> Creative fonts can make your bio more engaging and easier to read</li>
              <li><strong>Stand Out:</strong> Unique text styles help you differentiate yourself from millions of other Instagram users</li>
            </ul>
            
            <h3>How Instagram Font Changing Works</h3>
            
            <p>Instagram font changing is simpler than you might think. Our font copy paste tool generates special Unicode characters that Instagram recognizes and displays correctly. These characters look like fancy versions of regular letters but are actually different Unicode symbols that create the visual effect of different fonts.</p>
            
            <h4>Benefits of Using Font Copy Paste Tools</h4>
            
            <div className="features-grid">
              <div className="feature-card">
                <h4>Instant Results</h4>
                <p>Generate hundreds of font variations in seconds with our fancy text generator</p>
              </div>
              <div className="feature-card">
                <h4>No Installation Required</h4>
                <p>Use our Instagram text generator directly in your browser - no downloads needed</p>
              </div>
              <div className="feature-card">
                <h4>Completely Free</h4>
                <p>Access all our font styles without any cost or hidden fees</p>
              </div>
              <div className="feature-card">
                <h4>Easy to Use</h4>
                <p>Simply copy and paste - no technical skills required</p>
              </div>
            </div>
            
            {/* Instagram Bio Examples for Boys and Girls */}
            <h3>Instagram Bio Examples for Boys and Girls</h3>
            
            <p>Here are some examples of stylish Instagram bios for boys and girls to inspire your own profile. You can find more <a href="/instagram-bio">Instagram bio ideas</a> in our dedicated collection.</p>
            
            {/* Flip Cards for Instagram Bio for Girls */}
            <div className="bio-examples-grid">
              <div 
                className={`flip-card ${flippedCards['girls-0'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('girls-0')}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="bio-text">
                      💖ֆɨʍքʟɛ ֆɨ ʟօ frequently զʊɛɛռ👑
                      💕 Living my dream with you
                      🔐 Locked in love
                      ❤️ Love is life 🖤
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip('girls-0');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
                        <span>Preview</span>
                      </button>
                      <button 
                        className="copy-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText("💖ֆɨʍքʟɛ ֆɨ ʟօ frequently զʊɛɛռ👑\n💕 Living my dream with you\n🔐 Locked in love\n❤️ Love is life 🖤");
                          handleCopy();
                        }}
                      >
                        Copy Bio
                      </button>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="instagram-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className="preview-pic"
                              style={{
                                backgroundImage: `url(/Monika.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="preview-info">
                          <div className="preview-username">@yourusername</div>
                          <div className="preview-stats">
                            <div className="preview-stat">
                              <strong>365</strong>
                              <span>Posts</span>
                            </div>
                            <div className="preview-stat">
                              <strong>201k</strong>
                              <span>Followers</span>
                            </div>
                            <div className="preview-stat">
                              <strong>150</strong>
                              <span>Following</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="preview-edit-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit Profile
                        </button>
                      </div>
                      <div className="preview-bio">
                        💖ֆɨʍքʟɛ ֆɨ ʟօ frequently զʊɛɛռ👑
                        💕 Living my dream with you
                        🔐 Locked in love
                        ❤️ Love is life 🖤
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText("💖ֆɨʍքʟɛ ֆɨ ʟօ frequently զʊɛɛռ👑\n💕 Living my dream with you\n🔐 Locked in love\n❤️ Love is life 🖤");
                        handleCopy();
                      }}
                    >
                      Copy Bio
                    </button>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flip-card ${flippedCards['girls-1'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('girls-1')}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="bio-text">
                      🌟 Sparking up every room I'm in
                      💅 Made of sugar, sass & a little magic
                      🥰 Unapologetically me
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip('girls-1');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
                        <span>Preview</span>
                      </button>
                      <button 
                        className="copy-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText("🌟 Sparking up every room I'm in\n💅 Made of sugar, sass & a little magic\n🥰 Unapologetically me");
                          handleCopy();
                        }}
                      >
                        Copy Bio
                      </button>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="instagram-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className="preview-pic"
                              style={{
                                backgroundImage: `url(/Monika.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="preview-info">
                          <div className="preview-username">@yourusername</div>
                          <div className="preview-stats">
                            <div className="preview-stat">
                              <strong>365</strong>
                              <span>Posts</span>
                            </div>
                            <div className="preview-stat">
                              <strong>201k</strong>
                              <span>Followers</span>
                            </div>
                            <div className="preview-stat">
                              <strong>150</strong>
                              <span>Following</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="preview-edit-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit Profile
                        </button>
                      </div>
                      <div className="preview-bio">
                        🌟 Sparking up every room I'm in
                        💅 Made of sugar, sass & a little magic
                        🥰 Unapologetically me
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText("🌟 Sparking up every room I'm in\n💅 Made of sugar, sass & a little magic\n🥰 Unapologetically me");
                        handleCopy();
                      }}
                    >
                      Copy Bio
                    </button>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flip-card ${flippedCards['girls-2'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('girls-2')}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="bio-text">
                      👑 Princess with goals
                      💪 Strong is my pretty
                      🧁 More sprinkles, less drama
                      ❤️ Simple girl, complicated mind
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip('girls-2');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
                        <span>Preview</span>
                      </button>
                      <button 
                        className="copy-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText("👑 Princess with goals\n💪 Strong is my pretty\n🧁 More sprinkles, less drama\n❤️ Simple girl, complicated mind");
                          handleCopy();
                        }}
                      >
                        Copy Bio
                      </button>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="instagram-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className="preview-pic"
                              style={{
                                backgroundImage: `url(/Monika.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="preview-info">
                          <div className="preview-username">@yourusername</div>
                          <div className="preview-stats">
                            <div className="preview-stat">
                              <strong>365</strong>
                              <span>Posts</span>
                            </div>
                            <div className="preview-stat">
                              <strong>201k</strong>
                              <span>Followers</span>
                            </div>
                            <div className="preview-stat">
                              <strong>150</strong>
                              <span>Following</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="preview-edit-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit Profile
                        </button>
                      </div>
                      <div className="preview-bio">
                        👑 Princess with goals
                        💪 Strong is my pretty
                        🧁 More sprinkles, less drama
                        ❤️ Simple girl, complicated mind
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText("👑 Princess with goals\n💪 Strong is my pretty\n🧁 More sprinkles, less drama\n❤️ Simple girl, complicated mind");
                        handleCopy();
                      }}
                    >
                      Copy Bio
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Flip Cards for Instagram Bio for Boys */}
            <div className="bio-examples-grid">
              <div 
                className={`flip-card ${flippedCards['boys-0'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('boys-0')}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="bio-text">
                      👑 Rajput blood, royal vibe
                      💪 Gym se pyaar, dosti se izzat
                      🎂 Cake cutting: 9th October
                      📸 Profile loaded with attitude
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip('boys-0');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
                        <span>Preview</span>
                      </button>
                      <button 
                        className="copy-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText("👑 Rajput blood, royal vibe\n💪 Gym se pyaar, dosti se izzat\n🎂 Cake cutting: 9th October\n📸 Profile loaded with attitude");
                          handleCopy();
                        }}
                      >
                        Copy Bio
                      </button>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="instagram-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className="preview-pic"
                              style={{
                                backgroundImage: `url(/Rahul.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="preview-info">
                          <div className="preview-username">@yourusername</div>
                          <div className="preview-stats">
                            <div className="preview-stat">
                              <strong>365</strong>
                              <span>Posts</span>
                            </div>
                            <div className="preview-stat">
                              <strong>201k</strong>
                              <span>Followers</span>
                            </div>
                            <div className="preview-stat">
                              <strong>150</strong>
                              <span>Following</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="preview-edit-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit Profile
                        </button>
                      </div>
                      <div className="preview-bio">
                        👑 Rajput blood, royal vibe
                        💪 Gym se pyaar, dosti se izzat
                        🎂 Cake cutting: 9th October
                        📸 Profile loaded with attitude
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText("👑 Rajput blood, royal vibe\n💪 Gym se pyaar, dosti se izzat\n🎂 Cake cutting: 9th October\n📸 Profile loaded with attitude");
                        handleCopy();
                      }}
                    >
                      Copy Bio
                    </button>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flip-card ${flippedCards['boys-1'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('boys-1')}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="bio-text">
                      🎧 Bass louder than haters
                      💪 Gym {'>'} GFs
                      🕉️ Mahadev bhakt | 📍 Punjab
                      🔥 Trending Instagram bio for boys
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip('boys-1');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
                        <span>Preview</span>
                      </button>
                      <button 
                        className="copy-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText("🎧 Bass louder than haters\n💪 Gym {'>'} GFs\n🕉️ Mahadev bhakt | 📍 Punjab\n🔥 Trending Instagram bio for boys");
                          handleCopy();
                        }}
                      >
                        Copy Bio
                      </button>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="instagram-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className="preview-pic"
                              style={{
                                backgroundImage: `url(/Rahul.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="preview-info">
                          <div className="preview-username">@yourusername</div>
                          <div className="preview-stats">
                            <div className="preview-stat">
                              <strong>365</strong>
                              <span>Posts</span>
                            </div>
                            <div className="preview-stat">
                              <strong>201k</strong>
                              <span>Followers</span>
                            </div>
                            <div className="preview-stat">
                              <strong>150</strong>
                              <span>Following</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="preview-edit-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit Profile
                        </button>
                      </div>
                      <div className="preview-bio">
                        🎧 Bass louder than haters
                        💪 Gym {'>'} GFs
                        🕉️ Mahadev bhakt | 📍 Punjab
                        🔥 Trending Instagram bio for boys
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText("🎧 Bass louder than haters\n💪 Gym {'>'} GFs\n🕉️ Mahadev bhakt | 📍 Punjab\n🔥 Trending Instagram bio for boys");
                        handleCopy();
                      }}
                    >
                      Copy Bio
                    </button>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flip-card ${flippedCards['boys-2'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('boys-2')}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="bio-text">
                      💼 Work hard, flex harder
                      🎧 Music addict | Gym ke deewane
                      😎 Swag with purpose
                      🖤 Just a boy living his vibe
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip('boys-2');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
                        <span>Preview</span>
                      </button>
                      <button 
                        className="copy-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText("💼 Work hard, flex harder\n🎧 Music addict | Gym ke deewane\n😎 Swag with purpose\n🖤 Just a boy living his vibe");
                          handleCopy();
                        }}
                      >
                        Copy Bio
                      </button>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="instagram-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className="preview-pic"
                              style={{
                                backgroundImage: `url(/Rahul.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="preview-info">
                          <div className="preview-username">@yourusername</div>
                          <div className="preview-stats">
                            <div className="preview-stat">
                              <strong>365</strong>
                              <span>Posts</span>
                            </div>
                            <div className="preview-stat">
                              <strong>201k</strong>
                              <span>Followers</span>
                            </div>
                            <div className="preview-stat">
                              <strong>150</strong>
                              <span>Following</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="preview-edit-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit Profile
                        </button>
                      </div>
                      <div className="preview-bio">
                        💼 Work hard, flex harder
                        🎧 Music addict | Gym ke deewane
                        😎 Swag with purpose
                        🖤 Just a boy living his vibe
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText("💼 Work hard, flex harder\n🎧 Music addict | Gym ke deewane\n😎 Swag with purpose\n🖤 Just a boy living his vibe");
                        handleCopy();
                      }}
                    >
                      Copy Bio
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="get-more-button-container">
              <button 
                className="get-more-btn"
                onClick={() => {
                  navigate('/instagram-bio');
                  // Scroll to the hero section after navigation
                  setTimeout(() => {
                    const heroSection = document.querySelector('.hero-section');
                    if (heroSection) {
                      heroSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                Get More Insta Bio
              </button>
            </div>
            
            <h3>Popular Instagram Fonts and Styles</h3>
            
            <p>Our IG fonts tool offers a wide variety of font styles to suit any personality or brand:</p>
            
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Font Style</th>
                    <th>Description</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bold Text</td>
                    <td>Thicker, more prominent characters</td>
                    <td>Headlines and important info</td>
                  </tr>
                  <tr>
                    <td>Italic Text</td>
                    <td>Slanted, elegant lettering</td>
                    <td>Quotes and sophisticated bios</td>
                  </tr>
                  <tr>
                    <td>Script Fonts</td>
                    <td>Cursive, handwritten styles</td>
                    <td>Personal profiles and creative brands</td>
                  </tr>
                  <tr>
                    <td>Fraktur Fonts</td>
                    <td>Old-world, gothic styling</td>
                    <td>Gothic, fantasy, or historical themes</td>
                  </tr>
                  <tr>
                    <td>Emoji Combinations</td>
                    <td>Text with decorative emojis</td>
                    <td>Fun, casual, or thematic bios</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3>Maximizing Your Instagram Font Generator Experience</h3>
            
            <p>To get the most out of our Instagram font generator, consider these tips:</p>
            
            <ol>
              <li><strong>Match Your Brand:</strong> Choose fonts that align with your personal or brand identity</li>
              <li><strong>Test Readability:</strong> Ensure your chosen fonts are still easy to read on mobile devices</li>
              <li><strong>Use Sparingly:</strong> Don't overuse fancy fonts - use them strategically for maximum impact</li>
              <li><strong>Stay Consistent:</strong> Maintain a consistent style throughout your profile</li>
              <li><strong>Update Regularly:</strong> Refresh your bio fonts periodically to keep your profile looking fresh</li>
            </ol>
            
            <h3>Conclusion</h3>
            
            <p>Our Instagram font generator is the ultimate tool for anyone looking to enhance their social media presence. With its easy-to-use interface, wide variety of font styles, and completely free access, it's never been easier to create a standout Instagram profile. Whether you're a personal brand, business, or just looking to make your profile more interesting, our font Instagram tool has everything you need to succeed.</p>
            
            <p>Start transforming your Instagram presence today with our powerful and versatile Instagram font generator! You can also explore our <a href="/instagram-bio">Instagram bio ideas</a> to find the perfect words for your profile.</p>
          </article>
        </div>
      </div>

      <Footer />
      <Toast show={showToast} />
    </div>
  );
};

// IG Bio Search Page Component (formerly Home Page)
// This component has been moved to ./components/IgBioSearchPage.jsx
// We're now importing it from there instead of defining it inline

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <InstallPrompt />
      <Routes>
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/instagram-bio" element={<IgBioSearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </ThemeProvider>
  );
};

// Search mapping for Instagram Bio for Boys and similar terms
const boysBioSearchMapping = {
  "instagram bio for boys": "Instagram Bio for Boys",
  "boys instagram bio": "Instagram Bio for Boys",
  "insta bio for boys": "Instagram Bio for Boys",
  "boys bio": "Instagram Bio for Boys",
  "instagram bio for boy": "Instagram Bio for Boys",
  "boy instagram bio": "Instagram Bio for Boys",
  "insta bio for boy": "Instagram Bio for Boys",
  "boy bio": "Instagram Bio for Boys",
  "instagram bio for boys stylish font": "Instagram Bio for Boys",
  "boys stylish font bio": "Instagram Bio for Boys",
  "instagram bio for boys attitude": "Instagram Bio for Boys",
  "boys attitude bio": "Instagram Bio for Boys",
  "instagram bio for boys cool": "Instagram Bio for Boys",
  "boys cool bio": "Instagram Bio for Boys",
  "instagram bio for boys swag": "Instagram Bio for Boys",
  "boys swag bio": "Instagram Bio for Boys",
  "instagram bio for boys aesthetic": "Instagram Bio for Boys",
  "boys aesthetic bio": "Instagram Bio for Boys",
  "instagram bio for boys vip": "Instagram Bio for Boys",
  "boys vip bio": "Instagram Bio for Boys",
  "instagram bio for boys best": "Instagram Bio for Boys",
  "boys best bio": "Instagram Bio for Boys",
  "instagram bio for boys love": "Instagram Bio for Boys",
  "boys love bio": "Instagram Bio for Boys",
  "instagram bio for boys 2 line": "Instagram Bio for Boys",
  "boys 2 line bio": "Instagram Bio for Boys",
  "instagram bio for boys stylish": "Instagram Bio for Boys",
  "boys stylish bio": "Instagram Bio for Boys",
  "instagram bio for boys swag attitude": "Instagram Bio for Boys",
  "boys swag attitude bio": "Instagram Bio for Boys"
};

// Export the mapping for use in other components
export { boysBioSearchMapping };

// Export components for use in other components
export { Header, Footer, Toast };

export default App;