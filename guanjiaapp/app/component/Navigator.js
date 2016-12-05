/**
 * Created by jiahailiang on 2016/11/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
import LoginView from '../page/LoginView';
import TabbarView from '../page/TabbarView'
export default class navigator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let defaultName = 'TabbarView';
        let defaultComponent = TabbarView;
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
