/**
 * Created by jiahailiang on 2017/1/18.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import MyPage from './MyPage';//我的
import PanoramicMonitorPage from './PanoramicMonitorPage';//全景监测
import  EventAnalysisPage from './EventAnalysisPage';
import HomePage from './HomePage';
import Px2dp from '../util/Px2dp'
export default class TabBarView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'HomePage'
        };
    }
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
    render(){

        return(
            <TabNavigator tabBarStyle={styles.tabBarStyle}>
                <TabNavigator.Item
                    title="首页"
                    selected={this.state.selectedTab === 'HomePage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    tabStyle={styles.tabStyle}
                    renderIcon={() => <Image source={require("../image/首页@2x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/首页选中@3x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'HomePage' })}>
                    <HomePage {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="全景监测"
                    selected={this.state.selectedTab === 'PanoramicMonitorPage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/全景监测@3x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/全景监测－选中@2x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'PanoramicMonitorPage' })}>
                    <PanoramicMonitorPage {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="事件分析"
                    selected={this.state.selectedTab === 'EventAnalysisPage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/事件分析@3x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/事件分析－选中@2x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'EventAnalysisPage' })}>
                    <EventAnalysisPage {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="我的"
                    selected={this.state.selectedTab === 'MyPage'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/我的-3@3x.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/我的－选中@2x.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'MyPage' })}>
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
});
