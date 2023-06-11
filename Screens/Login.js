import React from 'react';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

import Visibility from './Visibility';
import { globalStyles } from './GlobalStyles';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    Visibility();

  const handleRegister = () => {
    if (email != '' && password != '') {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          alert('Welcome back');
          // ...
          
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    } else {
      alert('Please enter a valid email and password');
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
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
          <Input
            style={globalStyles.input}
            placeholder="Password"
            placeholderTextColor={'#ffffff'}
            secureTextEntry={passwordVisibility}
            onChangeText={(text) => setPassword(text)}
            value={password}
            enablesReturnKeyAutomatically
            rightIcon={
              <TouchableOpacity
                style={{
                  marginRight: 5,
                }}
                onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={22}
                  color="#232323"
                />
              </TouchableOpacity>
            }
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              fontSize: RFValue(15),
              fontWeight: 'bold',
              color: 'grey',
              marginTop: 10,
            }}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: 'pink',
            margin: 10,
            width: 200,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={globalStyles.letsExplore}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.buttonText}>New User? Click here.</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
