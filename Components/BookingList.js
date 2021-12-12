import React, {useEffect} from 'react'
import { StyleSheet, Text, View,Dimensions, ActivityIndicator,ScrollView, TouchableOpacity} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
import COLORS from '../consts/color';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {userAppointments} from "../redux/actions/salon"
import { local_ip } from './../consts/ip';
import axios from 'axios';


const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'gray', backgroundColor:COLORS.gray }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

const BookingList = () => {
    const appointments = useSelector(state => state.salon.accepted)
    const loading = useSelector(state => state.salon.loading)
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log("fetched", appointments)
    const dispatch = useDispatch()
   
    useEffect(() => {
      dispatch(userAppointments())
    }, [])


    const cancelHandler = async (id,userId,salonId)=>{
      try{
        let body ={
          id,
          userId,
          salonId
        }
        console.log("body", body)
        let res = await axios.post(`http://${local_ip}:5000/api/user/cancelBooking`, body)
        console.log(res.data)
        Toast.show({
          type: 'success',
          text1: `${res.data}`,
          
        })
        dispatch(userAppointments())
      }
      catch(err){
        console.log(err)
      }
    }



    // if (appointments == null){
    //     return (
    //       <View style={{flex:1, justifyContent:"center", alignItems:"center", top:windowHeight/3 }}>
    //           <Entypo name="emoji-sad" size={40} color="black" />
    //           <Text>You didnt have any upcoming appointments</Text>
             
    //       </View>
    //     )
    // }
    // if(appointments.length == 0){
    //   return (
    //     <View style={{ justifyContent:"center", alignItems:"center", top:windowHeight/3 }}>
    //       <Entypo name="emoji-sad" size={70} color={COLORS.primary} />
    //         <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You didnt have any upcoming appointments</Text>
    //     </View>
    //   )
    // }
    return (

      <>

              <Toast
                    position='top'
                    bottomOffset={20}
                    config={toastConfig}
                />
      {loading ? 
      
      <View style={{flex:1, justifyContent:"center", alignItems:"center", top:windowHeight/3 }}>
        <ActivityIndicator size="large" color={COLORS.primary} /> 
      </View>
     
      
      :
      <ScrollView style={{marginBottom:200}}>
      
        
        {appointments && appointments.length !== 0 ? appointments.map((item, index)=>{
          return (
            <View key={index} style={{backgroundColor:COLORS.gray, marginVertical:10 , paddingVertical:10, marginHorizontal:15, borderRadius:8,}}>
              <View style={{paddingVertical:5, marginHorizontal:15, paddingHorizontal:10, justifyContent:"space-between", flexDirection:"row"}}>
                <TouchableOpacity 
                  style={{backgroundColor:COLORS.primary, padding: 8, borderRadius:10
                  }} 
                  onPress={()=>{cancelHandler(item?._id, item?.customer_id?._id, item?.salon_id?._id)}}>
                  <Text style={{}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text style={{backgroundColor:COLORS.primary, padding: 8, borderRadius:10
                  }} >
                  Status: {item.status}
                </Text>
              </View>
              
          
            <View  style={{
                backgroundColor:COLORS.gray, marginVertical:10 , paddingVertical:10,
                marginHorizontal:15, borderRadius:8, paddingHorizontal:10, flexDirection:'row',
                justifyContent:"space-around",
                alignItems:"center"
              }}
            > 
            
                <View style={{}}>
                  <Text style={{}}>
                      8th October at 4:32
                  </Text>
                  <Text style={{}}>
                    Services: {item.services.map((i,ind)=> `${i.title}, `)}
                  </Text>
                  <Text style={{}}>
                    {item.profile_id.name}
                  </Text>
                  <Text style={{}}>
                    {item.profile_id.address.address}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{}}>
                    {`${item?.total}$`}
                  </Text>
                </View>
              
            </View>
            </View>
          )
        }): 
        <View style={{  alignItems:"center", height:windowHeight, top:windowHeight/2.9}}>
            <Entypo name="emoji-sad" size={70} color={COLORS.primary} />
            <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You didnt have any upcoming appointments</Text>
        </View>
        }
        
      </ScrollView>
      }
      </>
        
    )
}

export default BookingList

const styles = StyleSheet.create({})
