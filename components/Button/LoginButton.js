import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../Config/responsive"

export default function LoginButton({ text, onPress }){
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F4F9F4",
        height: heightPixel(35),
        width: widthPixel(100),
        marginHorizontal: pixelSizeHorizontal(20),
        borderRadius: 55,
        alignItems: 'center',
        // marginVertical: 5,
        marginTop: pixelSizeVertical(35),
        justifyContent: 'center'
    },
    buttonText: {
        color: "#5C8D89",
        fontWeight: 'bold',
        fontSize: fontPixel(20),
        textAlign: 'center'
    }
})