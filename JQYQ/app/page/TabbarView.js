/**
 * Created by jiahailiang on 2017/1/18.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    BackAndroid,
    Navigator,

} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import MyPage from './MyPage';//我的
import PanoramicMonitorPage from './PanoramicMonitorPage';//全景监测
import  EventAnalysisPage from './EventAnalysisPage';
import HomePage from './HomePage';
import Px2dp from '../util/Px2dp';

import {WXAppKey} from '../util/GlobalConst';
import * as Wexin from 'react-native-wechat';



export default class TabBarView extends React.Component{
    constructor(props) {
        super(props);


        Wexin.registerApp(WXAppKey);
        this.state = {
            selectedTab:'HomePage',
            badgeNumber: '2',
            isBadge:true
        };
    }
    //控制安卓物理返回键问题
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
        // if (navigator && navigator.getCurrentRoutes().length > 1) {
        //     navigator.pop();
        //     return true;
        // }
        // return false;

    };
    /*tabbar 属性
     renderIcon: PropTypes.func,       加载Tab图标

     renderSelectedIcon: PropTypes.func,    加载Tab被选中显示的图标

     badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),     Tab上面角标显示的数字

     renderBadge: PropTypes.func,     渲染角标

     title: PropTypes.string,          Tab显示的标题

     titleStyle: Text.propTypes.style,    Tab显示的标题的样式

     selectedTitleStyle: Text.propTypes.style,    Tab被选中显示的标题的样式

     tabStyle: View.propTypes.style,         Tab样式

     selected: PropTypes.bool,          Tab是否被选中

     onPress: PropTypes.func,          Tab点击

     allowFontScaling: PropTypes.bool,    是否允许字体自动缩放
     * tabbar 属性 */
    renderBadge(){
        return(
            this.state.isBadge? <View style={styles.badgeView}><Text style={styles.badgeText}>{this.state.badgeNumber}</Text></View> :null
        )

    };
    render(){

        return(
            <TabNavigator tabBarStyle={styles.tabBarStyle}>
                <TabNavigator.Item
                    title="首页"
                    selected={this.state.selectedTab === 'HomePage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    tabStyle={styles.tabStyle}
                    renderIcon={() => <Image source={require("../image/shouye@2x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/shouyexuanzhong@3x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'HomePage' })}>
                    <HomePage {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="全景监测"
                    selected={this.state.selectedTab === 'PanoramicMonitorPage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/quanjingjiance@3x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/quanjingjiance-xuanzhong@2x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'PanoramicMonitorPage' })}>
                    <PanoramicMonitorPage {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="事件分析"
                    selected={this.state.selectedTab === 'EventAnalysisPage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/shijianfenxi@3x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/shijianfenxi-xuanzhong@2x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'EventAnalysisPage' })}>
                    <EventAnalysisPage {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="我的"
                    selected={this.state.selectedTab === 'MyPage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    badgeText={this.state.badgeNumber}
                    //在这里设置壳 badge 的方法,
                    renderBadge={()=>this.renderBadge()}
                    renderIcon={() => <Image source={require("../image/wode-3@3x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/wode-xuanzhong@2x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'MyPage',isBadge:false })}>
                    <MyPage {...this.props} />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}
const styles = StyleSheet.create({
    iconStyle:{
        //width:Px2dp(26),
        //height:Px2dp(32),
        // width:26,
        // height:26,
    },
    textStyle:{
        color:'#FFFFFF',
        marginBottom:4
    },
    selectedTextStyle:{
        color:'#0ca6ee',
    },
    tabBarStyle:{
        backgroundColor:'#242f39'
    },
    tabStyle:{
        width:Px2dp(26),
        //height:Px2dp(26),
    },
    badgeView:{
        width:20,
        height:14 ,
        backgroundColor:'#f85959',
        borderWidth:1,
        marginLeft:10,
        marginTop:3,
        borderColor:'#FFF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,

    },
    badgeText:{
        color:'#fff',
        fontSize:8,
        // padding:5,
        //borderRadius:8,
    }
});
