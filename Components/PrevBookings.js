import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Dimensions, ActivityIndicator,Alert, ScrollView} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { Entypo, Ionicons } from '@expo/vector-icons';
import COLORS from '../consts/color';
import {userPrevAppointments} from "../redux/actions/salon"
import { Pressable, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { TextInput } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PrevBookings = () => {
    const appointments = useSelector(state => state.salon.previous)
    const loading = useSelector(state => state.salon.loading)
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation()

    console.log("fetched", appointments)


    useEffect(() => {
      dispatch(userPrevAppointments())
    }, [])
    // if (appointments == null){
    //     return (
    //       <View style={{flex:1, justifyContent:"center", alignItems:"center", top:windowHeight/3 }}>
    //           <Entypo name="emoji-sad" size={40} color="black" />
    //           <Text>You didnt have any previous appointments</Text>
             
    //       </View>
    //     )
    // }
    // if(appointments.length == 0){
    //   return (
    //     <View style={{flex:1, justifyContent:"center", alignItems:"center", top:windowHeight/3 }}>
    //       <Entypo name="emoji-sad" size={70} color={COLORS.primary} />
    //         <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You didnt have any previous appointments</Text>
    //     </View>
    //   )
    // }

    // if(!appointments || appointments.length === 0){
    //   return (
    //     <View style={{ justifyContent:"center", alignItems:"center", top:windowHeight/3 }}>
    //     <Entypo name="emoji-sad" size={70} color={COLORS.primary} />
    //     <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You didnt have any previous appointments</Text>
    //   </View>
    //   )
    // }
    return (

      <>
       {loading ?
         
        <View style={{flex:1, justifyContent:"center", alignItems:"center", top:windowHeight/3 }}>
          <ActivityIndicator size="large" color={COLORS.primary} /> 
        </View> 
        :
        <ScrollView style={{marginBottom:200}}>
            {/* <View style={{marginHorizontal:15, flexDirection:"row", justifyContent:"flex-end", marginTop: 5,
            }}>
              <Ionicons name="filter" size={30} color="black" />
            </View> */}
            {appointments && appointments.length !== 0 ? appointments?.map((item,index)=>{
              return(
                <View key={index} style={{backgroundColor:COLORS.gray, marginHorizontal:15, borderRadius:8, marginVertical:10}}>
           
                  <View style={{paddingVertical:10, paddingHorizontal:10, justifyContent:"flex-end", flexDirection:"row"}}>
                    <Text style={{color:COLORS.primary}}>
                      Status: {item.status}
                    </Text>
                  </View>
                  <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, paddingHorizontal:10, alignItems:"center", 
                    borderBottomWidth:2, borderBottomColor:"#e5e7eb"
                  }}>
              
                      <View >
                          <View style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}> 
                              <Text style={{}}>
                                8th October at 4:32
                              </Text>
                              <View style={{}}>
                                <Text style={{color:COLORS.primary, fontWeight:"bold"}}>
                                  120$
                                </Text>
                              </View>
                          </View>
                       
                          <Text style={{}}>
                            Services: {item?.services?.map((i,ind)=> `${i.title}, `)}
                          </Text>
                          <Text style={{}}>
                          {item?.profile_id?.name}
                          </Text>
                          <Text style={{}}>
                            {item?.profile_id?.address.address}
                          </Text>
                      </View>
               
                    
                  </View>
                  {item.isReviewed ?
                          <Text style={{color:COLORS.primary, fontWeight:"bold", fontSize:16, paddingVertical:10, paddingHorizontal:10}}>
                          You already reviewed
                      </Text>:
                      <TouchableOpacity style={{paddingVertical:10, paddingHorizontal:10}} onPress={()=>navigation.navigate("addReview",{data:item})} >
                          <Text style={{color:COLORS.primary, fontWeight:"bold", fontSize:16}}>
                              Give Review
                          </Text>
                      </TouchableOpacity>
              
                          
                  }
           
              </View>
              )
            }):
            <View style={{  alignItems:"center", height:windowHeight, top:windowHeight/2.9}}>
                <Entypo name="emoji-sad" size={70} color={COLORS.primary} />
                <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You didnt have any previous appointments</Text>
              </View>
            }
            
          
        </ScrollView>
        }
       </>
    )
}

export default PrevBookings

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height:windowHeight,
    width:windowWidth
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
