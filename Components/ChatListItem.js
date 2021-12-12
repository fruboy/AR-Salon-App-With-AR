import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { local_ip } from './../consts/ip';


const ChatListItem = ({chat}) => {
 
  const user = useSelector(state => state.auth.user)
  const [profile, setprofile] = useState()

  const navigation = useNavigation();

  useEffect(() => {
      
  
      (async () => {
        try {
          let profileId = chat.members.find((m)=>m!==user._id)
          let res = await axios.get(`http://${local_ip}:5000/api/user/getChatUserDetail/${profileId}`)
          console.log("res", res.data)
          setprofile(res.data)
        }
        catch(err){
          console.log(err)
        }
      })
    ()
  }, [])





  return (
    <TouchableWithoutFeedback 
      onPress={()=>navigation.navigate("chatroom", {
        data: chat,
        receiver:profile
      })} >
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: profile?.image }} style={styles.avatar}/>
          

          <View style={styles.midContainer}>
            <Text style={styles.username}>{profile?.name}</Text>
            {/* <Text
              numberOfLines={2}
              style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                : ""}
                Hello 1 2 3 
            </Text> */}
          </View>

        </View>

        <Text style={styles.time}>
          {/* {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")} */}
          12/5/19
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default ChatListItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: 'space-between',
      padding: 10,
    },
    lefContainer: {
      flexDirection: 'row',
    },
    midContainer: {
      justifyContent: 'space-around'
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    username: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    lastMessage: {
      fontSize: 16,
      color: 'grey',
    },
    time: {
      fontSize: 14,
      color: 'grey'
    },
  })