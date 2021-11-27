import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Picker, Alert, Modal, Text, Pressable} from 'react-native';
import Screen from '../components/Screen';
import defaultStyles from '../components/styles';
import SubmitButton from '../components/Button/SubmitButton';
import colors from '../components/colors';
import PhotoPicker from '../components/PhotoPicker';
import SubmitPostButton from '../components/Button/SubmitPostButton';
import routes from '../components/routes';

function PostListingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedValue, setCategory] = useState("Category")

  return (
    <Screen style={styles.container}>
      <View style={styles.imgContainer}>
        <PhotoPicker style={styles.picker}/>
      </View>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Title"
        placeholderTextColor={defaultStyles.colors.grey}
        style={defaultStyles.text}
        value={title}
        onChangeText={(text) => setTitle(text)}
        maxLength={255}
      />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Price"
          keyboardType="numeric"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
      </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { 
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.pickerContainer}>
                <Picker
                  mode={"dialog"}
                  selectedValue={selectedValue}
                  style={{ height: 200, width: 200 }}
                  onValueChange={(itemValue) => setCategory(itemValue)}>
                  <Picker.Item label="Car" value="Car" />
                  <Picker.Item label="Camera" value="Camera" />
                  <Picker.Item label="Furniture" value="Furniture" />
                  <Picker.Item label="Game" value="Game" />
                  <Picker.Item label="Sports" value="Sports"/>
                  <Picker.Item label="Clothing" value="Clothing"/>
                  <Picker.Item label="Movies & Music" value="Movie&music"/>
                  <Picker.Item label="Books" value="Books"/>
                  <Picker.Item label="Electronics" value="Electronics"/>
                  <Picker.Item label="Others" value="Others"/>
                </Picker>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={defaultStyles.text}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={styles.inputContainer}
          onPress={() => setModalVisible(true)}>
          <Text style={defaultStyles.text}>{selectedValue}</Text>
        </Pressable>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Description"
          placeholderTextColor={defaultStyles.colors.grey}
          style={defaultStyles.text}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <SubmitPostButton 
        text="Pick up Location"
        onPress={() => navigate(routes.SEARCH_LOCATION)}
      />
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
  imgContainer:{
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginVertical: 10,
  },
  picker:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: "center"
  },
  inputContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginVertical: 10,
  },
  btn: {
    alignItems: "center"
  },
  pickerContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "60%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      width: "50%",
      marginVertical: 10,
    },
    buttonClose: {
      backgroundColor: colors.main,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});

export default PostListingScreen;
