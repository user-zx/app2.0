/**
 * Created by jiahailiang on 2017/1/23.
 */
import React,{Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

const {width,height}=Dimensions.get('window')

import Echarts from 'native-echarts';
import Network from '../util/Network'
import BGGlobal from '../util/BGGlobal';
import px2dp from '../util/Px2dp'

export default class PublicOpinionEvolution extends Component{

    constructor(props) {
        super(props);
        var data = [];

        for (var i = 0; i <= 360; i++) {
            var t = i / 180 * Math.PI;
            var r = Math.sin(2 * t) * Math.cos(2 * t);
            data.push([r, i]);
        }
        this.state = {
            option1 : '',
            option2 : '',
            option3 : '',
            option4 : '',
            option5 : '',
            text: 'test',
            jo:[],
            eventSummary:'',
            dataSummary:'',
            siteSummary:'',
            trendStr:'',
            peopleSummary:'',
            rowData:[],
        };
        this.icons = {
            yuqing:require('../image/lable/yuqing@3x.png'),
            zhengmian:require('../image/lable/zhengmian@3x.png'),
            fumian:require('../image/lable/fumian@3x.png'),
            xiangguan:require('../image/lable/xiangguan@3x.png'),
        }
    }

    render(){
        return(

            <ScrollView>
                <View style={styles.lableHeader}>
                    <Image source={require('../image/evolution/事件简介@3x.png')} style={styles.headerImage}/>
                    <Text>事件简介</Text>
                </View>
                <View style={{width:width}}>
                    <Text style={{padding:15}}>{this.state.eventSummary}</Text>
                </View>
                <View style={styles.lableHeader}>
                    <Image source={require('../image/evolution/趋势分析@3x.png')} style={styles.headerImage}/>
                    <Text>趋势分析</Text>
                </View>
                <View>
                    <Echarts option={this.state.option1}  height={300} />
                    <Text style={{padding:15}}>{this.state.trendStr}</Text>
                </View>
                <View style={styles.lableHeader}>
                    <Image source={require('../image/evolution/数据分析@3x.png')} style={styles.headerImage}/>
                    <Text>数据分析</Text>
                </View>
                <View>
                    <Echarts option={this.state.option2}  height={300} />
                    <Echarts option={this.state.option3}  height={300} />
                    <Text style={{padding:15}}>{this.state.dataSummary}</Text>
                </View>
                <View style={styles.lableHeader}>
                    <Image source={require('../image/evolution/站点分析@3x.png')} style={styles.headerImage}/>
                    <Text>站点分析</Text>
                </View>
                <View>
                    <Echarts option={this.state.option4}  height={300} />
                    <Text style={{padding:15}}>{this.state.siteSummary}</Text>
                </View>
                <View style={styles.lableHeader}>
                    <Image source={require('../image/evolution/网民分析@3x.png')} style={styles.headerImage}/>
                    <Text>网民分析</Text>
                </View>
                <View>
                    <Echarts option={this.state.option5}  height={300} />
                    <Text style={{padding:15}}>{this.state.peopleSummary}</Text>
                </View>
                <View style={styles.lableHeader}>
                    <Image source={require('../image/evolution/热门文章@3x.png')} style={styles.headerImage}/>
                    <Text>热门文章</Text>
                </View>

                    {
                        this.state.rowData.map((item,index)=>{
                            let icon;
                            if(item.ispositive == 1){
                                icon = this.icons['zhengmian'];
                            } else if(item.isnegative ==1){
                                //alert(rowData.isnegative);
                                icon = this.icons['fumian'];
                            } else {
                                if(item.isyuqing ==1 ){
                                    icon = this.icons['yuqing'];
                                } else {
                                    icon = this.icons['xiangguan'];
                                }
                            }
                            return(
                                <View style={styles.cell} key = {index}>
                                    <View style={{width:width,height:px2dp(70)}}>
                                        <Text style={styles.cellTitle}>{item.title}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',width:width,justifyContent:'space-between'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Image source={icon} style={{marginLeft:px2dp(15),marginBottom:px2dp(15),marginTop:px2dp(5)}} />
                                            <Text style={styles.cellText}>{item.siteName}</Text>
                                            <Text style={styles.cellText}>{item.author}</Text>
                                        </View>
                                        <View style={{marginBottom:px2dp(10)}}>
                                            <Text style={{marginBottom:px2dp(10),marginRight:15,fontSize:11, color:'#999999',}}>{item.createTime}</Text>
                                        </View>
                                    </View>

                                </View>

                                )})
                    }

            </ScrollView>
        )
    }
    componentDidMount() {
        let params = new Object();
        params.eventId = BGGlobal.propsID;
        Network.post('appeventreport2/getEventAndSite',params,(res)=>{
            this.rowData = res.data.carriePieJson;
            this.setState({
                option2:res.data.carriePieJson,//图2
                eventSummary:res.data.eventSummary,//第一部分事件简介
                option3:res.data.shuXingJson,//图3
                dataSummary:res.data.dataSummary,//第三部分数据分析的简介
                option4:res.data.siteChartJson,//图4
                siteSummary:res.data.siteSummary,//第四部分简介
            });
            console.log(res,'134134134134134')
        },(err)=>{err})
        Network.post('appeventreport2/getEventTrend',params,(res2)=>{
            this.setState({
                option1:res2.data.option,
                trendStr:res2.data.trendStr,
        })
        },(err)=>{err})
        Network.post('appeventreport2/getPeople',params,(res3)=>{
            this.setState({
                option5:res3.data.option,
                peopleSummary:res3.data.peopleSummary,
            })
        },(err)=>{err})
        Network.post('appeventreport2/getAticle',params,(res4)=>{
            this.setState({
                rowData : res4.data.result,
            });
            console.log(res4.data.result,'热门文章')
        },(err)=>{err})

    }
    componentWillMount() {

    }


}
const styles = StyleSheet.create({
   lableHeader:{
       backgroundColor:'#F2F2F2',
       flexDirection:'row',
       //justifyContent:'center',
       alignItems:'center',
       width:width,
       //height:50
   },
    headerImage:{
        marginRight:5,
        marginLeft:15,
        marginTop:10,
        marginBottom:10,
    },
    cell:{
        height:px2dp(100),
        backgroundColor:'#FFF',
        //alignItems:'center',
        //justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1
    },
    cellTitle:{
        paddingTop:px2dp(17),
        paddingLeft:px2dp(15),
        //numberOfLines:1,
        paddingRight:px2dp(15),
        paddingBottom:px2dp(15),
        fontSize:15,
        color:'#333333',


    },
    cellText:{
        fontSize:11,
        color:'#999999',
        marginLeft:px2dp(10),
        marginBottom:px2dp(10),
        marginTop:px2dp(5)

    },
    cellImageView:{
        flexDirection:'row',

    },
    cellImage:{

    },
});