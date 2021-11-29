import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function RaisedButton({ text, onPress }){
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
})