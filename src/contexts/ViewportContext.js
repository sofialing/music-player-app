import { createContext, useEffect, useState } from 'react';

const ViewportContext = createContext();

const ViewportContextProvider = ({ children }) => {
	const [height, setHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(window.innerWidth);

	const handleWindowResize = () => {
		setHeight(window.innerHeight);
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return (
		<ViewportContext.Provider value={{ height, width }} >
			{children}
		</ViewportContext.Provider>
	);
}

export { ViewportContext, ViewportContextProvider as default }
