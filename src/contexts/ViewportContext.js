import { createContext, useContext, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import breakpoints from 'utils/breakpoints';

const ViewportContext = createContext();

const useViewport = () => {
	return useContext(ViewportContext);
}

const ViewportContextProvider = ({ children }) => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoints.lg);
	const [gridItems, setGridItems] = useState(window.innerWidth < breakpoints.md ? 4 : 6)

	const handleResize = throttle(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		setGridItems(window.innerWidth < breakpoints.md ? 4 : 6);
		setIsMobile(window.innerWidth < breakpoints.lg)
		setWindowSize(window.innerWidth);
	}, 100);

	useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ViewportContext.Provider value={{ isMobile, gridItems, windowSize }} >
			{children}
		</ViewportContext.Provider>
	);
}

export { useViewport, ViewportContext, ViewportContextProvider as default }
