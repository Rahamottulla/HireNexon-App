import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-5THK2XVM8X";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (action, category = "User") => {
  ReactGA.event({
    category,
    action,
  });
};
