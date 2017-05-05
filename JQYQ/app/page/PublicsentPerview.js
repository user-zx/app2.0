/**
 * Created by jiahailiang on 2017/3/13.
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

const {width,height}=Dimensions.get('window');

import Echarts from 'native-echarts';
import Network from '../util/Network'
import BGGlobal from '../util/BGGlobal';
import px2dp from '../util/Px2dp'
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
import *as WeChat from 'react-native-wechat'
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {toastShort} from '../component/Toast';
const buttons = ['取消', '微信好友', '朋友圈'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

export default class PublicsentPerview extends Component{

    constructor(props) {
        super(props);
        //WeChat.registerApp('wxb467fdb6e1d079f8');
        this.buttonGoBack = this.buttonGoBack.bind(this);

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
            text: 'test',
            jo:[],
            jo1:[],
            jo2:[],
            jo3:[],
            jo4:[],
            eventSummary:'',//事件简介
            dataSummary:'',//数据分析
            siteSummary:'',//站点分析
            trendStr:'',//趋势分析
            peopleSummary:'',//网民分析
            rowData:[],
            rowData2:[],
            id:'',
            title:'',
            time:'',
            uid:'',
            brieType:''

        };
        this.icons = {
            yuqing:require('../image/lable/yuqing@3x.png'),
            zhengmian:require('../image/lable/zhengmian@3x.png'),
            fumian:require('../image/lable/fumian@3x.png'),
            xiangguan:require('../image/lable/xiangguan@3x.png'),
        }
    }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };

    _handlePress(index) {
        console.log(index);
        //let URL = 'http://114.55.179.202:8989/phone/html/articleReport.html?time='+this.state.time+'&id='+this.state.id+'&dataTime='+this.state.title;
        let URL1 = 'http://120.55.190.38:8002/briefing/getBriefingArticle?id='+this.state.id+'&uid='+this.state.uid+'&type=show&brieType='+this.state.brieType+'&time='+this.state.title;
        //http://120.55.190.38:8002/briefing/getBriefingArticle?id=859423&uid=1283&type=show&brieType=0&time=today&downname=2017-04-17
        console.log(URL1,'拼接后的 URL 是');

        if (index==1 ){
            //分享给微信好友(连接)
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToSession({
                            title:'分享自:军犬舆情管家(www.junquan.com.cn)',
                            description:this.state.title,
                            thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                            type: 'news',
                            webpageUrl:URL1
                        })
                            .catch((error) => {
                                toastShort('错误→',error.message);
                            });
                    } else {
                        toastShort('没有安装微信软件，请您安装微信之后再试');
                    }
                });

        }else if(index==2){
            //分享给微信朋友圈(连接)
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToTimeline({
                            title:'分享自:军犬舆情管家(www.junquanyuqing.com.cn)',
                            description: this.state.title,
                            thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                            type: 'news',
                            webpageUrl: URL1
                        })
                            .catch((error) => {
                                toastShort('错误→',error.message);
                            });
                    } else {
                        toastShort('没有安装微信软件，请您安装微信之后再试');
                    }
                });

        }else {
            return;
        }




    }

    show() {
        this.ActionSheet.show();
    }


    render(){
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };
        const titleConfig = {
            title: this.state.title+'舆情报告',
            tintColor: '#FFF'
        };
        const RightButtonConfig = {
            title: '分享',
            handler: () => this.show(),
            fontSize: 32,
            tintColor: '#FFF'

        };

        const bar = {
            style:'light-content',
        };


        return(

            <View style={{flex:1}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        tintColor={'#18242e'}
                        rightButton={RightButtonConfig}
                        statusBar={bar}
                    />
                </View>
                <ActionSheet
                    ref={(o) => this.ActionSheet = o}
                    title="分享到？"
                    options={buttons}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this._handlePress.bind(this)}
                />
                <ScrollView>
                    <View style={styles.lableHeader}>
                        <Image source={require('../image/evolution/shijianjianjie@3x.png')} style={styles.headerImage}/>
                        <Text>舆情导读</Text>
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
                                            <Text style={{marginBottom:px2dp(10),marginRight:15,fontSize:11, color:'#999999',}}>{item.time}</Text>
                                        </View>
                                    </View>

                                </View>

                            )})
                    }
                    <View style={styles.lableHeader}>
                        <Image source={require('../image/evolution/qushifenxi@3x.png')} style={styles.headerImage}/>
                        <Text>舆情图表</Text>
                    </View>
                    <View>
                        <Echarts option={this.state.option1}  height={300} />
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
                                this.state.jo1.map((item,i)=> {
                                    return (
                                        <View key={i} style={styles.tabStyle} >
                                            <Text style={styles.tabText}>{item.name}</Text>
                                            <Text style={styles.tabTextRight}>{item.value}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>

                    <View style={styles.lableHeader}>
                        <Image source={require('../image/evolution/shujufenxi@3x.png')} style={styles.headerImage}/>
                        <Text>文章特征</Text>
                    </View>
                    <View>
                        <Echarts option={this.state.option2}  height={300} />
                        <View style={{width:width,flexDirection:'column',paddingBottom:20}}>

                            <View style={{flexDirection:'row',top:10,left:20,right:20}}>
                                <View style={styles.tabHeader}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>特征</Text>
                                </View>
                                <View style={[styles.tabHeaderright,]}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>文章数</Text>
                                </View>
                            </View>

                            {
                                this.state.jo2.map((item,i)=> {
                                    return (
                                        <View key={i} style={styles.tabStyle} >
                                            <Text style={styles.tabText}>{item.name}</Text>
                                            <Text style={styles.tabTextRight}>{item.content}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.lableHeader}>
                        <Image source={require('../image/evolution/zhandianfenxi@3x.png')} style={styles.headerImage}/>
                        <Text>站点分布</Text>
                    </View>
                    <View>
                        <Echarts option={this.state.option3}  height={300} />
                        <View style={{width:width,flexDirection:'column',paddingBottom:20}}>

                            <View style={{flexDirection:'row',top:10,left:20,right:20}}>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>排名</Text>
                                </View>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>媒体</Text>
                                </View>

                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>相关</Text>
                                </View>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>正面</Text>
                                </View>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>负面</Text>
                                </View>

                            </View>

                            {
                                this.state.jo3.map((item,i)=> {
                                    return (
                                        <View key={i} style={styles.tabStyle} >
                                            <Text style={styles.tabText1}>{i+1}</Text>
                                            <Text style={styles.tabText1}>{item.name}</Text>
                                            <Text style={styles.tabText1}>{item.content.相关文章}</Text>
                                            <Text style={styles.tabText1}>{item.content.负面文章}</Text>
                                            <Text style={styles.tabText1}>{item.content.正面文章}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.lableHeader}>
                        <Image source={require('../image/evolution/wanminfenxi@3x.png')} style={styles.headerImage}/>
                        <Text>人物活跃度</Text>
                    </View>
                    <View>
                        <Echarts option={this.state.option4}  height={300} />
                        <View style={{width:width,flexDirection:'column',paddingBottom:20}}>

                            <View style={{flexDirection:'row',top:10,left:20,right:20}}>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>排名</Text>
                                </View>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>媒体</Text>
                                </View>

                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>相关</Text>
                                </View>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>负面</Text>
                                </View>
                                <View style={styles.tabHeader1}>
                                    <Text style={{padding:5,color:'#FFF',fontSize:11,textAlign:'center'}}>正面</Text>
                                </View>

                            </View>
                            {
                                this.state.jo4.map((item,i)=> {
                                    return (
                                        <View key={i} style={styles.tabStyle} >
                                            <Text style={styles.tabText1}>{i+1}</Text>
                                            <Text style={styles.tabText1}>{item.name}</Text>
                                            <Text style={styles.tabText1}>{item.content.相关文章}</Text>
                                            <Text style={styles.tabText1}>{item.content.负面文章}</Text>
                                            <Text style={styles.tabText1}>{item.content.正面文章}</Text>
                                        </View>
                                    )
                                })
                            }
                             </View>
                        </View>
                    <View style={styles.lableHeader}>
                        <Image source={require('../image/evolution/remenwenzhang@3x.png')} style={styles.headerImage}/>
                        <Text>推荐阅读</Text>
                    </View>
                    {
                        this.state.rowData2.map((item,index)=>{
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
                                            <Text style={{marginBottom:px2dp(10),marginRight:15,fontSize:11, color:'#999999',}}>{item.time}</Text>
                                        </View>
                                    </View>

                                </View>

                            )})
                    }
                </ScrollView>
            </View>
        )
    }
    componentDidMount() {
        if (this.props.time === 'today'){
            this.setState({brieType:0})
        }else if(this.props.time === 'week'){
            this.setState({brieType:1})
        }else {
            this.setState({brieType:2})
        }

        this.setState({
            title:this.props.title,
            id:this.props.id,
            time:this.props.time,
        });
        Network.post('app2/profile',{},(response)=>{
            this.setState({
                uid:response.data.user.id,
            })
        },(err)=>{toastShort('错误:',err)});
        // 1 导读app2/profile

        let params = new Object();
        params.id = this.props.id;
        Network.post('appbriefing2/getBriefingList',params,(res)=>{
            let resArr = res.data.result;
            if (resArr){
                for (let i in resArr){
                    resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
                }
                this.setState({
                    rowData:resArr,
                });
            }
        },(err)=>{err});
        //第二部分
        params.time = 'today';
        Network.post('appbriefing2/getAppAggrCarrieDistribute',params,(res)=>{
            this.setState({
                option1:res.data.option,
                jo1:res.data.jo,
            })
        },(err)=>{err});
        //第三部分
        Network.post('appbriefing2/getAppAggrCarrieTaday',params,(res)=>{
            this.setState({
                option2:res.data.option,
                jo2:res.data.jo,
            })
        },(err)=>{err});
        //第四部分
        Network.post('appbriefing2/getAppSiteDistribute',params,(res)=>{
            this.setState({
                option3:res.data.option,
                jo3:res.data.jo,
            })
        },(err)=>{err});
        //第五
        Network.post('appbriefing2/getAppAggrAuthorTop',params,(res)=>{
            this.setState({
                option4:res.data.option,
                jo4:res.data.jo,
            })
        },(err)=>{err});
        //第六
        Network.post('appbriefing2/getBriefingTable',params,(res)=>{
                    this.setState({
                        rowData2:res.data
                    })
                },(err)=>{err});

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
    },
    tabHeader:{
        backgroundColor:'rgb(111,190,203)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/3,
    },
    tabHeader1:{
        backgroundColor:'rgb(111,190,203)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/5,
    },
    tabText1:{
        backgroundColor:'rgb(116,140,210)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/5,
        //padding:(5.0),
        color:'#FFF',
        fontSize:11,
        textAlign:'center',
    },

    tabHeaderright:{
        backgroundColor:'rgb(111,190,203)',
        borderWidth:1,
        borderColor:'#FFF',
        width:(width-40)/3*2,
    },
});