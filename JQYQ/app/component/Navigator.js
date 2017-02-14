/**
 * Created by jiahailiang on 2017/1/18.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    BackAndroid,
    Platform
} from 'react-native';
// import LoginView from '../page/LoginView';
import TabbarView from '../page/TabbarView'
import Seting from '../util/Seting'
//import GuideView from './GuideView'//引导页根据需要添加
import LoginView from '../page/LoginView'
export default class navigator extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let defaultName = 'LoginView';
        let defaultComponent = LoginView;

        // let defaultName = 'TabbarView';
        // let defaultComponent = TabbarView;
        return (
            <Navigator
                initialRoute = {{name : defaultName , component: defaultComponent}}
                configureScene = {(route) => {
                    //return Navigator.SceneConfigs.VerticalDownSwipeJump;
                    return Navigator.SceneConfigs.FloatFromRight;
                    //gestures: {}
                }}
                renderScene={(route,navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator = {navigator} />
                }}
            />
        );
    }

};
