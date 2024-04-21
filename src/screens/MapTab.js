import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import MapViewDirections from 'react-native-maps-directions';

const apiKey = 'process.env.GAIzaSyCJ1p61DQHVPq7fQV5asUr_wPz86_gKOhM';

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

  const getCurrentLocation = () => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     setCurrentLocation({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //   },
    //   error => Alert.alert("Error", error.message),
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );
  };

  useEffect(()=>{
    getCurrentLocation();
  }, [])

  // const navigateToMarker = () => {
  //   if (selectedMarker) {
  //     const { coordinate, title } = selectedMarker;
  //     const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}&travelmode=driving`;
  //     Linking.openURL(url);
  //   }
  // }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 39.997090,
          longitude: -75.204790,
          latitudeDelta: 90,
          longitudeDelta: 180,
        }}
        showsUserLocation={true}
        // apiKey={apiKey}
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
      </MapView>
      {selectedMarker &&
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
        <Text style={styles.buttonText}>Navigate</Text>
      </TouchableOpacity>}
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
      borderRadius:5,
      color: 'white',
      zIndex: 10000,
      opacity: 0.7
    },
    buttonText: {
      padding: 10,
      color:'white',
      fontSize: 15,
  },
});

export default MapTab;
