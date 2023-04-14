import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { TextInput } from 'react-native';
import Profile from './screens/Profile'

function Feed() {
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


function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <Profile />
  );
}

function EditProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Profile!</Text>
    </View>
  );
}

const EditProfileStack = createNativeStackNavigator();

function EditProfileStackScreen() {
  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Screen name="Profile" component={ProfileScreen} />
      <EditProfileStack.Screen name="Details" component={EditProfileScreen} />
    </EditProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

 function MyTabs() {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Feed}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
         <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile1"
          component={EditProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


