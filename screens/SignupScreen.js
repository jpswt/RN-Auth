import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/authContext';

function SignupScreen() {
	const [isLoading, setIsLoading] = useState(false);

	const authCtx = useContext(AuthContext);

	const signUpHandler = async ({ email, password }) => {
		setIsLoading(true);
		try {
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				'Authentication Failed.',
				'Could not create user.  Please try again.'
			);
		}
		setIsLoading(false);
	};

	if (isLoading) {
		return <LoadingOverlay message="Creating User..." />;
	}

	return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
