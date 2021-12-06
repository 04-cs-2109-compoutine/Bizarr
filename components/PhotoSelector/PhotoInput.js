import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from "react-native";
import colors from "../Config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function PhotoInput({ imageUri, onChangeImage }) {
  let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/bizarr/upload";

  const handlePress = () => {
    if (!imageUri) {
      pickImage();
    } else {
      Alert.alert("Delete", "Are you sure you want to delete this photo?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };

  let pickImage = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      file: base64Img,
      upload_preset: "uploadPreset",
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();

        onChangeImage(data.url);
      })
      .catch((err) => console.log(err));

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {!imageUri && (
            <MaterialCommunityIcons
              color={colors.primary}
              name="camera"
              size={40}
            />
          )}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: "center",
    height: 150,
    width: 150,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default PhotoInput;
