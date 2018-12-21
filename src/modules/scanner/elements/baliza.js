import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export const Baliza = (Props) => {
    const {
        distance,
        name
    } = Props;

    return (
        <View style={styles.beaconContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.circle}/>
            <Text style={styles.distance}> {distance}m </Text>
        </View>


    )

};

const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        backgroundColor: 'black'
    },
    distance:{
        fontSize: 10,
    },
    container:{
        alignItems: "center"
    },
    name:{
        fontSize: 15,
        justifyContent: "flex-start"
    },
    beaconContainer: {
        flex: 1,
       // justifyContent: "center",
        alignItems: "center"
    }
});

