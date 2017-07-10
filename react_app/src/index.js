import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import {Provider} from 'react-redux';
import configureStore from './store';

import './index.css';

function startApp() {

	const store = configureStore();

	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
}


if (window.cordova) {
	document.addEventListener('deviceready', startApp, false);
}else {
	startApp();
}


