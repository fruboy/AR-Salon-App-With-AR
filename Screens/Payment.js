import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import StripePayment from '../Components/StripePayment'

const Payment = () => {
    return (
        <View>
            <CheckBox
                center
                title='Click Here to Remove This Item'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={()=>{}}
            />
            <StripePayment />
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({})
