import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Button } from 'react-native-elements';
import RaisedButton from '../nonPages/launchButton';
import Login from './LoginScreen';

const LaunchScreen = ({navigation}) =>{
    console.log({navigation});
    return(
        <View style={styles.container}>
            <Image style={{width: 300, height: 300}} source={require('../assets/image/logotransparent.png')} />
            <RaisedButton
                text="Login"
                onPress={() => navigation.navigate("Login")}/>
            <RaisedButton 
                text="Sign Up"
                onPress={() => navigation.navigate("Home")}/>
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