import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Button,  ActivityIndicator, Dimensions,Image,Alert, FlatList} from 'react-native'
import axios from "axios"
import { useSelector } from 'react-redux';
// import * as Location from 'expo-location';
import MapView,{Marker,Polyline} from 'react-native-maps';
import { Entypo, AntDesign } from '@expo/vector-icons';
import COLORS from '../consts/color';
import { local_ip } from '../consts/ip';
import NearbyList from '../Components/NearbyList';
import { mapStyle } from '../consts/mapStyle';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import sizer from "../assets/scissors.png"

const Nearby = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const coords = [33.6254994,73.0616463] 
    const [loading, setloading] = useState(true)
    const {width, height} = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.1922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const[initial,setInitial]=useState({latitude:coords[0] , longitude:coords[1],latitudeDelta:LATITUDE_DELTA,longitudeDelta:LONGITUDE_DELTA});
    const [nearby, setnearby] = useState()
   
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);

    const navigation = useNavigation()
    const flatlist = useRef();
    const mapRef = useRef();
 

    const viewConfig = useRef({itemVisiblePercentThreshold: 70})



    const onViewChanged = useRef(({viewableItems}) => {
        console.log("viewable",viewableItems)
        if (viewableItems.length > 0) {
        const selectedPlace = viewableItems[0].item;
        // console.log("selected", selectedPlace)
        setSelectedPlaceId(selectedPlace._id)
        }
    })


    useEffect(() => {
        if(location && location.length > 0){
            let payload = {
                location: location
              }
            console.log("body=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", payload)
            axios.request({
                method: 'GET',
                url: `http://${local_ip}:5000/api/user/getNearBySalons?lat=${location[0]}&long=${location[1]}`,
                data:payload
                }).then((res)=>{ 
                 
                    setnearby(res.data)
                    setloading(false)
                  }).catch((err)=>{
                        console.log(err)
                  })
        }
        

    }, [location])


    useEffect(() => {
        (async () => {
          if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
          }
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let loc = await Location.getCurrentPositionAsync({});
          setLocation([loc?.coords?.latitude, loc?.coords?.longitude]);
        //   if(location && location.length > 0){
           
        //     console.log("body=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",location[0])
            // axios.request({
            //     method: 'GET',
            //     url: `http://${local_ip}:5000/api/user/getNearBySalons?lat=${location[0]}&long=${location[1]}`

               
            //     }).then((res)=>{ 
                 
            //         setnearby(res.data)
            //         setloading(false)
            //       }).catch((err)=>{
            //             console.log(err)

            //       })
 
 
        })();
      }, []);


  


    useEffect(() => {
        if (!selectedPlaceId || !flatlist) {
          return;
        }
        const index = nearby.findIndex(place => place._id === selectedPlaceId)
        flatlist.current.scrollToIndex({index})
    
        const selectedPlace = nearby[index];
        const region = {
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }
        mapRef.current.animateToRegion(region, 1000);
      }, [selectedPlaceId])
  
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

    if(loading){
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
  
    return (
        <View style={{flex:1}}>
            
            {initial ? 
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={initial}
                    customMapStyle={mapStyle}
                >
                            <Marker
                                coordinate={{ latitude: location[0],longitude: location[1]}}
                                resizeMethod="contain"
                               
                            >
                               <Entypo name="user" size={34} color={COLORS.primary} />
                                
                            </Marker>
                    {nearby?.map((item,index)=>{
                        return(
                            <Marker
                                coordinate={{ latitude: item.location.coordinates[0],longitude: item.location.coordinates[1] }}
                                resizeMethod="contain"
                                key={index}
                            >
                                {item._id === selectedPlaceId ? 
                                  <Image
                                        style={{height:50,width:50,}}
                                        source={sizer}
                                    /> 
                                    : 
                                   <Image
                                        style={{height:40,width:40}}
                                        source={sizer}
                                    /> }
                                
                            </Marker>
                        )

                    })}
             
                </MapView>
                :
            null}
            <View style={{position:'absolute', top:50, marginHorizontal:20, backgroundColor:COLORS.primary, padding:10, borderRadius:20}}>
                <TouchableOpacity style={{}} onPress={()=>{navigation.goBack()}}>
                    <AntDesign name="caretleft" size={24} color="black" />
                </TouchableOpacity>
            </View>
             <View style={{position: 'absolute', bottom: 10}}>
                <FlatList
                    ref={flatlist}
                    data={nearby}
                    renderItem={({item}) => <NearbyList place={item} />}
                    keyExtractor={(item) => item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    decelerationRate={"fast"}
                    viewabilityConfig={viewConfig.current}
                    onViewableItemsChanged={onViewChanged.current}
                    />
            </View>
        </View>
    );
}

export default Nearby

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
})
