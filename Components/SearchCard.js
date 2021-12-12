import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import COLORS from "../consts/color";
import {Header} from 'react-native-elements';
import Stars from 'react-native-stars';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const SearchCard = ({item}) => {
    const navigation = useNavigation();
   console.log("props item", item)
    return (
       
        <ScrollView style={{marginVertical:10, width:'100%'}} >
            <TouchableOpacity  onPress={()=>
                        {navigation.navigate("SalonDetail",   {
                            id:item._id,
                        }
                        )}}  
            >
                <View style={{paddingHorizontal:10}}>
                    <Image source={{uri: `${item.image}`}}  style={styles.cardImage}  />
                    <TouchableOpacity style={{position: 'absolute' , top: 5, right:15, backgroundColor:COLORS.white, width:40, height: 40, borderRadius:20, alignItems:'center', justifyContent:'center'}}  >
                        <AntDesign name="heart" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                    
                <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", marginTop: 6,}}>
                    <View style={{marginLeft:15}}>
                        <Text style={{fontWeight: 'bold', color:COLORS.light, }}>
                            {item.name}
                        </Text>
                        <Text style={{fontSize: 17, fontWeight:'bold', color:COLORS.light, marginTop: 6}}>
                            {item?.address?.address}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>

            
        </ScrollView>
    )
}

export default SearchCard

const styles = StyleSheet.create({
        cardImage: {
        height:150,
        width:'100%',
       
        
    },
})
