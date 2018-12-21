import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
//import {connect} from "react-redux";
import {addRange, subsRange} from "../beaconDetector/actions/DetectorActions";
import {Baliza} from "./elements/baliza"
import {DeviceEventEmitter} from 'react-native'
import connect from "react-redux/es/connect/connect";
import {Actions} from 'react-native-router-flux';
import BeaconDetector from '../beaconDetector/beaconDetector'


class Scanner extends Component {

    _renderButton = (text, onPress, backgroundColor) => (
        <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    );

    componentDidMount(): void {
        setInterval(() => {
            this.setState();
        }, 1000)
    }

    _showBeacons(): [] {
        let result = [];
        this.props.beaconArray.beaconsOnRange.map((beacon, index) => {
            console.log(beacon.name + "showIt");
            result.push(
                <View style={{flex: 1}}>
                    <Baliza distance={beacon.accuracy} name={beacon.name}/>
                </View>
            )

        });
        return result;
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.containerTop}/>
                <View style={styles.containerDown}>
                    <View style={[styles.buttonContainer, {alignSelf: 'flex-start'}]}>
                        {this._renderButton('Start scanner', '#f2a2a2')}
                        {this._renderButton('Stop scanner',  '#f2a2a2')}
                    </View>
                    <View style={styles.triangle}/>
                    <View style={[styles.buttonContainer, {alignSelf: 'flex-end'}]}>
                        {this._renderButton('Show beacons on range', Actions.BeaconDetector, '#f2a2a2')}
                    </View>
                </View>
            </View>

        );
    }

}


const styles = StyleSheet.create({
    containerTop: {
        flex: 8,
        backgroundColor: '#f2a2a2'
    },
    containerDown: {
        flexDirection: "row",
        flex: 2,
        backgroundColor: "blue",
        // alignItems: 'center'

    },
    triangle: {
        flex: 1,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 60,
        borderRightWidth: 60,
        borderBottomWidth: 110,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red',
        alignSelf: 'center'

    },
    buttonContainer: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'column',
        alignItems: 'center',
        //justifyContent: 'space-around',

    },
    button: {
        padding: 10,
        borderRadius: 10,
    },
    show: {}
});


const mapStateToProps = state => {
    return {
        beaconArray: state.RangeReducer
    }
};

const mapStateToPropsAction = {};

export default connect(mapStateToProps, mapStateToPropsAction)(Scanner);

