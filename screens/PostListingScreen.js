import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Text} from 'react-native';
import Screen from '../components/Screen';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from '../components/styles';
import SubmitButton from '../components/Button/SubmitButton';
import colors from '../components/colors';
import PhotoPicker from '../components/PhotoPicker';

function PostListingScreen() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Screen style={styles.container}>
      <View style={styles.picker}>
        <PhotoPicker/>
      </View>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Title"
        placeholderTextColor={defaultStyles.colors.grey}
        style={defaultStyles.text}
      />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Price"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Category"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Description"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Location"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
        />
      </View>
      <View style={styles.btn}>
        <SubmitButton 
          title="Post"
          onPress={()=> console.log("post")}/>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  picker:{
    alignItems: "center"
  },
  inputContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 25,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  btn: {
    alignItems: "center"
  }
});

export default PostListingScreen;
