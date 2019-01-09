import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
//import {connect} from "react-redux";
import {Baliza} from "./elements/baliza"
import connect from "react-redux/es/connect/connect";
import {Actions} from 'react-native-router-flux';
import AuxModule from "../auxModule/auxModule";
import {startScan, stopScan} from "../auxModule/auxModule";

class Scanner extends Component {

    _renderButton = (text, onPress, backgroundColor) => (
        <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    );

    componentDidMount(): void {
        setInterval(() => {
            console.log("Cambiando el scanner");
            this.setState();
        }, 1000)
    }

    _showBeacons(): [] {
        let result = [];
        if (this.props.beaconArray.beaconsOnRange.length > 0) {
            this.props.beaconArray.beaconsOnRange.map((beacon) => {
                console.log(beacon.name + " showIt");
                result.push(
                    <Baliza distance={parseFloat(beacon.accuracy).toFixed(2)} name={beacon.name}/>
                )

            });
        }
        if (result.length > 0) {
            return (<FlatList data={result} renderItem={({item}) =>  <View style={{flex: 1}}>{item}</View>} />)
        }
        return result;

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AuxModule/>
                <View style={styles.containerTop}>
                    {this.props.beaconArray.beaconsOnRange.length > 0 ? this._showBeacons() : null}
                </View>
                <View style={styles.containerDown}>
                    <View style={[styles.buttonContainer, {alignSelf: 'flex-start'}]}>
                        {this._renderButton('Start scanner', startScan, '#f2a2a2')}
                        {this._renderButton('Stop scanner', stopScan, '#f2a2a2')}
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
        flexDirection: 'row',
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
    beaconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});


const mapStateToProps = state => {
    return {
        beaconArray: state.RangeReducer
    }
};

const mapStateToPropsAction = {};

export default connect(mapStateToProps)(Scanner);

