import React, {useEffect, useState, useSelector, useContext} from 'react';
import { View, StyleSheet, TextInput, Picker, Alert, Modal, Text, Pressable, ScrollView} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Screen from '../components/Screen';
import defaultStyles from '../components/Config/styles';
import SubmitButton from '../components/Button/SubmitButton';
import colors from '../components/Config/colors';
import PhotoPicker from '../components/PhotoSelector/PhotoPicker'; //image picker for listings
import {getDownloadURL, uploadBytes} from "firebase/storage"
import { auth, db } from "../firebase"
import { updateDoc, getDoc, doc} from 'firebase/firestore';
import * as Location from "expo-location";
// import { db } from '../firebase'
import AuthContext from "../components/context";
import PhotoInputList from '../components/PhotoSelector/PhotoInputList';



// const storage = getStorage();

function PostListingScreen() {
  // const [img, setImg] = useState("")
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

  // const handleUpload = () => {
  //   console.log(handle)
  //   const listingPic = doc(db, 'listings', db.collections('listings').id)
  //   getDoc(listingPic).then(docSnap => { //link to the listing insteaf of user
  //     if (docSnap.exists) {
  //     setListing(docSnap.data());
  //     }
      
  //     if (img) {
  //     const uploading = async () => {
  //      const imgRef = ref(storage, `listings/{listingsId}`)
  //      try{
  //       const snap = await uploadBytes(imgRef, img)
  //       const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
  //       const updatePic = doc(db, 'listings', db.collections('listings').id)
  //       await updateDoc(updatePic, {
  //       images: url,
  //       imagesPath: snap.ref.fullPath
  //       })
    //     setImg(img)
  //       setImg("");
  //      }
  //      catch(e){
  //        console.log(e)
  //      }
  //     }
  //     }
  //
  //     UploadingImg()
      

  // }
  // )}

  // const grabPhotoFromCameraRoll = () => {
  //   ImagePicker.openCamera({
  //     width: 1200,
  //     height: 780
  //   }).then((image) => {
  //     console.log('image picker')
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     setImg(imageUri)
  //   })
  // }

// const submitListing = () => {
//   firebase
//   .storage()
//   .ref('/uploadOk.jpeg')
//   .putFile(
//     `${firebase.storage.Native.listings/{id}}/ok.jpeg`
//   )
//   .then(successCb)
//   .catch(failureCb);
// }
  let text = 'Waiting..';
  let lat = "";
  let log = "";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    lat = JSON.stringify(location.latitude);
    log = JSON.stringify(location.longitude)
  }

  const handlePost = () => {
    db.collection("listings").add({
      title: title,
      price: price,
      category: selectedValue,
      location: pin,
      images: imageUris,
      uid: user.uid
    })
   
  };


  //push a new image uri into the list and show it on screen
  const handleAdd = uri => {
    setImageUris([...imageUris, uri])
  }

  //remove a photo from list
  const handleRemove = uri => {
    setImageUris(imageUris.filter(imageUri => imageUri !== uri))
  }
  console.log("location",location);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
      <View>
      <PhotoInputList

        imageUris={imageUris}
        onAdd={uri => handleAdd(uri)}
        onRemove={uri => handleRemove(uri)}
      />
    </View>
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
        <TextInput value={pin} placeholder="Pick up Location" style={defaultStyles.text}/>
      </View>
      <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                intialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              }}
                onRegionChangeComplete={(location) => setLocation(location)}
              >
                <Marker coordinate={location} pinColor="green"
                  draggable={true}
                  onDragStart={(e) => {
                    console.log("Drag Start", e.nativeEvent.coordinates)
                  }}
                  onDragEnd={(e) => {
                    setPin({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude
                    })
                  }}
                >
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
    alignItems: "center"
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
