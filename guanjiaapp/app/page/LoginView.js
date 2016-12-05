/**
 * Created by jiahailiang on 2016/11/22.
 */
import React, { Component } from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import EditView from '../component/EditView';
import LoginButton from '../component/LoginButton';
import NetUitl from '../component/NetUtil';
import TabNavGator from '../page/TabbarView'
import {toastShort} from '../component/Toast'
import px2dp from '../util/px2db'
import TextButton from '../component/TextButton'
export default class LoginActivity extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
        this.onPressCallback = this.onPressCallback.bind(this);
        this.onPressResister = this.onPressResister.bind(this);
    }

    render() {
        return (

            <View style={LoginStyles.loginview}>
                <View style={{flexDirection: 'row',height:px2dp(100),marginTop:px2dp(1),
                    justifyContent: 'center',
                    alignItems: 'flex-start',}}>
                    <Image source={require('../image/logo.png') } style={LoginStyles.logo2}/>
                </View>
                <View style={{marginTop:px2dp(180)}}>
                    <EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
                        this.userName = text;
                    }}/>
                    <EditView name='输入密码' onChangeText={(text) => {
                        this.password = text;
                    }}/>
                    <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
                </View>
                <View style={LoginStyles.registerStyle}>
                    {/*<Text style={{color:"#4A90E2",textAlign:'center',marginTop:px2dp(10)}} >忘记密码？</Text>*/}
                    {/*<Text style={{color:"#4A90E2",textAlign:'center',marginTop:px2dp(10)}} >注册账号</Text>*/}
                    <TextButton name = '忘记密码?'/>
                    <TextButton name = '注册账号?'/>
                </View>
            </View>
        )
    }

    onPressCallback = () => {
        if (this.userName === ''){
            toastShort('用户名不能为空...')
            return;
        }
        if (this.password ===''){
            toastShort('密码不能为空...')
            return;
        }
        if (this.userName !=='' && this.password !== ''){
            this.onLoginSuccess();
        }
        //这是新建数组
        // let formData = new FormData();
        // formData.append("uname",this.userName);
        // formData.append("upwd",this.password);
        // let url = "http://172.168.30.38:3000/login";
        // NetUitl.postJson(url,formData,(result1) => {
        //     if (result1.status == 0) {
        //         this.onLoginSuccess();
        //         toastShort(result1.msg);
        //     } else {
        //         toastShort(result1.msg);
        //     }
        // })

    };
    onPressResister = () => {
        //注册时间
        toastShort('点击了注册按钮')
    };
    //跳转到第二个页面去
    onLoginSuccess(){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name : 'TabNavGator',
                component : TabNavGator,
            });
        }
    }
}

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding:px2dp(50),
        backgroundColor: '#3dabec'
    },
    logo2:{
        flexDirection:'row',
        width:px2dp(200),
        height:px2dp(200)
    },
    registerStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end'
    }
});
