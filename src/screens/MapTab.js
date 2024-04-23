import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
// import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

const apiKey = process.env.API_KEY

const MapTab = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const markers = [{
      id: 1,
      coordinate: {
        latitude: 39.997090,
        longitude: -75.204790,
      },
      title: "Bennett Compost",
      address: "3850 W Ford Rd, Philadelphia, PA 19131",
    },
    {
      id: 2,
      coordinate: {
        latitude: 39.983959,
        longitude: -75.077187,
      },
      title: "Sanitation Convenience Center",
      address: "3901 N Delaware Ave, Philadelphia, PA 19137",
    },
    {
      id: 3,
      coordinate: {
        latitude: 40.038040,
        longitude: -75.113420,
      },
      title: "Bennet Compost",
      address: "5650 Rising Sun Ave, Philadelphia, PA 19120",
    },
    {
      id: 4,
      coordinate: {
        latitude: 39.921660,
        longitude: -75.213520,
      },
      title: "Fairmount Park Organic Recycling Center",
      address: "3201 S 61st St, Philadelphia, PA 19153",
    },
    {
      id: 5,
      coordinate: {
        latitude: 39.985510,
        longitude: -75.178340,
      },
      title: "Sanitation Convenience Center",
      address: "2564 W Glenwood Ave, Philadelphia, PA 19121",
    },
  ]

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  }
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access location was denied');
    } else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  // const getCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setCurrentLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     },
  //     error => Alert.alert("Error", error.message),
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };

  useEffect(()=>{
    userLocation();// getCurrentLocation();
  }, [])

  const navigateToMarker = () => {
    if (selectedMarker) {
      const { coordinate } = selectedMarker;
      // Check if currentLocation is available
      if (currentLocation) {
        // Use MapViewDirections to display directions
        <MapViewDirections
          origin={currentLocation}
          destination={coordinate}
          apikey={'AIzaSyDts7XHh7g73Bzc9H4RQx_sNihfH4NnPw4'}
          strokeWidth={3}
          strokeColor="blue"
        />
      } else {
        Alert.alert("Error", "Location permission not granted or unavailable.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 39.997090,
          longitude: -75.204790,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        apiKey={apiKey}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => handleMarkerPress(marker)}
          >
            <Callout>
              <Text>{marker.title}</Text>
            </Callout>
          </Marker>
        ))}
        {/* Conditionally render MapViewDirections based on selectedMarker and currentLocation */}
        {selectedMarker && currentLocation && (
          <MapViewDirections
            origin={currentLocation}
            destination={selectedMarker.coordinate}
            apikey={apiKey}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
      {selectedMarker && (
        <TouchableOpacity style={styles.buttonContainer} onPress={navigateToMarker}>
          <Text style={styles.buttonText}>Navigate</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: '1%',
    right: '2%',
    backgroundColor: 'black',
    borderRadius: 5,
    color: 'white',
    zIndex: 10000,
    opacity: 0.7
  },
  buttonText: {
    padding: 10,
    color: 'white',
    fontSize: 15,
  },
});

export default MapTab;