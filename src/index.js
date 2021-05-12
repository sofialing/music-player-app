import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'assets/styles/main.scss';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('app')
);

serviceWorkerRegistration.register();
// serviceWorkerRegistration.unregister();
