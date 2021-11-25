import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth } from "../firebase";

// const SignUpScreen = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

const handleSignUp = () => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Registered with:", user.email);
    })
    .catch((error) => alert(error.message));
};

function SignUpScreen(props) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.logo}
        source={require("../assets/logotransparent.png")}
      />
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.signUpText}>Sign Up</Text>
          <TextInput placeholder="First Name" style={styles.input} />
          <TextInput placeholder="Last Name" style={styles.input} />
          <TextInput placeholder="Username" style={styles.input} />
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
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
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
  signUpText: {
    color: "gray",
    marginBottom: 10,
    marginLeft: "40%",
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
