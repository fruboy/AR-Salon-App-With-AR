import React,{useEffect, useState} from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Button, Keyboard,ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import COLORS from '../consts/color';
import axios from "axios"

import SelectDropdown from "react-native-select-dropdown";
import MultiSelect from 'react-native-multiple-select';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import {register} from '../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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

const Signup = ({navigation}) => {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [phone, setphone] = useState("")
    const [city, setcity] = useState('')


    const loading = useSelector(state => state.auth.loading)
    const errors = useSelector(state => state.auth.errors)
    
    
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

    const onSelectedItemsChange = selectedItems => {
        setselectedItems((prev)=>[...prev, {setselectedItems}])
      };

     const countries = ["Rawalpindi", "Islamabad"];
     

    const dispatch = useDispatch()

    const onsubmitHandler=()=>{
       dispatch(register(name,email,password,phone,city))
        
    }


    return (

        <KeyboardAvoidingView behavior={'height'}  style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white} }>
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
                            Welcome
                        </Text>
                        <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
                            Sign up to create an account 
                        </Text>
                    </View>

                    <View style={{marginTop: 20}}>


                        <View style={{ marginTop:20 }}>
                            <View style={styles.inputContainer}>
                                <AntDesign name="user" size={20} color="#A9A9A9" style={styles.inputIcon} />
                                <TextInput placeholder="Name" onChangeText={setname} value={name} placeholderTextColor='#A9A9A9' style={styles.input} />
                            </View>
                        </View>
          
                        <View style={{ }}>
                            <View style={styles.inputContainer}>
                                <AntDesign name="mail" size={20} color="#A9A9A9" style={styles.inputIcon} />
                                <TextInput placeholder="Email" onChangeText={setemail} value={email}  type='email' placeholderTextColor="#A9A9A9" style={styles.input} />
                            </View>
                        </View>

                        <View style={{ }}>
                            <View style={styles.inputContainer}>
                                <AntDesign name="lock" size={20} color="#A9A9A9" style={styles.inputIcon} />
                                <TextInput placeholder="Password" onChangeText={setpassword} value={password} type='password' placeholderTextColor='#A9A9A9'  secureTextEntry style={styles.input} />
                            </View>
                        </View>


                        <View style={{ }}>
                            <View style={styles.inputContainer}>
                                <AntDesign name="phone" size={20} color="#A9A9A9" style={styles.inputIcon} />
                                <TextInput placeholder="Phone#" onChangeText={setphone} value={phone} placeholderTextColor='#A9A9A9' style={styles.input} />
                            </View>
                        </View>
                        <View style={{marginTop:10}}>
                            <SelectDropdown
                                data={countries}
                                // defaultValueByIndex={1}
                                // defaultValue={'Egypt'}
                                onSelect={(selectedItem, index) => {
                                    setcity(selectedItem)
                                }}
                                defaultButtonText={"Select city"}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                return item;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                renderDropdownIcon={() => {
                                return (
                                    <FontAwesome name="chevron-down" color={"#444"} size={18} />
                                );
                                }}
                                dropdownIconPosition={"right"}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                            />
                        </View>

         


                        <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={onsubmitHandler}>
                        {loading ?  
                            <ActivityIndicator size="large" color="#fff" />
                            :
                            <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 18}}>Sign up</Text>
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
                            <View style={styles.line}></View>
                                <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
                            <View style={styles.line}></View>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            
                            marginBottom: 20,
                    }}>
                        <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                            Don`t have an account ?
                        </Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate("login")}}>
                            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                               Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{height:60}}></View>
                    
                </ScrollView>
        </KeyboardAvoidingView>

    //     <KeyboardAvoidingView
    //         behavior={Platform.OS === "ios" ? "padding" : "height"}
    //         style={styles.container}
    //         keyboardVerticalOffset={10}
    //     >
           
    //     <ScrollView>
    //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>




    //         </TouchableWithoutFeedback>

    //     </ScrollView>
      
    //  </KeyboardAvoidingView>
    )
}

export default Signup;

const styles = StyleSheet.create({
    

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



    dropdown1BtnStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFF",
        borderBottomColor:COLORS.light,
        borderBottomWidth:1
      },
      dropdown1BtnTxtStyle: { color:COLORS.light, textAlign: "left" },
      dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
      dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: COLORS.light,
      },
      dropdown1RowTxtStyle: { color: COLORS.light, textAlign: "left" },

})
