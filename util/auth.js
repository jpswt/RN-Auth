import axios from 'axios';

const API_KEY = 'AIzaSyD0cNySoSThFVUmukf7P208UsP75J3MZJk';

export const loginUser = async (email, password) => {
	const response = await axios.post(
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
			API_KEY,
		{
			email: email,
			password: password,
			returnSecureToken: true,
		}
	);

	const token = response.data.idToken;
	return token;
	console.log(response.data);
};

export const createUser = async (email, password) => {
	const response = await axios.post(
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
		{
			email: email,
			password: password,
			returnSecureToken: true,
		}
	);
	const token = response.data.idToken;
	return token;
};
