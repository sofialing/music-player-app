import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerContextProvider from './contexts/PlayerContext'
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Redirect from './components/pages/Redirect';
import './assets/sass/main.scss';
// import { getTokenFromResponse } from './spotify/auth';


const App = () => {
	// const [token, setToken] = useState(null);
	// useEffect(() => {
	// 	const hash = getTokenFromResponse();
	// 	window.location.hash = "";
	// 	let _token = hash.access_token;

	// 	if (_token) {
	// 		setToken(_token);
	// 	}

	// }, [token])
	return (
		<Router>
			<PlayerContextProvider>
				<Routes>
					<Route path="/" >
						<Login />
					</Route>
					<Route path="/dashboard" >
						<Dashboard />
					</Route>
					<Route path="/redirect" >
						<Redirect />
					</Route>
				</Routes>
			</PlayerContextProvider>
		</Router>
	);
}

export default App;
