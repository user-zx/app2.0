/**
 * Created by jiahailiang on 2017/5/12.
 */
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
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
import px2dp from '../util/Px2dp';
import Network from '../util/Network'
import {ServerBaseURL} from '../util/GlobalConst'
import *as WeChat from 'react-native-wechat'
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {toastShort} from '../component/Toast';
const buttons = ['取消', '微信好友', '朋友圈'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
const {width,height}=Dimensions.get('window');

var ScreenWidth = Dimensions.get('window').width;
export default class ArticleDetailstow extends Component {

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
        let URL = 'http://114.55.179.202:8989/apparticle2/share?id='+this.state.id;
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
                            webpageUrl: 'http://114.55.179.202:8989/apparticle2/share?id='+this.state.id
                        })
                            .catch((error) => {
                                toastShort(error.message);
                            });
                    } else {
                        toastShort('没有安装微信软件，请您安装微信之后再试');
                    }
                });

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
                        webpageUrl: 'http://114.55.179.202:8989/apparticle2/share?id='+this.state.id
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

    render () {
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };
        const titleConfig = {
            title:this.state.title,
            tintColor:'#FFF',
            style:{
                marginLeft:60,
                marginRight:60,
            },
            numberOfLines:0

        };
        const startButton = {
            title:'···',
            handler: () => this.show(),
            tintColor:'#FFF',
            fontSize:34,
        };
        const styles1 = {
            numberOfLines:1
        };
        const bar = {
            style:'light-content',
        };
        return(

            <View style={ADstyles.bigViewStyles}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        rightButton={startButton}
                        tintColor={'#18242e'}
                        numberOfLines={1}
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

                <WebView
                    source={{uri:ServerBaseURL+'phone/html/articleDetail2.html?id='+this.props.id}}
                    //source={{uri:'http://114.55.179.202:8989/phone/html/articleDetail2.html?id=7444d56e8c5123af09e107fe8a3dddfa'}}
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
    }
});