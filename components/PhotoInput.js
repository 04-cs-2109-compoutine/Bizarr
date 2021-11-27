import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert, Image } from 'react-native';
import colors from './colors';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function PhotoInput({imageUri, onChangeImage}) {

  useEffect(() => {
    requestPermission();
  }, [])

  const requestPermission = async()=>{
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if(!result.granted){
      alert("You need to enable permission to access the library")
    }
  }

  const handlePress = () => {
    if(!imageUri){
      pickImage()
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete this photo?', [
        { text: "Yes", onPress: () => onChangeImage(null)},
        { text: 'No'}
      ])
    }
  }

  const pickImage = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        //can select video as well, not just image
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error){
      console.log("Error can't load an image", error)
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (<MaterialCommunityIcons 
          color={colors.primary}
          name="camera"
          size={40}
        />)}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: 'center',
    height: 150,
    width: 150,
    overflow: "hidden"
  },
  image: {
    height: "100%",
    width: "100%"
  }
});

export default PhotoInput;