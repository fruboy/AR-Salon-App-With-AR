import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";


import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import COLORS from '../consts/color';
import { local_ip } from './../consts/ip';
import axios  from 'axios';
import { useSelector } from 'react-redux';

const InputBox = ({conversationId,sender, stateHandler,chat, socket}) => {
 
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.auth.user)
  const onMicrophonePress = () => {
    console.warn('Microphone')
  }

  const onSendPress = async () => {
    
    try {
      let body = {
        conversationId,
        sender,
        text:message
      }
      const receiverId = chat?.members.find((member)=>member!==user._id)
      console.log(body)
      let res =await axios.post(`http://${local_ip}:5000/api/user/sendMessage`, body)
      socket?.current.emit('sendMessage', {
        senderId: user._id,
        receiverId: receiverId,
        text:message
    })
      console.log(res.data)
      stateHandler(res.data)

    }
    catch(err){
      console.log(err)
    }
    // send the message to the backend

    setMessage('');
  }

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder={"Type a message"}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message
            ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
            : <MaterialIcons name="send" size={28} color="white" />}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default InputBox;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 10,
      alignItems: 'flex-end',
    },
    mainContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 25,
      marginRight: 10,
      flex: 1,
      alignItems: 'flex-end',
    },
    textInput: {
      flex: 1,
      marginHorizontal: 10
    },
    icon: {
      marginHorizontal: 5,
    },
    buttonContainer: {
      backgroundColor: COLORS.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })