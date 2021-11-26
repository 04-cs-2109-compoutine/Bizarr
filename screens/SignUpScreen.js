import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../firebase";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import BottomNavigator from "../components/BottomNavigator"

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //       if (user) {
  //           <BottomNavigator/>
  //       }
  //   });
  //   return unsubscribe;
  // }, []);

  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      }).catch((error) => alert(error.message));
    };
  
  //sign in with google
  function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.logo}
        source={require("../assets/logotransparent.png")}
      />
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="First Name" style={styles.input} />
          <TextInput placeholder="Last Name" style={styles.input} />
          {/* <TextInput placeholder="Username" style={styles.input} /> */}
          <TextInput
            placeholder="E-mail"
            // value={email}
            // onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            // value={password}
            // onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Google</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.LoginLink}>Already have an Account? Login!</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5C8389",
  },
  inputContainer: {
    width: "80%",
  },
  logo: {
    width: 200,
    height: 200,
    bottom: 20,
  },
  loginContainer: {
    backgroundColor: "#E4EFE7",
    width: "90%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#5C8389",
    width: "60%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#5C8389",
    marginTop: 15,
    borderColor: "#5C8389",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
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
});
export default SignUpScreen;
