import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'materialize-css/dist/css/materialize.min.css';
import ReduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//only for development
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
