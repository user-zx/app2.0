/**
 * Created by jiahailiang on 2016/12/8.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Echarts from 'native-echarts';
const {width,height}=Dimensions.get('window')
export default class ChartOne extends Component {
    constructor(props) {
        super(props);
        var data = [];

        for (var i = 0; i <= 360; i++) {
            var t = i / 180 * Math.PI;
            var r = Math.sin(2 * t) * Math.cos(2 * t);
            data.push([r, i]);
        }
        this.state = {
            option : {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },

                calculable:false,
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            },
            text: 'test'
        };
    }

    changeOption() {
        this.setState({

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Echarts option={this.state.option}  height={300} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 30,
    },
    button: {
        backgroundColor: '#d9534f',
        padding: 8,
        borderRadius: 4,
        marginBottom: 20
    }
});