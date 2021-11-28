import React, {useState} from 'react';
import {View} from 'react-native'
import PhotoInputList from './PhotoInputList';

function PhotoPicker() {
  const [imageUris, setImageUris] = useState([]);

  //push a new image uri into the list and show it on screen
  const handleAdd = uri => {
    setImageUris([...imageUris, uri])
  }

  //remove a photo from list
  const handleRemove = uri => {
    setImageUris(imageUris.filter(imageUri => imageUri !== uri))
  }

  return (
    <View>
      <PhotoInputList 
        imageUris={imageUris}
        onAdd={uri => handleAdd(uri)}
        onRemove={uri => handleRemove(uri)}
      />
    </View>
  );
}

export default PhotoPicker;