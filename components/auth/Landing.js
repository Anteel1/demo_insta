import { FirestoreError } from 'firebase/firestore';
import React from 'react';
import { Text,View,Button,Image,TouchableOpacity,StyleSheet } from 'react-native';


export default function Landing({navigation}) {
  
  return (
    <View style={{flex:1,justifyContent:'center', padding:8}}>
      <Image 
      style={{marginHorizontal:150,width:50,height:50,marginBottom:20}}
      source={require('../../src/logo2.png')}
      />
      <Image style={{width:100, height:30, marginHorizontal:120,marginBottom:20}}
        source={require('../../src/Instagram_logo3.png')}/>
        <TouchableOpacity title="Register"
         style={styles.button}
        onPress={()=> navigation.navigate("Register")}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Login"
         style={styles.button}
        onPress={()=> navigation.navigate("Login")}> 
        <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
    </View>
  );
}
const styles= StyleSheet.create({
  button: {
    margin:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'dodgerblue',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

})
