import React, { useState,useEffect } from 'react'
import {StyleSheet,View,Text,Image,FlatList,Button,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import  firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
require('firebase/firestore')

function Profile(props) {
  const [userPosts,setUserPosts] = useState([]);
  const [user,setUser] = useState([null]);
  const [following,setFollowing] = useState(false);
  const [follower,setFollower] = useState(false); 
  useEffect(() => {
    const{currentUser,posts}= props;
    if(props.route.params.uid === firebase.auth().currentUser.uid){
        setUser(currentUser)
        setUserPosts(posts)

    }else{
      firebase.firestore().collection("user")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists){
               setUser(snapshot.data());
                
            }
        })
        firebase.firestore().collection("post")
        .doc(props.route.params.uid)
        .collection("userPost")
        .orderBy("creation","asc")
        .get()
        .then((snapshot)=>{
            let posts = snapshot.docs.map(doc =>{
                const data =doc.data();
                const id = doc.id;
                return {id, ...data}
            })
               setUserPosts(posts) 
        })
    }
    if(props.following.indexOf(props.route.params.uid) >-1){
        setFollowing(true);
    }else{
      setFollowing(false);
    }

  }, [props.route.params.uid,props.following])
  const onFollow=() =>{
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})
 
  }
  const onUnfollowing=() =>{
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .delete({})
  }


  const onLogout = ()=>{
    firebase.auth().signOut();
  }

  if(user === null ){
    return <View/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={{fontSize:20,fontWeight:'bold',marginBottom:8}}>{user.name}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ?
        (
          <View>
            {following ? (
              <Button 
              title='Following'
              color='#FF1744'
              onPress={()=> onUnfollowing()}
              />
              
            ):(
              <Button 
              title='Follow'
              onPress={()=> onFollow()}
              />
            ) }
          </View>
        ) :  <Button 
        title='Logout' color='#778899'
        onPress={()=> onLogout()}
        />
        }
       
        <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:10}}>
        <Text style={{fontWeight:'bold',fontStyle:'italic'}}>Posts :{userPosts.length}</Text>
        <Text style={{fontWeight:'bold',fontStyle:'italic'}}>Following:{props.following.length}</Text>
        </View>
        <View style={{borderBottomWidth:2}}></View>
        </View>
        <View style={styles.containerGallery}>
              <FlatList 
              numColumns={3}
              horizontal={false}
              data={userPosts}
              renderItem={({item})=>(
                <TouchableOpacity style={styles.containerImage}>
                <View >
                <Image
                style={styles.image}
                source={{uri: item.downloadURL}}
                />
                </View>
                </TouchableOpacity>
              )}
              />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    
  },
  containerInfo:{
    margin:24,
  },
  containerGallery:{
    flex:1,
  },
  image:{
    flex:1,
    aspectRatio:1/1,
    marginLeft:1,
    marginTop:1
  },
  containerImage:{
    flex:1/3,
    
  }
})
const mapStateToProps  = (store)=>({
  currentUser: store.userState.currentUser,
  posts:store.userState.posts,
  following:store.userState.following

})

export default connect(mapStateToProps,null)(Profile);