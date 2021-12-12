import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import {Header} from 'react-native-elements';
import { AntDesign, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../consts/color';
import {
    ComparisonTable,
    ComparisonTableSection,
    ComparisonTableRow
  } from 'react-native-comparison-table';



const ComparedResults = ({route}) => {
    const navigation = useNavigation()
    const items = route.params.items
    console.log(items)
    return (
        <View>





            <ComparisonTable
                    height={600}
                    headerCellWidth={110}
                    cellWidth={200}
                >
                    <ComparisonTableRow
                        fixed
                        headerCellContent="Name"
                        data={items}
                        comparing="name"
                        rowStyle={styles.rowShadow}
                    />
                    <ComparisonTableRow
                    headerCellContent=""
                    data={items}
                    cellContent={({ item }) => (
                        <Image
                        source={{uri:item.image}}
                        resizeMode="cover"
                        style={{
                            width: 160,
                            height: 120
                        }}
                        />
                    )}
                    cellStyle={styles.alignCenter}
                    />
                   
                    <ComparisonTableRow
                        headerCellContent="Services Offering "
                        data={items}
                        cellContent={({ item }) => (
                            <View style={{}}>

                              <Text style={{}}>{item.services.map((i)=>`${i.service} ,`)}</Text>
                            </View>
                          )}
                    />
                    <ComparisonTableRow
                        headerCellContent="Prices"
                        data={items}
                        cellContent={({ item }) => (
                            <View style={{}}>

                              <Text style={{}}>{item.services.map((i)=>`${i.price} ,`)}</Text>
                            </View>
                          )}
                    />
                    <ComparisonTableRow
                        headerCellContent="Description"
                        data={items}
                        cellContent={({ item }) => (
                            <View style={{}}>
                                <Text style={{}}>
                                   {item?.description}
                                </Text>
                            
                            </View>
                        )}
                    />

                    <ComparisonTableRow
                        headerCellContent="Contact"
                        data={items}
                        cellContent={({ item }) => (
                            <View style={{}}>
                                <Text style={{}}>
                                   {item?.number}
                                </Text>
                            
                            </View>
                        )}
                    />
                    <ComparisonTableRow
                        headerCellContent="Location "
                        data={items}
                        cellContent={({ item }) => (
                            <View style={{}}>
                                <Text style={{}}>
                                   {item?.address?.address}
                                </Text>
                            
                            </View>
                        )}
                    />
                   
                </ComparisonTable>
        </View>
    )
}

export default ComparedResults

const styles = StyleSheet.create({})
