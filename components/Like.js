import React, {useEffect, useRef} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const Like = ({ _id, isLiked = false, onRowPress, onLikePost = () => {} }) => {

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
      <TouchableOpacity onPress={() => { isLiked = !isLiked }}>
        <LottieView 
          ref={animation}
          style={styles.heartLottie}
          autoPlay={false}
          loop={false}
          source={require("../assets/animations/like.json")}
        />
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heartLottie: {
    width: 50,
    height: 50,
  }
});

export default Like;