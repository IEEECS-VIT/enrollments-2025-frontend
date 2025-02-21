import ReactGA from "react-ga4";

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

// Initialize Google Analytics
export const initGA = (): void => {
  ReactGA.initialize(GA_TRACKING_ID);
};

// Log page views
export const logPageView = (): void => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// Log custom events
export const logEvent = (
  category: string,
  action: string,
  label?: string
): void => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
