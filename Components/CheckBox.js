import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from "../consts/color";

const CheckBox = ({title, price, onPress, key, unchecked}) => {

    const [checked, setchecked] = useState(false)
    
    const onClickHandler = () => {
        if(checked){
        setchecked(false);
        unchecked();
        }
        else {
        setchecked(true)
        onPress();
        }
    }

   const name = checked ? "radio-button-checked" : "radio-button-unchecked"
    return (
        <View key={key} style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:15, paddingVertical:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <MaterialIcons name={name} size={24} color="black" onPress={ onClickHandler } />
                 <Text style={{paddingLeft: 5, fontSize:14, fontWeight:'bold', color:COLORS.light}}>
                   {title}
               </Text>
            </View>
           
           <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
              
               <Text style={{}}>
                   {price} Rs 
               </Text>
           </View>
        </View>
    )
}

export default CheckBox

const styles = StyleSheet.create({})
