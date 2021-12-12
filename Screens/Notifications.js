import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import COLORS from "../consts/color";
import {Header} from 'react-native-elements';
import NotificationList from '../Components/NotificationList'
import { AntDesign } from '@expo/vector-icons'; 

const Notifications = ({navigation}) => {

    const Left = ({navigation}) =>{
    return(
    <TouchableOpacity onPress={()=> navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>)
}

    return (
        <View>
        <Header backgroundColor={COLORS.primary} containerStyle={{height:100}}
        leftComponent={ <Left navigation={navigation} />}
                centerComponent={{ text: 'Notifications', style: { color: '#fff', fontSize:18 } }}
            
        />
          
                <View style={{}}>
                    <NotificationList />
                </View>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({})
