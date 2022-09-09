import React, { Component,useState,useEffect } from 'react'
import { View,Button,TextInput,Image,StyleSheet,Text,TouchableOpacity,Pressable} from 'react-native'

import firebase from 'firebase/compat/app'


export class Register extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        name: '',
        visible:true
    }
    this.onSignUp = this.onSignUp.bind(this)
  }
  onSignUp(){
        const { email,password,name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result)=>{
          firebase.firestore().collection("user")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
            console.log(result) // nhan du lieu
        })
        .catch((erro)=>{
            console.log(erro) 
            alert("Please try again")
        })
  }
    
    render() {
    return (
      <View style={styles.container}>
         <Image 
      style={{marginLeft:50,resizeMode:'center'}}
      source={require('../../src/logo1.jpg')}
      />
        <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={(name)=>this.setState({name})}
        />
        <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(email)=>this.setState({email})}
        /><View>
        <TextInput
        style={{
          height: 40,
          margin: 8,
          borderWidth: 2,
          borderRadius:4,
          padding: 10,
          paddingRight:30,
          
        }}
        placeholder="Password"
        secureTextEntry={this.state.visible? true :false}
        onChangeText={(password)=>this.setState({password})}
        />
        <TouchableOpacity style={{height:20, width:20,aspectRatio:1,position:'absolute',right:18,bottom:18}}
        onPress={()=>{ 
          if(this.state.visible === true){
            this.setState({visible: this.state.visible =false})
          }else{
            this.setState({visible: this.state.visible =true})
          }
        }}
        >{this.state.visible?
          <Image source={require('../../src/383121_invisible_icon.png')}
          style={{width:'100%',height:'100%'}}
          resizeMode='contain'
          />:
        <Image source={require('../../src/383194_visible_icon.png')}  style={{width:'100%',height:'100%'}}
        resizeMode='contain' />
        
    }
        </TouchableOpacity>
        </View>
        <Button
        onPress={()=> this.onSignUp()}
        title='Sign up'
        disabled={(this.state.password ==='')} 
 />
        <Text style={styles.text}>By signing up,  you agree to our</Text>
        <Text  style={styles.text}>Terms, Data Policy and Cookies</Text>
        <Text  style={styles.text}>Policy</Text>
      </View>
    )
  }
}

export default Register
 const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    padding:8
  },
    textInput:{
      height: 40,
          margin: 8,
          borderWidth: 2,
          borderRadius:4,
          padding: 10,
    },
    text:{
      marginTop:4,
      textAlign:'center',
      color:'#a9a9a9'
    },
    
 })