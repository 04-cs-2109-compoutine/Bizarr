import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { widthPixel, heightPixel} from "./Config/responsive"

export default function UploadImage({imageURL, onChangeImage}) {
  let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/bizarr/upload"

  const handlePress = () => {
      pickImage();
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("'Permission to access camera roll is required!");
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
        onChangeImage(data.url)
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={Styles.container}>
      <Image source={{ uri: imageURL }} key={imageURL} style={Styles.img} />
      <View style={Styles.uploadBtnContainer}>
        <TouchableOpacity onPress={handlePress} style={Styles.uploadBtn}>
          <Text>{imageURL ? "Edit" : "Upload"} </Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: heightPixel(110),
    width: widthPixel(110),
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  img: {
    width: widthPixel(110),
    height: heightPixel(110),
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "30%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
