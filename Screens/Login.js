import React , {useState, useEffect} from 'react'
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, SafeAreaView, Platform,ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../consts/color';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {login} from '../redux/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'gray', backgroundColor:COLORS.primary }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };

const Login = ({navigation}) => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    
    const loading = useSelector(state => state.auth.loading)
    const errors = useSelector(state => state.auth.errors)
    const dispatch = useDispatch()


    const onsubmitHandler= async ()=>{
        console.log(email, password);
        dispatch(login(email, password))
    }


    useEffect(() => {
        if(errors){
            errors.map((item,index)=>
            Toast.show({
                type: 'success',
                text1: `${item.msg}`,
                
              })
            )
       
        }
    }, [errors])

    //     const user= {
    //         email:email,
    //         password:password
    //     }
    //     console.log(user);
    //     try {
    //         const config = {
    //             header: {
    //                 'Content-Type': 'application/json'
                
    //         }
    //     }
    //     const body = JSON.stringify(user);
    //     console.log(body)
    //     const res = await axios.post("http://arsalon.xyz:5000/api/auth", body, config)
    //     console.log(res.data)
    // }
    //     catch (err){    
    //         console.log(err.response.data);
    //     }
    // }
    
    return (
 
        <KeyboardAvoidingView behavior="height"  style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white} }>
                <Toast
                    position='top'
                    bottomOffset={20}
                    config={toastConfig}
                />
            <StatusBar style= "light" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', marginTop: 30 , alignItems:'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.light}}>
                            AR
                        </Text>
                        <View style={{backgroundColor: COLORS.light, height:4, width: 10}}></View>
                        <Text
                            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.primary}}>
                            Salon
                        </Text>
                    </View>

                    <View style={{marginTop: 40}}>
                        <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.primary}}>
                            Welcome Back,
                        </Text>
                        <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
                            Sign in to continue
                        </Text>
                    </View>

                    <View style={{marginTop: 20}}>
          
                        <View style={{ marginTop:20}}>
                            <View style={STYLES.inputContainer}>
                                <AntDesign name="mail" size={20} color="#A9A9A9" style={STYLES.inputIcon} />
                                <TextInput placeholder="Email" onChangeText={setemail} value={email}  type='email' placeholderTextColor="#A9A9A9" style={STYLES.input} />
                            </View>
                        </View>

                        <View style={{ }}>
                            <View style={STYLES.inputContainer}>
                                <AntDesign name="lock" size={22} color="#A9A9A9" style={STYLES.inputIcon} />
                                <TextInput placeholder="Password" onChangeText={setpassword} value={password} type='password' placeholderTextColor='#A9A9A9'  secureTextEntry style={STYLES.input} />
                            </View>
                        </View>

                        <TouchableOpacity style={STYLES.btnPrimary} activeOpacity={0.8} onPress={onsubmitHandler}>
                        {loading ?  
                            <ActivityIndicator size="large" color="#fff" />
                            :
                            <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 18}}>Sign in</Text>
                            }
                                
                        </TouchableOpacity>
          
                        <View
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View style={STYLES.line}></View>
                                <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
                            <View style={STYLES.line}></View>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginBottom: 20,
                    }}>
                        <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                            Don`t have an account ?
                        </Text>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate("signup")
                        }}>
                            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                               Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{height:60}}></View>
                    
            </ScrollView>
        </KeyboardAvoidingView>
      
    )
}

export default Login;

const STYLES = StyleSheet.create({



    inputContainer: {
        flexDirection: 'row', 
        marginTop: 20
    },
    
    input: {
      color: COLORS.light,
      paddingLeft: 30,
      borderColor: COLORS.light,
      borderBottomWidth: 0.5,
      flex: 1,
      fontSize: 18,
      marginTop: 10,
    },
    
    inputIcon: {
        marginTop: 15, 
        position: 'absolute'
    },

    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
  
    btnSecondary: {
      height: 50,
      borderWidth: 1,
      borderColor: '#a5a5a5',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      flex: 1,
      flexDirection: 'row',
    },
   
  
    line: {
        height: 1, 
        width: 30, 
        backgroundColor: '#a5a5a5'
    },

   
})



