// import React, {useState, useSelector } from 'react';
// import {View} from 'react-native'
// import PhotoInputList from './PhotoInputList';

// function PhotoPicker(props) {
//   // const [imageUris, setImageUris] = useState([]);

//   //push a new image uri into the list and show it on screen
//   const handleAdd = uri => {
//     setImageUris([...props.imageUris, uri])
//   }

//   //remove a photo from list
//   const handleRemove = uri => {
//     setImageUris(props.imageUris.filter(imageUri => imageUri !== uri))
//   }

//   return (
//     <View>
//       <PhotoInputList
//         imageUris={props.imageUris}
//         onAdd={uri => handleAdd(uri)}
//         onRemove={uri => handleRemove(uri)}
//       />
//     </View>
//   );
// }

// export default PhotoPicker;
