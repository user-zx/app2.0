/**
 * Created by jiahailiang on 2017/1/18.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
    BackAndroid,
    Platform,
} from 'react-native';
//import GuideView from './GuideView'//引导页根据需要添加
import LoginView from '../page/LoginView';
import BGGlobal from '../util/BGGlobal';

//var defaultName = BGGlobal.isLogin ? 'LoginView' : 'TabbarView';
//var defaultComponent = BGGlobal.isLogin ? LoginView : TabbarView;

export default class navigator extends Component {
    constructor(props) {
        var MySceneConfigs = Navigator.SceneConfigs.PushFromRight;
        MySceneConfigs.gestures.pop = null;
        super(props);
    }
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', (() => {
            const navigator = this.refs.navigator;
            if(!navigator) {
                return false
            }
            const routes = navigator.getCurrentRoutes();
            if(routes.length === 1) {

                if(this.nextTimeExit) {
                    return false
                } else {
                    this.nextTimeExit = true;
                    alert("再按一次回退键退出程序");
                    setTimeout( (() => {
                        this.nextTimeExit = false
                    }).bind(this), 2000);
                    return false
                }

                return
            } else if(routes.length > 1) {
                navigator.pop();
                return true
            }

        }).bind(this));
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        const nav = this.props.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;

    };

    render() {
        let defaultName = 'LoginView';
        let defaultComponent = LoginView;
        return (
            <Navigator
                initialRoute = {{name : defaultName , component: defaultComponent}}

                renderScene={(route,navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator = {navigator} />
                }}
                configureScene = {(route) => {
                    //return Navigator.SceneConfigs.VerticalDownSwipeJump;
                    return Navigator.SceneConfigs.FloatFromRight;
                    //gestures: {}
                }}
            />
        );
    }

};

