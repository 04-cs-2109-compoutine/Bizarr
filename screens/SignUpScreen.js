<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../store/user";
import React, {
  useEffect,
  useState,
  useDispatch,
  useLayoutEffect,
  useContext,
} from "react";
import firebase from "firebase";
import { auth, db } from "../firebase";
import { addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
=======
import React, { useState, useContext } from "react";
import firebase from "firebase";
import { auth, db } from "../firebase";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
>>>>>>> main
import colors from "../components/Config/colors";
import { Input, Button } from "react-native-elements";
import AuthContext from "../components/context";

const SignUpScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
<<<<<<< HEAD
  const [imageURL, setImageURL] = useState("");

  const handleSignUp = () => {
    auth
=======
  const [photoURL, setPhotoURL] = useState("");
  const authContext = useContext(AuthContext);

  const handleSignUp = () => {
    auth  
>>>>>>> main
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
<<<<<<< HEAD
            console.log("auth", auth);
            console.log("user", user.uid);
            // console.log('henlo', user)
            // if (!db.collection("users").doc(user)){
            db.collection("users").doc(user.uid).set({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              // providerId: user.providerId
            });
            // // } else
            //   console.log('hello appy', user)

            //         const auth = getAuth();
            //         onAuthStateChanged(auth, (user) => {
            //         if (user) {
            //           db.collections('users').add(user)
            // // User is signed in, see docs for a list of available properties
            // // https://firebase.google.com/docs/reference/js/firebase.User
            //         const uid = user.uid;
            // // ...
            authContext.setUser(user);
=======
            db.collection("users").doc(user.uid).set({
              displayName: user.displayName, 
              email: user.email, 
              photoURL: user.photoURL, 
            })
>>>>>>> main
          })
          .catch(function (error) {
            alert(error.message);
          });
<<<<<<< HEAD
        if (user) {
          navigation.replace("Home");
        } else {
          navigation.popToTop();
        }
        // .catch((error) {alert(error.message);
      });
  };
=======
      })}

>>>>>>> main
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
<<<<<<< HEAD
=======
  
>>>>>>> main
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
          onPress={handleSignUp}>
        </Button>
      </View>
      <View style={styles.google}>
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> main

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
  google:{
    padding: 15
  }
});
export default SignUpScreen;
