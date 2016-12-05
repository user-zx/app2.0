/**
 * Created by jiahailiang on 2016/11/22.
 */
/**
 * Created by jiahailiang on 2016/11/22.
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
import MeView from './MeView';
import MonitorView from './MonitorView';
import SpecialView from './SpecialView';
import StewardView from './StewardView';
import px2dp from '../util/px2db'
export default class TabBarView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'StewardView'
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
            <TabNavigator>
                <TabNavigator.Item
                    title="控制台"
                    selected={this.state.selectedTab === 'StewardView'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/one.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/one_click.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'StewardView' })}>
                    <StewardView {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="全景监测"
                    selected={this.state.selectedTab === 'MonitorView'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/three.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/three_click.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'MonitorView' })}>
                    <MonitorView {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="事件分析"
                    selected={this.state.selectedTab === 'SpecialView'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/two.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/two_click.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'SpecialView' })}>
                    <SpecialView {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="我"
                    selected={this.state.selectedTab === 'MeView'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require("../image/four.png")} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require("../image/four_click.png")} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'MeView' })}>
                    <MeView {...this.props}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}
const styles = StyleSheet.create({
    iconStyle:{
        // width:px2dp(26),
        // height:px2dp(26),
        width:26,
        height:26,
    },
    textStyle:{
        color:'#999',
    },
    selectedTextStyle:{
        color:'rgb(61,171,236)',
    }
});
