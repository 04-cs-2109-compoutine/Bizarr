import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Picker,
  Alert,
  Modal,
  Text,
  Pressable,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions, 
  PixelRatio
} from "react-native";
import defaultStyles from "../components/Config/styles";
import SubmitButton from "../components/Button/SubmitButton";
import colors from "../components/Config/colors";
import { db } from "../firebase";
import firebase from "firebase";
import AuthContext from "../components/Config/context";
import PhotoInputList from "../components/PhotoSelector/PhotoInputList";
import PostedScreen from "./PostedScreen";
import GoogleAutoComplete from "../components/GoogleAutoComplete";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../components/Config/responsive"

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

function PostListingScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({
    latitude: 40.752714,
    longitude: -73.97722689999999,
    description: "Grand central station, East 42nd Street, New York, NY, USA",
  });
  const [selectedValue, setCategory] = useState("Category");
  const [errorMsg, setErrorMsg] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [PostVisible, setPostVisible] = useState(false);

  let text = "Waiting..";
  let lat = "";
  let log = "";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    lat = JSON.stringify(location.latitude);
    log = JSON.stringify(location.longitude);
  }

  const clearInputs = () => {
    setTitle("");
    setPrice("");
    setCategory("Category");
    setDescription("");
    setImageUris([])
  };

  const validatePost = () => {
    const post = {
      title: title,
      price: price,
      description: description,
      category: selectedValue,
      location: location,
      images: imageUris,
      createdAt: firebase.firestore.Timestamp.now().toDate().toString(),
    };
    for (const key in post) {
      if (typeof post[key] === "string") {
        post[key] = post[key].trim();
      }
      if (
        (typeof post[key] === "object" && !Object.keys(post[key])) ||
        !post[key]
      ) {
        throw new Error(`Failed: ${key} is required`);
      }
    }
    if (errorMsg) throw new Error("Validation failed");
  };

  const handlePost = async () => {
    try {
      validatePost();
      setPostVisible(true);
      await db.collection("listings").add({
        title: title,
        price: price,
        description: description,
        category: selectedValue,
        location: new firebase.firestore.GeoPoint(
          location.latitude,
          location.longitude
        ),
        images: imageUris,
        createdAt: firebase.firestore.Timestamp.now(),
        uid: user.uid,
        sold: false,
        isLiked: false,
      });
      clearInputs();
      navigation.navigate("Account");
    } catch (error) {
      setErrorMsg(error.message);
      if (errorMsg) {
        return new Promise((resolve) => {
          setTimeout(() => {
            setErrorMsg("");
            resolve();
          }, 2000);
        });
      }
    }
  };

  //push a new image uri into the list and show it on screen
  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };

  //remove a photo from list
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <PostedScreen
            onDone={() => {
              setPostVisible(false);
            }}
            visible={PostVisible}
          />
          <View style={styles.imgContainer}>
            <PhotoInputList
              imageUris={imageUris}
              onAdd={(uri) => handleAdd(uri)}
              onRemove={(uri) => handleRemove(uri)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={defaultStyles.colors.grey}
              style={[defaultStyles.text, { flex: 1 }]}
              value={title}
              onChangeText={(text) => setTitle(text)}
              maxLength={255}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              placeholderTextColor={defaultStyles.colors.grey}
              style={[defaultStyles.text, { flex: 1 }]}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.pickerContainer}>
                  <Picker
                    mode={"dialog"}
                    selectedValue={selectedValue}
                    style={{ height: heightPixel(200), width: widthPixel(200) }}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                  >
                    <Picker.Item label="Car" value="Car" />
                    <Picker.Item label="Furniture" value="Furniture" />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Clothing" value="Clothing" />
                    <Picker.Item label="Entertainment" value="Entertainment" />
                    <Picker.Item label="Books" value="Books" />
                    <Picker.Item label="Electronics" value="Electronics" />
                    <Picker.Item label="Others" value="Others" />
                  </Picker>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={defaultStyles.text}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={defaultStyles.text}>{selectedValue}</Text>
          </Pressable>
          <View style={styles.inputContainer}>
            <TextInput
              multiline
              numberOfLines={3}
              placeholder="Description"
              placeholderTextColor={defaultStyles.colors.grey}
              style={[defaultStyles.text, { flex: 1 }]}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <GoogleAutoComplete location={location} setLocation={setLocation} />
          <View style={styles.btn}>
            <SubmitButton title="Post" onPress={handlePost} />
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: pixelSizeVertical(5),
    marginBottom: pixelSizeVertical(50),
  },
  map: {
    height: heightPixel(300),
  },
  errorMsg: {
    color: "red",
    fontWeight: "800",
  },
  imgContainer: {
    flexDirection: "row",
    width: "100%",
    padding: pixelSizeVertical(5),
    marginVertical: pixelSizeVertical(5),
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection:{
    marginLeft: 8,
    marginEnd: 8,
  },
  inputContainer: {
    width: "100%",
    padding: pixelSizeVertical(15),
    marginVertical: pixelSizeVertical(10),
    backgroundColor: colors.light,
    borderRadius: 10,
    borderColor: '#79B4B7',
    flexDirection: "row",
    elevation: 2,
    alignItems: "center",
  },
  btn: {
    marginTop: pixelSizeVertical(10),
    alignItems: "center",
    marginBottom: pixelSizeVertical(20),
    paddingBottom: pixelSizeVertical(20),
  },
  pickerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: pixelSizeVertical(22),
  },
  modalView: {
    width: "60%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: pixelSizeVertical(25),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: pixelSizeVertical(10),
    width: "50%",
    marginVertical: pixelSizeVertical(10),
  },
  buttonClose: {
    backgroundColor: colors.main,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: pixelSizeVertical(15),
    textAlign: "center",
  },
});

export default PostListingScreen;
