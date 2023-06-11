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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

import Visibility from './Visibility';
import { globalStyles } from './GlobalStyles';

export default function Register({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = useState(null)
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    Visibility();

  const handleRegister = () => {
    if (email !== '' && password !== '') {
      if(password===confirmPassword){
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
           navigation.navigate('Home');
          alert('Successfully Registered');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert(errorMessage);
        });
    }
    else{
      alert("Passwords do not match")
    } 
    }
    else {
      alert('Please enter a valid email and password');
    }
  };

  function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword || secondpassword!==firstpassword){
   alert('Passwords do not match!')
  }
}

  return (
   <TouchableWithoutFeedback onPress={() =>{
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

            <Input
            style={globalStyles.input}
          placeholder='Confirm password'
          
          placeholderTextColor={'#ffffff'}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={passwordVisibility}
         enablesReturnKeyAutomatically
         
         // onBlur={()=>checkPassword(password,confirmPassword)}
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

        <TouchableOpacity onPress={handleRegister} style={{
            backgroundColor: 'pink',
            margin:10,
            width: 200,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20}}>
          <Text style={globalStyles.letsExplore}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={globalStyles.buttonText}>Already an user? Login</Text>
        </TouchableOpacity>
      </View>
  </TouchableWithoutFeedback>
  );
}