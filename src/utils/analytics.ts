import ReactGA from 'react-ga4';

const trackingId = import.meta.env.VITE_TRACKINGID; 
ReactGA.initialize(trackingId);

export const logPageView = () => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
