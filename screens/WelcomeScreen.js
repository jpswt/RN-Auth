import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/authContext';

function WelcomeScreen() {
	const [getMessage, setMessage] = useState('');

	const authCtx = useContext(AuthContext);
	const token = authCtx.token;

	useEffect(() => {
		axios
			.get(
				`https://react-native-8cb6d-default-rtdb.firebaseio.com/message.json?auth=${token}`
			)
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
			});
	}, [token]);

	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			<Text>{getMessage}</Text>
		</View>
	);
}

export default WelcomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});
