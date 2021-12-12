import React , {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import COLORS from "../consts/color";
import BookingList from '../Components/BookingList'
import {Header} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { userAppointments, userPrevAppointments } from '../redux/actions/salon';
import PrevBookings from '../Components/PrevBookings';
import { local_ip } from '../consts/ip';

const Left = ({navigation}) =>{
    return(
        <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
            <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>)
}


const Appointments = ({navigation}) => {

        const [appointments, setappointments] = useState()
        const [search, setsearch] = useState({
                searchUpcoming:true,
                searchPrevious:false
        })
        const dispatch = useDispatch()


    useEffect(() => {
        if(search.searchUpcoming && !search.searchPrevious){
            dispatch(userAppointments())
        }
        if(!search.searchUpcoming && search.searchPrevious){
            dispatch(userPrevAppointments())
        }
            
        
    }, [search])


    return (
        <View>
        <Header backgroundColor={COLORS.primary} containerStyle={{height:100}}
                leftComponent={ <Left navigation={navigation} />}
                centerComponent={{ text: 'My Reservations', style: { color: '#fff', fontSize:18 } }}
               
            
        />
            <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.searchButton, search.searchUpcoming? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:''] } 
                       onPress={()=>{setsearch({searchUpcoming:true, searchPrevious:false})}}>
                        <Text style={{textTransform:'uppercase',color:COLORS.primary, fontSize:14,marginVertical:20,fontWeight:'bold' }}>
                            Upcoming
                        </Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.searchButton, search.searchPrevious? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:'']} 
                    onPress={()=>{setsearch({searchUpcoming:false, searchPrevious:true})}}>
                        <Text style={{textTransform:'uppercase',  marginVertical:20, color:COLORS.primary, fontSize:14, fontWeight:'bold'}}>
                            Previous
                        </Text>
                    </TouchableOpacity>
                </View>


                {search.searchUpcoming ? <BookingList /> : <PrevBookings /> }

                
              
        </View>
    )
}

export default Appointments

const styles = StyleSheet.create({
       searchButton:{
        width:'50%', justifyContent:'center', alignItems:'center',
        
       
    }
})
