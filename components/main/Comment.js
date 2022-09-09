import React, {useState,useEffect} from 'react'
import {View,Text,FlatList,Button,TextInput} from 'react-native'
import  firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore" 
require("firebase/firestore")
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions';

    function Comment(props) {
    const [comments,setComments] =useState([])
    const [postId,setPostId] = useState("")
    const [text,setText] = useState("")

    useEffect(()=>{

        function matchUserToComment(comments){
             
            for(let i =0;i<comments.length;i++){
                if(comments[i].hasOwnProperty('user')){
                    continue;
                }

                const user = props.users.find(x=>x.uid ===comments[i].creator)
                if(user ==undefined){
                    props.fetchUsersData(comments[i].creator,false)
                }else{
                    comments[i].users = user
                }
            }
            setComments(comments)
        }
        if(props.route.params.postId !== postId){
            firebase.firestore()
            .collection('post')
            .doc(props.route.params.uid)
            .collection("userPost")
            .doc(props.route.params.postId)
            .collection('Comment')
            .get()
            .then((snapshot)=>{
                let comments = snapshot.docs.map(doc =>{
                    const data = doc.data()
                    const id = doc.id;
                return {id,...data}
                })
                matchUserToComment(comments)
            })
            setPostId(props.route.params.postId)
        }
        else{
            matchUserToComment(comments)
        }
    },[props.route.params.postId,props.users])
    const onCommentSend=() =>{
        firebase.firestore()
            .collection('post')
            .doc(props.route.params.uid)
            .collection("userPost")
            .doc(props.route.params.postId)
            .collection('Comment')
            .add({
                creator:firebase.auth().currentUser.uid,
                text
            })
    }

  return (
    <View>
        <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({item})=>(
            <View>
                {item.users !== undefined ?
                <Text style={{color:'red'}}>
                    {item.users.name}
                </Text>
                :null } 
                <Text>{item.text}</Text>
           </View>
        )}
        />
        <View>
            <TextInput 
            placeholder='Comment here'
            onChangeText={(text) =>setText(text)}
            />
            <Button 
            onPress={() => onCommentSend()}
            title="Send"
            />
        </View>
    </View>
  )
}
const mapStateToProps = (store)=>({
    users: store.usersState.users
   })
  const mapDispatchProps =(dispatch) => bindActionCreators({fetchUsersData},dispatch);
  
  
  export default connect(mapStateToProps,mapDispatchProps)(Comment); 