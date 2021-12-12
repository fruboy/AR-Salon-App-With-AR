import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import moment from "moment";

import COLORS from './../consts/color';



const ChatMessage = ({message, myId}) => {
//   { message } = props;
  console.log("message",message)
  // const isMyMessage = () => {
  //   console.log("sender_id", message?.sender)
  //   console.log("my_id", myId)
  //   message?.sender === myId;
    
    
  // }

  return (
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: message?.sender === myId ? COLORS.primary : COLORS.pink,
          marginLeft: message?.sender === myId ? 50 : 0,
          marginRight: message?.sender === myId ? 0 : 50,
        }
      ]}>
        {!message?.sender === myId && <Text style={styles.name}>user name</Text>}
        <Text style={styles.message}>{message?.text}</Text>
        <Text style={styles.time}>{moment(message?.createdAt).fromNow()}</Text>
      </View>
    </View>
  )
}

export default ChatMessage;

const styles = StyleSheet.create({
    container: {
      padding: 10,
      
    },
    messageBox: {
      borderRadius: 10,
      padding: 10,
    },
    name: {
      color: COLORS.primary,
      fontWeight: "bold",
      marginBottom: 5,
    },
    message: {
      color:COLORS.grey
    },
    time: {
      alignSelf: "flex-end",
      color: COLORS.grey
    }
  });
  