import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Pressable, StyleSheet, Image, ScrollView, Modal, ImageBackground, RefreshControl, FlatList
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import uploadImage from '../functions/request';


const backgroundImage = {
  uri: "https://media.rainpos.com/Robert_Kaufman_Fabrics/K001-1842.jpg"
};

const notCheckedList = [
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
];

const biodegradableList = [
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  {'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
]

const nonBiodegradableList = [
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
	{'uri': 'https://fathead.com/cdn/shop/products/dfs7s23a2jhda82q6bch.jpg?v=1660809139&width=1946'},
  ]

selectedImages = [];

const PictureView = props => {
  const [selected, setSelected] = React.useState(false);
  return (
    <View>
      {props.src.uri != undefined ?
      <View style={selected ? styles.pictureView.selected : styles.pictureView.unselected}>
        <TouchableOpacity
          onPress={()=> {
            setSelected(!selected);
            if(selected){
              selectedImages.pop(props.src);
            }
            else{
              selectedImages.push(props.src);
            }
          }}
        >
          <Image
            style={styles.image}
            source={{uri: props.src.uri}}
          />
        </TouchableOpacity>
      </View>
      : <Text>No Images</Text>}
    </View>
  );
}

const UploadTab = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [openCamera, setOpenCamera] = useState(false);
  const [picture, setPicture] = useState(null);
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };
  let cameraRef = useRef();
  let takePicture = async () => {
    let options = {quality: 0, scale: 1};
    let newPicture = await cameraRef.current.takePictureAsync(options);
    setOpenCamera(false);
    setPicture(newPicture);
    notCheckedList.push({uri: picture.uri});
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      notCheckedList.push(result.assets[0]);
      setModalVisible(false);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);
  return (
  <ImageBackground source={backgroundImage} style={styles.back}>
    <ScrollView refreshControl={<RefreshControl enabled={true} refreshing={refreshing} refresh={onRefresh}/>}>
      <View style={styles.container}>
        <View style={{height: 50}} />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Unsorted Material</Text>
        </View>
        <View style={styles.pictureContainer}>
          {notCheckedList.map((image, index) => {
            return (
              <PictureView
                key={index}
                src={image}
              />
            );
          })}
        </View>
		<View style={styles.titleView}>
          <Text style={styles.titleText}>Biodegradable</Text>
        </View>
        <View style={styles.pictureContainer}>
          {biodegradableList.map((image, index) => {
            return (
              <PictureView
                key={index}
                src={image}
              />
            );
          })}
        </View>
		<View style={styles.titleView}>
          <Text style={styles.titleText}>Non-Biodegradable</Text>
        </View>
        <View style={styles.pictureContainer}>
          {nonBiodegradableList.map((image, index) => {
            return (
              <PictureView
                key={index}
                src={image}
              />
            );
          })}
        </View>
		<View style={styles.delete.view}>
          <TouchableOpacity
            style={styles.delete.pressable}
            onPress={() => {
              // setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.delete.text}>Delete Images</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 150}} />
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
          <TouchableOpacity
            style={styles.submit.pressable}
            onPress={async() => {
              while(selectedImages.length > 0){
                console.log(selectedImages[0]);
                uploadImage(selectedImages[0]) ? biodegradableList.push(selectedImages[0]) : nonBiodegradableList.push(selectedImages[0]);
                selectedImages.shift();
              }
            }}
          >
            <Text style={styles.submit.text}>Submit Images</Text>
          </TouchableOpacity>
        </View>
        {openCamera && permission.granted ?
          <Modal
            style={styles.cameraModal}
            animationType="slide"
            visible={openCamera}
            transparent={true}
            onRequestClose={() => setOpenCamera(false)}
          >
            <View style={styles.cameraContainer}>
              <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.cameraIconContainer}>
                  <TouchableOpacity style={styles.cameraFlipButton}
                    onPress={() => toggleCameraType()}
                  >
                    <Text style={styles.cameraFlipText}>Flip Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.takePicture}
                    onPress={() => {
                      takePicture();
                    }}
                  />
                </View>
              </Camera>
            </View>
          </Modal>
          : null
        }
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
                <View style={styles.orView}>
                  <Text style={styles.orText}>OR</Text>
                </View>
                <View style={styles.openCamera.view}>
                  <TouchableOpacity
                    style={styles.openCamera.touchable}
                    onPress={() => {
                      permission.granted ?
                      setOpenCamera(true) :
                      requestPermission();
                      setModalVisible(false);
                    }}
                  >
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
  refresh: {
    height: 10
  },
  empty: {
    height: 20
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
  takePicture: {
    alignSelf: 'flex-end',
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  orView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  orText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'violet',
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
  cameraIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraFlipButton: {
    flex: 1,
    position: 'absolute',
    top: 60,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  cameraFlipText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  titleView: {
    marginTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'top',
    alignSelf: 'left',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'lightblue',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 4,
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Georgia',
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
  submit : {
    view: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderWidth: 1,
      borderRadius: 10,
      width: 150,
      height: 50,
      top: 10,
      right: 30,
      backgroundColor: 'lightblue',
    },
    pressable: {
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
      top: 10,
      left: 5,
      backgroundColor: 'lightblue',
    },
    pressable: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      color: 'white',
    },
  },
  delete: {
    view: {
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 10,
      width: 200,
      height: 50,
      marginBottom: 10,
	  alignItems: 'center',
      left: 5,
      backgroundColor: 'lightblue',
	  alignSelf: 'center',
    },
    pressable: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      color: 'white',
    },
  },
  pictureContainer: {
    justifyContent: 'left',
    alignSelf: 'left',
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    minHeight: 200,
    margin: 7,
    backgroundColor: 'lightblue',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 3,
  },
  pictureView: {
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
