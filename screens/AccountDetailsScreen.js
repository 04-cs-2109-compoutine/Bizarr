import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import defaultStyles from "../components/Config/styles";
import Screen from "../components/Screen";
import { db, auth } from "../firebase";
import UploadImage from "../components/ImagePicker";
import SubmitButton from "../components/Button/SubmitButton";
import AuthContext from "../components/Config/context";
import PostedScreen from "./PostedScreen";

function AccountDetailsScreen({navigation}) {
  const [userName, setUsername] = useState("");
  const { user, setUser } = useContext(AuthContext);
  // const user = auth.currentUser;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [location, setLocation] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [PostVisible, setPostVisible] = useState(false);

  const id = user.uid;
  async function getUser() {
    try {
      db.collection("users")
        .doc(id)
        .get()
        .then((snapshot) => setUsername(snapshot.data()));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
    setPhotoURL(userName.photoURL);
  }, []);

  // helper function to check if fields have been left empty (they are required)
  const checkTextInput = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (!phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!location.trim()) {
      alert('Please enter your location');
      return;
    }
    if (!currPassword.trim()) {
      alert('Please enter your current password');
      return;
    }
    if (!newPassword.trim()) {
      alert('Please enter your new password');
      return;
    }
  };

  // the save button will sign the user in again with the entered current password and then update the collection with the new info
  const handleSave = async () => {
    // checkTextInput();
    auth
      .signInWithEmailAndPassword(email, currPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          user.updateEmail(email);
          user.updatePassword(newPassword);
        })
    const userRef = db.collection("users").doc(id)
    await userRef.set({
      displayName: name,
      phone: phone,
      email: email,
      location: location,
      photoURL: photoURL
    })
      .catch(function (error) {
        alert(error.message);
      });
      navigation.navigate("Account");
    }

  return (
    <ScrollView>
      <PostedScreen
        onDone={() => {
          setPostVisible(false);
        }}
        visible={PostVisible}
      />
      <View style={styles.uploadImg}>
        <UploadImage photoURL={userName.photoURL} setPhotoURL={setPhotoURL} userName={userName}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={userName.displayName}
          placeholderTextColor={defaultStyles.colors.grey}
          style={[defaultStyles.text, {flex: 1}]}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Phone"
          keyboardType="numeric"
          placeholderTextColor={defaultStyles.colors.grey}
          style={[defaultStyles.text, {flex: 1}]}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={user.email}
          placeholderTextColor={defaultStyles.colors.grey}
          style={[defaultStyles.text, {flex: 1}]}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Current Password"
          placeholderTextColor={defaultStyles.colors.grey}
          style={[defaultStyles.text, {flex: 1}]}
          value={currPassword}
          onChangeText={(text) => setCurrPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New Password"
          placeholderTextColor={defaultStyles.colors.grey}
          style={[defaultStyles.text, {flex: 1}]}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Location"
          placeholderTextColor={defaultStyles.colors.grey}
          style={[defaultStyles.text, {flex: 1}]}
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>
      <View style={styles.btn}>
        <SubmitButton title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  uploadImg: {
    paddingBottom: 20,
    paddingTop: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    padding: 10,
    borderRadius: 50,
    top: 10,
    margin: 10,
  },
  inputContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FEFBF3',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#79B4B7',
    flexDirection: "row",
    elevation: 2,
    alignItems: "center"
  },
  btn: {
    margin: 10,
    alignItems: "center",
  },
});

export default AccountDetailsScreen;
