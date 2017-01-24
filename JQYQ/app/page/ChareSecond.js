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
export default class ChartSecond extends Component {
    constructor(props) {
        super(props);
        var data = [];

        for (var i = 0; i <= 360; i++) {
            var t = i / 180 * Math.PI;
            var r = Math.sin(2 * t) * Math.cos(2 * t);
            data.push([r, i]);
        }
        this.state = {
            option: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // legend: {
                //     orient: 'vertical',
                //     x: 'left',
                //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                // },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],

                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直达', selected:true},
                            {value:679, name:'营销广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['40%', '55%'],

                        data:[
                            {value:335, name:'直达'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1048, name:'百度'},
                            {value:251, name:'谷歌'},
                            {value:147, name:'必应'},
                            {value:102, name:'其他'}
                        ]
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