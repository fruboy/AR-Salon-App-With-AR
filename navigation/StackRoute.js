import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import COLORS from '../consts/color';
import Home from '../Screens/Home';
import SearchScreen from '../Screens/SearchScreen';
import MapScreen from '../Screens/MapScreen';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SalonDetail from '../Screens/SalonDetail'
import ReviewAndRating from './../Screens/ReviewAndRating';
import AddReview from './../Screens/AddReview';
import ComparedResults from '../Screens/ComparedResults';
import Payment from '../Screens/Payment';
import ChatRoomScreen from '../Screens/ChatRoom';
import { useSelector } from 'react-redux';








const Stack = createStackNavigator();

const StackRoute = ({navigation}) => {
  const auth = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  

  const authScreens = {
    login: Login,
    signup: Signup,
  };

  const userScreens = {
    HomePage: Home,
    SalonDetail: SalonDetail,
    SearchScreen:SearchScreen,
    MapScreen:MapScreen,
    Review:ReviewAndRating,
    addReview: AddReview,
    ComparedResults:ComparedResults,
    chatroom:ChatRoomScreen,
    Payment:Payment
  };
  
    return (

<Stack.Navigator>
  {Object.entries({
    // Use the screens normally

    // Use some screens conditionally based on some condition
    ...(auth ? userScreens : authScreens),
  }).map(([name, component]) => (
    <Stack.Screen name={name} component={component} key={name}
    options={{
      headerStyle:{backgroundColor: COLORS.primary},
      headerTintColor:COLORS.white,
      headerShown: true,
      title:'',

            
      
  
      }}
    />
  ))}
</Stack.Navigator>
      

//      <Stack.Navigator >

// <Stack.Screen name="login" component={Login}
         
//          options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
    
                
          
      
//           }}
//         />
//       <Stack.Screen name="signup" component={Signup}
         
//          options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
    
                
          
      
//           }}
//         />
        
        
//         <Stack.Screen name="Home" component={Home}
         
//          options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() => <TouchableOpacity onPress={()=>navigation.openDrawer()}><Ionicons name="ios-menu" size={36} color={COLORS.white} style={{marginLeft:10}} /></TouchableOpacity>),
//           headerRight:(()=>{
//             return(
              
//                 <TouchableOpacity style={{marginRight:10}}>
//                   <FontAwesome5 name="heart" size={24} color="white" />
//                 </TouchableOpacity>
                
          
//             )
//           })
//           }}
//         />

//         <Stack.Screen name="SalonDetail" component={SalonDetail}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: false,
//           title:'',
//           headerLeft:(() => <TouchableOpacity><Ionicons name="ios-menu" size={36} color={COLORS.white} style={{marginLeft:10}} /></TouchableOpacity>),
//           headerRight:(()=>{
//             return(
              
//                 <TouchableOpacity style={{marginRight:10}}>
//                   <FontAwesome5 name="heart" size={24} color="white" />
//                 </TouchableOpacity>
                
          
//             )
//           })
//           }}
//         />

//         <Stack.Screen name="SearchScreen" component={SearchScreen}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() =>
//           <TouchableOpacity >
//           <MaterialIcons name="arrow-back-ios" size={28} color="white" style={{marginLeft:10}} onPress={()=>{navigation.goBack()}} />
//       </TouchableOpacity>),

//           }}
//         />

//         <Stack.Screen name="MapScreen" component={MapScreen}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() =>
//             <TouchableOpacity >
//                 <MaterialIcons name="arrow-back-ios" size={28} color="white" style={{marginLeft:10}} onPress={()=>{navigation.goBack()}} />
//             </TouchableOpacity>),

//           }}
//         />


//       <Stack.Screen name="Review" component={ReviewAndRating}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() =>
//             <TouchableOpacity >
//                 <MaterialIcons name="arrow-back-ios" size={28} color="white" style={{marginLeft:10}} onPress={()=>{navigation.goBack()}} />
//             </TouchableOpacity>),

//           }}
//         />

//         <Stack.Screen name="addReview" component={AddReview}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() =>
//             <TouchableOpacity >
//                 <MaterialIcons name="arrow-back-ios" size={28} color="white" style={{marginLeft:10}} onPress={()=>{navigation.goBack()}} />
//             </TouchableOpacity>),

//           }}
//         />

//         <Stack.Screen name="ComparedResults" component={ComparedResults}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() =>
//             <TouchableOpacity >
//                 <MaterialIcons name="arrow-back-ios" size={28} color="white" style={{marginLeft:10}} onPress={()=>{navigation.goBack()}} />
//             </TouchableOpacity>),

//           }}
//         />

        
//         <Stack.Screen name="Payment" component={Payment}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() =>
//             <TouchableOpacity >
//                 <MaterialIcons name="arrow-back-ios" size={28} color="white" style={{marginLeft:10}} onPress={()=>{navigation.goBack()}} />
//             </TouchableOpacity>),

//           }}
//         />

//         <Stack.Screen name="chatroom" component={ChatRoomScreen}
//           options={{
//           headerStyle:{backgroundColor: COLORS.primary},
//           headerTintColor:COLORS.white,
//           headerShown: true,
//           title:'',
//           headerLeft:(() =>
//             <TouchableOpacity >
//                 <MaterialIcons name="arrow-back-ios" size={28} color="white" style={{marginLeft:10}} onPress={()=>{navigation.goBack()}} />
//             </TouchableOpacity>),

//           }}
//         />
        
        
//         </Stack.Navigator> 
    



    )
}

export default StackRoute

const styles = StyleSheet.create({})


{/* <Stack.Screen name='Signin' component ={Login} 
options={{
  headerStyle:{backgroundColor: COLORS.primary},
  headerTintColor:COLORS.white,
  headerShown: true,
  title:''
  
}}
/> */}