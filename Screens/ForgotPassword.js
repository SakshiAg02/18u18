import React,{useState} from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Input } from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

import { globalStyles } from './GlobalStyles';

export default function ForgotPassword({navigation}){
  
const[email,setEmail]=useState('')
const forgotPassword=()=>{
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
   alert("Email sent! Check your inbox")
   navigation.navigate('Login');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
}
  return (
      <View style={globalStyles.container}>
        <ImageBackground
          style={{
            position: 'absolute',
            height: screenHeight,
            width: screenWidth,
          }}
          source={require('../components/login.png')}
          resizeMode="cover"
        />

        <View style={globalStyles.inputContainer}>
          <Input
            style={globalStyles.input}
            placeholder="Email"
            placeholderTextColor={'#ffffff'}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity onPress={forgotPassword} style={{
            backgroundColor: 'pink',
            margin:10,
            width: 200,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20}}>
          <Text style={globalStyles.letsExplore}>Send Email</Text>
        </TouchableOpacity>
        
      </View>
 
  );
}
