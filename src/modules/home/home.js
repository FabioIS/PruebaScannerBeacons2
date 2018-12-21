import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';


class Home extends Component {
    render() {
        return (
                <View style={styles.container}>

                    <TouchableOpacity onPress={Actions.BeaconDetector}>
                        <View style={styles.circle}>
                            <Text style={styles.text}>
                                TAP TO PLAY
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        color: 'black',
        alignItems: 'center',

    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 50
    }
});

export default Home