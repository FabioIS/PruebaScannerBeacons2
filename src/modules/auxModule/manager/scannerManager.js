import {DeviceEventEmitter} from 'react-native'
import Kontakt from 'react-native-kontaktio';

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

export const connection = () => {
    console.log("Parece que conectamos");
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
            console.log('eddystoneDidAppear', eddystone, namespace);
            let x = this.state.eddystones;
            x.push(eddystone);
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
};

export const startScan = () => {
    startScanning()
        .then(() => this.setState({scanning: true, statusText: null}))
        .then(() => console.log('started scanning'))
        .catch(error => console.log('[startScanning]', error));
};

export const stopScan = () => {
    stopScanning()
        .then(() => this.setState({scanning: false, eddystones: [], beacons: [], statusText: null}))
        .then(() => console.log('stopped scanning'))
        .catch(error => console.log('[stopScanning]', error));
};

