import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from './screens/Profile';
import Feed from './screens/Feed';
import Notification from './screens/Notification';

function FeedScreen() {
  return (
    <Feed/>
  );
}

function NotificationScreen() {
  return (
    <Notification />
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
          component={FeedScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
         <Tab.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
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


