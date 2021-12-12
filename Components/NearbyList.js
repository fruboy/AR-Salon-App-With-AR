import React from 'react';
import { View, Text, Image, useWindowDimensions, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const NearbyList = (props) => {
    const place = props.place;
    console.log(place)
    const width = useWindowDimensions().width;
  
    const navigation = useNavigation();
  
  
    return (
        <Pressable   onPress={()=>
            {navigation.navigate("SalonDetail",   {
                id: place._id,
            }
            )}}  
        style={[styles.container, { width: width - 60}]}>
      <View style={styles.innerContainer}>
        {/* Image  */}
        <Image
          style={styles.image}
          source={{uri: place.image}}
        />

        <View style={{flex: 1, marginHorizontal: 10}}>
          {/* Bed & Bedroom  */}
          <Text style={styles.bedrooms}>
            {place.name}
          </Text>

          {/* Type & Description */}
          <Text style={styles.description} numberOfLines={2}>
                {place.description}
          </Text>

          {/*  Old price & new price */}
          <Text style={styles.prices}>
            {}
           
          </Text>
        </View>
    </View>
        </Pressable>
    )
}

export default NearbyList

const styles = StyleSheet.create({
    container: {
        height: 120,
        padding: 5,
    
    
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    
        elevation: 10,
      },
    
      innerContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden'
      },
    
      image: {
        height: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
      },
    
      bedrooms: {
        marginVertical: 10,
        color: '#5b5b5b',
      },
      description: {
        fontSize: 12,
      },
      prices: {
        fontSize: 15,
        marginVertical: 10,
      },
      oldPrice: {
        color: '#5b5b5b',
        textDecorationLine: 'line-through',
      },
      price: {
        fontWeight: 'bold',
      },
      totalPrice: {
        color: '#5b5b5b',
        textDecorationLine: 'underline',
      }
})
