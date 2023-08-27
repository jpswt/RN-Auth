import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { loginUser } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/authContext';

function LoginScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const authCtx = useContext(AuthContext);

	const loginHandler = async ({ email, password }) => {
		setIsLoading(true);
		try {
			const token = await loginUser(email, password);
			authCtx.authenticate(token);
		} catch (err) {
			Alert.alert(
				'Authentication failed',
				'Invalid credentials. Please try again.'
			);
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <LoadingOverlay message="Logging in..." />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
