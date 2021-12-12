import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button,  ActivityIndicator, Dimensions,Image,Alert} from 'react-native'

import { useSelector } from 'react-redux';
import MapView,{Marker,Polyline} from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import { mapStyle } from '../consts/mapStyle';
import COLORS from '../consts/color';
import sizer from "../assets/scissors.png"




const Map = ({coords}) => {


    const salons = useSelector(state => state.salon.salons)
    const[initial,setInitial]=useState();
    const[marker,setMarker]=useState()
    const {width, height} = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.1922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


    useEffect(() => {
      setInitial({latitude:coords[0] , longitude:coords[1],latitudeDelta:LATITUDE_DELTA,longitudeDelta:LONGITUDE_DELTA,});
      setMarker({latitude:coords[0] , longitude:coords[1]})
    }, [])
    

  
    // useEffect(() => {
    //   (async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //       setErrorMsg('Permission to access location was denied');
    //       return;
    //     }
  
    //     // let location = await Location.getCurrentPositionAsync({
    //     //   enableHighAccuracy: true,
    //     // });

    //     // console.log(location)
    //     // setLocation(location);

    //     //let location = await Location.watchPositionAsync(
    //     //   {
    //     //       enableHighAccuracy: true,
    //     //       distanceInterval: 100000000000000000,
    //     //       timeInterval: 1000000000
    //     //   },
    //     //   newLocation => {

    //     //      console.log('callback is called');
           

    //     // },
    //   );

        
    //   })();
    // }, []);
  
    // let text = 'Waiting..';
    // if (errorMsg) {
    //   text = errorMsg;
    // } else if (location) {
    //   text = JSON.stringify(location);
    // }
  
    return (
      <View style={{flex:1}}>
        {initial ? 
            <MapView style={styles.map}
    initialRegion={initial}
    customMapStyle={mapStyle}
    >
    <Marker
        coordinate={marker}
        resizeMethod="contain"
        >
             <Image
                  style={{height:40,width:40}}
                  source={sizer}
              />
    </Marker>
    
    
    
    </MapView>
: null}
      </View>
    );
  }

  export default Map

  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  })