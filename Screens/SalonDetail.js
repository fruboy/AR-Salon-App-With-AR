import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, FlatList, Modal, TouchableHighlight, ActivityIndicator} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import { useRoute } from '@react-navigation/native';
import Stars from 'react-native-stars';
import salons from '../consts/salon';
import COLORS from "../consts/color";
import { Dimensions } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, AntDesign, EvilIcons } from '@expo/vector-icons';
import { BottomSheet, ListItem} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import CheckBox from '../Components/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { local_ip } from '../consts/ip';
import StripePayment from './../Components/StripePayment';
import { Pressable } from 'react-native';




const SalonDetail = ({route, navigation}) => {

    const [isVisible, setisVisible] = useState(false)
    const [mode, setMode] = useState('date');
    const [dateslot, setDateSlot] = useState([]);

    const [service, setservice] = useState([])
    const [checked, setchecked] = useState(false)
    const [date, setdate] = useState('')


    const [loading, setloading] = useState(false)
    const [showModal, setshowModal] = useState(false)


    const salons = useSelector(state => state.salon.salons)
    const user = useSelector(state => state.auth.user)



    const {width} = Dimensions.get('screen');
    const itemId= route.params.id
    // console.log("from params",itemId);

    const selectedSalon = salons.find((item)=>item._id==itemId);
    // console.log(selectedSalon);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
      }, [navigation]);

    // const createTimeSlots =(start, end)=>{
    //     let startTime = moment(start, 'HH:mm')
    //     let endTime = moment(end, 'HH:mm')
    //     let arr = []
    //     while (startTime <= endTime){
    //         arr.push(new moment(startTime).format('HH:mm'));
    //         startTime.add(60 , 'minutes')
    //     }

        
    //     return arr
    // }

    // const renderTimeSlot =({item, index})=>{
    //     console.log(index)
    //     return(
    //     <TouchableOpacity style={selectedTime===index.toString() ? {backgroundColor:COLORS.primary,...styles.service}  : {backgroundColor:'rgb(243,245,247)',...styles.service}} onPress={()=>{setselectedTime(index.toString())}} >
    //         <Text style={selectedTime===index.toString() ? {color:'white',...styles.name}  : {color:COLORS.primary, ...styles.name}}>
    //             {item}
    //         </Text>
    //     </TouchableOpacity>)
    // }

    const handleServieBox = (title, price) => {
        setchecked(!checked);
        setservice([...service,{
            title,
            price
        }])
    

    }

    const chatHandler = async () => {
        console.log("into chat ", selectedSalon._id)
        try {
            let data = {
                receiverId: selectedSalon._id
            }
          
            const res = await axios.post(`http://${local_ip}:5000/api/user/createConversation`, data);
            if(res.data){
                navigation.navigate("chatroom", {
                    data: res.data,
                    receiver:selectedSalon

                })
            }
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
 
        
    }

    const onUnchecked = (title) => {
        const updatedState = service.filter((item)=>item.title!==title)
        setservice(updatedState);
    }

    var timeFrom = (X) => {
        var dates = [];
        for (let I = 0; I < Math.abs(X); I++) {
            dates.push(new Date(new Date().getTime() - ((X >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toISOString());
        }
        return dates;
    }

    const submitHandler = async ()=>{
        let total=0
        service.map(item => total=total+Number(item.price))
        console.log("total", total)
        setloading(true)
        console.log(service)
        let booking ={
            appointment_date:date,
            services:service,
            salon_id: selectedSalon.user,
            salon_profile:selectedSalon._id,
            total:total

         }
        const response = await axios.post(`http://${local_ip}:5000/api/user/booking`, booking)
        console.log("api call", response.data)
        setloading(false)
        setshowModal(true)
    }
    
    useEffect(() => {
        setDateSlot(timeFrom(-7))

    }, [])



    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor:'white'}}
            style={{flex:1}}
            
        >
            <StatusBar barStyle='light-content'  translucent= {isVisible ? false : true } />
            <Modal
                animationType="slide"
                // transparent={true}
                visible={showModal}
                presentationStyle='fullScreen'
                //onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                // }}
            >
                   <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                                <Ionicons name="checkmark-done" size={30} color={COLORS.primary} />
                                <Text style={styles.modalText}>Your appointment request has been forworded</Text>

                                <Pressable
                                    style={{ ...styles.openButton, backgroundColor: COLORS.primary }}
                                    onPress={() => {
                                    setshowModal(false);
                                    navigation.navigate("Home")
                                }}>
                                    <Text style={styles.textStyle}>Ok</Text>
                                </Pressable>
                        </View>
                    </View>
                </Modal>

            <ImageBackground style={styles.headerImage} source={{ uri: `${selectedSalon.image}`}} >
                <View style={styles.header}>
                    <TouchableOpacity >
                        <MaterialIcons name="arrow-back-ios" size={28} color="white" onPress={()=>{navigation.goBack()}} />
                    </TouchableOpacity>
                    <TouchableOpacity   >
                        <FontAwesome5 name="heart" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            
  
            </ImageBackground>

            <View style={{paddingHorizontal: 20, marginTop: 20,}}>
                <View>
                    <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>
                            {selectedSalon.name}
                        </Text>
                        <View style={{flexDirection:"row"}}>
                                <TouchableOpacity style={{marginRight:20, borderRadius:20, padding:8}} onPress={chatHandler} >
                                    <Entypo name="chat" size={24} color={COLORS.dark} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginRight:20, borderRadius:20, padding:8}} 
                                     onPress={()=>
                                        {navigation.navigate("MapScreen",   {
                                            coords: selectedSalon?.location?.coordinates,
                                        }
                                        )}} 
                                
                                >
                                    <Entypo name="location-pin" size={24} color={COLORS.dark} />
                            
                                </TouchableOpacity>
                        </View>
                    
                    </View>
                </View>
         
                <Text style={{fontSize:14, fontWeight:"bold" , color:COLORS.light, marginTop: 5,}}>
                    {selectedSalon.description}
                </Text>
            </View>
            
            <View style={{marginTop: 5, paddingHorizontal:20, flexDirection:'row' , justifyContent:'space-between' }}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Stars
                        display={3}
                        count={5}
                        starSize={40}
                        fullStar={<AntDesign name="star" size={20} color="orange" />}
                        emptyStar={<AntDesign name="staro" size={20} color="orange" />}
                    />
                    
            
                    <Text style={{fontWeight:'bold', color: COLORS.light, fontSize: 18,paddingHorizontal:8}}>
                         3.0
                    </Text>
                </View>
                <Pressable 
                    onPress={()=>navigation.navigate('Review', {
                        profile_id:itemId
                    })}>
                    <Text style={{fontWeight:'bold', color: COLORS.light, fontSize: 16, textDecorationLine: 'underline' }}>
                        351 reviws
                    </Text>
                </Pressable>
            
               
            </View>

            <View style={{marginTop:10, paddingHorizontal:20, }}>
                <Text style={{color:COLORS.light,}}>
                    {selectedSalon?.address?.address}
                </Text>
            </View>

       
            
            <View style={{}}>
                {selectedSalon?.services?.map((item,index)=>{
                   return(
                       <View key={index} style={{backgroundColor:COLORS.grey, marginTop:10, marginHorizontal:15, borderRadius:10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                        padding:10
                        }}>
                           <CheckBox  title={item.service} price={item.price} checked={checked} onPress={()=>handleServieBox(item.service, item.price)} unchecked={()=>{onUnchecked(item.name)}} />
                       </View>
                       
                   );
               })}
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical:5}}>
                {dateslot.map((item,index)=>{
                    return (
                        <TouchableOpacity key={index} 
                        onPress={()=>setdate(item)}
                        style={(date===item)? {backgroundColor:COLORS.primary, padding:12, marginTop:25, marginHorizontal:15, borderRadius:5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            
                            elevation: 2,
                            paddingVertical:40,
                            alignItems:"center",
                            
                        }: {backgroundColor:COLORS.white, padding:12, marginTop:25, marginHorizontal:15, borderRadius:5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            
                            elevation: 2,
                            paddingVertical:40,
                            alignItems:"center"
                        } }>
                            <Entypo name="calendar" size={24} color="black" style={{marginBottom:10}} />
                            <Text style={(date===item)?{color:COLORS.white}:{color:COLORS.dark}}>
                                {item.split("T")[0]}
                            </Text>
                           
                        </TouchableOpacity>
                    )
                })}
         
                
            </ScrollView>
            <TouchableOpacity style={styles.btnPrimary} opacity={0.9} onPress={submitHandler} >
                {loading ? <ActivityIndicator size="large" color={COLORS.white} /> :
                <Text style={{color:COLORS.white, fontSize:16, fontWeight:'bold'}}>
                    Booking
                </Text>
                }
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.btnPrimary} opacity={0.9} onPress={()=>navigation.navigate("Payment")} >
                {loading ? <ActivityIndicator size="large" color={COLORS.white} /> :
                <Text style={{color:COLORS.white, fontSize:16, fontWeight:'bold'}}>
                    Continue to payment
                </Text>
                }
            </TouchableOpacity> */}

            {/* <BottomSheet
               
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            >
                           <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          
         
         
        /> */}
                    
                    {/* <View style={{backgroundColor:'rgb(243,245,247)', height:210}}> */}

                  
                   

                        {/* <FlatList
                            data={timeslot}
                            renderItem={renderTimeSlot}
                            keyExtractor={(item,index)=>index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        /> */}
{/* 
                             <TouchableOpacity style={styles.btnPrimary} opacity={0.9} onPress={()=>{}} >
                                <Text style={{color:COLORS.white, fontSize:16, fontWeight:'bold'}} onPress={()=>{setisVisible(false); navigation.navigate('Home')}}>
                                    BOOK NOW
                                </Text>
                            </TouchableOpacity>
                                          
                    </View>

                    
               
              
                
            </BottomSheet> */}
      

                    {/* {
                        timeslot.map((item, index)=>{
                           <View style={{}} key={index} >
                               <Text style={{}}>
                                   Hello
                               </Text>
                           </View>
                       }) 
                    } */}


                   
        </ScrollView>
    )
}

export default SalonDetail

const styles = StyleSheet.create({
    headerImage:{
        height:350,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        overflow: 'hidden',
    },
    header:{
        flexDirection:'row',    
        alignItems:"center",
        marginTop: 60,    
        marginHorizontal:20,
        justifyContent:'space-between'
    },
    iconCotainer:{
        position: 'relative',
        height:60,width:60,
        backgroundColor: COLORS.primary,
        borderRadius:40,
        top:-30,
        left:290,
        justifyContent:'center',
        alignItems:'center'
        
    },
    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        width:'80%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:20,
        marginTop: 30,
    },
    service:{
        flexDirection:"row",
        marginHorizontal:5,
        padding:10,
        borderRadius:10,
        height:50,
        marginTop: 20,
    },

    name:{
        
        fontSize:18,
        fontWeight:'bold',
        paddingHorizontal:10,
        marginRight: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:COLORS.primary
      },
})
