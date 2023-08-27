import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
	token: '',
	isLoggedIn: false,
	authenticate: () => {},
	logOut: () => {},
});

const AuthContextProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState();

	const authenticate = (token) => {
		setAuthToken(token);
		AsyncStorage.setItem('token', token);
	};

	const logOut = () => {
		setAuthToken(null);
		AsyncStorage.removeItem('token');
	};

	const value = {
		token: authToken,
		isLoggedIn: !!authToken,
		authenticate: authenticate,
		logOut: logOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
