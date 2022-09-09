import React,{useState} from 'react'
import {View,Text,TextInput,FlatList,TouchableOpacity,Image} from 'react-native';
import  firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
require('firebase/firestore')


export default function Search(props) {
    const [users,setUsers]= useState([])
    const fetchUsers = (search)=>{
        firebase.firestore()
        .collection('user')
        .where('name','>=',search)
        .get()
        .then((snapshot)=>{
            let users = snapshot.docs.map(doc =>{
                const data =doc.data();
                const id = doc.id;
                return {id, ...data}
            });
            setUsers(users);
        })
    }
 
    return (
    <View>
        <TextInput placeholder='Search . . .' onChangeText={(search)=>fetchUsers(search)}/>
        <Image source={require('../../src/4092559_search_magnifier_mobile ui_zoom_icon.png')}/>
        <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item})=>(
            <TouchableOpacity
            onPress={()=> props.navigation.navigate("Profile", {uid: item.id})}
            >
            <Text>
                {item.name}
            </Text>
            </TouchableOpacity>
        )}
        />
    </View>
  )
}
