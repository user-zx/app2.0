/**
 * Created by jiahailiang on 2017/1/23.
 */
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
export default class ChartFifth extends Component {
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
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '邮件营销',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '搜索引擎',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
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