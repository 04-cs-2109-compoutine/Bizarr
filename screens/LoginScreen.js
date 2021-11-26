import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext} from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AuthContext from "../components/context";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         authContext.setUser(user);
  //       }
  //   });
  //   return unsubscribe;
  // }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log(userCredentials)
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        authContext.setUser(user);
      }).catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.logo}
        source={require("../assets/logotransparent.png")}
      />
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address" 
            placeholder="Email"
            icon="email"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Text style={styles.signUpLink}>Don't have an Account? Sign up!</Text>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    bottom: 30,
  },
  loginContainer: {
    backgroundColor: "#E4EFE7",
    width: "90%",
    height: "25%",
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
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  signUpLink: {
    color: "white",
    top: 70,
  },
});
