import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button,SafeAreaView,FlatList,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import COLORS from '../consts/color';
import Home from '../Screens/Home';
import SearchScreen from '../Screens/SearchScreen';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SalonDetail from '../Screens/SalonDetail'
import Beard1 from '../Screens/Beardstyle1'
import Beard2 from '../Screens/Beardstyle2'
import Beard3 from '../Screens/Beardstyle3'
import Beard4 from '../Screens/Beardstyle4'

import Hairstyle1 from "../Screens/Hairstyle1"
import Hairstyle2 from "../Screens/Hairstyle2"
import Hairstyle3 from "../Screens/Hairstyle3"
import Hairstyle4 from "../Screens/Hairstyle4"

const Stack = createStackNavigator();

const StackAuth = ({navigation}) => {
    return (
        // <NavigationContainer>
     <Stack.Navigator >
     <Stack.Screen
          name="Choose Hairstyle"
          component={StartScreen}
          options={{
            title: 'Choose Hairstyle',
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="Hairstyle 1"
          component={Hairstyle1}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="Hairstyle 2"
          component={Hairstyle2}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="Hairstyle 3"
          component={Hairstyle3}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        /> 
        <Stack.Screen
          name="Hairstyle 4"
          component={Hairstyle4}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="Beard Style 1"
          component={Beard1}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="Beard Style 2"
          component={Beard2}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="Beard Style 3"
          component={Beard3}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="Beard Style 4"
          component={Beard4}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff'
          }}
        />   

      {/* <Stack.Screen name='Signin' component ={Login} 
          options={{
            headerStyle:{backgroundColor: COLORS.primary},
            headerTintColor:COLORS.white,
            headerShown: true,
            title:''
            
          }}
        /> */}

        {/* <Stack.Screen name="login" component={Login}
         
         options={{
          headerStyle:{backgroundColor: COLORS.primary},
          headerTintColor:COLORS.white,
          headerShown: true,
          title:'',
    
                
          
      
          }}
        />
      <Stack.Screen name="signup" component={Signup}
         
         options={{
          headerStyle:{backgroundColor: COLORS.primary},
          headerTintColor:COLORS.white,
          headerShown: true,
          title:'',
    
                
          
      
          }}
        /> */}
        
        
        </Stack.Navigator> 
        // </NavigationContainer>
    



    )
}

export default StackAuth

function StartScreen({navigation}) {
  const HAIRSTYLES = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Hair Style 1',
      pic: require('../assets/m1-black.png'),
      model: 'm1',
      screen: 'Hairstyle 1',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Hair Style 2',
      pic: require('../assets/m5-black.png'),
      model: 'm2',
      screen: 'Hairstyle 2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Hair Style 3',
      pic: require('../assets/m7-black.png'),
      model: 'm3',
      screen: 'Hairstyle 3',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73', 
      name: 'Hair Style 4',
      pic: require('../assets/m10-black.png'),
      model: 'm4',
      screen: 'Hairstyle 4',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74', 
      name: 'Beard Style 1',
      pic: require('../assets/beard1.png'),
      model: 'm5',
      screen: 'Beard Style 1',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d75', 
      name: 'Beard Style 2',
      pic: require('../assets/beard2.png'),
      model: 'm6',
      screen: 'Beard Style 2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d76', 
      name: 'Beard Style 3',
      pic: require('../assets/beard3.png'),
      model: 'm7',
      screen: 'Beard Style 3',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d77', 
      name: 'Beard Style 4',
      pic: require('../assets/beard4.png'),
      model: 'm8',
      screen: 'Beard Style 4',
    },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => {
          navigation.navigate( item.screen,{
            name: item.name,
            pic: item.pic,
            model: item.model
          })
        }}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.img} source={item.pic} />
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  const HeaderComponent = () => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionDescription}>Choose a Hairstyle</Text>
      </View>
    );
  };
  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={HAIRSTYLES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={SeparatorComponent}
          ListHeaderComponent={HeaderComponent}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    flex: 1
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'plum',
    paddingTop: 2,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  }
});
