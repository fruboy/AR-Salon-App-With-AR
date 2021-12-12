import React, {useEffect, useState, useRef} from 'react';
import { FlatList, Text, ImageBackground, KeyboardAvoidingView, View, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BG from '../assets/BG.png';
import InputBox from '../Components/InputBox';
import ChatMessage from './../Components/ChatMessage';
import COLORS from './../consts/color';
import { useSelector } from 'react-redux';
import { local_ip } from './../consts/ip';
import axios  from 'axios';
import {io} from "socket.io-client"



const ChatRoomScreen = () => {
      const [messages, setMessages] = useState([]);
      const [arrivedmsg, setarrivedmsg] = useState()
      const user = useSelector(state => state.auth.user)
      const route = useRoute()
      const data = route.params.data
      console.log("user_id",user._id)
      const socket = useRef()
      const scrollRef = useRef();
      const isMountedRef = useRef(null);


      useEffect(() => {
        socket.current = io(`http://${local_ip}:5000/`)
            socket.current.on("getMessage",({senderId, text})=>{
              console.log("into the get", senderId,)

              setarrivedmsg(
                  {
                      sender:senderId,
                      text:text,
                      createdAt: Date.now(),
                  }
              )
              console.log("into the get")
          })
        }, []) 


        useEffect(() => {
          if(arrivedmsg) setMessages((prev)=>[...prev, arrivedmsg ])
      }, [arrivedmsg])

        useEffect(() => {
          socket.current.emit("addUser", user._id);
          // socket.current.on("getUsers", (users)=>{
          //     console.log(users)
          // })
       
      }, [user])

      




      useEffect(() => {
        // (async () => {
        
        //   try {
        //     let res = await axios.get(`http://${local_ip}:5000/api/user/getMessage/${data._id}`)
        //     console.log("res", res.data)
        //     setMessages(res.data)
        //   }
        //   catch(err){
        //     console.log(err)
        //   }
        // })
        // ()
        isMountedRef.current = true;
        axios.get((`http://${local_ip}:5000/api/user/getMessage/${data._id}`)).then((res)=>{
       
          setMessages(res.data)
        }).catch((err)=>{
          console.log(err)
        })

        return () => isMountedRef.current = false;
        
      }, [data])


//   const route = useRoute();

//   const fetchMessages = async () => {
//     const messagesData = await API.graphql(
//       graphqlOperation(
//         messagesByChatRoom, {
//           chatRoomID: route.params.id,
//           sortDirection: "DESC",
//         }
//       )
//     )

//     console.log("FETCH MESSAGES")
//     setMessages(messagesData.data.messagesByChatRoom.items);
//   }

//   useEffect(() => {
//     fetchMessages();
//   }, [])

//   useEffect(() => {
//     const getMyId = async () => {
//       const userInfo = await Auth.currentAuthenticatedUser();
//       setMyId(userInfo.attributes.sub);
//     }
//     getMyId();
//   }, [])

//   useEffect(() => {
//     const subscription = API.graphql(
//       graphqlOperation(onCreateMessage)
//     ).subscribe({
//       next: (data) => {
//         const newMessage = data.value.data.onCreateMessage;

//         if (newMessage.chatRoomID !== route.params.id) {
//           console.log("Message is in another room!")
//           return;
//         }

//         fetchMessages();
//         // setMessages([newMessage, ...messages]);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [])

//   console.log(`messages in state: ${messages.length}`)


      const stateHandler = (msg) =>{
          setMessages((prev)=>[...prev, msg])
      }
  return (
    <View  style={{backgroundColor: COLORS.white,  height: '100%',
    }} >
      <FlatList
        data={messages}
        keyExtractor={(item,index)=>index}
        renderItem={({ item }) => <ChatMessage message={item} myId={user?._id} />}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd() }
        onLayout={() => scrollRef.current.scrollToEnd() }
      />
        
        <InputBox conversationId={route.params.data._id} sender={user?._id} stateHandler={stateHandler} socket={socket} chat={data} />
        

   
   
    </View>
  );
}

export default ChatRoomScreen;

