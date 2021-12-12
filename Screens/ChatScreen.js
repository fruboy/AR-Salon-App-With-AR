import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View ,FlatList, TouchableOpacity, Dimensions} from 'react-native'
import ChatListItem from '../Components/ChatListItem'
import { Header } from 'react-native-elements';
import COLORS from "../consts/color";
import Icon from 'react-native-elements';
import { AntDesign, Entypo} from '@expo/vector-icons'; 
import { local_ip } from '../consts/ip';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Left = ({navigation}) =>{
    return(
    <TouchableOpacity onPress={()=> navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>)
}

const ChatScreen = ({navigation}) => {

    const [chats, setchats] = useState([])

    useEffect(() => {
        (async () => {
        
            try {
              let res = await axios.get(`http://${local_ip}:5000/api/user/getConversations`)
              console.log("res", res.data)
              setchats(res.data)
            }
            catch(err){
              console.log(err)
            }
          })
        ()
    }, [])

    return (
        <View style={styles.container}>

        <Header backgroundColor={COLORS.primary} containerStyle={{height:100}}
           leftComponent={ <Left navigation={navigation} />}
           centerComponent={{ text: 'Messages', style: { color: '#fff', fontSize:18 } }}
        />
        {chats && chats?.length === 0 ? 
            <View style={{  alignItems:"center", height:windowHeight, top:windowHeight/2.5}}>
               <Entypo name="message" size={70} color={COLORS.primary} />
                 <Text style={{fontSize:16, fontWeight:'bold', color:COLORS.primary}}>You didn't have any active chat</Text>
             </View>
        :
        <FlatList
        style={{width: '100%'}}
        data={chats}
        renderItem={({ item }) => <ChatListItem chat={item} />}
        keyExtractor={(item) => item._id}
    />
    }
            
       
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       
      },
})


