
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert,  TouchableOpacity } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import COLORS from "../consts/color";

const StripePayment = () => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();
    return (
        <View style={{margin:20}}>
     
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          style={styles.input}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={cardDetails => {
            setCardDetails(cardDetails);
          }}
        />
          <TouchableOpacity style={styles.btnPrimary} opacity={0.9}  >
               
                <Text style={{color:COLORS.white, fontSize:16, fontWeight:'bold'}}>
                    Pay
                </Text>
                
            </TouchableOpacity>

      </View>
    )
}

export default StripePayment

const styles = StyleSheet.create({

      input: {
        backgroundColor: COLORS.gray,
    
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
      },
      card: {
        backgroundColor: COLORS.gray,
      },
      cardContainer: {
        height: 50,
        marginVertical: 30,
      },
      btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        width:'80%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:20,
        marginTop: 10,
    },
})
