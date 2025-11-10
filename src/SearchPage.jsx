import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { Header, Footer, Toast } from './App'; // Import universal components
import './components/IgFonts.css';

const SearchPage = () => {
  const { keyword } = useParams();
  const location = useLocation();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [bios, setBios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedBio, setCopiedBio] = useState(null);
  const [flippedCards, setFlippedCards] = useState([]); // State for flip cards
  const [isGirlsBio, setIsGirlsBio] = useState(false); // State to track if bios are for girls
  const [flippedAvatars, setFlippedAvatars] = useState([]); // State for avatar flipping
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 32;
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SearchPage mounted with params:', { keyword });
    console.log('Location:', location);
    
    const loadBios = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if keyword is available from params or URL
        let searchKeyword = keyword;
        
        // If no keyword from params, try to extract from location.pathname
        if (!searchKeyword) {
          const pathParts = location.pathname.split('/');
          const searchIndex = pathParts.indexOf('search');
          if (searchIndex !== -1 && pathParts.length > searchIndex + 1) {
            searchKeyword = pathParts[searchIndex + 1];
          }
        }
        
        // If still no keyword, show error
        if (!searchKeyword) {
          console.log('No keyword provided');
          setError('No search term provided');
          setLoading(false);
          return;
        }
        
        console.log('Using search keyword:', searchKeyword);
        
        // Convert keyword to readable format
        const readableKeyword = searchKeyword.replace(/-/g, ' ');
        console.log('Keyword:', searchKeyword);
        console.log('Readable keyword:', readableKeyword);
        
        // Determine which bio data to use based on keyword
        let bioData = [];
        let isGirlsBio = false;
        let bioFileName = '';
        
        // Map keywords to file names
        if (readableKeyword.includes('marathi')) {
          bioFileName = 'Marathi Bio Updated.json';
        } else if (readableKeyword.includes('vip') && readableKeyword.includes('girl')) {
          bioFileName = 'VIP Instagram Bio for Girls.json';
        } else if (readableKeyword.includes('boys')) {
          bioFileName = 'Instagram Bio for Boys.json';
        } else if (readableKeyword.includes('girl')) {
          bioFileName = 'Instagram Bio for Girls.json';
        } else {
          bioFileName = 'Cool Instagram Bio for Boys and Girls.json';
        }
        
        console.log('Fetching bio file:', bioFileName);
        
        // Fetch bio data from public/bio directory (served at /bio/ path)
        const response = await fetch(`/bio/${bioFileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${bioFileName}`);
        }
        
        const bioJson = await response.json();
        console.log('Fetched bio data:', bioJson);
        
        // Process the bio data based on its structure
        if (readableKeyword.includes('marathi')) {
          console.log('Loading Marathi bios:', bioJson);
          if (bioJson && typeof bioJson === 'object') {
            // For Marathi Bio Updated.json which has instagramBios key
            if (bioJson.instagramBios) {
              bioData = bioJson.instagramBios.map(item => item && item.text ? item.text : '');
            } else {
              const key = Object.keys(bioJson)[0];
              bioData = (bioJson[key] || []).map(item => item && item.text ? item.text : '');
            }
          } else {
            bioData = [];
          }
          isGirlsBio = false; // Marathi bios are mostly Male gender
        } 
        // Check for VIP bios first since it's more specific
        else if (readableKeyword.includes('vip') && readableKeyword.includes('girl')) {
          // For VIP bios which is directly an array of objects
          console.log('Loading VIP bios:', bioJson);
          if (Array.isArray(bioJson)) {
            bioData = bioJson.map(item => item && item.text ? item.text : '');
          } else if (bioJson && typeof bioJson === 'object') {
            const key = Object.keys(bioJson)[0];
            bioData = (bioJson[key] || []).map(item => item && item.text ? item.text : '');
          } else {
            bioData = [];
          }
          isGirlsBio = true;
        } else if (readableKeyword.includes('boys')) {
          // Check if boysBios has the expected structure
          console.log('Loading boys bios:', bioJson);
          if (bioJson && typeof bioJson === 'object' && bioJson.instagramBios) {
            bioData = bioJson.instagramBios.map(item => item && item.text ? item.text : '');
          } else {
            const key = Object.keys(bioJson)[0];
            bioData = (bioJson[key] || []).map(item => item && item.text ? item.text : '');
          }
          isGirlsBio = false;
        } else if (readableKeyword.includes('girl')) {
          // Check if girlsBios has the expected structure
          console.log('Loading girls bios:', bioJson);
          if (bioJson && typeof bioJson === 'object' && bioJson.instagramBios) {
            bioData = bioJson.instagramBios.map(item => item && item.text ? item.text : '');
          } else {
            const key = Object.keys(bioJson)[0];
            bioData = (bioJson[key] || []).map(item => item && item.text ? item.text : '');
          }
          isGirlsBio = true;
        } else {
          // For cool bios
          console.log('Loading cool bios:', bioJson);
          if (bioJson && typeof bioJson === 'object' && bioJson.instagramBios) {
            bioData = bioJson.instagramBios.map(item => item && item.text ? item.text : '');
          } else {
            const key = Object.keys(bioJson)[0];
            bioData = (bioJson[key] || []).map(item => item && item.text ? item.text : '');
          }
          // For cool bios, we'll determine gender based on keyword
          isGirlsBio = readableKeyword.includes('girls') || readableKeyword.includes('girl');
        }
        
        // Ensure bioData is always an array
        if (!Array.isArray(bioData)) {
          bioData = [];
        }
        
        // Filter out any non-string entries
        bioData = bioData.filter(bio => typeof bio === 'string');
        
        setBios(bioData);
        setIsGirlsBio(isGirlsBio); // Store gender info for profile pictures
        setFlippedCards(new Array(bioData.length).fill(false)); // Initialize flip state for each card
        setFlippedAvatars(new Array(bioData.length).fill(false)); // Initialize avatar flip state
        setLoading(false);
        console.log('Bio data loaded:', bioData);
        console.log('Is girls bio:', isGirlsBio);
      } catch (err) {
        console.error('Error loading bios:', err);
        setError('Failed to load bios: ' + err.message);
        setLoading(false);
      }
    };

    loadBios();
  }, [keyword, location.pathname]);

  // Function to toggle flip state for a card
  const toggleFlip = (index) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  // Function to toggle avatar flip state
  const toggleAvatarFlip = (index, e) => {
    e.stopPropagation(); // Prevent card flip when clicking avatar
    setFlippedAvatars(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleCopy = async (bioText) => {
    try {
      await navigator.clipboard.writeText(bioText);
      setCopiedBio(bioText);
      setToastMessage('Copied to clipboard!');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setCopiedBio(null);
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = bioText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedBio(bioText);
      setToastMessage('Copied to clipboard!');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setCopiedBio(null);
      }, 2000);
    }
  };

  // Function to get avatar color based on index for variety
  const getAvatarColor = (index) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    return colors[index % colors.length];
  };

  // Get the display keyword for the header
  const displayKeyword = keyword ? keyword.replace(/-/g, ' ') : 
    (() => {
      // Extract from location.pathname if needed
      const pathParts = location.pathname.split('/');
      const searchIndex = pathParts.indexOf('search');
      if (searchIndex !== -1 && pathParts.length > searchIndex + 1) {
        return pathParts[searchIndex + 1].replace(/-/g, ' ');
      }
      return '';
    })();

  // Get current cards for pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = bios.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(bios.length / cardsPerPage);

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Reset flip states when changing pages
    setFlippedCards(new Array(currentCards.length).fill(false));
    setFlippedAvatars(new Array(currentCards.length).fill(false));
  };

  // Function to go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  // Function to go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <Header />
        <div className="search-page">
          <h1>Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <Header />
        <div className="search-page">
          <h1>Error: {error}</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Header />
      
      <div className="search-page">
        <div className="search-header">
          <h1>Search Results for "{displayKeyword}"</h1>
          <p className="search-description">Browse our collection of Instagram bios. You can also use our <a href="/">free Instagram font generator</a> to create unique text styles for your bio.</p>
        </div>
        
        <div className="bio-grid">
          {currentCards.map((bio, index) => (
            <div 
              key={indexOfFirstCard + index} 
              className={`bio-card ${flippedCards[index] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(index)} // Click anywhere on the card to flip
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="bio-text">
                    {typeof bio === 'string' ? bio.split('\n').map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < bio.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    )) : bio}
                  </div>
                  <div className="card-buttons">
                    <button 
                      className="flip-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card flip when clicking button
                        toggleFlip(index);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 4v16"></path>
                        <path d="M8 8l-4 4 4 4"></path>
                        <path d="M16 8l4 4-4 4"></path>
                      </svg>
                      <span>Flip</span>
                    </button>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card flip when clicking button
                        handleCopy(bio);
                      }}
                    >
                      {copiedBio === bio ? (
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
                </div>
                <div className="card-back">
                  <div className="instagram-preview">
                    <div className="preview-header">
                      <div className="preview-avatar" onClick={(e) => toggleAvatarFlip(index, e)}>
                        <div className="preview-avatar-image">
                          <div className="preview-story-ring"></div>
                          <div 
                            className={`preview-pic ${flippedAvatars[index] ? 'flipped' : ''}`}
                            style={{
                              backgroundImage: `url(${isGirlsBio 
                                ? (flippedAvatars[index] ? '/Rahul.jpg' : '/Monika.jpg')
                                : (flippedAvatars[index] ? '/Monika.jpg' : '/Rahul.jpg')})`,
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
                        onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking button
                      >
                        Edit Profile
                      </button>
                    </div>
                    <div className="preview-bio">
                      {typeof bio === 'string' ? bio.split('\n').map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          {lineIndex < bio.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      )) : bio}
                    </div>
                  </div>
                  <button 
                    className="copy-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card flip when clicking button
                      handleCopy(bio);
                    }}
                  >
                    {copiedBio === bio ? (
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
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              // Show first, last, current, and nearby pages
              if (pageNumber === 1 || pageNumber === totalPages || 
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                return (
                  <button
                    key={pageNumber}
                    className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                // Show ellipsis for skipped pages
                return <span key={pageNumber} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
            
            <button 
              className="pagination-btn"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

      </div>
      
      <Footer />
      <Toast show={showToast} message={toastMessage} />
    </div>
  );
};

export default SearchPage;