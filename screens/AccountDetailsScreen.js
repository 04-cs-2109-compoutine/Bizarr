import React, {useState} from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import defaultStyles from '../components/styles';
import Screen from '../components/Screen';

function AccountDetailsScreen() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [location, setLocation] = useState();

  return (
    <Screen style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require("../assets/user.png")}
            style={styles.userLogo} 
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            placeholderTextColor={defaultStyles.colors.grey}
            style={defaultStyles.text}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone"
            keyboardType="numeric"
            placeholderTextColor={defaultStyles.colors.grey}
            style={defaultStyles.text}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="numeric"
            placeholderTextColor={defaultStyles.colors.grey}
            style={defaultStyles.text}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={defaultStyles.colors.grey}
            style={defaultStyles.text}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Location"
            placeholderTextColor={defaultStyles.colors.grey}
            style={defaultStyles.text}
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  logoContainer:{
    marginTop: 10,
    marginBottom: 20,
  },
  userLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    padding: 10,
    borderRadius: 50,
    top: 10,
  },
  inputContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginVertical: 10,
  },
});

export default AccountDetailsScreen;