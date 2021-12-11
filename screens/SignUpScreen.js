import React, { useState, useContext } from "react";
import { auth, db } from "../firebase";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Input } from "react-native-elements";
import AuthContext from "../components/Config/context";
import LoginButton from "../components/Button/LoginButton";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../components/Config/responsive"


const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const authContext = useContext(AuthContext);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        authContext.setUser(user);
        user
          .updateProfile({
            displayName: name,
            photoURL: photoURL
              ? photoURL
              : "https://mpng.subpng.com/20180404/sqe/kisspng-computer-icons-user-profile-clip-art-big-5ac5283827d286.2570974715228703281631.jpg",
          })
          .then(function () {
            db.collection("users").doc(user.uid).set({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              likedItems: [],
              phone: "000-000-0000",
              location: "",
            });
          })
          .catch(function (error) {
            alert(error.message);
          });
      });
  };

  //sign in with google
  // async function signInWithGoogle() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   const { user } = await auth.signInWithPopup(provider);
  //   return user;
  // }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.logo} source={require("../assets/B.png")} />
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Full Name"
            leftIcon={{ type: "material", name: "badge" }}
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />

          <Input
            placeholder="Email"
            leftIcon={{ type: "material", name: "email" }}
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
          />

          <Input
            placeholder="Password"
            leftIcon={{ type: "material", name: "lock" }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <LoginButton text="Register" onPress={handleSignUp} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5C8389",
  },
  inputContainer: {
    width: "75%",
  },
  logo: {
    width: widthPixel(250),
    height: heightPixel(250),
    bottom: pixelSizeVertical(10),
  },
  loginContainer: {
    backgroundColor: "#F4F9F4",
    width: "90%",
    height: "auto",
    paddingTop: pixelSizeVertical(20),
    paddingBottom: pixelSizeVertical(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  input: {
    paddingHorizontal: pixelSizeHorizontal(15),
    paddingVertical: pixelSizeVertical(10),
    borderRadius: 10,
    marginTop: pixelSizeVertical(5),
  },
  button: {
    width: "60%",
    borderRadius: 7,
  },
  buttonOutline: {
    borderColor: "#5C8389",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: fontPixel(16),
  },
  LoginLink: {
    color: "white",
    top: pixelSizeVertical(70),
  },
  signUpText: {
    color: "gray",
    fontWeight: "bold",
  },
  google: {
    padding: pixelSizeVertical(15),
  },
});
export default SignUpScreen;
