import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import COLORS from './../consts/color';
import { Feather } from '@expo/vector-icons';

const SmallCards = ({salon, selectedRemover}) => {
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
            
            <TouchableOpacity onPress={()=>selectedRemover(salon)} >
                  <Feather name="minus-circle" size={24} color={COLORS.white} style={{padding:4}} />
            </TouchableOpacity>
          </View>
          <Image style={styles.topHotelCardImage}   
                  source={{uri:salon.image}}
                  resizeMode="cover" />
          <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
            <Text style={{fontSize: 10, fontWeight: 'bold'}}>{salon?.name}</Text>
            <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
              {salon.description}
            </Text>
          </View>
        </View>
      );
}

export default SmallCards

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




