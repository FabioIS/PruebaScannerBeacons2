import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene} from 'react-native-router-flux'
import Home from "../home/home";
import Scanner from "../scanner/scanner";
import BeaconDetector from "../beaconDetector/beaconDetector";



class IndexNavigation extends Component{
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene
                        key="Home"
                        component={Home}
                        initial
                        hideNavBar
                    />

                    <Scene
                        key="Scanner"
                        component={Scanner}
                        hideNavBar
                    />

                    <Scene
                        key="BeaconDetector"
                        component={BeaconDetector}
                        hideNavBar
                    />

                </Scene>

            </Router>
        );
    }
}

const styles = StyleSheet.create({

});
export default IndexNavigation

