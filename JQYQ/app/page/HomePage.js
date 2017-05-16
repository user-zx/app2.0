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
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import px2dp from '../util/Px2dp';
import NewsClass from './NewClass';
import ResponsiveImage from 'react-native-responsive-image';
import Network from '../util/Network';
import {toastLong} from '../component/Toast';
import NewClassWaring from './NewClassWaring';
import NewClassPage from './NewClassPage';



const {width,height}=Dimensions.get('window');

export default class HomePage extends Component{
    constructor (props) {
        super(props);
        this.state = {
            resultMessage:'热点',
            yujing:'',
            xiangguan:'',
            quanbu:'',
            fumian:'',
            yuqing:'',
            columnNameArr:[],
            lableNameArr:[],
            id :'',
        };
        this.icons = {
            'up'    : require('../image/up.png'),
            'down'  : require('../image/down.png')
        };
    }
    //用三个这方法,真是绝了....下个版本再改吧
    pressAction(title,carrie,id){
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'NewsClass',
                component:NewsClass,
                params:{
                    message:carrie,
                    title:title,
                    id :id,

                }
            })
        }
    }
    pressAction1(title,carrie){
        var  _this = this;
        const {navigator} = _this.props;
        if (navigator){
            navigator.push({
                name:'NewClassWaring',
                component:NewClassWaring,
                params:{
                    message:carrie,
                    title:title,

                }
            })
        }
    }
    pressAction2(title,id){
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'NewClassPage',
                component:NewClassPage,
                params:{
                    title:title,
                    id :id,
                }
            })
        }
    }
    componentWillMount() {
        Network.post('app2/aggrNature',{},(responseText)=>{
                this.state.yujing=responseText.data.result.预警信息;
                this.state.xiangguan=responseText.data.result.相关信息;
                this.state.quanbu=responseText.data.result.全部;
                this.state.fumian=responseText.data.result.负面信息;
                this.state.yuqing=responseText.data.result.舆情信息;
            },
            (err)=>{
                toastLong(err)
            }
        );

    }
        componentDidMount(){
       Network.post('appanalyse2/findColumn2',{},(responseArr)=>{
            this.setState({
                columnNameArr:responseArr.data
            });
       },(err)=>{toastLong(err)});

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
                    }
                ).catch((error)=>{// 如果操作读取失败,胡子后台打印错误日志
                });
            },
        };
        const titleConfig = {
            title:'首页',
            tintColor:'#FFF'
        };
        const bar = {
            style:'light-content',
        };
        return(
            <View style={styles.zheBigView}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        //rightButton={rightButtonConfig}
                        tintColor={'#18242e'}
                        statusBar={bar}
                    >
                    </NavigationBar>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.loudouView}>
                        <Image source={require('../image/loudou@2x.png')} style={styles.lodou}>
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
                            <TouchableOpacity onPress={this.pressAction1.bind(this,'预警','appwarning2/getList')}>
                                <ResponsiveImage source={require('../image/yujing@2x.png')} style={styles.imageButtonPic}></ResponsiveImage>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'舆情')}>
                                <Image source={require('../image/yuqing@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'正面')}>
                                <Image source={require('../image/zhengmian@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'负面')}>
                                <Image source={require('../image/fumian@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        {
                            this.state.columnNameArr.map((item,i)=>{
                                return(
                                    <View key={i} style={styles.columnItem}>
                                        <View style={{width:width*0.25,marginLeft:px2dp(25),borderRightWidth:1,borderRightColor:"#D9D9D9",alignSelf:'center'}}>
                                            <Text style={{fontSize:16}}>{item.name}</Text>
                                        </View>
                                        <View  style={styles.lableItem}>
                                            {
                                                item.columnTags.map((itemKey,index)=>{
                                                    return(
                                                        <TouchableOpacity key ={index} onPress={this.pressAction2.bind(this,itemKey.name,itemKey.id)}>
                                                            <View key={index} style={{padding:(10,20,10,10)}}>
                                                                <Text style={{color:'#666666'}}>{itemKey.name}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>

                                    </View>
                                )
                            })
                        }
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
    columnItem:{
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:'#666666'
    },
    lableItem:{
        flexDirection:"row",
        flexWrap:'wrap',
        alignItems: 'flex-start',
        width:width*0.75,
    }
}) ;