import ReactGA from 'react-ga4';

const trackingId = 'G-T6MVG0CD7E'; 
ReactGA.initialize(trackingId);

export const logPageView = () => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
