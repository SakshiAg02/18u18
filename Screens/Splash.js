import { useState } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { globalStyles } from './GlobalStyles';
export default function Splash({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ height: screenHeight, width: screenWidth }}
        source={require('../components/flashPic.png')}
        resizeMode="cover">
        <TouchableOpacity
          style={{
            backgroundColor: 'pink',
            alignSelf: 'flex-end',
            // borderWidth: 140,
            marginTop: screenHeight / 1.5,
            //marginLeft:245,
            width: 200,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            // opacity: 0
          }}
          onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.letsExplore}>Lets Explore</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}