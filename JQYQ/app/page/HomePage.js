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
    ListView,
    AsyncStorage,
    TouchableHighlight,
    Platform,
    //Alert,
    BackAndroid,
    NativeModules,


} from 'react-native';
import NavigationBar from 'react-native-navbar';
import px2dp from '../util/Px2dp';
import NewsClass from './NewClass';
import ResponsiveImage from 'react-native-responsive-image';
import Panel from '../component/Panel'
const {width,height}=Dimensions.get('window');
var NativeCommonTools = NativeModules.CommonTools;

export default class HomePage extends Component{
    _ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    constructor (props) {
        super(props);
        // BackAndroidTool.customHandleBack(this.props.navigator,() => {
        //     alert('提示','您还未保存记录,确定要返回么?',
        //         [{text:'取消',onPress:() => {}},
        //             {text:'确定',onPress:() => { this.props.navigator.pop(); }}
        //         ]);
        //     // 一定要 return true; 原因上面的参考链接里有
        //     return true;
        // });
        this.state = {
            dataSource:this._ds.cloneWithRows(this.getDataArr()),
            text : '全部监测: 45733621',
            resultMessage:'热点',
        };
    }
    getDataArr(){
        const dataArr = [];
        for(let i = 0 ; i< 10 ; i ++ ){
            dataArr.push(
                {
                    title:'相关站点信息' + i,
                    text:'Lorem ipsum dolor sit amet, ius ad pertinax oportereaccommodare,' +
                    ' an vix civibus corrumpit referrentur. Te nam case ludusinciderint, te mea' +
                    ' facilisi adipiscing. Sea id integre luptatum. In tota saleconsequuntur nec.' +
                    ' Erat ocurreret mei ei. Eu paulo sapientem vulputateest, vel an accusam intellegam interesset.' +
                    ' Nam eu stet periculareprimique, ea vim illud modus, putant invidunt reprehendunt ne qui' + i
                }
            );
        }
        return dataArr;
    }

    renderRow(rowData,sectionID,rowID,heightlightRow){
        return(
            <View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#F2F2F2',borderLeftWidth:1,borderLeftColor:'#F2F2F2'}}>
                <Text style={{width:width/4,textAlign:'center',fontSize:16,padding:px2dp(10)}}>{rowData.title}</Text>
                <View style={{width:1,height:70,backgroundColor:'#F2F2F2'}} />
                <Text style={{width:(width/4*3)-1 ,textAlign:'center',fontSize:16,padding:px2dp(20)}}>{rowData.text}</Text>
            </View>
        )
    }


    pressAction(title){
        var  _this = this;
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'NewsClass',
                component:NewsClass,
                params:{
                    message:'asdfasdfa',
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
                        console.log('UName:---+++++-->'+result);
                        alert(result);
                    }
                ).catch((error)=>{// 如果操作读取失败,胡子后台打印错误日志
                    console.log('error:---->'+error.message);
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
                            <Text style={[styles.loudouText,styles.loudaoText]}>{this.state.text}</Text>
                            <Text style={styles.loudouText}>{'456654'}</Text>
                            <Text style={styles.loudouText}>{'123658'}</Text>
                            <Text style={styles.loudouText}>{'789456'}</Text>
                            <Text style={[styles.zuihou]}>{'123'}</Text>
                            </View>
                        </Image>

                    </View>
                    <View style={styles.imageButton}>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'预警')}>
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
                        <Panel title="业务相关" title2="gaggaga" onPress={this.pressAction.bind(this,'业务相关')}>
                            <Text>Lorem ipsum dolor sit amet, {'\n'}consectetur adipiscing elit.</Text>
                        </Panel>
                        <Panel title="属地相关">
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </Panel>
                        <Panel title="载体相关">
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</Text>
                        </Panel>
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