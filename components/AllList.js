import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Text from "./Config/Text";
import colors from "./Config/colors";
import { AntDesign } from '@expo/vector-icons';
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"

function List({ price, imageUris, onRowPress, onPress, ifExists}) {

  return (
    <SafeAreaView style={styles.detailsContainer}>
     <TouchableOpacity onPress={onRowPress}>
        <View style={styles.card}>
          <SliderBox 
            images={imageUris} 
            style={styles.image}
            onCurrentImagePressed={onRowPress}
          />
          <View style={styles.likeContainer}>
          <TouchableOpacity style={styles.liked} onPress={onPress}>
            <AntDesign name={ifExists ? "heart" : "hearto"} size={20} color="red"/>
          </TouchableOpacity>
            <Text style={styles.price} numberOfLines={2}>
              {price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    margin: pixelSizeVertical(5),
  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
    flex: 2,
  },
  image: {
    width: "45%",
    height: heightPixel(200),
    alignItems: 'center'
  },
  price: {
    flex: 2,
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: pixelSizeHorizontal(-8)
  },
  liked:{
    margin: pixelSizeVertical(10)
  },
  likeContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: "80%",
    justifyContent: 'space-between',
  
  }
});

export default List;
