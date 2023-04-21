import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { TextInput } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

function Feed(props) {
    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
  
    const onRegionChange = region => {
      setPosition({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      })
    }
  
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        })();
    }, []);
  
    return (
      <SafeAreaView style={style.AndroidSafeArea}>
          <TextInput
            placeholder='Enter Location'
          />
          <MapView 
            style={{width:'100%', height:'100%'}}
            initialRegion={position}
            region={position}
            onRegionChangeComplete={onRegionChange}>
            <Marker 
              coordinate={{
                latitude: position.latitude, 
                longitude: position.longitude
              }} 
              tracksViewChanges={true}>
            </Marker>
          </MapView>
      </SafeAreaView>
    );
}

const style = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  });

export default Feed;