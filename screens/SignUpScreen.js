import React, { useState, useContext } from "react";
import firebase from "firebase";
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
import AuthContext from "../components/context";

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
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      auth
        .signInWithPopup(provider)
        .then(function (result) {
          resolve(result.user);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.logo} source={require("../assets/logoid.png")} />
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
          <Input
            placeholder="Profile Picture"
            leftIcon={{ type: "material", name: "face" }}
            value={photoURL}
            onChangeText={(text) => setPhotoURL(text)}
            style={styles.input}
          />
        </View>
        <Button
          title="Register"
          buttonStyle={{ backgroundColor: colors.main }}
          onPress={handleSignUp}
        ></Button>
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
    width: 175,
    height: 175,
    bottom: 10,
  },
  loginContainer: {
    backgroundColor: "#E4EFE7",
    width: "90%",
    height: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
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
