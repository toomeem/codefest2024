import React, { useState } from 'react';
import {
	View, Text, TouchableOpacity, Pressable, StyleSheet, Image, ScrollView, Modal, ImageBackground
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';

const image = { uri: "https://media.rainpos.com/Robert_Kaufman_Fabrics/K001-1842.jpg" };

const imageList = [
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
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
	const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
	function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };
	const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      imageList.push({uri: String(result.assets[0].uri)});
			setModalVisible(false);
    }
	};
	const [modalVisible, setModalVisible] = useState(false);
	return (
			<ImageBackground source={image} style={styles.back}>
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
					<View style={styles.cameraContainer}>
							<Camera style={styles.camera} type={type}>
								<View style={styles.cameraButtonContainer}>
									<TouchableOpacity style={styles.cameraButton}
										onPress={() => toggleCameraType()}
									>
										<Text style={styles.cameraText}>Flip Camera</Text>
									</TouchableOpacity>
								</View>
							</Camera>
						</View>
					</Modal>
				</View>
			</View>
		</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignSelf: 'center',
		minHeight: '100%',
		width: '95%',
	},
	cameraContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
    flex: 1,
  },
	cameraButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
	cameraButton: {
		flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
	cameraText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	titleView: {
		marginTop: 20,
		height: 50,
		alignItems: 'center',
		justifyContent: 'top',
	},
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
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
		height: '10%',
		width: '10%',
	},
	modal: {
		position: 'absolute',
		bottom: 0,
		top: 0,
		borderRadius: 10,
		alignItems: 'center',
		elevation: 5
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
			top: '55%',
			right: 30,
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
			color: 'white',
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
			top: "55%",
			left: 5,
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
			color: 'white',
		},
	},
	photoContainer: {
		justifyContent: 'left',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '90%',
		minHeight: 200,
		margin: 7,
		backgroundColor: 'lightgray',
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
	},
	back: {
		height: 1000,
		width: 420,
	}
});

export default UploadTab;
