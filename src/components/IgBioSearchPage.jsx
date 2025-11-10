import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { Header, Footer, Toast } from '../App'; // Import the new Header component

const IgBioSearchPage = () => {
  const { isDarkTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [flippedAvatars, setFlippedAvatars] = useState({}); // State for avatar flipping
  const [openFAQ, setOpenFAQ] = useState({}); // State for FAQ accordion
  const navigate = useNavigate();

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

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Function to toggle avatar flip state
  const toggleAvatarFlip = (index, e) => {
    e.stopPropagation(); // Prevent card flip when clicking avatar
    setFlippedAvatars(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Function to toggle FAQ accordion
  const toggleFAQ = (index) => {
    setOpenFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Function to get avatar images based on gender
  const getAvatarImages = (isGirlsBio) => {
    return isGirlsBio 
      ? { front: '/Monika.jpg', back: '/Rahul.jpg' }
      : { front: '/Rahul.jpg', back: '/Monika.jpg' };
  };

  return (
    <div className="app">
      <Header />

      <div className="hero-section">
        <h1 className="hero-title">Find the Perfect Instagram Bio</h1>
        <p className="hero-description">
          Discover 1000+ Stylish, Cool, and Unique Instagram Bios for Boys and Girls. 
          Create a standout profile with our curated collection of bios that express your personality.
        </p>
        
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search for Instagram bios by style, category, or keyword..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search Instagram bios"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <span>Search</span>
            </button>
          </div>
        </form>
        
        <div className="popular-searches">
          <h3 className="popular-searches-title">Popular Searches</h3>
          <div className="popular-searches-grid">
            {[
              "instagram-bio-for-girls",
              "instagram-bio-for-boys", 
              "best-bio-for-instagram",
              "cool-bio-for-instagram",
              "attitude-instagram-bio",
              "instagram-vip-bio",
              "aesthetic-bio-for-instagram",
              "instagram-bio-for-boys-stylish-font",
              "love-bio-for-instagram",
              "swag-bio-for-instagram",
              "stylish-bio-for-instagram",
              "vip-bio-for-girls"
            ].map((keyword, index) => (
              <button
                key={index}
                className="popular-search-tag"
                onClick={() => {
                  const searchUrl = `/search/${keyword}`;
                  navigate(searchUrl); // Use navigate instead of window.open
                }}
              >
                {keyword.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="tools-section">
        <div className="container widget-grid">
          {/* Widget 1: Instagram Bio Search Tool */}
          <div className="widget instagram-bio-search-tool fade-in">
            <h2>✨ Instagram Bio Search Tool</h2>
            <p>Our powerful search tool helps you find the perfect Instagram bio that matches your personality and style. Whether you're looking for a cool, funny, or stylish bio, we have thousands of options for you to choose from.</p>
            
            <div className="search-tool-features">
              <h3>🔑 Key Features</h3>
              <ul>
                <li>🔍 Search by keywords, categories, or style</li>
                <li>📋 Thousands of pre-written bios to choose from</li>
                <li>🔄 Flip cards to preview how they look on Instagram</li>
                <li>📋 One-click copy functionality</li>
                <li>📱 Mobile-friendly design</li>
              </ul>
              
              <h3>🚀 How to Use</h3>
              <p>Using our Instagram Bio Search Tool is simple and intuitive. Just enter a keyword or phrase related to the type of bio you're looking for in the search bar above, and we'll show you hundreds of relevant options. You can also browse by category using our Popular Categories widget.</p>
            </div>
          </div>
          
          {/* Widget 2: Popular Categories */}
          <div className="widget popular-categories fade-in">
            <h2>🔥 Popular Instagram Bio Categories</h2>
            <p>Explore our most searched Instagram bio categories to find inspiration for your profile. Each category contains hand-picked bios that match the style and tone you're looking for.</p>
            
            <div className="categories-grid">
              <div className="category-card fade-in" onClick={() => {
                const formattedKeyword = "instagram-bio-for-girls";
                const searchUrl = `/search/${formattedKeyword}`;
                window.open(searchUrl, '_blank');
              }}>
                <h3>👸 Instagram Bio for Girls</h3>
                <p>Find stylish and trendy bios perfect for girls</p>
              </div>
              <div className="category-card fade-in" onClick={() => {
                const formattedKeyword = "instagram-bio-for-boys";
                const searchUrl = `/search/${formattedKeyword}`;
                window.open(searchUrl, '_blank');
              }}>
                <h3>🤴 Instagram Bio for Boys</h3>
                <p>Discover cool and attitude-filled bios for boys</p>
              </div>
              <div className="category-card fade-in" onClick={() => {
                const formattedKeyword = "best-bio-for-instagram";
                const searchUrl = `/search/${formattedKeyword}`;
                window.open(searchUrl, '_blank');
              }}>
                <h3>⭐ Best Bio for Instagram</h3>
                <p>Handpicked top-rated Instagram bios</p>
              </div>
              <div className="category-card fade-in" onClick={() => {
                const formattedKeyword = "cool-bio-for-instagram";
                const searchUrl = `/search/${formattedKeyword}`;
                window.open(searchUrl, '_blank');
              }}>
                <h3>❄️ Cool Bio for Instagram</h3>
                <p>Stand out with these unique bio ideas</p>
              </div>
              <div className="category-card fade-in" onClick={() => {
                const formattedKeyword = "attitude-instagram-bio";
                const searchUrl = `/search/${formattedKeyword}`;
                window.open(searchUrl, '_blank');
              }}>
                <h3>💪 Attitude Instagram Bio</h3>
                <p>Show your confidence with these bold bios</p>
              </div>
              <div className="category-card fade-in" onClick={() => {
                const formattedKeyword = "instagram-bio-quotes";
                const searchUrl = `/search/${formattedKeyword}`;
                window.open(searchUrl, '_blank');
              }}>
                <h3>💭 Instagram Bio Quotes</h3>
                <p>Inspirational quotes for your Instagram profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section container">
        <h2>🎯 Ultimate Guide to Creating the Perfect Instagram Bio</h2>
        
        <h3>❓ What is an Instagram Bio?</h3>
        <p>An Instagram bio is a short description that appears on your profile below your username and profile picture. It's your chance to tell the world who you are, what you're about, and what value you provide. A well-crafted Instagram bio can help you attract more followers, drive traffic to your website, and express your personality.</p>
        <p>Your Instagram bio is one of the most important elements of your profile. It's often the first thing people read when they visit your profile, so it needs to make a strong impression. With only 150 characters available, every word counts. Your bio should be concise, engaging, and reflective of your personal brand or business identity.</p>
        
        <h3>👸 Instagram Bio for Girls</h3>
        <p>Creating the perfect Instagram bio for girls is all about expressing your personality, style, and interests. Whether you're looking for something cute, sassy, or inspirational, we've got you covered with these examples:</p>
        <p>Girl's Instagram bios often showcase creativity, interests, and personal flair. They can be playful, empowering, or elegant depending on your personal style. The key is to choose a bio that reflects who you are while also resonating with your audience. Consider what makes you unique and incorporate that into your bio.</p>
        
        {/* Flip Cards for Instagram Bio for Girls */}
        <div className="bio-examples-grid">
          <div 
            className={`flip-card ${flippedCards['girls-0'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('girls-0')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑
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
                      navigator.clipboard.writeText("💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑\n💕 Living my dream with you\n🔐 Locked in love\n❤️ Love is life 🖤");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('girls-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['girls-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['girls-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑
                    💕 Living my dream with you
                    🔐 Locked in love
                    ❤️ Love is life 🖤
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑\n💕 Living my dream with you\n🔐 Locked in love\n❤️ Love is life 🖤");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('girls-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['girls-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['girls-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('girls-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['girls-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['girls-2'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
        
        <h3>🤴 Instagram Bio for Boys</h3>
        <p>Boys' Instagram bios often showcase attitude, interests, and personal style. They tend to be more direct and confident, reflecting a bold personality. Here are some great examples to inspire your own bio:</p>
        <p>Men's Instagram bios frequently highlight hobbies, achievements, or personal philosophies. They can range from humorous to serious, depending on the individual's preference. The goal is to create a bio that represents your authentic self while also catching the attention of those who visit your profile.</p>
        
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('boys-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['boys-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['boys-0'] ? '/Monika.jpg' : '/Rahul.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('boys-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['boys-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['boys-1'] ? '/Monika.jpg' : '/Rahul.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('boys-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['boys-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['boys-2'] ? '/Monika.jpg' : '/Rahul.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
        
        <h3>⭐ Best Bio for Instagram</h3>
        <p>Finding the best bio for Instagram means choosing one that represents you authentically while also being engaging. The best bios are memorable, reflect your personality, and encourage interaction. Here are some top picks:</p>
        <p>The most effective Instagram bios are those that balance personality with purpose. They give visitors a glimpse into who you are while also encouraging them to engage with your content. Whether you're promoting a business or showcasing your personal life, your bio should align with your overall Instagram strategy.</p>
        
        {/* Flip Cards for Best Bio for Instagram */}
        <div className="bio-examples-grid">
          <div 
            className={`flip-card ${flippedCards['best-0'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('best-0')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  🌟 Living proof that strong is beautiful
💪 Building my empire one idea at a time
🎶 Vibing to my own playlist
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('best-0');
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
                      navigator.clipboard.writeText("🌟 Living proof that strong is beautiful\n💪 Building my empire one idea at a time\n🎶 Vibing to my own playlist");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('best-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['best-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['best-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    🌟 Living proof that strong is beautiful
                    💪 Building my empire one idea at a time
                    🎶 Vibing to my own playlist
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("🌟 Living proof that strong is beautiful\n💪 Building my empire one idea at a time\n🎶 Vibing to my own playlist");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['best-1'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('best-1')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  🥰 Blissfully unpredictable
🌻 Collecting memories, not things
🦋 Living lightly, loving deeply
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('best-1');
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
                      navigator.clipboard.writeText("🥰 Blissfully unpredictable\n🌻 Collecting memories, not things\n🦋 Living lightly, loving deeply");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('best-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['best-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['best-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    🥰 Blissfully unpredictable
                    🌻 Collecting memories, not things
                    🦋 Living lightly, loving deeply
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("🥰 Blissfully unpredictable\n🌻 Collecting memories, not things\n🦋 Living lightly, loving deeply");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['best-2'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('best-2')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  🌸 Heart full of gratitude
✨ Eyes full of hope
🙃 Silly, sassy, a little bit classy
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('best-2');
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
                      navigator.clipboard.writeText("🌸 Heart full of gratitude\n✨ Eyes full of hope\n🙃 Silly, sassy, a little bit classy");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('best-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['best-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['best-2'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    🌸 Heart full of gratitude
                    ✨ Eyes full of hope
                    🙃 Silly, sassy, a little bit classy
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("🌸 Heart full of gratitude\n✨ Eyes full of hope\n🙃 Silly, sassy, a little bit classy");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <h3>❄️ Cool Bio for Instagram</h3>
        <p>Cool Instagram bios help you stand out from the crowd. They're often creative, unique, and memorable. A cool bio can showcase your wit, interests, or unique perspective on life. Check out these cool options:</p>
        <p>Cool bios often incorporate trending slang, pop culture references, or clever wordplay. They're designed to catch attention and spark curiosity. When crafting a cool bio, think about what makes you different from others and how you can express that in a compelling way.</p>
        
        {/* Flip Cards for Cool Bio for Instagram */}
        <div className="bio-examples-grid">
          <div 
            className={`flip-card ${flippedCards['cool-0'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('cool-0')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  👑 զʊɛɛռ օʄ ʍʏ օառ ʟɨʄɛ
😎 ᴬᵗᵗⁱᵗᵘᵈᵉ ᵈᵉᵖᵉⁿᵈˢ ᵒⁿ ʸᵒᵘ
😤 𝕸𝖞 𝖑𝖎𝖋𝖊, 𝖒𝖞 𝖗𝖚𝖑𝖊𝖘
❤️ ℙ𝐇σstag𝔾𝐀𝐌
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('cool-0');
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
                      navigator.clipboard.writeText("👑 զʊɛɛռ օʄ ʍʏ օառ ʟɨʄɛ\n😎 ᴬᵗᵗⁱᵗᵘᵈᵉ ᵈᵉᵖᵉⁿᵈˢ ᵒⁿ ʸᵒᵘ\n😤 𝕸𝖞 𝖑𝖎𝖋𝖊, 𝖒𝖞 𝖗𝖚𝖑𝖊𝖘\n❤️ ℙ𝐇σstag𝔾𝐀𝐌");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('cool-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['cool-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['cool-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    👑 զʊɛɛռ օʄ ʍʏ օառ ʟɨʄɛ
                    😎 ᴬᵗᵗⁱᵗᵘᵈᵉ ᵈᵉᵖᵉⁿᵈˢ ᵒⁿ ʸᵒᵘ\n😤 𝕸𝖞 𝖑𝖎𝖋𝖊, 𝖒𝖞 𝖗𝖚𝖑𝖊𝖘\n❤️ ℙ𝐇σstag𝔾𝐀𝐌
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("👑 զʊɛɛռ օʄ ʍʏ օառ ʟɨʄɛ\n😎 ᴬᵗᵗⁱᵗᵘᵈᵉ ᵈᵉᵖᵉⁿᵈˢ ᵒⁿ ʸᵒᵘ\n😤 𝕸𝖞 𝖑𝖎𝖋𝖊, 𝖒𝖞 𝖗𝖚𝖑𝖊𝖘\n❤️ ℙ𝐇σstag𝔾𝐀𝐌");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['cool-1'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('cool-1')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  🚀 𝐄𝐱𝐩𝐥𝐨𝐫𝐢𝐧𝐠 𝐭𝐡𝐞 𝐮𝐧𝐤𝐧𝐨𝐰𝐧
🌌 𝐂𝐨𝐬𝐦𝐢𝐜 𝐯𝐢𝐛𝐞𝐬
💫 𝐌𝐚𝐤𝐢𝐧𝐠 𝐦𝐚𝐠𝐢𝐜
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('cool-1');
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
                      navigator.clipboard.writeText("🚀 𝐄𝐱𝐩𝐥𝐨𝐫𝐢𝐧𝐠 𝐭𝐡𝐞 𝐮𝐧𝐤𝐧𝐨𝐰𝐧\n🌌 𝐂𝐨𝐬𝐦𝐢𝐜 𝐯𝐢𝐛𝐞𝐬\n💫 𝐌𝐚𝐤𝐢𝐧𝐠 𝐦𝐚𝐠𝐢𝐜");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('cool-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['cool-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['cool-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    🚀 𝐄𝐱𝐩𝐥𝐨𝐫𝐢𝐧𝐠 𝐭𝐡𝐞 𝐮𝐧𝐤𝐧𝐨𝐰𝐧
                    🌌 𝐂𝐨𝐬𝐦𝐢𝐜 𝐯𝐢𝐛𝐞𝐬
                    💫 𝐌𝐚𝐤𝐢𝐧𝐠 𝐦𝐚𝐠𝐢𝐜
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("🚀 𝐄𝐱𝐩𝐥𝐨𝐫𝐢𝐧𝐠 𝐭𝐡𝐞 𝐮𝐧𝐤𝐧𝐨𝐰𝐧\n🌌 𝐂𝐨𝐬𝐦𝐢𝐜 𝐯𝐢𝐛𝐞𝐬\n💫 𝐌𝐚𝐤𝐢𝐧𝐠 𝐦𝐚𝐠𝐢𝐜");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['cool-2'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('cool-2')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  🎵 𝐌𝐮𝐬𝐢𝐜 𝐢𝐬 𝐦𝐲 𝐞𝐬𝐜𝐚𝐩𝐞
                  🎧 𝐋𝐨𝐮𝐝 𝐦𝐮𝐬𝐢𝐜, 𝐜𝐥𝐞𝐚𝐫 𝐦𝐢𝐧𝐝
                  🎶 𝐑𝐡𝐲𝐭𝐡𝐦 𝐨𝐟 𝐥𝐢𝐟𝐞
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('cool-2');
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
                      navigator.clipboard.writeText("🎵 𝐌𝐮𝐬𝐢𝐜 𝐢𝐬 𝐦𝐲 𝐞𝐬𝐜𝐚𝐩𝐞\n🎧 𝐋𝐨𝐮𝐝 𝐦𝐮𝐬𝐢𝐜, 𝐜𝐥𝐞𝐚𝐫 𝐦𝐢𝐧𝐝\n🎶 𝐑𝐡𝐲𝐭𝐡𝐦 𝐨𝐟 𝐥𝐢𝐟𝐞");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('cool-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['cool-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['cool-2'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    🎵 𝐌𝐮𝐬𝐢𝐜 𝐢𝐬 𝐦𝐲 𝐞𝐬𝐜𝐚𝐩𝐞
                    🎧 𝐋𝐨𝐮𝐝 𝐦𝐮𝐬𝐢𝐜, 𝐜𝐥𝐞𝐚𝐫 𝐦𝐢𝐧𝐝
                    🎶 𝐑𝐡𝐲𝐭𝐡𝐦 𝐨𝐟 𝐥𝐢𝐟𝐞
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("🎵 𝐌𝐮𝐬𝐢𝐜 𝐢𝐬 𝐦𝐲 𝐞𝐬𝐜𝐚𝐩𝐞\n🎧 𝐋𝐨𝐮𝐝 𝐦𝐮𝐬𝐢𝐜, 𝐜𝐥𝐞𝐚𝐫 𝐦𝐢𝐧𝐝\n🎶 𝐑𝐡𝐲𝐭𝐡𝐦 𝐨𝐟 𝐥𝐢𝐟𝐞");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <h3>💪 Attitude Instagram Bio</h3>
        <p>Attitude Instagram bios are all about confidence and boldness. They often use strong language and powerful imagery to convey a sense of self-assurance. Here are some examples to inspire your own bio:</p>
        <p>Attitude bios are great for those who want to make a statement and stand out. They can be edgy, sarcastic, or simply confident. The key is to be true to yourself and let your personality shine through. Consider what makes you unique and how you can express that in a bold and confident way.</p>
        
        {/* Flip Cards for Attitude Instagram Bio */}
        <div className="bio-examples-grid">
          <div 
            className={`flip-card ${flippedCards['attitude-0'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('attitude-0')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  💪 Stronger than my words
🌟 Living my life on my terms
🤔 Thinking outside the box
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('attitude-0');
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
                      navigator.clipboard.writeText("💪 Stronger than my words\n🌟 Living my life on my terms\n🤔 Thinking outside the box");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('attitude-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['attitude-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['attitude-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    💪 Stronger than my words
                    🌟 Living my life on my terms
                    🤔 Thinking outside the box
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("💪 Stronger than my words\n🌟 Living my life on my terms\n🤔 Thinking outside the box");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['attitude-1'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('attitude-1')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  🌟 Bold and fearless
💪 Standing tall in my truth
🤔 Questioning the status quo
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('attitude-1');
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
                      navigator.clipboard.writeText("🌟 Bold and fearless\n💪 Standing tall in my truth\n🤔 Questioning the status quo");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('attitude-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['attitude-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['attitude-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    🌟 Bold and fearless
                    💪 Standing tall in my truth
                    🤔 Questioning the status quo
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("🌟 Bold and fearless\n💪 Standing tall in my truth\n🤔 Questioning the status quo");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['attitude-2'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('attitude-2')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  💪 Unapologetically me
🌟 Living my life on my terms
🤔 Thinking outside the box
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('attitude-2');
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
                      navigator.clipboard.writeText("💪 Unapologetically me\n🌟 Living my life on my terms\n🤔 Thinking outside the box");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('attitude-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['attitude-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['attitude-2'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    💪 Unapologetically me
                    🌟 Living my life on my terms
                    🤔 Thinking outside the box
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("💪 Unapologetically me\n🌟 Living my life on my terms\n🤔 Thinking outside the box");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <h3>💭 Instagram Bio Quotes</h3>
        <p>Inspirational quotes can add a touch of depth and meaning to your Instagram bio. They can reflect your values, inspire your followers, or simply add a personal touch. Here are some examples:</p>
        <p>Quotes are a great way to convey your personality and values in a concise and impactful way. They can be motivational, philosophical, or simply reflective of your personal journey. When choosing a quote, think about what resonates with you and what message you want to share with your audience.</p>
        
        {/* Flip Cards for Instagram Bio Quotes */}
        <div className="bio-examples-grid">
          <div 
            className={`flip-card ${flippedCards['quotes-0'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('quotes-0')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  "The only way to do great work is to love what you do." - Steve Jobs
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('quotes-0');
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
                      navigator.clipboard.writeText("\"The only way to do great work is to love what you do.\" - Steve Jobs");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('quotes-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['quotes-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['quotes-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    "The only way to do great work is to love what you do." - Steve Jobs
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("\"The only way to do great work is to love what you do.\" - Steve Jobs");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['quotes-1'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('quotes-1')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  "Believe you can and you're halfway there." - Theodore Roosevelt
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('quotes-1');
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
                      navigator.clipboard.writeText("\"Believe you can and you're halfway there.\" - Theodore Roosevelt");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('quotes-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['quotes-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['quotes-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    "Believe you can and you're halfway there." - Theodore Roosevelt
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("\"Believe you can and you're halfway there.\" - Theodore Roosevelt");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['quotes-2'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('quotes-2')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('quotes-2');
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
                      navigator.clipboard.writeText("\"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('quotes-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['quotes-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['quotes-2'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("\"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <h3>💪 Attitude Instagram Bio</h3>
        <p>Attitude bios showcase confidence and personality. They're perfect for those who want to make a bold statement and show the world who's in charge. These bios often feature strong language and assertive messaging:</p>
        <p>Attitude-driven bios are all about confidence and self-assurance. They communicate strength, independence, and a no-nonsense approach to life. These bios work well for individuals who want to project power and command respect from their followers.</p>
        
        {/* Flip Cards for Attitude Instagram Bio */}
        <div className="bio-examples-grid">
          <div 
            className={`flip-card ${flippedCards['attitude-0'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('attitude-0')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  😎 Attitude level: WiFi — always connected
👑 King by birth, lion by mindset
🚫 Zero emotions, 100% focus
✌️ Calm look, deadly thoughts
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('attitude-0');
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
                      navigator.clipboard.writeText("😎 Attitude level: WiFi — always connected\n👑 King by birth, lion by mindset\n🚫 Zero emotions, 100% focus\n✌️ Calm look, deadly thoughts");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('attitude-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['attitude-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['attitude-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    😎 Attitude level: WiFi — always connected
                    👑 King by birth, lion by mindset
                    🚫 Zero emotions, 100% focus
                    ✌️ Calm look, deadly thoughts
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("😎 Attitude level: WiFi — always connected\n👑 King by birth, lion by mindset\n🚫 Zero emotions, 100% focus\n✌️ Calm look, deadly thoughts");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['attitude-1'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('attitude-1')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  I don't chase people — I chase dreams 🔥
Too glam to give a damn ✨
Self-made and unstoppable 💪
No crown needed — my vibe says it all 👑
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('attitude-1');
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
                      navigator.clipboard.writeText("I don't chase people — I chase dreams 🔥\nToo glam to give a damn ✨\nSelf-made and unstoppable 💪\nNo crown needed — my vibe says it all 👑");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('attitude-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['attitude-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['attitude-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    I don't chase people — I chase dreams 🔥
                    Too glam to give a damn ✨
                    Self-made and unstoppable 💪
                    No crown needed — my vibe says it all 👑
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("I don't chase people — I chase dreams 🔥\nToo glam to give a damn ✨\nSelf-made and unstoppable 💪\nNo crown needed — my vibe says it all 👑");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['attitude-2'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('attitude-2')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  Classy, sassy, & a bit smart-assy 💋
Born original, never meant to fit in 🌟
👑 Royalty in my DNA
💎 Diamond in the rough
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('attitude-2');
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
                      navigator.clipboard.writeText("Classy, sassy, & a bit smart-assy 💋\nBorn original, never meant to fit in 🌟\n👑 Royalty in my DNA\n💎 Diamond in the rough");
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('attitude-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['attitude-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['attitude-2'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    Classy, sassy, & a bit smart-assy 💋
                    Born original, never meant to fit in 🌟
                    👑 Royalty in my DNA
                    💎 Diamond in the rough
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("Classy, sassy, & a bit smart-assy 💋\nBorn original, never meant to fit in 🌟\n👑 Royalty in my DNA\n💎 Diamond in the rough");
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <h3>💭 Instagram Bio Quotes</h3>
        <p>Inspirational quotes in your Instagram bio can motivate your followers and showcase your values. Quotes can be philosophical, humorous, or thought-provoking, depending on the message you want to convey:</p>
        <p>Quote-based bios are timeless and universally relatable. They allow you to share wisdom, express your beliefs, or simply add depth to your profile. Quotes can be standalone or combined with other elements to create a more comprehensive bio.</p>
        
        {/* Flip Cards for Instagram Bio Quotes */}
        <div className="bio-examples-grid">
          <div 
            className={`flip-card ${flippedCards['quotes-0'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('quotes-0')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  "Be yourself; everyone else is already taken." – Oscar Wilde
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('quotes-0');
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
                      navigator.clipboard.writeText('"Be yourself; everyone else is already taken." – Oscar Wilde');
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('quotes-0', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['quotes-0'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['quotes-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    "Be yourself; everyone else is already taken." – Oscar Wilde
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText('"Be yourself; everyone else is already taken." – Oscar Wilde');
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['quotes-1'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('quotes-1')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  "Do what you love, love what you do."
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('quotes-1');
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
                      navigator.clipboard.writeText('"Do what you love, love what you do."');
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('quotes-1', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['quotes-1'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['quotes-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    "Do what you love, love what you do."
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText('"Do what you love, love what you do."');
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className={`flip-card ${flippedCards['quotes-2'] ? 'flipped' : ''}`}
            onClick={() => toggleFlip('quotes-2')}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="bio-text">
                  "The best way out is always through."
                </div>
                <div className="card-buttons">
                  <button 
                    className="flip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip('quotes-2');
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
                      navigator.clipboard.writeText('"The best way out is always through."');
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
                    <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('quotes-2', e)}>
                      <div className="preview-avatar-image">
                        <div className="preview-story-ring"></div>
                        <div 
                          className={`preview-pic ${flippedAvatars['quotes-2'] ? 'flipped' : ''}`}
                          style={{
                            backgroundImage: `url(${flippedAvatars['quotes-2'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                      <div className="profile-switch-indicator">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
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
                    "The best way out is always through."
                  </div>
                </div>
                <button 
                  className="copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText('"The best way out is always through."');
                    handleCopy();
                  }}
                >
                  Copy Bio
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <h2 className="faq-heading">❓ Frequently Asked Questions (FAQs)</h2>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(1)}>
            1. How to Change Bio in Instagram
            <span className="faq-toggle">{openFAQ[1] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[1] ? 'open' : ''}`}>
            <p>To change your Instagram bio:</p>
            <ol>
              <li>Open the Instagram app and go to your profile</li>
              <li>Tap the "Edit Profile" button</li>
              <li>Tap on the "Bio" field to edit your text</li>
              <li>Enter your new bio</li>
              <li>Tap "Done" to save your changes</li>
            </ol>
            <p>You can change your Instagram bio as many times as you want. There's no limit to how often you can update it. However, frequent changes might confuse your followers, so it's best to update your bio only when necessary.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(2)}>
            2. Where is bio in instagram
            <span className="faq-toggle">{openFAQ[2] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[2] ? 'open' : ''}`}>
            <p>Your Instagram bio is located directly below your username and profile picture on your profile page. It's one of the first things people see when they visit your profile. The bio section also includes:</p>
            <ul>
              <li>Your profile picture</li>
              <li>Your username</li>
              <li>Your full name (if set)</li>
              <li>Your bio text</li>
              <li>Your website link (if added)</li>
              <li>Your contact information (if added)</li>
            </ul>
            <p>The bio section is crucial for making a first impression. Since it's one of the first things visitors see, it should accurately represent who you are and what you offer.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(3)}>
            3. What to write in instagram bio
            <span className="faq-toggle">{openFAQ[3] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[3] ? 'open' : ''}`}>
            <p>When writing your Instagram bio, consider including:</p>
            <ul>
              <li><strong>Your identity:</strong> Who are you? (e.g., photographer, student, entrepreneur)</li>
              <li><strong>Your value:</strong> What do you offer? (e.g., travel tips, fashion inspiration)</li>
              <li><strong>Your personality:</strong> What makes you unique? (e.g., humor, passion)</li>
              <li><strong>A call-to-action:</strong> What do you want visitors to do? (e.g., visit your website, DM you)</li>
              <li><strong>Emojis:</strong> Use them sparingly to add visual interest</li>
              <li><strong>Keywords:</strong> Include terms that describe you for better discoverability</li>
            </ul>
            <p>Your bio should be a concise representation of who you are and what you stand for. It's an opportunity to connect with potential followers and give them a reason to engage with your content.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(4)}>
            4. How to check bio in instagram
            <span className="faq-toggle">{openFAQ[4] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[4] ? 'open' : ''}`}>
            <p>To check your Instagram bio:</p>
            <ol>
              <li>Open the Instagram app</li>
              <li>Tap on your profile picture in the bottom right corner</li>
              <li>Your bio will be visible below your username and profile picture</li>
            </ol>
            <p>To check someone else's bio:</p>
            <ol>
              <li>Search for their username or name in the search bar</li>
              <li>Tap on their profile when it appears in the search results</li>
              <li>Their bio will be displayed below their username and profile picture</li>
            </ol>
            <p>Regularly checking your bio ensures it accurately reflects your current interests and activities. It's also helpful to review your bio from time to time to see if it still aligns with your brand or personal goals.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(5)}>
            5. What is the best bio for instagram for girls (answer with few examples)
            <span className="faq-toggle">{openFAQ[5] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[5] ? 'open' : ''}`}>
            <p>The best Instagram bio for girls should reflect personality, interests, and style. It should be authentic and resonate with your target audience. Here are some examples that showcase different aspects of personality:</p>
            
            {/* Flip Cards for Best Bio for Girls Examples */}
            <div className="bio-examples-grid">
              <div 
                className={`flip-card ${flippedCards['faq-girls-0'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('faq-girls-0')}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="bio-text">
                      💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑
                      💕 Living my dream with you
                      🔐 Locked in love
                      ❤️ Love is life 🖤
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip('faq-girls-0');
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
                          navigator.clipboard.writeText("💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑\n💕 Living my dream with you\n🔐 Locked in love\n❤️ Love is life 🖤");
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
                        <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('faq-girls-0', e)}>
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className={`preview-pic ${flippedAvatars['faq-girls-0'] ? 'flipped' : ''}`}
                              style={{
                                backgroundImage: `url(${flippedAvatars['faq-girls-0'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                          <div className="profile-switch-indicator">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 4v16"></path>
                              <path d="M8 8l-4 4 4 4"></path>
                              <path d="M16 8l4 4-4 4"></path>
                            </svg>
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
                        💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑
                        💕 Living my dream with you
                        🔐 Locked in love
                        ❤️ Love is life 🖤
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText("💖ֆɨʍքʟɛ ֆɨ ʟօrequently զʊɛɛռ👑\n💕 Living my dream with you\n🔐 Locked in love\n❤️ Love is life 🖤");
                        handleCopy();
                      }}
                    >
                      Copy Bio
                    </button>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flip-card ${flippedCards['faq-girls-1'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('faq-girls-1')}
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
                          toggleFlip('faq-girls-1');
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
                        <div className="preview-avatar" onClick={(e) => toggleAvatarFlip('faq-girls-1', e)}>
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div 
                              className={`preview-pic ${flippedAvatars['faq-girls-1'] ? 'flipped' : ''}`}
                              style={{
                                backgroundImage: `url(${flippedAvatars['faq-girls-1'] ? '/Rahul.jpg' : '/Monika.jpg'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                          </div>
                          <div className="profile-switch-indicator">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 4v16"></path>
                              <path d="M8 8l-4 4 4 4"></path>
                              <path d="M16 8l4 4-4 4"></path>
                            </svg>
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
            </div>
            
            <p>These examples showcase different aspects of personality - from romantic and loving to confident and sassy. The key is to choose a bio that authentically represents you while also appealing to your target audience.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(6)}>
            6. How to edit bio in instagram
            <span className="faq-toggle">{openFAQ[6] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[6] ? 'open' : ''}`}>
            <p>Editing your Instagram bio is simple:</p>
            <ol>
              <li>Open Instagram and go to your profile</li>
              <li>Tap "Edit Profile"</li>
              <li>Tap the "Bio" field to make changes</li>
              <li>Type in your new bio text</li>
              <li>Tap "Done" in the top right corner to save</li>
            </ol>
            <p>Pro tips for editing your bio:</p>
            <ul>
              <li>Keep it concise - you have 150 characters</li>
              <li>Use line breaks for better formatting</li>
              <li>Add emojis to make it visually appealing</li>
              <li>Include a website link if you have one</li>
              <li>Update it regularly to reflect current interests or promotions</li>
            </ul>
            <p>Remember that your Instagram bio is a reflection of your personal brand. Take time to craft a bio that accurately represents who you are and what you want to achieve on the platform.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(7)}>
            7. How to change font in instagram bio
            <span className="faq-toggle">{openFAQ[7] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[7] ? 'open' : ''}`}>
            <p>Instagram doesn't have built-in font options, but you can use special characters to create different font styles:</p>
            <ol>
              <li>Use online font generators (like our IG Fonts tool)</li>
              <li>Copy the styled text from the generator</li>
              <li>Paste it into your Instagram bio</li>
              <li>Save your changes</li>
            </ol>
            <p>Popular font styles for Instagram bios:</p>
            <ul>
              <li>Bold text: 𝐁𝐨𝐥𝐝 𝐭𝐞𝐱𝐭</li>
              <li>Italic text: 𝐼𝑡𝑎𝑙𝑖𝑐 𝑡𝑒𝑥𝑡</li>
              <li>Cursive text: ℭ𝔲𝔯𝔰𝔦𝔳𝔢 𝔱𝔢𝔵𝔱</li>
              <li>Fancy text: Ғคภƈұ ՇєאՇ</li>
            </ul>
            <p>Note: Some special characters may not display properly on all devices. Always preview your bio on different devices to ensure it looks as intended.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(8)}>
            8. How to add location in insta bio
            <span className="faq-toggle">{openFAQ[8] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[8] ? 'open' : ''}`}>
            <p>You can add location information to your Instagram bio in two ways:</p>
            <h4>Method 1: Adding to your bio text</h4>
            <ul>
              <li>Simply type your location in your bio (e.g., "📍 New York, NY")</li>
              <li>Use the location emoji (📍) for visual appeal</li>
              <li>Keep it short and recognizable</li>
            </ul>
            
            <h4>Method 2: Adding a contact button</h4>
            <ol>
              <li>Go to "Edit Profile"</li>
              <li>Scroll down to "Contact Options"</li>
              <li>Tap "Add Contact Option"</li>
              <li>Select "Location"</li>
              <li>Enter your location</li>
              <li>Save your changes</li>
            </ol>
            <p>This creates a button that people can tap to see your location on a map. Adding location information can help local businesses attract nearby customers and individuals connect with others in their area.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(9)}>
            9. How to add pronouns to insta bio
            <span className="faq-toggle">{openFAQ[9] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[9] ? 'open' : ''}`}>
            <p>Instagram has a built-in pronouns feature:</p>
            <ol>
              <li>Go to your profile and tap "Edit Profile"</li>
              <li>Tap "Pronouns" (this option appears for eligible accounts)</li>
              <li>Select up to 4 pronoun options or add your own</li>
              <li>Save your changes</li>
            </ol>
            <p>Alternatively, you can manually add pronouns to your bio text:</p>
            <ul>
              <li>Place them after your name (e.g., "Alex (they/them)")</li>
              <li>Add them on a separate line (e.g., "she/her", "he/him", "they/them")</li>
              <li>Use them in context (e.g., "Marketing professional | she/her")</li>
            </ul>
            <p>Adding pronouns to your bio helps create a more inclusive environment and ensures people refer to you correctly. It's a small but meaningful way to express your identity.</p>
          </div>
        </div>
        
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFAQ(10)}>
            10. How to add any link/youtube link to insta bio
            <span className="faq-toggle">{openFAQ[10] ? '−' : '+'}</span>
          </p>
          <div className={`faq-answer ${openFAQ[10] ? 'open' : ''}`}>
            <p>Adding links to your Instagram bio:</p>
            <ol>
              <li>Go to your profile and tap "Edit Profile"</li>
              <li>Tap the "Website" field</li>
              <li>Enter the full URL (including https://)</li>
              <li>Tap "Done" to save</li>
            </ol>
            <p>Important notes about Instagram bio links:</p>
            <ul>
              <li>You can only have one link in your main bio</li>
              <li>The link must include "http://" or "https://"</li>
              <li>Links must lead to appropriate content</li>
              <li>Instagram may remove links that violate their policies</li>
            </ul>
            <p>For multiple links, consider:</p>
            <ul>
              <li>Link in bio services (Linktree, Tap.bio, etc.)</li>
              <li>Your own website with multiple links</li>
              <li>Instagram Stories with multiple link stickers (for accounts with 10k+ followers)</li>
            </ul>
            <p>Strategically using your single bio link can drive traffic to your most important content or offers. Make sure to update it regularly based on your current priorities.</p>
          </div>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="content-section container">
        <h2>✨ Conclusion: Crafting the Perfect Instagram Bio</h2>
        <p>Your Instagram bio is more than just a few lines of text—it's your digital introduction, your personal brand statement, and your first opportunity to connect with potential followers. With over 1 billion active users on Instagram, having a compelling bio can make the difference between being overlooked and being discovered.</p>
        
        <p>Throughout this guide, we've explored various types of Instagram bios, from attitude-driven statements to inspirational quotes, from cool and trendy phrases to professional introductions. The key takeaway is that your bio should authentically represent who you are while also appealing to your target audience.</p>
        
        <p>Remember these essential tips when crafting your perfect Instagram bio:</p>
        <ul>
          <li><strong>Be authentic:</strong> Your bio should reflect your true personality and values</li>
          <li><strong>Keep it concise:</strong> With only 150 characters, every word counts</li>
          <li><strong>Include keywords:</strong> Use relevant terms to improve discoverability</li>
          <li><strong>Add a call-to-action:</strong> Encourage visitors to take a specific action</li>
          <li><strong>Use emojis strategically:</strong> They add visual appeal but shouldn't overwhelm</li>
          <li><strong>Update regularly:</strong> Keep your bio fresh and relevant to current activities</li>
        </ul>
        
        <p>Whether you're a business looking to attract customers, an influencer building a following, or an individual sharing life moments, the right Instagram bio sets the tone for everything you post. Use our Instagram Bio Search tool to find inspiration and discover the perfect words to express your unique personality. You can also enhance your bio with our <a href="/">Instagram font generator</a> to create unique text styles.</p>
        
        <p>Don't underestimate the power of a well-crafted bio. It's often the deciding factor in whether someone chooses to follow you or scroll past. Take the time to create a bio that truly represents you and watch your engagement grow.</p>
        
        <p>Ready to transform your Instagram presence? Start experimenting with different bio styles today and see which resonates most with your audience. Your perfect Instagram bio is out there—our tool is here to help you find it.</p>
      </div>

      <Footer />
      <Toast show={showToast} />
    </div>
  );
};

export default IgBioSearchPage;