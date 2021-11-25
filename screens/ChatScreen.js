import React, {useState, useEffect} from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

class ChatScreen extends React.Component {
  state = {
    messages: []
  }

  get user(){
    return {
      id: firebase.uid,
      name: this.props.navigation.state.params.name
    }
  }
}

const styles = StyleSheet.create({
  container: {}
});

export default ChatScreen;