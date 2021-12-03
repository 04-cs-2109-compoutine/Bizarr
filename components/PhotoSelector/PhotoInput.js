import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert, Image } from 'react-native';
import colors from '../Config/colors';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/bizarr/upload'


function PhotoInput({imageUri, onChangeImage}) {
  // [imageUri, setImageUri] = useState("")

  useEffect(() => {
    requestPermission();
  }, [])

  const requestPermission = async()=>{
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if(!result.granted){
      alert("You need to enable permission to access the library")
      return
    }
  }
  // setSelectedImage({ localUri: pickerResult.uri })

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
        base64: true
      });
      console.log(result);
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
      let base64Img = `data:image/jpg;base64,${result.base64}`;
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
          
              setImageUris(data.url);
            }).catch(err => console.log(err))

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
