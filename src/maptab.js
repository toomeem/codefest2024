import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const apiKey = process.env.GAIzaSyCJ1p61DQHVPq7fQV5asUr_wPz86_gKOhM;

const MapTab = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:2000}}>Hi</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
    
        customMapStyle={[]}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        followsUserLocation={true}
        loadingEnabled={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapTab;


// AIzaSyCJ1p61DQHVPq7fQV5asUr_wPz86_gKOhM