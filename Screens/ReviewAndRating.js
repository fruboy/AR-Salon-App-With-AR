import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, ScrollView} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import COLORS from '../consts/color';
import { local_ip } from './../consts/ip';
import axios  from 'axios';


const ReviewAndRating = ({route,navigation}) => {

    const [loading, setloading] = useState(false)
    const [reviews, setreviews] = useState()

    const profile_id = route.params.profile_id
    console.log(profile_id)
   

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        let body = {
            profile_id: profile_id,
          
        }
        console.log(body)
        setloading(true)
        axios.get(`http://${local_ip}:5000/api/user/getReview/${profile_id}`
        ).then(function (response) {
            console.log(response.data);        
            setreviews(response.data)
            setloading(false)
        })
        .catch(function (error) {
            console.log(error);
        });

       
    }, [])


    return (

        <>
        {loading ?  
            <View style={{flex:1, justifyContent:"center", alignItems:"center", top:windowHeight/18 }}>
                <ActivityIndicator size="large" color={COLORS.primary} /> 
            </View>
            :
            <ScrollView>

                <View style={{justifyContent:"center", alignItems:"center", marginTop:15}}>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Review and Rating</Text>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                        <AntDesign name="star" size={20} color="orange" />
                        <Text style={{fontWeight:"bold", fontSize:40, marginHorizontal:3}}>4.9</Text>
                    </View>
                
                </View>
                {reviews?.map((item,index)=>{
                    return (
                        <View key={index} style={{backgroundColor:COLORS.gray, marginHorizontal:20, borderRadius:8, paddingVertical:20, marginVertical:5}}>
                        <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center",marginHorizontal:10}}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                    <Avatar
                                        rounded
                                        icon={{name: 'user', type: 'font-awesome'}}
                                        activeOpacity={0.7}
                                        containerStyle={{backgroundColor:"black"}}
                                    />
                                    <Text style={{marginLeft:10}}>
                                        {item.user_id.name}
                                    </Text>
                                </View>
                                <View style={{}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <AntDesign name="star" size={16} color="orange" />
                                        <Text style={{}}>
                                            {`${item.rating}.0`}
                                        </Text>
                                    </View>
                                
                                </View>
                                
                            </View>
                            <View style={{marginHorizontal:10}}>
                                <Text style={{}}>
                                    {item.review}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            }
        </>
    )
}

export default ReviewAndRating

const styles = StyleSheet.create({})
