import React, { useState, useEffect, useContext} from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AuthContext from "../components/Config/context";
import { db } from "../firebase";

export default function UploadImage() {
  const {user, setUser} = useContext(AuthContext);
  const [userName, setUsername] = useState('');
  const [image, setImage] = useState();
  //console.log(URL)
  // console.log(userName)

  useEffect(() => {
    db.collection("users").doc(user.uid).onSnapshot(
      snapshot => setUsername(snapshot.data())
    );
    setImage(userName.photoURL);
    checkForCameraRollPermission();
  }, [])

  const checkForCameraRollPermission = async() => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }
  }

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  }
 
  return (
    <View style={Styles.container}>
       {image && <Image source={{ uri: image }} style={Styles.img}/>}
      <View style={Styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={Styles.uploadBtn} >
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Styles=StyleSheet.create({
    container:{
        elevation:2,
        height:150,
        width:150, 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    img:{ 
      width: 150, 
      height: 150 
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'30%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})