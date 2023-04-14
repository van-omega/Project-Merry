import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Profile() {
    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile screen!</Text>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

  const style = StyleSheet.create({
    /* Enter Styles Here */
  });
  
  

export default Profile;