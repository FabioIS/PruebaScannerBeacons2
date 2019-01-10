import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export const Baliza = (Props) => {

    const {
        distance,
        name,
        size,
    } = Props;

    function _getPercentage(distance) {
        return 95-(distance*5);
    }


    return (
        <View style={styles.beaconContainer}>
            <Text style={{fontSize: 30 / size, justifyContent: "flex-start"}}>{name}</Text>
            <View style={[{
                width: 40 / size,
                height: 40 / size,
                borderRadius: (40 / 2) / size,
                top: _getPercentage(parseFloat(distance).toFixed(1)) + '%'
            }, styles.circle]}/>
            <Text style={{
                fontSize: 20 / size,

            }}>
                {distance}m
            </Text>
        </View>


    )

};

const styles = StyleSheet.create({
    beaconContainer: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center"

    },
    circle: {
        backgroundColor: 'black',
        position: 'absolute'
    }
});

