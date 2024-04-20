import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import AboutTab from './src/screens/AboutTab';
import UploadTab from './src/screens/UploadTab';
import MapTab from './src/screens/MapTab';

const stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'green',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderColor: 'black',
          borderWidth: 0.5,
          borderRadius: 0,
          borderCurve: 'circular',
          borderStyle: 'solid',
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
      }}
    >
      <tab.Screen name="About Us" component={AboutTab}/>
      <tab.Screen name="Map" component={MapTab}/>
      <tab.Screen name="Upload" component={UploadTab}/>
      
      
    </tab.Navigator>
  )
}

const App = () => {
  return (
      <View style={styles.container}>
        <NavigationContainer>
          <stack.Navigator>
            <stack.Screen
              name="Bio Sortify"
              component={ MyTabs }
              options={{
                title: 'Bio Sortify',
                headerStyle: {
                  backgroundColor: 'green',
                  borderCurve: 'circular',
                },
                headerTintColor: '#D3D3D3',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </stack.Navigator>
        </NavigationContainer>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#blue',
  },
  textStyle: {
      fontSize: 20,
      color: '#8A2BE2',
  },
});

export default App;
