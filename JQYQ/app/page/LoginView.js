/**
 * Created by jiahailiang on 2017/2/8.
 */
import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    Platform,
    Animated,
    BackAndroid,
    StatusBar,
    AsyncStorage,
}from'react-native';
var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

import Network from '../util/Network';
import px2dp from '../util/Px2dp';
import TabbarView from './TabbarView';
import {toastShort} from '../component/Toast';
import RegisterView from './RegisterView';
import JPush from '../component/JPush'
import NewClassWaring from './NewClassWaring'
import Storage from 'react-native-storage';



var { NativeAppEventEmitter } = require('react-native');

var subscription = NativeAppEventEmitter.addListener(
    'ReceiveNotification',
    (notification) => console.log(notification)
);


var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    sync: {}
});
//储存
export function save(key, value) {
    storage.save({
        key: key,
        rawData: value,
        expires: null
    });
}

//取
export function load(key, callBack) {
    storage.load({
        key: key,
        autoSync: false,
        syncInBackground: true,
    })
        .then(ret => {
            ret.status = 200;
            callBack(ret);
        })
        .catch(err => {
            switch (err.name) {
                case "NotFoundError":
                default:
                    callBack({status: 404});
                    break;
            }
        })
}
//删除
export function remove(key) {
    storage.remove({
        key: key
    });
}


export default class LoginView extends Component{
    params = new Object();
    constructor (props) {
        super (props);

        this.state = {
            username:'',
            password:'',
            userToken:'',
            mobileInputOnFocus: true,
            translateX:new Animated.Value(0),
            iconsRem:true,
            isTouched:true,
            isLog:false,
            registrationId:'',
        };

    }
    componentDidMount() {
        var _this=this;

        JPush.getRegistrationID((id)=>{
            this.state.registrationId = id;
            console.log(id,'极光返回的注册值是这个')
        });
        //自动登录调用代码
        load('userInfo',(response)=>{
            this.setState({username: response.user});
            if (response.status === 200) {
                _this.params.username = response.user;
                _this.params.password = response.pwd;
                _this.params.registrationId = response.rid;
                //console.log(_this.params);
                Network.post('app2/login',_this.params,()=>{
                    _this.JumpAction(TabbarView);
                },()=>{
                    _this._shakeAndClearPassCode();
                    toastShort('用户名或密码错误');
                    _this.state.isTouched = true;
                });
            } else {
                //toastShort('登录过期');
                return;
            }
        });


        //极光推送
        subscription = NativeAppEventEmitter.addListener(
            'OpenNotification',
            (notification) => {
                //console.log(notification,'看看是什么消息啊');
                //JPush.setBadge(0,(value)=>{console.log(value,'角标2')});
                JPush.setBadge(0,(value)=>{console.log(value,'角标2')});
                _this.JumpAction(NewClassWaring);
            }

        );

        NativeAppEventEmitter.addListener(
            'ReceiveNotification',
            (notification) => {
                //console.log("收到了消息------>"+notification.badge);
                JPush.setBadge(0,(value)=>{console.log(value,'角标2')});
                    //_this.JumpAction(NewClassWaring);
            }

        );


       // JPush.setBadge(0,()=>(console.log('YES,YES,YES')))


    }

    componentWillUnmount() {

        subscription.remove();

    }



    JumpAction (title) {
        var _this = this;
        const {navigator} = _this.props;
        if (navigator) {
            navigator.push({
                name: "title",
                component: title,
                // params:{
                //     message:carrie,
                //     title:'预警',
                //
                // }
            });
        }
    }
    //弹跳动画
    _shakeAndClearPassCode(){
        this.state.translateX.setValue(20);
        Animated.spring(
            this.state.translateX,
            {
                toValue:0,
                friction:3,
                tension:800,
            }
        ).start(
            //进行其他操作
        );
    }
    render(){
        var animationStyle = {
            transform:[
                {translateX:this.state.translateX}
            ],
        };
        return(
            <View style={styles.container} keyboardDismissMode="on-drag" keyboardShouldPersistTaps={false} >
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Animated.View style={animationStyle}>
                <Image source={require('../image/login22@3x.jpg')} style={styles.backgroundImage}>
                    <View style={styles.lingInView}>
                        <View style={styles.inputListView}>
                            <Image source={require('../image/user@3x.png')} style={styles.inputimageView}>
                            </Image>
                            <TextInput
                                style={styles.inPutStyle}
                                autoFocus={this.state.mobileInputOnFocus}
                                clearButtonMode="while-editing"
                                onChangeText={(text)=>{
                                    //save('userInfo',{user:text});
                                    this.setState({
                                        username:text,
                                    });
                                }}
                                placeholder={'请输入用户名'}
                                autoCorrect={false}
                                autoCapitalize="none"
                                defaultValue={this.params.username}
                            >
                            </TextInput>
                        </View>
                        <View style={{justifyContent:'center',height:px2dp(1),width:px2dp(257),backgroundColor:"#F2F2F2"}}></View>
                        <View style={styles.inputListView}>
                            <Image source={require('../image/mima@3x.png')} style={styles.inputimageView}>
                            </Image>
                            <TextInput
                                style={styles.inPutStyle}
                                //ref = {'1'}
                                //autoFocus={this.state.mobileInputOnFocus}
                                clearButtonMode="while-editing"

                                onChangeText={(text)=>{
                                    //('userInfo',{pwd:text});
                                    this.setState({
                                        password:text,
                                    });
                                }}
                                //value={this.state.password}
                                placeholder={'请输入密码'}
                                secureTextEntry={true}
                                defaultValue={this.params.password}
                            >
                            </TextInput>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={this._logInAction.bind(this)}
                    >
                        <View style={styles.loginButton}>
                            <Text style={styles.loginButtonTitle}>登录</Text>

                        </View>
                    </TouchableOpacity>
                    <Text style={styles.registerText} onPress={() =>{
                        this.JumpAction(RegisterView);
                    }}>没有账号?立即申请</Text>
                </Image>
                </Animated.View>
            </View>
        )
    }

    _logInAction(){
        var _this=this;
        if (_this.state.userName === '' || _this.state.password === ''){
            toastShort('用户名或密码不能为空');
            return
        }
        if (!_this.state.isTouched){
            return
        }else {
            _this.state.isTouched = false;
        }
        _this.params.username = this.state.username;
        _this.params.password = this.state.password;
        _this.params.registrationId = _this.state.registrationId;
        Network.post('app2/login',_this.params,()=>{
            save("userInfo",{
                'user':_this.params.username,
                'pwd':_this.params.password,
                'rid':_this.params.registrationId
            });
            _this.JumpAction(TabbarView);
        },()=>{
            _this._shakeAndClearPassCode();
            toastShort('用户名或密码错误');
            _this.state.isTouched = true;
        });
    }

}
const styles =  StyleSheet.create({
   contener:{
       flex:1,
   },
    backgroundImage:{
        width:WINDOW_WIDTH,
        height:WINDOW_HEIGHT,
        flexDirection:'column',
        alignItems:'center'
    },
    inPutStyle:{
        width:px2dp(257),
        height:50,
        fontSize:12,
    },
    loginButton:{
        width:px2dp(297),
        height:40,
        backgroundColor:'#0ca6ee',
        marginTop:25,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#FFF'
    },
    loginButtonTitle:{
        fontSize:15,
        color:'#FFFFFF',
    },
    lingInView:{
        width:px2dp(297),
        //height:px2dp(100),
        height:100,
        marginTop:px2dp(180),
        flexDirection:'column',
        borderRadius:5,
        backgroundColor:'#FFF',
        alignItems:"center"
    },
    inputimageView:{
        alignSelf:'center',
        marginLeft:px2dp(20),
        marginRight:px2dp(10)
    },
    inputListView:{
        flexDirection:'row',
    },
    remanberView:{
        flexDirection:'row',
        marginTop:px2dp(15),
        width:px2dp(297),
        height:15,
    },
    remanberText:{
        color:'#999999',
        fontSize:12,
    },
    remberImageView:{
        alignSelf:'center',
        justifyContent:'center',

    },
    registerText:{
        fontSize:12,
        color:'#0a608d',
        marginTop:200
    },
    registerView:{
        marginTop:px2dp(150),
    },
});