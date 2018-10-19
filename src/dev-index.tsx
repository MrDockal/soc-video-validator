import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App/App';

const rootEl = document.getElementById('app-kiosk-modern');

render(
	<AppContainer>
		<App />
	</AppContainer>,
	rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
	module.hot.accept('./containers/App/App', () => {
		const NewApp = require('./containers/App/App').default;

		render(
			<AppContainer>
				<NewApp />
			</AppContainer>,
			rootEl
		);
	});
}
