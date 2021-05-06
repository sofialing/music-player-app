import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'assets/styles/main.scss';

//Mobile full height screen fix.
// let vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty('--vh', `${vh}px`);
// window.addEventListener('resize', () => {
// 	let vh = window.innerHeight * 0.01;
// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
// });

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('app')
);

// serviceWorkerRegistration.register();
serviceWorkerRegistration.unregister();
