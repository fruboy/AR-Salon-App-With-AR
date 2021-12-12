import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, ScrollView, ImageBackground, ActivityIndicator, Dimensions} from 'react-native'
import { Avatar } from 'react-native-elements';
import { FAB } from 'react-native-elements';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../consts/color';
import { StatusBar } from 'expo-status-bar';

import Service from "../Components/Service";
import Card from "../Components/Card";
import salons from '../consts/salon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { fetchSalons } from '../redux/actions/salon';
import { local_ip } from '../consts/ip';
import TopSalons from './../Components/TopSalons';
import SelectMultiple from 'react-native-select-multiple'
import { Pressable } from 'react-native';
import { loadUser } from '../redux/actions/auth';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Home = ({navigation }) => {

    const dispatch = useDispatch()
    const salon = useSelector(state => state.salon);
    const user = useSelector(state => state.auth.user)
    const [selected, setselected] = useState([])
    const [loading, setloading] = useState(false)

    const offerings = [
        "Manicure","Pedicure","Foot Reflexology", "Haircut", "Hair Colour", "Body Massage", "Body Scrub", "Body Polishing", "Beard Colour", 
        "Beard Trim","Eyebrows","Eye Lashes", "Makeup",	"Facial","Threading","Hair Massage","Foot Massage","Texturizing","Hair Smoothening","Waxing","Hair Straightening", "Blow dry",
        "Hair Rebonding" ,"Face Mask"
    ]

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft:(() => <TouchableOpacity onPress={()=>navigation.openDrawer()}><Ionicons name="ios-menu" size={36} color={COLORS.white} style={{marginLeft:10}} /></TouchableOpacity>),
            // headerRight:(()=>{
            //   return(
                
            //       <TouchableOpacity style={{marginRight:10}}>
            //         <FontAwesome5 name="heart" size={24} color="white" />
            //       </TouchableOpacity>
                  
            
            //   )
            // })
        })
      }, [navigation]);

    useEffect(() => {
        // (async function() {
        //     try {
        //         const res = await axios.get(`http://192.168.0.108:5000/api/user/getSalons`);
        //         console.log(res)
        //     } catch (err) {
        //         console.error(err);
        //     }
        // })
        // ();
        console.log("user is: "+user)
        console.log("salon is: "+salon)
        dispatch(fetchSalons())
    }, []);



    // const addItem = (item) => {
    //     setselected((prev)=>[...prev, item])
    // }

    // const removeItem = (item) => {
    //     let filtered = selected.filter((val)=> val !== item )
    //     setselected(filtered)
    // }

    const onSelectionsChange = (item) => {
        setselected(item)
        console.log(selected)
    }

    const submitHandler= async ()=> {
        console.log("int the button")
        const body ={
            services:selected
        }
        console.log(body)
        try {
            setloading(true)
            let res = await axios.post(`http://${local_ip}:5000/api/user/addServicesForUser`, body)
            console.log(res.data)
            dispatch(loadUser())
            setloading(false)
        }
        catch(err){
            console.log(err)
        }
    }


    if(salon?.loading || !user){
        return(
            <View style={[styles.container, styles.horizontal]}>
                 <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }
    return (
        < >
            <StatusBar backgroundColor={COLORS.primary} style='light' />
                {/* <ImageBackground style={styles.headerImage} source={require('../assets/')}> */}
                {
                user?.services?.length === 0 ?
                    <View style={{flex:1, backgroundColor: COLORS.white, marginBottom:160 }}>
                        <Pressable style={styles.btnPrimary}  onPress={submitHandler}>
                        {loading ?  
                            <ActivityIndicator size="large" color="#fff" />
                            :
                            <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 18}}>Add </Text>
                            }
                        </Pressable>
                        <View style={{marginTop:20}}>
                            <View style={{flexDirection:'row' , alignItems:'center'}}>
                                <View style={{marginLeft:20}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:30, fontWeight:'bold', color:COLORS.light}}>
                                            Hi
                                        </Text>
                                        <Text style={{fontSize:30, fontWeight:'bold', color:COLORS.primary, marginLeft:10}}>
                                            {user.name}
                                        </Text>
                                    </View>
                                

                                    <Text style={{ color:COLORS.light, fontSize:16}}>
                                        Lets make your hair attractive 
                                    </Text>
                                    <Text style={{ color:COLORS.light, fontSize:16}}>
                                        Select the services you often take from salons regularly
                                    </Text>
                                </View>
                            </View>
      
                         
                      
                     
                   
                        </View>
                        <View style={{}}>
                        <SelectMultiple
                                items={offerings}
                                selectedItems={selected}
                                onSelectionsChange={onSelectionsChange} 
                            />
                        </View>
                       
                  
                        
                   
                    </View>
                        
                        
                :
                
                <ScrollView style={{flex:1, backgroundColor: COLORS.white,}} >
                    <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop:30, alignItems:'center'}}>
                        <View style={{flexDirection:'row' , alignItems:'center'}}>
                            <View style={{marginLeft:20}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:30, fontWeight:'bold', color:COLORS.light}}>
                                        Hi
                                    </Text>
                                    <Text style={{fontSize:30, fontWeight:'bold', color:COLORS.primary, marginLeft:10}}>
                                        Haris
                                    </Text>
                                </View>
                            

                                <Text style={{ color:COLORS.light, fontSize:16}}>
                                    Lets make your hair attractive 
                                </Text>
                            </View>
                        </View>
                    
                        {/* <View style={{marginHorizontal:20}}>
                            <Ionicons name="notifications" size={26} color={COLORS.primary} />
                        </View> */}
                        
                    </View>
                {/* </ImageBackground> */}

                    <TouchableOpacity activeOpacity={0.3} style={{marginTop: 30,}} onPress={()=>navigation.navigate('SearchScreen')} >
                        <View style={{flexDirection:'row', alignContent:'center' , alignItems:'center', marginHorizontal:20,
                            paddingVertical:15, paddingHorizontal:20, borderRadius:10, backgroundColor:COLORS.primary, opacity:0.4
                        }}>
                            <Ionicons name="search" size={20} color={COLORS.white} style={{ marginRight:10 }} />
                            <Text style={{fontSize:18, color:COLORS.white}}>Search</Text>
                        </View>
                    </TouchableOpacity>

            {/* <View>
                <FlatList
                        data={services}
                        renderItem={(item)=><Service item={item} />}
                        keyExtractor={item=>item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        

                    />
                
            </View> */}

            
                    <FlatList
                        data={salon.salons}
                        renderItem={(item)=><Card items={item} />}
                        keyExtractor={item=>item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        

                    />

                 

                    <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 20, marginTop:20}}>
                        <Text style={{fontWeight:'bold', color: COLORS.light }}>
                            Salons for you
                        </Text>
                    </View>

                    <FlatList
                        data={salon.salons}
                        renderItem={(item)=><TopSalons salon={item} />}
                        keyExtractor={item=>item._id}
                        horizontal
                        contentContainerStyle={{
                               
                            marginTop: 20,
                            paddingBottom: 30,
                            marginLeft:5
                        }}
                        showsHorizontalScrollIndicator={false}
                        

                    />
                    
                </ScrollView>
            }

        </>
    )
}


const styles = StyleSheet.create({

    headerImage:{
        height:350,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
      btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%",
        borderTopWidth:1,
        borderColor:"white"
       
        
    },
})



export default Home


