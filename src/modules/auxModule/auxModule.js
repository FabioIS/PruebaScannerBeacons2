import React, {Component} from 'react';
import {DeviceEventEmitter} from "react-native";
import {connection, stopScan, startScan} from '../auxModule/manager/scannerManager'
import Kontakt from 'react-native-kontaktio';
import {addRange, subsRange} from "../beaconDetector/actions/DetectorActions";
import {connect} from "react-redux";
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



class AuxModule extends Component{
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
        connection();
        setInterval(() => {
            this._redux();
        }, 1500);

    }

    componentWillUnmount() {
        // Disconnect beaconManager and set to it to null
        disconnect();
        DeviceEventEmitter.removeAllListeners();
    }

    _redux = () => {
        //this._restartScanning();
        if(this.state.eddystones.length > 0) {
            this.props.addRange(this.state.eddystones);
        }
    };

    render(){
        return(
            null
        )
    }

}

const mapStateToProps = state => {
    return {
        beaconArray: state.RangeReducer

    }
};



const mapStateToPropsAction = {addRange, subsRange};

export default connect(mapStateToProps, mapStateToPropsAction)(AuxModule);
