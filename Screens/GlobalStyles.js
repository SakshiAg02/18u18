import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    top: 710,
    backgroundColor: '#ec3151',
    borderRadius: 30,
    elevation: 8,
    
  },
  title: {
    fontSize: RFValue(40),
    fontWeight: 'bold',
    color: '#ed536d',
    marginBottom: RFValue(20),
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#00000080',
    borderRadius: RFValue(10),
    padding: RFValue(10),
    marginTop: RFValue(100),
  },
  input: {
    height: RFValue(40),
    marginVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    paddingEnd: RFValue(10),
    paddingRight: RFValue(10),
    color: 'white',
    borderWidth: RFValue(1),
    borderColor: 'white',
    borderRadius: RFValue(5),
  },
  // button: {
  //   width: '80%',
  //   height: RFValue(40),
  //   backgroundColor: '#ffffff',
  //   borderRadius: RFValue(10),
  //   marginTop: RFValue(20),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: '#000000',
  },

  letsExplore: {
    alignSelf: 'center',
    fontSize: 25,
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  taskInputContainer: {
flex:1,
padding: RFValue(30)
  },
  taskInput: {
    padding: RFValue(20),
borderWidth: RFValue(5),
marginTop: RFValue(15),
  },
});