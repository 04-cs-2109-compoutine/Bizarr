import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import colors from "../components/Config/colors";
import LoginButton from "../components/Button/LoginButton";
import AuthContext from "../components/Config/context";

import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        authContext.setUser(user);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.logo} source={require("../assets/B.png")} />
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Input
            autoCapitalize="none"
            leftIcon={{ type: "material", name: "email" }}
            keyboardType="email-address"
            placeholder="Email"
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
            value={password}
            leftIcon={{ type: "material", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>
      <View>
        <LoginButton text="Login" onPress={handleLogin} />
      </View>
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
    width: "75%",
  },
  logo: {
    width: 250,
    height: 250,
    bottom: 10,
  },
  loginText: {
    color: "#74b49b",
    marginBottom: 10,
    marginLeft: "43%",
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
  buttonOutline: {
    // backgroundColor: "white",
    // marginTop: 5,
    borderColor: "#5C8389",
    borderWidth: 2,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#E4EFE7",
    borderRadius: 35,
    paddingTop: -75,
    marginTop: 35,
  },
});
