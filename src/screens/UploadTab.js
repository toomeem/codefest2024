import React from 'react';
import {
	View, Text, TouchableOpacity, Pressable, StyleSheet, Image
} from 'react-native';


const PhotoView = props => {
	return (
		<View>
			<View style={styles.photoView}>
				<TouchableOpacity>
					<Image
						style={styles.image}
						source={props.imageName}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const UploadTab = () => {
	return (
		<View style={styles.container}>
			<View style={styles.topSpace} />
			<View style={styles.titleView}>
				<Text style={styles.titleText}>Select an image</Text>
			</View>
				<View style={styles.photoContainer}>
					<PhotoView imageName={require("../../assets/oscar_the_grouch.webp")}/>
					<PhotoView imageName={require("../../assets/oscar_the_grouch.webp")}/>
					<PhotoView imageName={require("../../assets/oscar_the_grouch.webp")}/>
				</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	titleView: {
		marginTop: 20,
		flex: 2,
		alignItems: 'center',
		justifyContent: 'top',
	},
	titleText: {
		fontSize: 50,
		fontWeight: 'bold',
	},
	topSpace: {
		flex: 1,
	},
	bottomSpace: {
		flex: 1,
	},
	photoContainer: {
		flex: 8,
		justifyContent: 'space-around',
		backgroundColor: 'lightgray',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '90%',
	},
	photoView: {
		flex: 1,
		margin: 5,
	},
	image:{
		width: 100,
		height: 100,
		// margin: 10,
	}
});

export default UploadTab;
