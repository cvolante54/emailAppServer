import axios from 'axios';
import { FETCH_USER } from './types';

export function fetchUser() {
	return async function(dispatch) {
		const res = await axios.get('/api/current_user');
		console.log('fetchUser res', res);
		dispatch({
			type: FETCH_USER,
			payload: res.data
		});
	};
}

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	console.log('token res', res);
	//because our api will update the user schema we can fetch the updated userdata
	dispatch({
		type: FETCH_USER,
		payload: res.data
	});
};
