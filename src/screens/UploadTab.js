import React, { useState } from 'react';
import {
	View, Text, TouchableOpacity, Pressable, StyleSheet, Image, ScrollView, Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const imageList = [
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
];

selectedImages = [];

const PhotoView = props => {
	const [selected, setSelected] = React.useState(false);
	return (
		<View>
			<View style={selected ? styles.photoView.selected : styles.photoView.unselected}>
				<TouchableOpacity
					onPress={()=> {
						setSelected(!selected);
						if(selected){
							selectedImages.pop(props.src.uri);
						}
						else{
							selectedImages.push(props.src.uri);
						}
				}}
				>
					<Image
						style={styles.image}
						source={props.src}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const UploadTab = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      imageList.push({uri: String(result.assets[0].uri)});
			console.log(imageList[3]);
			setModalVisible(false);
    }
	};
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.topSpace} />
				<View style={styles.titleView}>
					<Text style={styles.titleText}>Select an image</Text>
				</View>
				<View style={styles.photoContainer}>
					{imageList.map((image, index) => {
						return (
							<PhotoView
								key={index}
								src={image}
							/>
						);
					})}
				</View>
				<View style={styles.upload.view}>
					<TouchableOpacity
						style={styles.upload.pressable}
						onPress={() => {
							setModalVisible(!modalVisible);
						}}
					>
						<Text style={styles.upload.text}>Upload Images</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.submit.view}>
					<Pressable
						style={styles.submit.pressable}
						onPress={() => {
							console.log(imageList);
						}}
					>
						<Text style={styles.submit.text}>Submit Images</Text>
					</Pressable>
				</View>
		<View style={styles.modalView}>
			<Modal style={styles.modal}
				animationType="slide"
				visible={modalVisible}
			>
				<View style={styles.topView}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => {setModalVisible(false)}}
					/>
				</View>
				<View style={{height: 50}} />
				<TouchableOpacity
					style={styles.selectImage}
					onPress={pickImageAsync}
				>
					<Text>Select an image</Text>
				</TouchableOpacity>
			</Modal>
		</View>
		</View>
		</ScrollView>
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
		fontSize: 30,
		fontWeight: 'bold',
	},
	selectImage: {
		width: 200,
		height: 50,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightblue',
	},
	topView: {
    alignItems: 'left',
  },
	backButton: {
    position: 'absolute',
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    top: 45,
    left: 30,
    height: 25,
    width: 25,
    transform: [{ rotate: '45deg' }],
    borderRadius: 0,
  },
	modalView: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	modal: {
		position: 'absolute',
		bottom: 0,
		top: 0,
		borderRadius: 10,
		alignItems: 'center',
		elevation: 5
	},
	topSpace: {
		flex: 1,
	},
	bottomSpace: {
		flex: 1,
	},
	submit : {
		view: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			borderWidth: 1,
			borderRadius: 10,
			width: 150,
			height: 50,
			bottom: 20,
			right: 25,
			backgroundColor: 'lightblue',
		},
		pressable: {
			width: '100%',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		text: {
			fontSize: 20,
		},
	},
	upload: {
		view: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			borderWidth: 1,
			borderRadius: 10,
			width: 150,
			height: 50,
			bottom: 20,
			left: 25,
			backgroundColor: 'lightblue',
		},
		pressable: {
			width: '100%',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		text: {
			fontSize: 20,
		},
	},
	photoContainer: {
		flex: 8,
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '90%',
		minHeight: 260,
		backgroundColor: 'lightgray',
		margin: 10,
	},
	photoView: {
		selected:{
			borderWidth: 2,
			borderColor: 'red',
			margin: 5,
		},
		unselected:{
			borderWidth: 2,
			borderColor: 'lightgray',
			margin: 5,
		},
	},
	image:{
		width: 100,
		height: 100,
		// margin: 10,
	}
});

export default UploadTab;
