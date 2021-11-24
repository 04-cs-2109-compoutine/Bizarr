import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Button } from 'react-native-elements';
import RaisedButton from '../nonPages/launchButton'

const LaunchScreen = () =>{
return(
    <View style={styles.container}>
    <Image style={{width: 300, height: 300}} source={require('../src/image/logotransparent.png')} />
    <Text>
    </Text>
    <View>
    <RaisedButton
  text="Login"
  onPress={() =>
    this.props.navigation.navigate('Login')} />
<RaisedButton
text="Sign Up"
/>

    </View>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "stretch"
    },
    text: {
        color: "black",
        fontSize: 16,
        lineHeight: 32,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "white"
    }
})

export default LaunchScreen;