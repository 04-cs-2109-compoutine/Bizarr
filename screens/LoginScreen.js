import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import { Input, Button } from "react-native-elements";
import colors from "../components/Config/colors";

import AuthContext from "../components/context";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    console.log('handled loggin')
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // console.log(userCredentials);
        const user = userCredentials.user;
        // console.log("Logged in with:", user.email);
        authContext.setUser(user);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.logo} source={require("../assets/logoid.png")} />
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            leftIcon={{ type: "material", name: "email" }}
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            placeholder="Password"
            leftIcon={{ type: "material", name: "lock" }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View>
          <Button
            onPress={handleLogin}
            title="Log in"
            buttonStyle={{ backgroundColor: colors.main }}
            style={styles.loginButton}
          ></Button>
        </View>
      </View>
      <Text
        style={styles.signUpLink}
        onPress={() => navigation.navigate("Sign Up")}
      >
        Don't have an Account? Sign up!
      </Text>
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
    bottom: 20,
  },
  loginText: {
    color: "gray",
    marginBottom: 10,
    marginLeft: "43%",
  },
  loginContainer: {
    backgroundColor: "#E4EFE7",
    width: "90%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  loginButton: {
    width: 200,
    borderRadius: 10,
  },
  signUpLink: {
    color: "white",
    top: 70,
  },
});
