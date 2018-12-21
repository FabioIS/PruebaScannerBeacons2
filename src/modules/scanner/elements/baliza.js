import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export const Baliza = (Props) => {
    const {
        distance,
        name
    } = Props;

    return (
        <View style={{flex:1}}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.circle}/>
            <Text style={styles.distance}> {distance}m </Text>
        </View>


    )

};

const styles = StyleSheet.create({
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'black'
    },
    distance:{
        fontSize: 2,
    },
    container:{
        alignItems: "center"
    },
    name:{
        fontSize: 4,
        justifyContent: "flex-start"
    }
});

