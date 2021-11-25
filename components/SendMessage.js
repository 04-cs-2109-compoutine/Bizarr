import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import SubmitButton from '../components/Button/SubmitButton';
import { auth, db } from '../firebase';
import styles from './styles';

function SendMessage(props) {
  const [message, setMessage] = useState("");

  async function sendMessage(){
    const {uid, photoUrl} = auth.currentUser;
    await db.collection('messages').add({
      text: message,
      photoUrl,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMessage('');
  } 

  return (
    <SafeAreaView style={styles.container}>
      <TextInputField
        iconName='person'
        iconType='MaterialIcons'
        placeholder='Enter your name here'
        onChangeText={text => setMessage(text)}
      />
      <SubmitButton title='Submit' onPress={() => sendMessage()}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default SendMessage;