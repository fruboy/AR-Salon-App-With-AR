import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import COLORS from './../consts/color';
import { Feather, Entypo } from '@expo/vector-icons';

const TopSalons = ({salon}) => {
    console.log("Top Salons", salon.item.image)
    return (
        <View style={styles.topHotelCard}>
          <View
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              zIndex: 1,
              flexDirection: 'row',
            }}>
            
            <TouchableOpacity style={{}} onPress={()=>{}}>
                <Entypo name="heart-outlined" size={30} color={COLORS.primary}  />
            </TouchableOpacity>
          </View>
          <Image style={styles.topHotelCardImage}   
                    source={{uri: `${salon.item.image}`}} s
                  resizeMode="cover" />
          <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
            <Text style={{fontSize: 10, fontWeight: 'bold'}}>{salon?.item.name}</Text>
            <Text style={{fontSize: 7, fontWeight: 'bold', color: 'black'}}>
              {salon.item.description}
            </Text>
          </View>
        </View>
      );
}

export default TopSalons

const styles = StyleSheet.create({
    topHotelCard: {
        height: 120,
        width: 120,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
      },
      topHotelCardImage: {
        height: 80,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
})




