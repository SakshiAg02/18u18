import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// import { floatingButton } from './FloatingButton';
import { globalStyles } from './GlobalStyles';

// import AddTask from './AddTask'

export default function Home({ navigation }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const datee = new Date();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDay = days[datee.getDay()];

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    setCurrentDateTime(currentDay + ' ' + date + '-' + month + '-' + year); //format: d-m-y;

    // const interval = setInterval(() => {
    //   const currentDate = new Date();

    //   setCurrentDateTime(currentDate.toLocaleString());
    // }, 1000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  useEffect(() => {
    getTasks();
  });

  const getTasks = async () => {
    const user = firebase.auth().currentUser;

    const email = user.email;

    await db.collection(email).onSnapshot((snapshot) => {
      var allT = [];
      snapshot.docs.map((doc) => {
        var task = doc.data();
        task.id = doc.id;
        allT.push(task);
      });
      setTasks(allT);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: '#e75480',
          width: '90%',
          marginLeft: 30,
          marginRight: 13,
          borderRadius: 20,
        }}>
        <View
          style={{
            backgroundColor: '#f9ccca',
            borderRadius: 10,
            marginLeft: 20,
            padding: 10,
            width: '95%',
          }}>
          <ScrollView>
            <Text
              style={{
                fontSize: RFValue(15),
                marginLeft: RFValue(5),
              }}>
              Date : {item.date}
            </Text>
            <Text
              style={{
                fontSize: RFValue(15),
                marginLeft: RFValue(5),
              }}>
              Time : {item.time}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: RFValue(23),
              }}>
              {item.task}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          alignSelf: 'flex-start',
          marginTop: 20,
          marginLeft: 20,
          fontWeight: 'bold',
        }}>
        Today
      </Text>
      <Text
        style={{
          fontSize: 15,
          alignSelf: 'flex-start',
          marginLeft: 20,
          color: 'grey',
        }}>
        {currentDateTime}
      </Text>
      <CalendarStrip
        daySelectionAnimation={{
          type: 'border',
          duration: 100,
          borderWidth: 4,
          borderHighlightColor: 'pink',
        }}
        style={{
          height: '15%',
          fontSize: 40,
        }}
        calendarHeaderStyle={{
          color: '#de3161',
          fontSize: 18,
          marginTop: 20,
        }}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black' }}
        highlightDateNumberStyle={{ color: '##0d2e63' }}
        highlightDateNameStyle={{ color: '##0d2e63' }}
        selectedDate={moment()}
        scrollable={true}
        iconContainer={{ flex: 0.1 }}
      />

      <View style={{ flex: 0.8 }}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          //ListHeaderComponent={() => (!this.getTasks.length?
          // <Text style={styles.emptyMessageStyle}>No Records at the moment</Text>
          // : null)
          // }
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddTask')}
        style={globalStyles.fab}>
        <AntDesign name="plus" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
