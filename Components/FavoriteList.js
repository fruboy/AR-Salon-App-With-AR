import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import COLORS from "../consts/color";
import salons from "../consts/salon";
import {Header} from 'react-native-elements';
import Stars from 'react-native-stars';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { loadUser } from '../redux/actions/auth';
import { useState } from 'react';
import { local_ip } from '../consts/ip';

const FavoriteList = ({items}) => {
 
    const [loading, setloading] = useState(false)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    console.log("user", user)
    console.log("items", items)
    const navigation = useNavigation()
    console.log("items:",items)
  


    const handleFavorite = async (profileId) => {

        let data = {
            profileId: profileId,
            userId: user._id
        }
        setloading(true);
        const res = await axios.post(`http://${local_ip}:5000/api/user/addToFavorite`, data);
        dispatch(loadUser())
        console.log(res.data)
        setloading(false)
    }


    return (
        <TouchableOpacity onPress={()=>{navigation.navigate("SalonDetail",   {id: items?._id,})}}  
            style={{marginVertical:10, width:'100%'}} >
          <View style={{paddingHorizontal:10}}>
                <Image source={{uri: `${items?.image}`}}  style={styles.cardImage} />
                <TouchableOpacity 
                onPress={()=>handleFavorite(items._id)}
                style={{position: 'absolute' , top: 5, right:15, backgroundColor:COLORS.white, width:40, height: 40, borderRadius:20, alignItems:'center', justifyContent:'center'}}  
                >
                    
                    <AntDesign name="heart" size={24} color={COLORS.primary} />
                </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", marginTop: 6,}}>
              <View style={{marginLeft:25}}>
                  <Text style={{fontWeight: 'bold', color:COLORS.light, }}>
                      {items?.name}
                  </Text>
                  <Text style={{fontSize: 17, fontWeight:'bold', color:COLORS.light, marginTop: 6}}>
                      {items?.address?.address}
                  </Text>
              </View>
     
          </View>
          <View style={{flexDirection:'row', marginLeft:20}}>
                    <Stars
                        display={3}
                        count={5}
                        starSize={40}
                        fullStar={<AntDesign name="star" size={20} color="orange" />}
                        emptyStar={<AntDesign name="staro" size={20} color="orange" />}
                    />
                    <Text style={{fontSize: 17, fontWeight:'bold', color:COLORS.light, marginRight:25
                    }}>
                        4.0
                    </Text>
              </View>
            
        </TouchableOpacity>

    )
}

export default FavoriteList

const styles = StyleSheet.create({
        cardImage: {
        height:150,
        width:'100%',
       
        
    },
})
