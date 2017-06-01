/**
 * Created by jiahailiang on 2017/1/19.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    WebView,
    TouchableHighlight,
    Platform,
} from 'react-native';
import {NavGoBack} from '../component/NavGoBack';
import px2dp from '../util/Px2dp';
import Network from '../util/Network'
import {ServerBaseURL} from '../util/GlobalConst'
import *as WeChat from 'react-native-wechat'
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {toastShort} from '../component/Toast';
import Header from '../component/Header'

const buttons = ['取消', '微信好友', '朋友圈','添加到收藏'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
const {width,height}=Dimensions.get('window');

var ScreenWidth = Dimensions.get('window').width;
export default class ArticleDetails extends Component {

    constructor (props) {
        super (props);
        WeChat.registerApp('wxb467fdb6e1d079f8');
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            message:"",
            title:'',
            id:'',
            number:'1'
        }
    }
    componentDidMount(){
        this.setState({
            id:this.props.id,
            title:this.props.title,
        });
        var params = new Object();
        params.id = this.props.id;
        //console.log(params);
        Network.post('apparticle2',params,(response)=>{

            //console.log(response);
            this.setState({
                message:response.data.artile.content,
            });

        },(err)=>{err});
    };
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };


    _handlePress(index) {
        let URL = 'http://guanjia.junquan.com.cn/apparticle2/share?id='+this.state.id;
        //console.log(index);
        if (index ==1 ){
            //分享给微信好友(连接)
            this.pressAction();

        }else if (index == 2){
            //分享给微信朋友圈(连接)
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToTimeline({
                            title:'分享自:军犬舆情管家(www.junquanyuqing.com.cn)',
                            description: this.state.title,
                            thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                            type: 'news',
                            webpageUrl: 'http://guanjia.junquan.com.cn/apparticle2/share?id='+this.state.id
                        })
                            .catch((error) => {
                                toastShort(error.message);
                            });
                    } else {
                        toastShort('没有安装微信软件，请您安装微信之后再试');
                    }
                });

        } else if(index === 3) {
            let params = new Object();
            params.id = this.state.id;
            console.log(params);
            //这里接口只要传过去参数 ID 就 OK, 不管返回什么都是已经添加到收藏, POST 的方法里面判断的不对,所以会执行 errCallBack
            Network.post('apparticle2/saveFavorites',params,(res)=>{
                console.log('添加成功',res);
                if(res.status === 0){
                    toastShort('添加收藏成功');
                }
            },(err)=>{toastShort('添加收藏失败',err);});
        }
    }

    pressAction= ()=>{
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title:'分享自:军犬舆情管家(www.junquan.com.cn)',
                        description:this.state.title,
                        thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                        type: 'news',
                        webpageUrl: 'http://guanjia.junquan.com.cn/apparticle2/share?id='+this.state.id
                    })
                        .catch((error) => {
                            toastShort(error.message);
                        });
                } else {
                    toastShort('没有安装微信软件，请您安装微信之后再试');
                }
            });
    };


    show() {
        this.ActionSheet.show();
    }
    _renderCustomView(){
        return (
        <View style={ADstyles.container}>
            <Text>232323232323232</Text>
        </View>
    );
    }
    render () {
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };

        return(

            <View style={ADstyles.bigViewStyles}>
                <View>
                    <Header {...this.props}
                            title={this.state.title}
                            headercolor={'#18242e'}
                            rightAction={() => this.show()}
                            rightmenu='分享'
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

                <WebView
                    source={{uri:ServerBaseURL+'phone/html/articleDetail2.html?id='+this.props.id}}
                    style={{backgroundColor:'#FFF',width:width,height:height-64}}
                />
            </View>
        )
    }
}
const ADstyles = StyleSheet.create({
    relatedStyle:{
        flex:1,
        flexDirection:'row',
    },
    bigViewStyles:{
        flex:1,
        flexDirection:'column',
    },
    keywordsStyle:{
        width:ScreenWidth - 20,
        backgroundColor:'rgb(242,242,242)',
        marginLeft:10,
        marginTop:5,
    },
    viewTitle:{
        marginLeft:px2dp(10),
        marginTop:px2dp(20),
    },
    container: {
        flexDirection:'row',
        height:64,
        paddingTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#18242e'
    },


    containerleft: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    containercenter: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        //numberOfLines:0
    },
    containerright: {
        flex: 1,
        //flexDirection: 'column',
        alignItems: 'flex-end',
    },
});