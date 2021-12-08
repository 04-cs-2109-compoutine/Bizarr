import React, {useState, useRef, useContext, useEffect}from 'react';
import { StyleSheet, Text ,View, SectionList, SafeAreaView, Image,} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AllHorizontal from './AllHorizontal';
import { FlatList, ScrollView as GestureHandlerScrollView,} from 'react-native-gesture-handler'


const HorizontalListing = ({listings}) => {
  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true)
  const scrollRef = useRef();

  // const onPressTouch = () => {
  //   scrollRef.current?.scrollTo({
  //     y: 0,
  //     animated: true,
  //   });
  // }

  // useEffect(() =>{
  //  return scrollRef.current.scrollTo({x: 0, y: 0, animated: true})

  // })

return(
    <GestureHandlerScrollView horizontal scrollEnabled


    // onContentSizeChange={() => scrollRef.current.scrollToEnd()}
    >
      {/* <TouchableOpacity onPress={onPressTouch}> */}
    <View style={styles.container}
    // onStartShouldSetResponderCapture={() => {
    //   setEnableScrollViewScroll(false);
    //   if (enableScrollViewScroll === false) {
    //     setEnableScrollViewScroll(true);
    //   }
    // }}
    >
    <FlatList
    //  horizontal={true}
      data={listings}
      // stickyHeaderIndices={[0]}
      keyExtractor={(item, index) => item.id.toString() }
      renderItem={({ item }) => (
        <AllHorizontal
          title={item.title}
          price={"$" + item.price}
          imageUris={item.images}
        />
      )}
    />
      </View>
      {/* </TouchableOpacity> */}
    </GestureHandlerScrollView>

)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    paddingRight: 10,
    backgroundColor: 'green',
  },
  itemPhoto: {
    width: 70,
    height: 70,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});

export default HorizontalListing;