/**
 * Created by jiahailiang on 2017/1/18.
 */
import React,{Component,PropTypes,} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    Dimensions,
    AsyncStorage,
    TouchableHighlight,
    Platform,
    BackAndroid,
    NativeModules,


} from 'react-native';
import NavigationBar from 'react-native-navbar';
import px2dp from '../util/Px2dp';
import NewsClass from './NewClass';
import ResponsiveImage from 'react-native-responsive-image';
import Panel from '../component/Panel';
import Network from '../util/Network';
import {toastLong} from '../component/Toast';


const {width,height}=Dimensions.get('window');
var NativeCommonTools = NativeModules.CommonTools;

export default class HomePage extends Component{
    constructor (props) {
        super(props);
        // BackAndroidTool.customHandleBack(this.props.navigator,() => {
        //     alert('提示','您还未保存记录,确定要返回么?',
        //         [{text:'取消',onPress:() => {}},
        //             {text:'确定',onPress:() => { this.props.navigator.pop(); }}
        //         ]);
        //     // 一定要 return true;
        //     return true;
        // });
        this.state = {
            //text :'',
            resultMessage:'热点',
            yujing:'',
            xiangguan:'',
            quanbu:'',
            fumian:'',
            yuqing:'',
            columnNameArr:[],
            lableNameArr:[],

        };
    }



    pressAction(title,carrie){
        var  _this = this;
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'NewsClass',
                component:NewsClass,
                params:{
                    message:carrie,
                    title:title,
                    getResult:function(messageReturn){
                        _this.setState({
                            resultMessage:messageReturn,
                        })
                    }
                }
            })
        }
    }


    //测试是否能取到 AS 存储的值
    // componentWillMount(){
    //     AsyncStorage.getItem('UName').then(
    //         (result) => {//使用 Promise机制,如果操作成功不会调用 error 参数
    //             if (result == null){
    //                 //没有指定的 KEY
    //                 return;
    //             }
    //             console.log('UName:----->'+result);
    //         }
    //     ).catch((error)=>{// 如果操作读取失败,胡子后台打印错误日志
    //         console.log('error:---->'+error.message);
    //     })
    // }
    // componentDidMount(){
    //     // 添加返回键监听
    //     BackAndroidTool.addBackAndroidListener(this.props.navigator);
    // }
    // componentWillUnmount(){
    //     // 移除返回键监听
    //     BackAndroidTool.removeBackAndroidListener();
    // }

    componentWillMount(){
        Network.post('app2/aggrNature',{},(responseText)=>{
            this.setState({
                yujing:responseText.data.result.预警信息,
                xiangguan:responseText.data.result.相关信息,
                quanbu:responseText.data.result.全部,
                fumian:responseText.data.result.负面信息,
                yuqing:responseText.data.result.舆情信息,

            });
        },
            (err)=>{
                toastLong(err)
            }
        );
        Network.post('appanalyse2/findColumn2',{},(responseArr)=>{
            this.setState({
                columnNameArr:responseArr.data
            });
            //let arr=this.state.columnNameArr;
        },(err)=>{toastLong(err)});
    }

    _showColumns(){
        let allData = [];
        let arr=this.state.columnNameArr;
        for(let i in arr){
            for (let j in arr[i].columnTags){
                allData.push(
                    //<TouchableOpacity  onPress = {()=>alert(arr[i].columnTags[j].name)}>
                    <TouchableOpacity key = {i}>
                        <Panel title={arr[i].name}>
                            <Text>{arr[i].columnTags[j].name}</Text>
                        </Panel>
                    </TouchableOpacity>
                );
            }
        }
        return allData;
    }
    _showColumn(){

        let allData = [];
        for (let i = 0;i< this.state.columnNameArr.length;i++){
            let  badge = this.state.columnNameArr.name[i];
            allData.push(
                //  key={i} ：for循环的创建的组件必须设置唯一标示，不然会抱警告
                <View key={i} style={{width:width,height:90,backgroundColor:'#FFF'}}>
                    <TouchableOpacity  onPress = {()=>alert(badge)}>
                        <Panel title={badge.name}>
                            <Text>{badge}</Text>
                        </Panel>
                        </TouchableOpacity>
                </View>
            );
        }
        return allData;
    }

    render(){

        const rightButtonConfig = {
            title:'扫一扫',
            handler: () =>{
                AsyncStorage.getItem('UName').then(
                    (result) => {//使用 Promise机制,如果操作成功不会调用 error 参数
                        if (result == null){
                            //没有指定的 KEY
                            return;
                        }
                        // console.log('UName:---+++++-->'+result);
                       // alert(result);
                    }
                ).catch((error)=>{// 如果操作读取失败,胡子后台打印错误日志
                    // console.log('error:---->'+error.message);
                });
            },
            style:{

            },

        };
        const titleConfig = {
            title:'首页',
            tintColor:'#FFF'
        };



        return(
            <View style={styles.zheBigView}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        rightButton={rightButtonConfig}
                        tintColor={'#18242e'}
                    >
                    </NavigationBar>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.loudouView}>
                        <Image source={require('../image/漏斗@2x.png')} style={styles.lodou}>
                            <View style={styles.textView}>
                            <Text style={[styles.loudouText,styles.loudaoText]}>{this.state.quanbu}</Text>
                            <Text style={styles.loudouText}>{this.state.xiangguan}</Text>
                            <Text style={styles.loudouText}>{this.state.yuqing}</Text>
                            <Text style={styles.loudouText}>{this.state.fumian}</Text>
                            <Text style={[styles.zuihou]}>{this.state.yujing}</Text>
                            </View>
                        </Image>

                    </View>
                    <View style={styles.imageButton}>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'预警','appwarning2/getList')}>
                                <ResponsiveImage source={require('../image/预警@2x.png')} style={styles.imageButtonPic}></ResponsiveImage>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'舆情')}>
                                <Image source={require('../image/舆情@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'正面')}>
                                <Image source={require('../image/正面@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'负面')}>
                                <Image source={require('../image/负面@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        {this._showColumns()}
                    </View>

                </ScrollView>
            </View>

        )


    }
}
const styles = StyleSheet.create({
    lodou:{
        width:width,
        height:px2dp(270),
        backgroundColor:'#242f39',
        //flex:1
        //resizeMode:Image.resizeMode.contain
    },
    zheBigView:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#F2F2F2F2'
    },
    loudouView:{
        //flex:1,
        flexDirection:'column',
        //justifyContent:'center',
        //marginTop:px2dp(10),
        backgroundColor:'#FFF',
        //paddingTop:px2dp(0),
        //top:0
    },
    loudouText:{
        backgroundColor:'rgba(0,0,0,0)',
        color:'#FFF',
        textAlign:'center',
        // padding:15,
        justifyContent:'center',
        paddingTop:px2dp(15),
        paddingBottom:px2dp(15),
        fontSize:12,
        marginLeft:-width*0.12

    },
    loudaoText:{
        marginTop:px2dp(15)
    },

    imageButtonView:{
        //flexDirection:'row',
        //justifyContent:'space-around',
        //alignItems:'center',
        //marginTop:px2dp(10),
        //paddingLeft:px2dp(10),
        //paddingRight:px2dp(10),
        //backgroundColor:'#242f39',
        //marginBottom:px2dp(10),
        //paddingBottom:px2dp(5),
        //height:px2dp(60),
        //width:px2dp(90)
    },
    imageButtonPic:{
        width:px2dp(50),
        height:px2dp(50),
        marginTop:px2dp(10),
        marginBottom:px2dp(10),
    },

    imageButton:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        //marginTop:px2dp(10),
        //paddingLeft:px2dp(10),
        //paddingRight:px2dp(10),
        backgroundColor:'#242f39',
        //marginBottom:px2dp(10),
        //paddingBottom:px2dp(5),
        //height:78,
        top:0
    },
    textView:{
        backgroundColor:'rgba(0,0,0,0)',
        width:width,
        //marginLeft:width*0.4

    },
    zuihou:{
        paddingTop:10,
        backgroundColor:'rgba(0,0,0,0)',
        textAlign:'center',
        color:"#FFF",
        fontSize:12,
        marginLeft:-width*0.12
    },
    listView:{
        width:width,
        height:px2dp(50),
        backgroundColor:(Platform.OS === 'ios') ? 'red' : 'black',
    },
    container: {
        flex            : 1,
        backgroundColor : '#f4f7f9',
        //paddingTop      : 30
    },

}) ;