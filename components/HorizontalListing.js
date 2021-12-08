import React, { useState, useRef, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AllHorizontal from "./AllHorizontal";
import {
  FlatList,
  ScrollView as GestureHandlerScrollView,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const HorizontalListing = ({ listings }) => {
  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true);
  const scrollRef = useRef();


return(
    <GestureHandlerScrollView 
      horizontal 
      scrollEnabled 

      contentContainerStyle={styles.contentContainer}
    >
      <FlatList
        // horizontal={true}
        data={listings}
        numColumns={2}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <AllHorizontal
            title={item.title}
            price={"$" + item.price}
            imageUris={item.images}
          />
        )}
      />
    </GestureHandlerScrollView>

  )
}


const styles = StyleSheet.create({
  contentContainer: {

    width: width,
    height: height,
    flexDirection: "row",
    flex: 1,
    marginBottom: 20,

  },
});

export default HorizontalListing;
