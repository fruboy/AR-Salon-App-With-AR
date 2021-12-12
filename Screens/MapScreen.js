import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Map from './../Components/Map';

const MapScreen = ({route, navigation}) => {
    const coords= route.params.coords
    console.log(coords)
    return (
        <View style={{height:'100%'}}>
            <Map coords={coords}/>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
