import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import COLORS from '../consts/color';


const Service = ({items, addItem, removeItem, selected}) => {
    console.log(items)
    console.log("arr", selected)
    return (
        <>
            <TouchableOpacity style={{flex:1, marginTop:30}} onPress={()=>removeItem(items)} activeOpacity={0.6}>
            <View style={{flexDirection:"row", backgroundColor: COLORS.gray,marginHorizontal:10,padding: 16, borderRadius:10}}>
                <Text style={styles.name}>
                    {items}
                </Text>
                <Text style={{}}>
                    add
                </Text>
            </View>
        </TouchableOpacity>
        {/* {selected.map((item)=>(
                    // item === items ?        
                    // <TouchableOpacity style={{flex:1, marginTop:30}} onPress={removeItem(items)} activeOpacity={0.6}>
                    //     <View style={{flexDirection:"row",backgroundColor: COLORS.primary,marginHorizontal:10,padding: 16,borderRadius:10}}>
                    //         <Text style={styles.name}>
                    //            {items}
                    //         </Text>
                    //         <Text style={{}}>
                    //             remove
                    //         </Text>
                    //     </View>
                    // </TouchableOpacity>:
                    // <TouchableOpacity style={{flex:1, marginTop:30}} onPress={addItem(items)} activeOpacity={0.6}>
                    //        <View style={{flexDirection:"row", backgroundColor: COLORS.gray,marginHorizontal:10,padding: 16, borderRadius:10}}>
                    //            <Text style={styles.name}>
                    //               {items}
                    //            </Text>
                    //            <Text style={{}}>
                    //                add
                    //            </Text>
                    //        </View>
                    //    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, marginTop:30}} onPress={addItem(items)} activeOpacity={0.6}>
                    <View style={{flexDirection:"row", backgroundColor: COLORS.gray,marginHorizontal:10,padding: 16, borderRadius:10}}>
                        <Text style={styles.name}>
                           {items}
                        </Text>
                        <Text style={{}}>
                            add
                        </Text>
                    </View>
                </TouchableOpacity>
        )
        
            )} */}
        </>
 
    )
}

export default Service

const styles = StyleSheet.create({




    name:{
        color:COLORS.light,
        fontSize:18,
        fontWeight:'bold',
        paddingHorizontal:10,
        marginRight: 5,
    }
})
