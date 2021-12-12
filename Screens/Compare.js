import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, Dimensions,FlatList} from 'react-native'
import {Header} from 'react-native-elements';
import { AntDesign, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import COLORS from '../consts/color';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons'
import SmallCards from './../Components/SmallCards';






const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Left = ({navigation}) =>{
    return(
        <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
            <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>)
}
const Compare = () => {
    const salons = useSelector(state => state.salon.salons)
    const [selected, setselected] = useState([])
    const [search, setsearch] = useState()
    const [value, setvalue] = useState('')
    const navigation = useNavigation()

    const changeHandler = (text) => {
        setvalue(text)
        console.log(salons)
        let searchSalon = salons?.filter((item)=>item.name.includes(value))
        setsearch(searchSalon)
    }

    const selectHandler = (item) => {
        setselected((prev)=>[...prev, item])
    }

    const selectedRemover = (item) => {
        let filtered = selected.filter(items => items._id !== item._id )
        setselected(filtered)
    }
    return (
        <>
            <Header backgroundColor={COLORS.primary} containerStyle={{height:100}}
                leftComponent={ <Left navigation={navigation} />}
                
            />
               <View style={{flexDirection:'row', alignContent:'center' , alignItems:'center', justifyContent:'space-between',
                    paddingVertical:10, paddingHorizontal:20, borderRadius:5, backgroundColor:COLORS.gray, marginVertical:20, marginHorizontal:10
                }}>
                    <View style={{backgroundColor: COLORS.light, padding: 4, borderRadius:20}}>
                            <Ionicons name="search" size={20} color={COLORS.white} />
                    </View>
                    
                    <TextInput style={{fontSize:18, color:'black', flex:1, marginLeft:5}} 
                        value={value}
                        onChangeText={(text)=>changeHandler(text)}
                        placeholder={ "Enter salon name to compare"}
                        
                    />
                 
                    
                </View>

                <ScrollView>
                

                <View style={{}}>
                    {selected && selected.length > 0 ? 
                    <View style={{ marginVertical:10,}}>
                       
                       <View style={{flex:1, justifyContent:'flex-end', }}>
                       <TouchableOpacity 
                            onPress={()=>{navigation.navigate("ComparedResults", {
                                items:selected
                            })}}
                            style={{marginLeft:10,  width:100, paddingHorizontal:10, paddingVertical:5, backgroundColor:COLORS.gray, borderRadius:6 }}>
                            <Text style={{ color:'black',textTransform:"capitalize"}}>
                                Compare
                            </Text>
                        </TouchableOpacity>
                       </View>
                  
                        <FlatList
                            data={selected}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                               
                                marginTop: 20,
                                paddingBottom: 30,
                            }}
                            keyExtractor={(item)=>item._id}
                            renderItem={({item}) => <SmallCards salon={item} selectedRemover={selectedRemover} />}
                        />
                        <View style={{marginHorizontal:10 , marginVertical:10, height:5, backgroundColor:COLORS.gray, borderRadius:5}}></View>
                    </View>
                    :
                    null
                    }
                </View>

                <View style={{}}>
                    {search && search.length > 0 ? search.map((item,index)=>{
                        return (
                           <View key={index}>               
                            {selected?.findIndex((val => val._id === item._id)) !== -1 ?
                            null :
                            
                            <View  style={{marginVertical:10, marginHorizontal:10, backgroundColor:COLORS.gray, borderRadius:20, overflow:"hidden", flexDirection:"row"}}>
                                <View style={{}}>
                                    <Image
                                    source={{uri:item.image}}
                                    resizeMode="cover"
                                    style={{
                                        width: 120,
                                        height: 120
                                    }}
                                    />
                                </View>
                                <View style={{flexDirection:"column",justifyContent:"center", marginHorizontal:10, flex:1}}>
                                    <Text style={{}}>
                                        {item?.name}
                                    </Text>
                                    <Text style={{}}>
                                        {item?.description}
                                    </Text>
                                </View>
                                <View style={{justifyContent:"center",alignItems:"flex-end", padding:4}}>
                                {/* {selected.findIndex((val => val._id === item._id)) !== -1 ?
                                    <TouchableOpacity onPress={()=>selectedRemover(item)} >
                                        <Feather name="minus-circle" size={34} color={COLORS.primary} style={{padding:4}} />
                                    </TouchableOpacity>
                                    :
                                
                                  
                                } */}
                                    <TouchableOpacity onPress={()=>selectHandler(item)} >
                                        <Feather name="plus-circle" size={34} color={COLORS.white} style={{padding:4}} />
                                    </TouchableOpacity>
                                </View>
                    
                            </View>
                            }
                            </View>
                        )
                    }): 
                    
                    <View style={{ justifyContent:"center", alignItems:"center",  }}>
                        <MaterialIcons name="search-off" size={70} color={COLORS.primary} />
                        <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>
                            {!search || search.length==0 ? "You didn't search anything" : "No Salons"}
                        </Text>
                    </View>
                    }
                    
                    
                </View>
                </ScrollView>
                
                
        </>
    )
}

export default Compare

const styles = StyleSheet.create({
    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:90
    },
})
