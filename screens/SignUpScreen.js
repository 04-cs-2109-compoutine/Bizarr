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
import colors from "../components/colors";
import { Input, Button } from "react-native-elements";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //       if (user) {
  //           <BottomNavigator/>
  //       }
  //   });
  //   return unsubscribe;
  // }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  //sign in with google
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.logo} source={require("../assets/logoid.png")} />
      <View style={styles.loginContainer}>
        <Text style={styles.signUpText}>Register</Text>
        <View style={styles.inputContainer}>
          {/* <Input placeholder="First Name" style={styles.input} /> */}
          {/* <Input placeholder="Last Name" style={styles.input} /> */}
          {/* <Input placeholder="Username" style={styles.input} /> */}
          <Input
            placeholder="Full Name"
            //label="Name"
            leftIcon={{ type: "material", name: "badge" }}
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />

          <Input
            placeholder="Email"
            //label="Email"
            leftIcon={{ type: "material", name: "email" }}
            value={email}
            onChangeText={(text) => setName(email)}
            style={styles.input}
          />

          <Input
            placeholder="Password"
            //label="Password"
            leftIcon={{ type: "material", name: "lock" }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />

          <Input
            placeholder="Profile Picture"
            //label="Profile Picture"
            leftIcon={{ type: "material", name: "face" }}
            value={imageURL}
            onChangeText={(text) => setImageUrl(text)}
            style={styles.input}
          />

          {/* <Input
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          /> */}
          {/* <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          /> */}
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Button
            title="Register"
            buttonStyle={{ backgroundColor: colors.main }}
            style={styles.RegisterButton}
          ></Button>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Google</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.LoginLink}>Already have an Account? Login!</Text> */}
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
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
  },
  // buttonContainer: {
  //width: "60%",
  // justifyContent: "center",
  //alignItems: "center",
  //marginTop: 40,
  // },
  button: {
    width: "60%",
    borderRadius: 7,
    //marginBottom: 5,
  },
  buttonOutline: {
    //backgroundColor: "#5C8389",
    borderColor: "#5C8389",
    borderWidth: 2,
  },
  // buttonText: {
  //   color: "white",
  //   fontWeight: "bold",
  //   fontSize: 12,
  // },
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
    //fontFamily:
  },
});
export default SignUpScreen;
