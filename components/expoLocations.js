// import * as Permissions from 'expo-permissions';
// import * as Location from 'expo-location';
// import React, { useEffect, useState } from 'react';

// //https://www.youtube.com/watch?v=UcWG2o2gVzw

// // state ={
// //   location,
// //   errorMessage: '';
// // }

// // componentWillMount(){
// //   this.getLocation();
// // }

// export default useLocation = () => {
// const [location, setLocation] = useState(location)
// const [errorMessage, setErrorMessage] = useState("")

// useEffect(() =>{
// this.getLocation();
// });

// function handleError() {
//   setErrorMessage('permission not granted')
// }

// function handleLocation(){
//   setLocation(location)
// }

// getUserLocation = async() => {
//   const { status } = await Permissions.askAsync(Permissions.Location)
// }
// if (state !== 'granted'){
//   console.log("permissions not granted")
//   handleError()
// }
// const location = await Location.getCurrentPositionAsync();
// handleLocation();
// };

// //location is returned in a json string