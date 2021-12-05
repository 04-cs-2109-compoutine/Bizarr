import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/bizarr/upload'

export default function UploadImage({photoURL, setPhotoURL}) {

  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/bizarr/upload'

  const handlePress = () => {
    if(photoURL){
      pickImage()
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete this photo?', [
        { text: "Yes", onPress: () => setPhotoURL(null)},
        { text: 'No'}
      ])
    }
  }

  const pickImage = async() => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("'Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      "file": base64Img,
      "upload_preset": "uploadPreset",
    }

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()

      setPhotoURL(data.url);
    }).catch(err => console.log(err))
  }

  // const addImage = async () => {
  //   let _image = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4,3],
  //     quality: 1,
  //   });
  //   console.log(JSON.stringify(_image));
  //   if (!_image.cancelled) {
  //     setImage(_image.uri);
  //   }
  // }

  // useEffect(() => {
  //   setImage(URL)
  //   checkForCameraRollPermission();
  // }, []);

  return (
    <View style={Styles.container}>
       <Image source={{ uri: photoURL }} style={Styles.img}/>
      <View style={Styles.uploadBtnContainer}>
        <TouchableOpacity onPress={handlePress} style={Styles.uploadBtn} >
          <Text>{photoURL ? 'Edit' : 'Upload'} Image</Text>
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
