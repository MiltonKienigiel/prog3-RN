import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

export default function Post ({item}){

    return(
        <View>
            <Text>{item.data.description}</Text>
            <Text>{item.data.createdAt}</Text>
            <Text>{item.data.owner}</Text>
        </View>
    )
} // Post