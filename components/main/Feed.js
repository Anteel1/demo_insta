import React, { useState,useEffect } from 'react'
import {StyleSheet,View,Text,Image,FlatList,Button,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

require('firebase/firestore')

function Feed(props) {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    if(props.usersFollowingLoaded == props.following.length && props.following.length !==0){
      props.feed.sort(function(x,y){
        return x.creation -y.creation;
      })
      setPosts(props.feed);
    }
  },[props.usersFollowingLoaded,props.feed])
  const onLikePress =(userId,postId)=>{
    firebase.firestore().collection("post")
    .doc(userId)
    .collection("userPost")
    .doc(postId)
    .collection('Like')
    .doc(firebase.auth().currentUser.uid)
    .set({})
  }
  const onDisLikePress =(userId,postId)=>{
    firebase.firestore().collection("post")
    .doc(userId)
    .collection("userPost")
    .doc(postId)
    .collection('Like')
    .doc(firebase.auth().currentUser.uid)
    .delete({})
  }
  return (
    <View style={styles.container}>
        <View style={styles.containerGallery}>
              <FlatList 
              numColumns={1}
              key={'_'}
              horizontal={false}
              data={posts}
              renderItem={({item})=>(
                <View style={styles.containerImage}>
                  <Text style={[styles.containerText,{margin:10,}]}>{item.user.name}</Text>
                <Image
                style={styles.image}
                source={{uri: item.downloadURL}}
                />
                <View style={styles.containerTexts}>
                  <Text style={styles.containerText}>{item.user.name}:</Text>
                 <Text>{item.caption}</Text>
                 </View>
                 <View style={styles.containerTexts}>
                <TouchableOpacity style={{marginRight:10}}>
                 {item.currentUserLike ?
                 <TouchableOpacity style={{width:30,height:30}} onPress={()=>onDisLikePress(item.user.uid,item.id)}>
                  <Image style={{width:'100%',height:'100%'}} source={require('../../src/290111_favorite_heart_like_love_valentine_icon.png')}
                 /></TouchableOpacity>
                   :
                   <TouchableOpacity style={{width:30,height:30}} onPress={()=>onLikePress(item.user.uid,item.id)}>
                   <Image style={{width:'100%',height:'100%'}}  source={require('../../src/5172567_heart_like_love_icon.png')}
                  /></TouchableOpacity> 
                }</TouchableOpacity>
                  <TouchableOpacity
                 onPress={()=> props.navigation.navigate('Comment',
                 {postId: item.id, uid:item.user.uid})}
                 ><Image style={{width:30,height:30}} source={require('../../src/185079_bubble_comment_talk_icon.png')} />
                 </TouchableOpacity>
                </View>
                 <Text style={{fontSize:10,color:'gray'}}>{item.creation.toDate().toDateString()}</Text>
                </View>
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
  containerText:{
    fontWeight:'bold',
    fontSize:12
  },
  containerGallery:{
    flex:1,

  },
  image:{
    flex:1,
    aspectRatio:1
  },
  containerImage:{
    flex:1,
    borderTopWidth:1,
    borderBottomColorWidth:1,
    borderColor:'#707070	',
    marginVertical:4
    
  },
  containerTexts:{
    flexDirection:'row',
  }
})
const mapStateToProps  = (store)=>({
  currentUser: store.userState.currentUser,
  following:store.userState.following,
  feed:store.usersState.feed,
  usersFollowingLoaded:store.usersState.usersFollowingLoaded,

})

export default connect(mapStateToProps,null)(Feed);