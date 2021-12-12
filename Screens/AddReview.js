import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, ActivityIndicator} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import COLORS from './../consts/color';
import { TouchableOpacity } from 'react-native';
import { local_ip } from './../consts/ip';
import axios from "axios"



const AddReview = ({navigation , route}) => {
    
    const [review, setReview] = useState("")
    const [rating, setrating] = useState(0)
    const [loading, setloading] = useState(false)
    let data = route.params.data
    console.log("data",data)
   
    const ratingCompleted = (rating) => {
        setrating(rating)
    }
      
    const submitHandler = async () => {
        console.log(data)
        console.log(review,rating )
        console.log("profile", data.profile_id._id)
        console.log("appointment", data._id)
        let body = {
            profile_id :data.profile_id._id, 
            review: review, 
            rating: rating,
            appointment_id:data._id
        }
        console.log(body)
        try {
            setloading(true)
            let res = await axios.post(`http://${local_ip}:5000/api/user/addReview`, body)
            console.log(res)
            setloading(false)
            setReview('')
            setrating('')
            navigation.navigate("Home")
        }
        catch(err){
            console.log(err)
            setloading(false)
        }
    }
    return (
        <View style={{flex: 1, justifyContent:'center'}}>
            <View style={{alignItems:"center", alignContent:'center',}}>
                <Text style={{fontStyle:"normal", fontSize:28, color:COLORS.light}}>{`Rate the ${data?.profile_id?.name} service`}</Text>
            </View>

            
            <View style={{}}>
                <AirbnbRating
                    count={5}
                    defaultRating={rating}
                    size={20}
                    onFinishRating={ratingCompleted}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setReview}
                    value={review}
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Write your review"
                />
                <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={submitHandler}>
                    {loading ?  
                    <ActivityIndicator size="large" color="#fff" />
                    :
                    <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 18}}>Add Review</Text>
                    }
                   
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddReview

const styles = StyleSheet.create({
    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal:50,
        
        
    },
    input: {
        height: 80,
        margin: 12,
        borderWidth: 2,
        height:150, 
        textAlignVertical: 'top',
        padding:10,
        borderColor:COLORS.gray,
        fontSize:18
      },
})
