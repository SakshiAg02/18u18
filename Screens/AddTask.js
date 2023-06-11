import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Arrow,
  Platform,
} from 'react-native';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { FontAwesome } from '@expo/vector-icons';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
export default function WorkTab({ navigation }) {
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [triggerDay, setTriggerDay] = useState('');
  const [triggerMonth, setTriggerMonth] = useState('');
  const [time, setTime] = useState('');
  const [triggerTS, setTriggerTS] = useState('');

  const trigger = new Date(triggerTS);

  trigger.setHours(16);
  trigger.setMinutes(50);
  trigger.setSeconds(0);
  async function sendPushNotification(expoPushToken) {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Scheduler',
        body: task,
        data: {},
      },

      trigger,
    });

    alert('You have successfully subscribed for notifications');
  }
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    var d = new Date();
    console.log(d.toDateString());
    setMinDate(d);
  }, []);

  async function submitButton() {
    if (date && time && task) {
      await db.collection(firebase.auth().currentUser.email).add({
        date: date,
        time: time,
        task: task,
      });
      alert('Task Added');
    } else {
      alert('Please Enter all Details');
    }
  }

  return (
    <View>
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="leftcircleo" size={40} color="grey" />
        </TouchableOpacity>
        <Text style={styles.headerText}> Be Productive </Text>
      </View>
      <View>
        <Text style={{ alignSelf: 'flex-end', fontSize: 25, color: '#DE3161' }}>
          {' '}
          Add Schedule{' '}
        </Text>
      </View>

      <Calendar
        onDayPress={(day) => {
          console.log('Calender date' + day.timestamp);
          setTriggerTS(day.timestamp);
          setDate(day.dateString);
          alert('Date Selected');
          // setTriggerDay(day.day)
          // setTriggerMonth(day.month)
        }}
        theme={{
          backgroundColor: '#FFD1DC',
          calendarBackground: '#FFD1DC',
          textSectionTitleColor: '#174475',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'black',
          indicatorColor: 'black',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 20,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 20,
        }}

        //  minDate = {minDate}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TextInput
          style={{
            alignSelf: 'center',
            padding: 10,
            height: 60,
            width: 150,
            marginTop: 20,
            borderWidth: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderColor: 'grey',

            // fontFamily : "Comic-Neue"
          }}
          placeholder={'Task Description'}
          onChangeText={(text) => {
            setTask(text);
          }}
          value={task}
        />

        <TextInput
          style={{
            alignSelf: 'center',
            padding: 10,
            height: 60,
            width: 150,
            marginTop: 20,
            borderWidth: 2,
            borderColor: 'grey',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            //  fontFamily : "Comic-Neue"
          }}
          placeholder={'Time'}
          onChangeText={(text) => {
            setTime(text);
          }}
          value={time}
        />
      </View>
      <TouchableOpacity
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
        style={{ alignSelf: 'center', marginTop: 10 }}>
        <Text>Need to be notified? Click here.</Text>
        <Entypo
          name="bell"
          size={24}
          color="pink"
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle} onPress={submitButton}>
        <Text style={{ color: 'white', fontSize: 25 }}> Add Schedule </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    // height: RFValue(60),
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
    // alignItems: 'center'
  },
  headerText: {
    fontSize: RFValue(15),
    color: 'grey',
    // fontFamily : "Comic-Neue"
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  buttonStyle: {
    backgroundColor: 'grey',

    marginTop: RFValue(20),
    width: '80%',
    height: RFValue(50),
    // borderWidth: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
