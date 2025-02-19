export const checkFullscreen = (
    notSubmitted: boolean,
    showBackWarning: boolean,
    showLeaveModal: boolean,
    setShowFullScreenModal: (value: boolean) => void
  ) => {
    if (!document.fullscreenElement && notSubmitted && !showBackWarning) {
      if (!showLeaveModal) {
        setShowFullScreenModal(true);
      }
    }
  };
  
  export const addFullscreenListener = (
    notSubmitted: boolean,
    showBackWarning: boolean,
    showLeaveModal: boolean,
    setShowFullScreenModal: (value: boolean) => void
  ) => {
    const listener = () => checkFullscreen(notSubmitted, showBackWarning, showLeaveModal, setShowFullScreenModal);
    
    if (notSubmitted) {
      listener();
      document.addEventListener("fullscreenchange", listener);
    }
  
    return () => {
      document.removeEventListener("fullscreenchange", listener);
    };
  };
  
  export const handleReEnterFullscreen = (setShowFullScreenModal: (value: boolean) => void) => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => setShowFullScreenModal(false));
    }
  };
  