import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import {Icon, Container, Header, Content, Footer, Button, Left, Thumbnail} from 'native-base'
import COLORS from "../consts/color";
import { Avatar, ListItem } from 'react-native-elements';
import { Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const DrawerContent = (props) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const {height} = Dimensions.get('screen');

    console.log(height);
    return (
        
            <View>
                <View style={{backgroundColor:COLORS.primary, height:height/5}}>
                    <View style={{ marginTop: 50, marginHorizontal:20, flexDirection:"row", alignItems:"center", }}>
                          <Avatar rounded size='large' titleStyle={{color:COLORS.white}} containerStyle={{backgroundColor:COLORS.white, }}
                                title='H'
                                // source={{ uri: avatar_url }}
                            />
                            <View style={{marginLeft:10}}>
                                <Text style={{marginTop:10, color:COLORS.white, fontSize:18, fontWeight:'bold'}}>
                                    {user?.name}
                                </Text>
                            </View>
                    </View>

                    
                </View>

                <View style={{height:height-height/4}}>
                        <DrawerContentScrollView {...props}>
                             <DrawerItemList {...props} />
                             <DrawerItem label="Logout" 
                             onPress={async () => {
                                        await AsyncStorage.removeItem("token");
                                        dispatch({
                                            type:"LOGOUT"
                                        })
                                        props.navigation.navigate('Home', { screen: 'login' });
                                        }
                                } />
                        </DrawerContentScrollView>
                </View>

                <View style={{}}>
                    
                </View>
                
            </View>

               
            
     
      

    )
}

export default DrawerContent

const styles = StyleSheet.create({})
