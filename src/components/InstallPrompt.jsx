import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the app is already installed (running in standalone mode)
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                             window.navigator.standalone || 
                             document.referrer.includes('android-app://');
    
    setIsStandalone(isStandaloneMode);
    
    // If already installed, don't show the prompt
    if (isStandaloneMode) {
      return;
    }

    // Check if user previously clicked "Later" and if 6 hours have passed
    const lastDismissed = localStorage.getItem('installPromptDismissed');
    if (lastDismissed) {
      const dismissTime = parseInt(lastDismissed, 10);
      const sixHours = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
      const timeSinceDismiss = Date.now() - dismissTime;
      
      // If less than 6 hours have passed, don't show the prompt
      if (timeSinceDismiss < sixHours) {
        return;
      }
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt automatically
      setShowInstallPrompt(true);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Auto-show install prompt after a delay if not already shown
    const autoShowTimer = setTimeout(() => {
      if (!showInstallPrompt && deferredPrompt && !isStandaloneMode) {
        setShowInstallPrompt(true);
      }
    }, 3000); // Show after 3 seconds

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(autoShowTimer);
    };
  }, [showInstallPrompt, deferredPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          // Hide the prompt after installation
          setShowInstallPrompt(false);
          // Remove dismissal timestamp since user installed
          localStorage.removeItem('installPromptDismissed');
        } else {
          console.log('User dismissed the install prompt');
          // Set timestamp for dismissal
          localStorage.setItem('installPromptDismissed', Date.now().toString());
          setShowInstallPrompt(false);
        }
        // Clear the saved prompt since it can't be used again
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  const handleClose = () => {
    // Set timestamp for dismissal
    localStorage.setItem('installPromptDismissed', Date.now().toString());
    setShowInstallPrompt(false);
  };

  // Don't show anything if already installed
  if (isStandalone) {
    return null;
  }

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="install-prompt-overlay">
      <div className="install-prompt">
        <div className="install-prompt-header">
          <h3>Install App</h3>
          <button className="install-prompt-close" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="install-prompt-content">
          <p>Install this application on your device for a better experience. It works offline and loads faster!</p>
          <div className="install-prompt-actions">
            <button className="install-prompt-button secondary" onClick={handleClose}>
              Later
            </button>
            <button className="install-prompt-button primary" onClick={handleInstallClick}>
              Install
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;