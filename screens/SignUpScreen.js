import React, { useState, useContext } from "react";
import * as firebase from "firebase";
import { auth, db } from "../firebase";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import colors from "../components/Config/colors";
import { Input, Button } from "react-native-elements";
import AuthContext from "../components/Config/context";
import LoginButton from "../components/Button/LoginButton";

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
            likedItems: {},
            displayName: name,
            photoURL: photoURL
              ? photoURL
              : "https://www.seekpng.com/png/detail/170-1706339_simple-compass-png-map-rose.png",
          })
          .then(function () {
            db.collection("users").doc(user.uid).set({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
          })
          .catch(function (error) {
            alert(error.message);
          });
      });
  };

  //sign in with google
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    return user;
  }

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
        {/* <Button
          title="Register"
          buttonStyle={{ backgroundColor: colors.main }}
          onPress={handleSignUp}
        ></Button> */}
        <LoginButton
          text="Register"
          onPress={handleSignUp}
        />
      </View>
      <View style={styles.google}>
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Google</Text>
        </TouchableOpacity>
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
    width: 250,
    height: 250,
    bottom: 10,
  },
  loginContainer: {
    backgroundColor: "#F4F9F4",
    width: "90%",
    height: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
    fontSize: 16,
  },
  LoginLink: {
    color: "white",
    top: 70,
  },
  signUpText: {
    color: "gray",
    fontWeight: "bold",
  },
  google: {
    padding: 15,
  },
});
export default SignUpScreen;
