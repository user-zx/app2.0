/**
 * Created by jiahailiang on 2016/12/5.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
} from 'react-native';

import {toastShort} from '../component/Toast'
import ChartOne from './ChareOne'
import ChartSecond from './ChareSecond'
import ChartThird from './ChareThird'
import ChartFourth from './ChareFourth'
import ChartFifth from './ChareFifth'
import TabNavigator from 'react-native-tab-navigator';

export default class PublicOpinionCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'ChartOne'
        };
    }
    render() {
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <TabNavigator tabBarStyle={{left:0,right:0,top:0,height:20}}
                >
                    <TabNavigator.Item
                        title="载体趋势"
                        selected={this.state.selectedTab === 'ChartOne'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        //renderIcon={() => <Image source={require("../image/one.png")} style={styles.iconStyle}/>}
                        //renderSelectedIcon={() => <Image source={require("../image/one_click.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'ChartOne' })}>
                        <ChartOne {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="全景监测"
                        selected={this.state.selectedTab === 'ChartSecond'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        //renderIcon={() => <Image source={require("../image/three.png")} style={styles.iconStyle}/>}
                        //renderSelectedIcon={() => <Image source={require("../image/three_click.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'ChartSecond' })}>
                        <ChartSecond {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="事件分析"
                        selected={this.state.selectedTab === 'ChartThird'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        //renderIcon={() => <Image source={require("../image/two.png")} style={styles.iconStyle}/>}
                        //renderSelectedIcon={() => <Image source={require("../image/two_click.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'ChartThird' })}>
                        <ChartThird {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="站点分布"
                        selected={this.state.selectedTab === 'ChartFourth'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        //renderIcon={() => <Image source={require("../image/four.png")} style={styles.iconStyle}/>}
                        //renderSelectedIcon={() => <Image source={require("../image/four_click.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'ChartFourth' })}>
                        <ChartFourth {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="站点分布"
                        selected={this.state.selectedTab === 'ChartFifth'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        //renderIcon={() => <Image source={require("../image/four.png")} style={styles.iconStyle}/>}
                        //renderSelectedIcon={() => <Image source={require("../image/four_click.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'ChartFifth' })}>
                        <ChartFifth {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    textStyle:{
        color:'#999',
        fontSize:13,
    },
    selectedTextStyle:{
        color:'rgb(61,171,236)',
    }

});

