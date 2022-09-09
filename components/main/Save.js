import React, { useState } from 'react'
import {View,TextInput,Image,Button} from 'react-native'
import  firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
require("firebase/firestore")
require("firebase/firebase-storage-compat")

export default function Save(props) {
    const [caption,setCaption] = useState("")
    
      const uploadImage = async() =>{
        const uri = props.route.params.image;
        const childPath =`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)
        const response = await fetch(uri)
        const blob = await response.blob();
        const task = firebase
        .storage()
        .ref()
        .child(childPath)
        .put(blob);
        const taskProgress = snapshot =>{
        
        } // chay
        const taskCompleted = () =>{
          task.snapshot.ref.getDownloadURL().then((snapshot)=>{
            // create post into firestore
            savePostData(snapshot);
           
          })
        }
        const taskErro = snapshot =>{
          console.log(snapshot)
        }
        task.on("state_changed",taskProgress,taskErro,taskCompleted);
    }
    const savePostData = (downloadURL) =>{
        firebase.firestore()
        .collection('post')
        .doc(firebase.auth()
        .currentUser.uid)
        .collection("userPost")
        .add({
          downloadURL,
          caption,
          creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function(){
          props.navigation.popToTop()
        }))
    }
  return (
   <View style={{flex:1}}>
      <Image source={{uri:props.route.params.image}} />
      <TextInput 
      placeholder='Write a caption ...'
      onChangeText={(caption)=>setCaption(caption)}
      />
      <Button title='Save' onPress={()=>uploadImage()}/>
   </View>
  )
}
