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
    Dimensions,
    ScrollView,
} from 'react-native';
import Echarts from 'native-echarts';
import Network from '../util/Network';
import BGGlobal from '../util/BGGlobal';
const {width,height}=Dimensions.get('window');
export default class ChartThird extends Component {
    constructor(props) {
        super(props);
        var data = [];

        for (var i = 0; i <= 360; i++) {
            var t = i / 180 * Math.PI;
            var r = Math.sin(2 * t) * Math.cos(2 * t);
            data.push([r, i]);
        }
        this.state = {
            option :'',
            text: 'test',
            jo:[],
        };
    }
    componentDidMount() {
        let params = new Object();
        params.id = BGGlobal.propsID;
        Network.post('appevent2/articleChart',params,(res)=>{
            this.setState({
                option:res.data.option,
                jo:res.data.jo
            });
        },(err)=>{
            console.log(err,'图表请求报错',params.id)
        })
    }
    render() {

        return (
            <ScrollView style={styles.container}>

                <Echarts option={this.state.option}  height={300} />

                <View style={{width:width,flexDirection:'column',paddingBottom:20}}>

                    <View style={{flexDirection:'row',top:10,left:20,right:20}}>
                        <View style={styles.tabHeader}>
                            <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>载体</Text>
                        </View>
                        <View style={[styles.tabHeaderright,]}>
                            <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>文章数</Text>
                        </View>
                    </View>

                    {
                        this.state.jo.map((item,i)=> {
                            return (
                                <View key={i} style={styles.tabStyle} >
                                    <Text style={styles.tabText}>{item.name}</Text>
                                    <Text style={styles.tabTextRight}>{item.content}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        top:50,
    },
    tabHeader:{
        backgroundColor:'rgb(111,190,203)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/3,
    },
    tabHeaderright:{
        backgroundColor:'rgb(111,190,203)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/3*2,
    },
    tabStyle:{
        flexDirection:'row',
        top:10,
        left:20,
        right:20
    },
    tabText:{
        backgroundColor:'rgb(116,140,210)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/3,
        //padding:(5.0),
        color:'#FFF',
        fontSize:11,
        textAlign:'center',
    },
    tabTextRight:{
        backgroundColor:'rgb(116,140,210)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/3*2,
        //padding:(5.0),
        color:'#FFF',
        fontSize:11,
        textAlign:'center',
    }

});