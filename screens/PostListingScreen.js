import React, {useEffect, useState, useSelector, useContext} from 'react';
import { View, StyleSheet, TextInput, Picker, Alert, Modal, Text, Pressable, ScrollView, Dimensions} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import defaultStyles from '../components/Config/styles';
import SubmitButton from '../components/Button/SubmitButton';
import colors from '../components/Config/colors';
import { auth, db } from "../firebase"
import * as Location from "expo-location";
import AuthContext from "../components/Config/context";
import PhotoInputList from '../components/PhotoSelector/PhotoInputList';
import firebase from 'firebase';
import PostedScreen from './PostedScreen';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

function PostListingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({});
  const [selectedValue, setCategory] = useState("Category");
  const [errorMsg, setErrorMsg] = useState(null);
  const [imageUris, setImageUris] = useState([]);
  const {user, setUser} = useContext(AuthContext);
  const [pin, setPin] = useState({});
  const [PostVisible, setPostVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      setLocation({latitude, longitude});
    })();
  }, []);

  let text = 'Waiting..';
  let lat = "";
  let log = "";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    lat = JSON.stringify(location.latitude);
    log = JSON.stringify(location.longitude)
  }

  const handlePost = async () => {
    console.log("handlepost", imageUris);
    setPostVisible(true);
    await db.collection("listings").add({
      title: title,
      price: price,
      description: description,
      category: selectedValue,
      location: new firebase.firestore.GeoPoint(40.75, -73.996),
      images: imageUris,
      uid: user.uid
    }, (progress) => setProgress(progress))
  };

  //push a new image uri into the list and show it on screen
  const handleAdd = uri => {
    setImageUris([...imageUris, uri])
  }

  //remove a photo from list
  const handleRemove = uri => {
    setImageUris(imageUris.filter(imageUri => imageUri !== uri))
  }

  return (
    <ScrollView style={styles.container}>

      <PostedScreen
        onDone={() => setPostVisible(false)}
        progress={progress}
        visible={PostVisible}
      />

      <View style={styles.imgContainer}>
        <PhotoInputList
          imageUris={imageUris}
          onAdd={uri => handleAdd(uri)}
          onRemove={uri => handleRemove(uri)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
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
          style={defaultStyles.text}
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
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.pickerContainer}>
              <Picker
                mode={"dialog"}
                selectedValue={selectedValue}
                style={{ height: 200, width: 200 }}
                onValueChange={(itemValue) => setCategory(itemValue)}>
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Camera" value="Camera" />
                <Picker.Item label="Furniture" value="Furniture" />
                <Picker.Item label="Game" value="Game" />
                <Picker.Item label="Sports" value="Sports"/>
                <Picker.Item label="Clothing" value="Clothing"/>
                <Picker.Item label="Movies & Music" value="Movie&music"/>
                <Picker.Item label="Books" value="Books"/>
                <Picker.Item label="Electronics" value="Electronics"/>
                <Picker.Item label="Others" value="Others"/>
              </Picker>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={defaultStyles.text}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}>
        <Text style={defaultStyles.text}>{selectedValue}</Text>
      </Pressable>

      <View style={styles.inputContainer}>
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Description"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        {/* <TextInput value={pin} placeholder="Pick up Location" style={defaultStyles.text}/> */}
        <Text>Set pick up location</Text>
      </View>
        <MapView style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ASPECT_RATIO,
          }}
          onRegionChangeComplete={(location) => setLocation(location)}>
          <Marker coordinate={location}
            pinColor="red"
            value={pin}
            draggable={true}
            onDragStart={(e) => {
              console.log("Drag Start", e.nativeEvent.coordinates)
            }}
            onDragEnd={(e) => {
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              })
            }}>
          <Callout>
            <Text>Pick-up location</Text>
          </Callout>
          </Marker>
        </MapView>
      <View style={styles.btn}>
        <SubmitButton
          title="Post"
          onPress={handlePost}/>
      </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 50
  },
  map: {
    height: 300
  },
  imgContainer:{
    flexDirection: "row",
    width: "100%",
    padding: 5,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: 'center',
  },
  picker:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginVertical: 10,
  },
  btn: {
    marginTop:10,
    alignItems: "center",
  },
  pickerContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "60%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      width: "50%",
      marginVertical: 10,
    },
    buttonClose: {
      backgroundColor: colors.main,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});

export default PostListingScreen;
