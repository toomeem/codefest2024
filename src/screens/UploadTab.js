import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Pressable, StyleSheet, Image, ScrollView, Modal, ImageBackground
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';

const image = { uri: "https://media.rainpos.com/Robert_Kaufman_Fabrics/K001-1842.jpg" };

const notCheckedList = [
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
];

const bioDegradibleList = [
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
]

const nonBioDegradibleList = [
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  ]

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
  const [permission, requestPermission] = Camera.useCameraPermissions(null);
  const [openCamera, setOpenCamera] = useState(false);
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      notCheckedList.push({uri: String(result.assets[0].uri)});
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
          <Text style={styles.titleText}>Unsorted Material</Text>
        </View>
        <View style={styles.photoContainer}>
          {notCheckedList.map((image, index) => {
            return (
              <PhotoView
                key={index}
                src={image}
              />
            );
          })}
        </View>
		<View style={styles.titleView}>
          <Text style={styles.titleText}>Biodegradible Material</Text>
        </View>
        <View style={styles.photoContainer}>
          {bioDegradibleList.map((image, index) => {
            return (
              <PhotoView
                key={index}
                src={image}
              />
            );
          })}
        </View>
		<View style={styles.titleView}>
          <Text style={styles.titleText}>Non-Biodegradible Materia</Text>
        </View>
        <View style={styles.photoContainer}>
          {nonBioDegradibleList.map((image, index) => {
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
              console.log(notCheckedList);
            }}
          >
            <Text style={styles.submit.text}>Submit Images</Text>
          </Pressable>
        </View>
        {/* <Modal style={styles.modal}
          {openCamera ?
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
            </View> :
          }
          </View>
          </Modal> */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => {setModalVisible(false)}}
                />
                <TouchableOpacity
                  style={styles.selectImage.touchable}
                  onPress={pickImageAsync}
                >
                  <Text style={styles.selectImage.text}>Select an image</Text>
                </TouchableOpacity>
                <View style={styles.openCamera.view}>
                  <TouchableOpacity style={styles.openCamera.touchable}>
                    <Text style={styles.openCamera.text}>Open Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    minHeight: '100%',
    width: '95%',
  },
  modalContainer: {
    alignSelf: 'center',
  },
  openCamera: {
    view: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10,
      margin: 20,
      width: 150,
      height: 50,
      backgroundColor: 'lightblue',
      marginBottom: 30,
    },
    touchable: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 15,
      color: 'black',
      fontWeight: 'bold',
    },
  },
  selectImage: {
    touchable: {
      width: 150,
      height: 50,
      marginLeft: 30,
      marginRight: 30,

      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue',
    },
    text: {
      fontSize: 15,
      color: 'black',
      fontWeight: 'bold',
    },
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
	backgroundColor: 'lightblue',
	borderStyle: 'solid',
	borderColor: 'white',
	borderWidth: 4,
	width: 385,
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	fontFamily: 'Georgia',
	fontSize: 25,
  },
  topView: {
    alignItems: 'left',
  },
  backButton: {
    alignSelf: 'left',
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    height: 20,
    width: 20,
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 15,
    transform: [{ rotate: '45deg' }],
  },
  modal: {
    backgroundColor: 'red',
    maxHeight: 100,
    borderRadius: 10,
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  submit : {
    view: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderWidth: 1,
      borderRadius: 10,
      width: 150,
      height: 50,
      top: '80%',
      right: 30,
      backgroundColor: 'lightblue',
    },
    pressable: {
      // width: '100%',
      // height: '100%',
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
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderWidth: 1,
      borderRadius: 10,
      width: 150,
      height: 50,
      top: "80%",
      left: 5,
      backgroundColor: 'lightblue',
    },
    pressable: {
      width: 100,
      height: 100,
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
    width: '95%',
    minHeight: 200,
    margin: 7,
    backgroundColor: 'transparent',
	borderStyle: 'solid',
	borderColor: 'white',
	borderWidth: 3,
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
    height: 700,
    width: 420,
  }
});

export default UploadTab;
