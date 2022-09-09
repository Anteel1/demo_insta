import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';

export default function Add({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
      
    );
  }       
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };            
  const takePicture = async()=>{
    if(camera){
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data.uri);
    }
  }

  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }         
  
  return (
    <View style={styles.container}>
       {image && <Image source={{uri:image}} style={{ flex:1000,resizeMode: 'stretch' }}/>}
    <View style={styles.Cameracontainer}>
      <Camera 
      ref={ref=> setCamera(ref)}
      style={styles.fixedRatio}
       type={type}
       ratio={'1:1'}
       />
    </View>
   
    <View style={[styles.buttonContainer,{flexDirection:'row'}]}>
   <TouchableOpacity style={styles.button} onPress={pickImage} >
   <Image style={{width:'100%',height:'100%'}}  source={require('../../src/7830757_filter_picture_icon.png')}/>
   </TouchableOpacity>
   <TouchableOpacity  style={styles.button} onPress={()=>takePicture()}>
    <Image style={{width:'100%',height:'100%'}} source={require('../../src/shoot_icon.png')}/>
   </TouchableOpacity>
    <TouchableOpacity style={styles.button} title="Flip Image" onPress={toggleCameraType}>
    <Image style={{width:'100%',height:'100%'}}  source={require('../../src/3592674_camera_flip_multimedia_photo_photography_icon.png')}/>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Save',{image})}>
     <Image style={{width:'100%',height:'100%'}} source={require('../../src/3994354_arrow_download_downloading_interface_save_icon.png')}/>
     </TouchableOpacity>
     </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  Cameracontainer:{
  flex:1,
  },
  fixedRatio:{ 
    aspectRatio:0.55,
    flex:1,
  },
  buttonContainer:{
      flex:0,
      margin:10,
      justifyContent:'space-around'
  },
  button:{
    width:30,height:30
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
