import React, { Component } from 'react'
import { View,Button,TextInput,StyleSheet,Image,Text,TouchableOpacity,Alert} from 'react-native'

import firebase from 'firebase/compat/app'

export class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
        email: '',
        password: '',
        visible:true
    }
    this.onSignUp = this.onSignUp.bind(this)
  }
  onSignUp(){
        const { email,password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result)=>{
            console.log(result)
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
      style={{marginHorizontal:150,width:50,height:50,marginBottom:20}}
      source={require('../../src/logo2.png')}
      />
        <Image style={{width:100, height:30, marginHorizontal:118}}
        source={require('../../src/Instagram_logo3.png')}/>
        <TextInput
        style={styles.textInput}
        placeholder="email"
        onChangeText={(email)=>this.setState({email})}
        />
     <View>
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
        disabled={(this.state.password ==='')} 
        title="Sign In"
        />
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>
    <TouchableOpacity
         style={styles.button}> 
        <Text style={styles.text}><Image style={{width:20,height:20}} source={require('../../src/logo_facebook.png')}/>Log In With Facebook</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

export default Login
const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    padding:12
  },
    textInput:{
      height: 40,
          margin: 10,
          borderWidth: 2,
          borderRadius:4,
          padding: 10,
          fontSize:18
    },
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