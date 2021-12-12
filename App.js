import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button,LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import COLORS from './consts/color';
import Home from './Screens/Home';
import SalonDetail from './Screens/SalonDetail'
import StackRoute from './navigation/StackRoute';
import DrawerContent from "./navigation/DrawerContent";
import { AntDesign, Feather, Foundation } from '@expo/vector-icons';
import setAuthToken from "./util/setAuthToken";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerRouter from "./navigation/DrawerRouter";
import { StripeProvider } from "@stripe/stripe-react-native";


//redux
import {Provider} from 'react-redux';
import {loadUser} from './redux/actions/auth'
import store from './redux/store'
import {connect} from 'react-redux';
import {register} from './redux/actions/auth';




// if(AsyncStorage.token){
//   setAuthToken(AsyncStorage.token)
// }





 function App() {
  LogBox.ignoreAllLogs();
  //     useEffect(() => {
  //    store.dispatch(loadUser())
  //  }, [])


  return (
   

  
    
        //  <Provider store={store}>
        //     <View style={{}}>
              
        //     </View>
        // </Provider>
    //    <NavigationContainer>
    //     <Drawer.Navigator initialRouteName={StackRoute} drawerContent={(props)=><DrawerContent {...props} />} drawerContentOptions={{
    //       activeTintColor: 'white',
    //       activeBackgroundColor: COLORS.primary,
    //       inactiveTintColor: 'black',
        
    //       labelStyle:{
    //         marginLeft:0,
    //         padding:0,
    //         fontSize:16,
    //         fontWeight:'100'
    //       },
    //       itemStyle:{
    //         padding:0,
    //         fontSize:16
    //       }
    //     }}>
    //       <Drawer.Screen name="Home" component={StackRoute} 
    //         options = {{
    //           drawerIcon: ({focused, size}) => (
    //             <AntDesign name="home" size={24} color={focused ? COLORS.white : COLORS.primary} />
    //           ),
    //         }}
    //       />
    //         <Drawer.Screen name="Favorites" component={NotificationsScreen} 
    //           options={{
    //            drawerIcon: ({focused, size}) => (
    //             <AntDesign name="hearto" size={24} color={focused ? COLORS.white : COLORS.primary} />
    //           ),
    //         }}
    //       />
    //       <Drawer.Screen name="Bookings" component={NotificationsScreen} 
    //              options={{
    //               drawerIcon: ({focused, size}) => (
    //               <Foundation name="page-multiple" size={24} color={focused ? COLORS.white : COLORS.primary}/>
    //           ),
    //         }}
    //       />
    //       <Drawer.Screen name="Notifications" component={NotificationsScreen} 
    //         options={{
    //            drawerIcon: ({focused, size}) => (
    //             <Feather name="bell" size={24} color={focused ? COLORS.white : COLORS.primary} />
    //           ),
    //         }}
    //       />

    //       <Drawer.Screen name="Profile" component={NotificationsScreen} 
    //         options={{
    //            drawerIcon: ({focused, size}) => (
    //             <Feather name="user" size={24} color={focused ? COLORS.white : COLORS.primary} />
    //           ),
    //         }}
    //       />
          
    //     </Drawer.Navigator>

    


    // </NavigationContainer> 
    

    <Provider store={store}>
         <StripeProvider publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx">

              <DrawerRouter />
      </StripeProvider>

    </Provider>
    
  )
}

export default App





        {/* <Stack.Screen name='Signin' component ={Login} 
          options={{
            headerStyle:{backgroundColor: COLORS.primary},
            headerTintColor:COLORS.white,
            headerShown: true,
            title:''
            
          }}
        />
        <Stack.Screen name='Signup' component ={Signup} 
         options={{
          headerStyle:{backgroundColor: COLORS.primary},
          headerTintColor:COLORS.white,
          headerShown: true,
          title:''
          
        }}
        /> */}
        
      {/* </Stack.Navigator> */}