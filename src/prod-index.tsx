import * as React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';
import * as DOMReady from 'domready';

DOMReady(() => {

	const rootEl = document.getElementById('app-kiosk-modern');

	render(
		<App/>,
		rootEl
	);
});
