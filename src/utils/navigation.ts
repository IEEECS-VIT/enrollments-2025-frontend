export const handleBackButtonWarning = (
  setShowBackWarning: (value: boolean) => void
) => {
  const handleBackButton = (e: PopStateEvent) => {
    e.preventDefault();
    setShowBackWarning(true);
    window.history.pushState(null, "", window.location.pathname);
  };

  window.history.pushState(null, "", window.location.pathname);
  window.addEventListener("popstate", handleBackButton);

  return () => {
    window.removeEventListener("popstate", handleBackButton);
  };
};

export const handleBeforeUnloadWarning = (
  event: BeforeUnloadEvent,
  confirmed: boolean,
  hasUnsavedChanges: boolean,
  notSubmitted: boolean
) => {
  if (
    (
      performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming
    )?.type === "reload"
  ) {
    return;
  }

  if (!confirmed && hasUnsavedChanges && notSubmitted) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave the quiz?";
  }
};

export const addBeforeUnloadListener = (
  confirmed: boolean,
  hasUnsavedChanges: boolean,
  notSubmitted: boolean
) => {
  const listener = (event: BeforeUnloadEvent) =>
    handleBeforeUnloadWarning(
      event,
      confirmed,
      hasUnsavedChanges,
      notSubmitted
    );

  window.addEventListener("beforeunload", listener);

  return () => {
    window.removeEventListener("beforeunload", listener);
  };
};
