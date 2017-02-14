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

}from'react-native';
var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

import BGGlobal from '../util/BGGlobal';
import Network from '../util/Network';
import px2dp from '../util/Px2dp';
import TabbarView from './TabbarView';
import {toastShort} from '../component/Toast';

export default class LoginView extends Component{
    constructor (props) {
        super (props);

        this.state = {
            userName:'',
            password:'',
            userToken:'',
            mobileInputOnFocus: true,
            translateX:new Animated.Value(0),
            iconsRem:true,

        };
        this.icons = {
            'remanber' : require('../image/remanber@3x.png'),
            'clearRermanber' :require('../image/复选框@3x.png')
        }

    }
    JumpAction (title) {
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:"title",
                component:title,
                /*params:{
                    title:title,
                    getResult:function (myMessage) {
                        _this.setState({
                            resultMessage:myMessage,
                        })
                    }
                }*/
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

        let icon = this.icons['remanber'];
        if (this.state.iconsRem){
            icon = this.icons['clearRermanber']
        }
        return(
            <View style={styles.container}>
                <Animated.View style={animationStyle}>
                <Image source={require('../image/login22@3x.jpg')} style={styles.backgroundImage}>
                    <View style={styles.lingInView}>
                        <View style={styles.inputListView}>

                            <Image source={require('../image/user@3x.png')} style={styles.inputimageView}>

                            </Image>
                            <TextInput
                                style={styles.inPutStyle}
                                //ref = {'1'}
                                autoFocus={this.state.mobileInputOnFocus}
                                onChangeText={(text)=>{
                                    this.setState({
                                        userName:text,
                                    });
                                }}
                                value={this.state.userName}
                                placeholder={'请输入用户名'}
                                //secureTextEntry=
                            >

                            </TextInput>
                        </View>
                        <View style={{justifyContent:'center',height:px2dp(1),width:px2dp(257),backgroundColor:"#F2F2F2"}}></View>
                        <View style={styles.inputListView}>
                            <Image source={require('../image/密码@3x.png')} style={styles.inputimageView}>

                            </Image>
                            <TextInput
                                style={styles.inPutStyle}
                                //ref = {'1'}
                                autoFocus={this.state.mobileInputOnFocus}
                                onChangeText={(text)=>{
                                    this.setState({
                                        password:text,
                                    });
                                }}
                                value={this.state.password}
                                placeholder={'请输入密码'}
                                //secureTextEntry=
                            >

                            </TextInput>

                        </View>



                    </View>
                    {/*<TouchableOpacity
                        // onPress={this.JumpAction.bind(this,TabbarView)}
                        onPress={() => {
                            this.setState ({
                                iconsRem: !this.state.iconsRem
                            })
                        }}
                    >*/}
                        <View style={styles.remanberView}>
                            <Image source={icon}  style={{width:15,height:15}}/>
                            <Text style={styles.remanberText} onPress = {()=>{
                                this.setState ({
                                    iconsRem: !this.state.iconsRem
                                })
                            }}>记住账号</Text>
                        </View>
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity
                       // onPress={this.JumpAction.bind(this,TabbarView)}
                        onPress={this._logInAction.bind(this)}
                    >
                        <View style={styles.loginButton}>
                            <Text style={styles.loginButtonTitle}>登录</Text>

                        </View>
                    </TouchableOpacity>


                    <Text style={styles.registerText} onPress={() => alert('1122')}>没有账号?立即申请</Text>

                </Image>
                </Animated.View>
            </View>
        )
    }


    _logInAction(){
        var _this=this;
        if (this.state.userName === ''){
            toastShort('用户名不能为空');
        }
        if (this.state.password === ''){
            toastShort('密码不能为空')
        }
        //来源
        var source = 0;
        if(Platform.OS == 'ios') {
            source = 0;
        }
        else {
            source = 1;
        }
        /**
         * 登录
         */
        const params=new Object();
            params.username=this.state.userName;
            params.password=this.state.password;
            params.source=source;
        /*fetch("http://192.168.1.102:8080/POMP/app2/login",
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(params)
            })
            .then(function(res){
            console.log(res.text());

        });*/
        Network.post('app2/login',{
            username:this.state.userName,
            password:this.state.password,
        },(response)=>{
            // 将用户信息存入本地
            BGGlobal.userInfo = response.result;
            //登录回调函数
            //this.props.loginSuccess(response.result);
            //toastShort(response.result),
              //  toastShort(response.message)
            console.log(response);

            console.log("****");
            _this.JumpAction(TabbarView);
        },(err)=>{
             //toastShort(err);
            //toastShort(this.state.userName)
            _this._shakeAndClearPassCode()
        });




        // Network.get('app2/login',{
        //     username:this.state.userName,
        //     password:this.state.password,
        // },(response)=>{
        //     toastShort(response.status)
        //     if (response.status == 1){
        //         this.JumpAction.bind(this,TabbarView);
        //     }
        // },(err)=>{
        //     toastShort(err)
        // })


    }


}
const styles =  StyleSheet.create({
   contener:{
       flex:1,
       // width:WINDOW_WIDTH,
       // height:WINDOW_HEIGHT
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
        //backgroundColor:'#66999999',
        fontSize:12


    },
    loginButton:{
        width:px2dp(297),
        height:px2dp(40),
        backgroundColor:'#0ca6ee',
        marginTop:5,
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
        height:px2dp(100),
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
        //backgroundColor:'#00000000',
        flexDirection:'row',
        //alignSelf:'center',
        //justifyContent:'center',
        marginTop:px2dp(15),
        width:px2dp(297),
        //backgroundColor:'#F00',
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
        //flexDirection:'center',
        //alignItems:'center',
        //marginBottom:px2dp(37),
        //bottom:px2dp(37),
        //top:150,
        marginTop:250
    },
    registerView:{
        //bottom:10
        marginTop:px2dp(150),
        //flex:1

    },
});