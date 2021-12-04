import React, {useRef} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import PhotoInput from './PhotoInput';

//when add photos, make all photos in a row and save them in a list. Also need remove and add functions
function PhotoInputList({imageUris = [], onRemove, onAdd}) {
  const scrollView = useRef();
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}>
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.img}>
              <PhotoInput
                imageUri={uri}
                onChangeImage={() => onRemove(uri)} />
            </View>
          ))}
          <PhotoInput onChangeImage={(uri) => onAdd(uri)}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  img:{
    marginRight: 10,
  }
});

export default PhotoInputList;
