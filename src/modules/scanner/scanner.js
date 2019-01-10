import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
//import {connect} from "react-redux";
import {Baliza} from "./elements/baliza"
import connect from "react-redux/es/connect/connect";
import {Actions} from 'react-native-router-flux';
import AuxModule from "../auxModule/auxModule";
import {startScan, stopScan} from "../auxModule/auxModule";
import AwesomeButton from 'react-native-really-awesome-button'

class Scanner extends Component {

    interval;
    percentage;


    // _renderButton = (text, onPress, backgroundColor) => (
    //
    //     // <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={onPress}>
    //     //     <Text>{text}</Text>
    //     // </TouchableOpacity>
    // );

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState();
        }, 1000)
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    _showBeacons(beacon, dimension) {
        return <Baliza distance={parseFloat(beacon.accuracy).toFixed(2)} name={beacon.name}
                       size={this.props.beaconArray.beaconsOnRange.length} height={dimension}/>

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AuxModule/>
                <View style={styles.containerTop} onLayout={(event) => {
                    this.percentage = {height} = event.nativeEvent.layout;
                }}>
                    {this.props.beaconArray.beaconsOnRange.length > 0 ? this.props.beaconArray.beaconsOnRange.map(
                        (beacon) => {
                            return this._showBeacons(beacon, this.percentage);
                        }) : null}
                </View>
                <View style={styles.containerDown}>
                    <View style={[styles.buttonContainer, {alignSelf: 'flex-start'}]}>
                        <AwesomeButton
                            progress
                            onPress={(next) => {
                                /** Do Something **/
                                next();
                            }}>
                            Start Scanner
                        </AwesomeButton>

                    </View>
                    <View style={{flex:1, alignItems:'center', borderLeftWidth: 2, borderRightWidth: 2, borderColor:'rgb(0, 164, 211)'}}>
                        <View style={styles.triangle}/>
                        <Text style={styles.text}>Your Position</Text>
                    </View>
                    <View style={[styles.buttonContainer, {alignSelf: 'flex-end'}]}>

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
        backgroundColor: '#fefefe'
    },
    containerDown: {
        flexDirection: "row",
        flex: 2,
        backgroundColor: "#52abbc",
        // alignItems: 'center'

    },
    text:{
        fontSize: 20,

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


export default connect(mapStateToProps)(Scanner);

