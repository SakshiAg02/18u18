import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Loding({ navigation }) {
  function UserLogedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        var uid = user.uid;
        // ...
      } else {
        navigation.navigate('Splash');

        // User is signed out
        // ...
      }
    });
  }
  useEffect(() => {
    UserLogedIn();
  });
  return  ( <View style={styles.container}>
        <Text
          style={{
            marginTop: 150,
            alignSelf: 'center',
            fontSize: 25,
            color: '#ec3151',
            fontWeight: 'bold',
          }}>
          Loading ... Please wait.
        </Text>
      </View>)
      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});