import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native'
import { Tab, Header } from 'react-native-elements';
import COLORS from '../consts/color';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, AntDesign, EvilIcons } from '@expo/vector-icons';
import SearchCard from '../Components/SearchCard';
import { useSelector, useDispatch } from 'react-redux';
import MapScreen from './MapScreen';
import { Dimensions} from 'react-native';
import  axios from 'axios';
import { local_ip } from './../consts/ip';


const SearchScreen = ({navigation}) => {
    
    const [inputValue, setinputValue] = useState('');
    const [selected, setselected] = useState(null)
    const [byService, setbyService] = useState(null)
    const [search, setsearch] = useState({
        searchByName:true,
        searchByLoc:false
    })
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const searchHandler = async () => {
     try{
        if(search.searchByName){
            let res = await axios.get(`http://${local_ip}:5000/api/user/searchSalon/${inputValue}?type=name`)
            setselected(res.data)
            setbyService(null)
            
        }
        if(search.searchByLoc){
            let res = await axios.get(`http://${local_ip}:5000/api/user/searchSalon/${inputValue}?type=service`)
            setbyService(res.data)
            setselected(null)
        
        }
     }
     catch(err){
         console.log(err)
     }
    }
    
    return (
        // <View style={{marginTop:20}}>

        //     { search.searchByName ?

        //         <View style={{flexDirection:'row', alignContent:'center' , alignItems:'center', justifyContent:'space-between', marginHorizontal:20,
        //         paddingVertical:10, paddingHorizontal:20, borderRadius:5, backgroundColor:COLORS.gray
        //         }}>

        //         <TextInput style={{fontSize:18, color:'black'}} 
        //             value={inputValue}
        //             onChangeText={setinputValue}
        //             placeholder='Search' 
        //         />
        //         <TouchableOpacity onPress={searchHandler} style={{backgroundColor: COLORS.primary, padding: 8, borderRadius:20}}>
        //             <Ionicons name="search" size={20} color={COLORS.white} />
        //         </TouchableOpacity>
        //         </View>: null
            
        //     }
            
    

        //         <View style={{flexDirection:'row'}}>
        //             <TouchableOpacity 
        //                 style={[styles.searchButton, search.searchByName? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:''] } 
        //                 onPress={()=>{setsearch({searchByName:true, searchByLoc:false})}}>
        //                 <Text style={{textTransform:'uppercase',color:COLORS.primary, fontSize:14,marginVertical:20,fontWeight:'bold' }}>
        //                     Search by name
        //                 </Text>
                        
        //             </TouchableOpacity>

        //             <TouchableOpacity 
        //                 style={[styles.searchButton, search.searchByLoc? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:'']} 
        //                 onPress={()=>{setsearch({searchByName:false, searchByLoc:true}) }}>
        //                 <Text style={{textTransform:'uppercase',  marginVertical:20, color:COLORS.primary, fontSize:14, fontWeight:'bold'}}>
        //                     Search by place
        //                 </Text>
        //             </TouchableOpacity>
        //         </View>
        //         <View>

        //         {search.searchByName ? 
        //             selected ?
        //             //  <FlatList
        //             //  data={selected}
        //             //  renderItem={()=>console.log("Hllo")}/> 
        //             <SearchCard item={selected} />
        //              : 
        //              <Text>No salon seleted yets</Text>
        //              : 
        //              <MapScreen />
        //         }
           
                   
        //         </View>


                
  
        
        //</View>
        <View style={{marginTop:20}}>
            
                <View style={{flexDirection:'row', alignContent:'center' , alignItems:'center', justifyContent:'space-between', marginHorizontal:20,
                    paddingVertical:10, paddingHorizontal:20, borderRadius:5, backgroundColor:COLORS.gray
                }}>
                    
                    <TextInput style={{fontSize:18, color:'black'}} 
                        value={inputValue}
                        onChangeText={setinputValue}
                        placeholder={search.searchByName? "Enter salon name": "Enter service name"}
                        
                    />
                    { search.searchByName ?
                     (  <TouchableOpacity onPress={searchHandler} style={{backgroundColor: COLORS.primary, padding: 8, borderRadius:20}}>
                            <Ionicons name="search" size={20} color={COLORS.white} />
                        </TouchableOpacity>) 
                    :

                     (<TouchableOpacity onPress={searchHandler} style={{backgroundColor: COLORS.primary, padding: 8, borderRadius:20}}>
                        <Ionicons name="search" size={20} color={COLORS.white} />
                        
                    </TouchableOpacity>)
                    }
                   
                    
                </View>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={[styles.searchButton, search.searchByName? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:''] } 
                        onPress={()=>{setsearch({searchByName:true, searchByLoc:false})}}>
                        <Text style={{textTransform:'uppercase',color:COLORS.primary, fontSize:14,marginVertical:20,fontWeight:'bold' }}>
                            Search by name
                        </Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.searchButton, search.searchByLoc? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:'']} 
                        onPress={()=>{setsearch({searchByName:false, searchByLoc:true})}}>
                        <Text style={{textTransform:'uppercase',  marginVertical:20, color:COLORS.primary, fontSize:14, fontWeight:'bold'}}>
                            Search by Service
                        </Text>
                    </TouchableOpacity>
                </View>
           

                <View>

                    {search.searchByName ? 
                            selected && selected.length > 0 ?
                            //  <FlatList
                            //  data={selected}
                            //  renderItem={()=>console.log("Hllo")}/> 
                            selected?.map((item, index)=> <SearchCard item={item} key={index} /> )
                            
                            :
                            <View style={{justifyContent:"center", alignItems:"center", top:windowHeight/5 }}>
                                <MaterialIcons name="search-off" size={70} color={COLORS.primary} />
                                <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You dont have any search results</Text>
                            </View>
                            
                            : 
                            byService && byService.length > 0 ?    byService?.map((item, index)=> <SearchCard item={item} key={index} /> )
                            : 
                            <View style={{ justifyContent:"center", alignItems:"center",  top:windowHeight/5 }}>
                                <MaterialIcons name="search-off" size={70} color={COLORS.primary} />
                                <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You dont have any search results</Text>
                            </View>
                           
                        }
                
                        
                </View>



                
  
        
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({

    container: {
       paddingHorizontal: 5,
        flexDirection:'row',
  
      

    },
    input:{
        fontSize:18,
        width:'75%',
        paddingHorizontal:15,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:20,
        marginTop: 30,
        backgroundColor:COLORS.light

        

    },
    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 40,
        width:'25%',
        
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:20,
        marginTop: 30,
    },

    searchButton:{
        width:'50%', justifyContent:'center', alignItems:'center',
        
       
    }
})
