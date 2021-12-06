import React, {useState, useContext, useEffect}  from 'react';
import { View, StyleSheet, Image, TextInput, Text } from 'react-native';
import defaultStyles from '../components/Config/styles';
import Screen from '../components/Screen';
import AuthContext from "../components/Config/context";
import { db } from "../firebase";
import UploadImage from '../components/ImagePicker';
import SubmitButton from '../components/Button/SubmitButton';

function AccountDetailsScreen() {
  const [userName, setUsername] = useState('');
  const {user, setUser} = useContext(AuthContext);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [location, setLocation] = useState();
  
  const id = user.uid;
  async function getUser() {
    try {
      db.collection("users").doc(id).get().then(
        snapshot => setUsername(snapshot.data())
      )
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleSave = async () => {
    const userRef = db.doc("users", id)
    await updateDoc(userRef, {
      userName: userName,
      phone: phone,
      email: email,
      password: password,
      location: location,
    })
  }

  return (
    <Screen style={styles.container}>
        <View style={styles.uploadImg}>
          <UploadImage URL={userName.photoURL}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={userName.displayName}
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
            placeholder={userName.email}
            keyboardType="numeric"
            placeholderTextColor={defaultStyles.colors.grey}
            style={defaultStyles.text}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Password'
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
        <View style={styles.btn}>
          <SubmitButton title="Save" onPress={handleSave}/>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  uploadImg: {
    paddingBottom: 20,
    paddingTop: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    padding: 10,
    borderRadius: 50,
    top: 10,
    margin: 10
  },
  inputContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginVertical: 10,
  },
  btn:{
    margin: 20,
    alignItems: 'center'
  }
});

export default AccountDetailsScreen;