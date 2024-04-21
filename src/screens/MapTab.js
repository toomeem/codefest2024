import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const apiKey = process.env.GAIzaSyCJ1p61DQHVPq7fQV5asUr_wPz86_gKOhM;

const myDict = {

}


const MapTab = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Generate random points
    const generateRandomPoints = () => {
      const newMarkers = [];
      for (let i = 0; i < 10; i++) {
        // Center coordinates near Philadelphia, PA, USA
        const philadelphiaLatitude = 39.9526;
        const philadelphiaLongitude = -75.1652;

        // Generate random latitude and longitude coordinates near Philadelphia
        const latitude = philadelphiaLatitude + (Math.random() - 0.5) * 0.5;
        const longitude = philadelphiaLongitude + (Math.random() - 0.5) * 0.5;

        newMarkers.push({ latitude, longitude });

        const address = latitude + longitude;
        myDict[address] = 'default';
        myDict[address] = getAddress(latitude, longitude)
      }
      setMarkers(newMarkers);
    };

    generateRandomPoints();
  }, []);


  const getAddress = async (latitude, longitude) => {
    // Use a reverse geocoding service to get the address from the coordinates
    // Implement this function using a suitable reverse geocoding API
    const response = await fetch(`https://api.example.com/reverse-geocode?lat=${latitude}&lon=${longitude}&apiKey='AIzaSyCJ1p61DQHVPq7fQV5asUr_wPz86_gKOhM`);
    const data = await response.json();
    console.log("Data: ", data)
    return data;
    
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 90,
          longitudeDelta: 180,
        }}
        // Set your API key here
        apiKey={apiKey}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          >
            <Callout>
              <View>
                <Text>{String(myDict[marker.latitude+marker.longitude])}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapTab;