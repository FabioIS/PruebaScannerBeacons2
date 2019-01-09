import React, {Component} from 'react';
import {DeviceEventEmitter, PermissionsAndroid} from "react-native";
import Kontakt from 'react-native-kontaktio';
import {addRange, subsRange} from "../beaconDetector/actions/DetectorActions";
import {connect} from "react-redux";

const {
    connect2,
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
    monitoringSyncInterval,
} = Kontakt;

const namespace1 = {
    instanceId: "Any instance ID",
    namespace: "acfd065e1a514932ac01",
    identifier: "Everywheres"
};


async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
                'title': 'Access fine location',
                'message': 'Beacon Scanner needs access to your GPS ' +
                    'so you we are able to find the beacons.'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the Scanner")
        } else {
            console.log("GPS permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}

export const startScan = () => {
    console.log("Is scanning madakaca");
    startScanning()
        .then(() => console.log('started scanning'))
        .catch(error => console.log('[startScanning]', error));
}

export function stopScan() {
    console.log("Estamos parando la vaina");
    stopScanning()
        .then(() => console.log('stopped scanning'))
        .catch(error => console.log('[stopScanning]', error));
}


class AuxModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            beacons: [],
            eddystones: [],
            statusText: null,
        };

    }


    componentWillMount() {

    }

    async componentDidMount() {
        console.log("Parece que conectamos");
        await requestPermissions();
        connect2(
            'MY_SCANNER',
            [EDDYSTONE],
        )
            .then(() => configure({
                scanMode: scanMode.BALANCED,
                scanPeriod: scanPeriod.RANGING,
                activityCheckConfiguration: activityCheckConfiguration.DEFAULT,
                forceScanConfiguration: forceScanConfiguration.MINIMAL,
                monitoringEnabled: monitoringEnabled.TRUE,
                monitoringSyncInterval: monitoringSyncInterval.DEFAULT,
            }))
            .then(() => setEddystoneNamespace(namespace1))
            .catch(error => console.log('error', error));

        DeviceEventEmitter.addListener(
            'monitoringCycle',
            ({status}) => {
                console.log('monitoringCycle', status);
            }
        );

        // Se ejecuta cuando a parece un beacon eddystone
        DeviceEventEmitter.addListener(
            'eddystoneDidAppear',
            ({eddystone, namespace}) => {
                let depurator = false;
                console.log('eddystoneDidAppear', eddystone, namespace);
                let x = this.state.eddystones;
                x.map((beacon) => {
                    console.log("asere", this._isIdenticalBeacon(beacon, eddystone));
                    if(this._isIdenticalBeacon(beacon, eddystone)){
                        depurator = true;
                } });
                !depurator ? x.push(eddystone) : null;
                depurator = false;
                console.log("Heyou", x);
                this.setState({
                    eddystones: x
                });

                console.log("Pusheado : ", this.state.eddystones)
            }
        );

        // Se ejecuta cuando desaparece un beacon eddystone
        DeviceEventEmitter.addListener(
            'eddystoneDidDisappear',
            ({eddystone: lostEddystone, region}) => {
                console.log('eddystoneDidDisappear', lostEddystone, region);

                const {eddystones} = this.state;
                const index = eddystones.findIndex(beacon =>
                    this._isIdenticalBeacon(lostEddystone, beacon)
                );
                this.setState({
                    eddystones: eddystones.reduce((result, val, ind) => {
                        // don't add disappeared beacon to array
                        if (ind === index) return result;
                        // add all other beacons to array
                        else {
                            result.push(val);
                            return result;
                        }
                    }, [])
                });
            }
        );

        // Se ejecuta cuando entramos en un namespace (eddystone)
        DeviceEventEmitter.addListener(
            'namespaceDidEnter',
            ({namespace}) => {
                console.log('namespaceDidEnter', namespace);
            }
        );

        // Se ejecuta cuando salimos de un namespace (eddystone)
        DeviceEventEmitter.addListener(
            'namespaceDidExit',
            ({status}) => {
                console.log('namespaceDidExit', status);
            }
        );

        setInterval(() => {
            console.log("Cambiando el redux");
            this._redux();
        }, 1500);

    }

    _isIdenticalBeacon = (b1, b2) => (
        (b1.instanceId === b2.instanceId) &&
        (b1.name === b2.name)
    );

    componentWillUnmount() {
        // Disconnect beaconManager and set to it to null
        console.log("Destruido");
        disconnect();
        DeviceEventEmitter.removeAllListeners();
    }

    _redux = () =>{
        console.log("Estamos añadiendo al redux");
        this.props.addRange(this.state.eddystones)

    };


    restartScan = () => {
        restartScanning()
            .then(() => this.setState({scanning: true, eddystones: [], beacons: [], statusText: null}))
            .then(() => console.log('restarted scanning'))
            .catch(error => console.log('[restartScanning]', error));
    };


    render() {
        return (
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
