import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import LottieView from 'lottie-react-native';
import Text from "./Config/Text";
import colors from "./Config/colors";

function List({ title, price, imageUris, onRowPress, isLiked = false, onLikePost = () => {}, _id }) {

  const animation = useRef(null);
  const isFirstRun = useRef(true);

  useEffect(()=>{
    if(isFirstRun.current){
      if(isLiked){
        animation.current.play(66, 66)
      } else {
        animation.current.play(19, 19)
      }
      isFirstRun.current = false;
    }else if(isLiked){
      animation.current.play(19, 50)
    } else {
      animation.current.play(0, 19);
    }
  }, [isLiked])

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
              <TouchableOpacity onPress={() => {
                onLikePost(_id);
              }} >
                <LottieView
                  ref={animation}
                  style={styles.heartLottie}
                  source={require("../assets/animations/like.json")}
                  autoPlay={false}
                  loop={false}/>
              </TouchableOpacity>
            
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
          
          <Text style={styles.price} numberOfLines={2}>
            {price}
          </Text>

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
    margin: 5,
  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
    flex: 2,
  },
  image: {
    width: "45%",
    height: 200,
    alignItems: 'center'
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
    marginBottom: 5
  },
  title: {
    flex: 2,
    textAlign: "center",
    marginLeft: -5
  },
  heartLottie: {
    flex: 1,
    width: 50,
    height: 50,
    marginLeft: -2
  },
  likeContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: "80%",
  }
});

export default List;
