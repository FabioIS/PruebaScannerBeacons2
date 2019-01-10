import {addRange} from "./actions/DetectorActions";
import React, {Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,ScrollView} from 'react-native';
import { DeviceEventEmitter } from 'react-native'
import Kontakt from 'react-native-kontaktio';
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';

const {connect2,
    configure,
    disconnect,
    isConnected,
    startScanning,
    stopScanning,
    restartScanning,
    isScanning,
    // setBeaconRegion,
    setBeaconRegions,
    getBeaconRegions,
    setEddystoneNamespace,
    IBEACON,
    EDDYSTONE,
    // Configurations
    scanMode,
    scanPeriod,
    activityCheckConfiguration,
    forceScanConfiguration,
    monitoringEnabled,
    monitoringSyncInterval,} = Kontakt;

const namespace1 = {
    instanceId: "Any instance ID",
    namespace: "acfd065e1a514932ac01",
    identifier: "Everywheres"
};


class BeaconDetector extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            beacons: [],
            eddystones: [],
            statusText: null,
        };

    }


    componentWillMount(){

    }

    componentDidMount() {

        // setInterval(() => {
        //    this._redux();
        // }, 1500);

    }

    componentWillUnmount() {
        // Disconnect beaconManager and set to it to null
        disconnect();
        DeviceEventEmitter.removeAllListeners();
    }

    _redux = () => {
        //this._restartScanning();
        if(this.state.eddystones.length > 0) {
            this.props.addRange();
        }
    };



    _restartScanning = () => {
        restartScanning()
            .then(() => this.setState({ scanning: true, eddystones: [], beacons: [], statusText: null }))
            .then(() => console.log('restarted scanning'))
            .catch(error => console.log('[restartScanning]', error));
    };
    _isScanning = () => {
        isScanning()
            .then(result => {
                this.setState({ statusText: `Device is currently ${result ? '' : 'NOT '}scanning.` });
                console.log('Is device scanning?', result);
            })
            .catch(error => console.log('[isScanning]', error));
    };
    _isConnected = () => {
        isConnected()
            .then(result => {
                this.setState({ statusText: `Device is ${result ? '' : 'NOT '}ready to scan beacons.` });
                console.log('Is device connected?', result);
            })
            .catch(error => console.log('[isConnected]', error));
    };

    _renderEddystone = () => {
        const colors = ['#F7C376', '#EFF7B7', '#F4CDED', '#A2C8F9', '#AAF7AF'];

        console.log(this.state.eddystones);
        return this.state.eddystones.sort((a, b) => a.accuracy - b.accuracy).map((beacon, ind) => (
            <View key={ind} style={[styles.beacon, {backgroundColor: colors[beacon.minor - 1]}]}>
                <Text style={{fontWeight: 'bold'}}>{beacon.name}</Text>
                <Text>Distance: {parseFloat(beacon.accuracy).toFixed(2)}m</Text>
            </View>
        ), this);
    };

    _renderEmpty = () => {
        const { scanning, beacons } = this.state;
        let text;
        if (!scanning) text = "Start scanning to listen for beacon signals!";
        if (scanning && !beacons.length) text = "No beacons detected yet...";
        return (
            <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    };

    _renderButton = (text, onPress, backgroundColor) => (
        <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    );

    _renderStatusText = () => {
        const { statusText } = this.state;
        return statusText ? (
            <View style={styles.textContainer}>
                <Text style={[styles.text, { color: 'red' }]}>{statusText}</Text>
            </View>
        ) : null;
    };

    _isIdenticalBeacon = (b1, b2) => (
        (b1.identifier === b2.identifier) &&
        (b1.uuid === b2.uuid) &&
        (b1.major === b2.major) &&
        (b1.minor === b2.minor)
    );


    render() {
        const { scanning, eddystones} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    {this._renderButton('Start scan', _startScanning, '#84e2f9')}
                    {this._renderButton('Stop scan', _stopScanning, '#84e2f9')}
                    {this._renderButton('Restart scan', this._restartScanning, '#84e2f9')}
                </View>
                <View style={styles.buttonContainer}>
                    {this._renderButton('Go to scanner', Actions.Scanner, '#f2a2a2')}
                    {this._renderButton('Is connected?', this._isConnected, '#f2a2a2')}
                </View>
                {this._renderStatusText()}
                <ScrollView>
                    {(scanning && eddystones !== undefined && eddystones.length > 0 )? this._renderEddystone() : this._renderEmpty()}
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    beacon: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    button: {
        padding: 10,
        borderRadius: 10,
    },
});


const mapStateToProps = state => {
    return {
        beaconArray: state.RangeReducer

    }
};



const mapStateToPropsAction = {addRange};

export default connect(mapStateToProps, mapStateToPropsAction)(BeaconDetector);
