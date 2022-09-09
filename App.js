
import React, { Component } from 'react';
import {View,Text} from 'react-native';
import  firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
const store =createStore(rootReducer,applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyDkQsaCdAg4lG9esmOKJqUOKVi5vVlJkg4",
  authDomain: "instagram-dev-81af6.firebaseapp.com",
  databaseURL: "https://instagram-dev-81af6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "instagram-dev-81af6",
  storageBucket: "instagram-dev-81af6.appspot.com",
  messagingSenderId: "12176017500",
  appId: "1:12176017500:web:c894346ed869689e93fe99",
  measurementId: "G-LJ8E66GJTF"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import CommentScreen from './components/main/Comment';
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded:false,

    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true,
        })
      }else{
        this.setState({
          loggedIn:true,
          loaded:true,
        })
      }
      
    })
  }
  render() {
    const{loggedIn,loaded} =this.state;
    if(!loaded){
        return(
          <View style={{flex:1,justifyContent:'center'}}>
            <Text>Loading</Text>
          </View>
        )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component ={LandingScreen}
            options={{headerShown:false}}/>
             <Stack.Screen name="Register" component ={RegisterScreen}/>
             <Stack.Screen name="Login" component ={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component ={MainScreen} />
            <Stack.Screen name="Add" component ={AddScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name="Save" component ={SaveScreen}  navigation = {this.props.navigation} />
            <Stack.Screen name="Comment" component ={CommentScreen}  navigation = {this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
  }
}

export default App



