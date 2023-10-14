import { Worker } from '@react-pdf-viewer/core';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import ViewFile from './components/ViewFile';
import Campaign from './pages/Campaign';
import Home from './pages/Home';
import Login from './pages/Login';
import NgoHome from './pages/NgoHome';
import Register from './pages/Register';
import ViewCampaigs from './pages/ViewCampaigs';
import { isWalletConnected } from './services/blockchain';

const App = () => {
	const [loaded, setLoaded] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const walletConnection = async () => {
			await isWalletConnected();
			setLoaded(true);
		};

		if (localStorage.getItem('authToken')) setLoggedIn(true);
		walletConnection();
	}, []);

	return (
		<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
			<div className='min-h-screen relative bg-gray-900'>
				<Navbar />
				{loaded ? (
					<Routes>
						{loggedIn ? (
							<Route path='/' element={<NgoHome />} />
						) : (
							<Route path='/' element={<Home />} />
						)}
						<Route path='/campaigns/:id' element={<Campaign />} />
						<Route path='/registerNGO' element={<Register />} />
						<Route path='/ngoLogin' element={<Login />} />
						<Route path='/viewCamps' element={<ViewCampaigs />} />
						<Route
							path='/user/viewPdf/:doc'
							element={<ViewFile />}
						/>
					</Routes>
				) : null}
				<ToastContainer
					position='bottom-center'
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/>
			</div>
		</Worker>
	);
};

export default App;
