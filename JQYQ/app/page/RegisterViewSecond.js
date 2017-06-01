/**
 * Created by jiahailiang on 2017/2/15.
 */
import React,{Component}from'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
import px2dp from '../util/Px2dp'
import Network from '../util/Network';
import {toastLong} from '../component/Toast';
import Header from '../component/Header'

const {width,height}=Dimensions.get('window');


export default class RegisterViewSecond extends Component{
    constructor (props) {
        super (props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            userName:"",
            phoneNumber:'',
            cityArr:[],
            compony:'',
            commitText:''
        }
    }
    componentDidMount(){
        // 页面加载完成的时候用 state 属性接受上个页面的值
        this.setState({
            userName:this.props.userName,
            phoneNumber:this.props.phoneNumber,
            cityArr:this.props.cityArr,
            compony:this.props.compony
        });
        if  (this.props.userName == '' || this.props.phoneNumber == '' || this.props.cityArr == ''|| this.props.compony == ''){
            toastLong('您填写的个人信息不完整,这可能会影响您的注册')
        }

    };
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };

    _postUserInfo(){
        let params=new Object();
        params.username=this.state.userName;
        params.phoneNumber=this.state.phoneNumber;
        params.cityArr = this.state.cityArr;
        params.compony = this.state.compony;
        params.need = this.state.commitText;
        Network.post(app2/register,params,(response)=>{
            //alert(response.result);
        },(err)=>{
            //alert(err);
        })
    }

    render(){
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };
        const titleConfig = {
            title: '监测需求',
            tintColor: '#FFF'
        };
        const bar = {
            style:'light-content',
        };

        return(
            <View style={styles.backgView} keyboardDismissMode="on-drag" keyboardShouldPersistTaps={false} >
                <View style={{width:width }}>
                    <Header {...this.props}
                            title='监测需求'
                        //righticon={require('../image/yuqing@2x.png')}
                        //renderCustomView={this._renderCustomView}
                        //lefticon={require('../image/zuo.png')}
                            headercolor={'#18242e'}
                    />
                </View>
                <ScrollView>
                    <View style={styles.wrightView}>
                        <Image source={require('../image/risgiter/tianxie@3x.png')} style={{alignSelf:'center'}}></Image>
                        <Text style={{alignSelf:'center',marginLeft:5}}>请填写您的监测需求</Text>
                    </View>
                    <View style={styles.xuqiuView}>
                        <TextInput
                            placeholder={'请尽量以单位相关词作为需求描述,如业务关键词,属地关键词,领导关键词'}
                            style={styles.demandInput}
                            multiline={true}
                            //ref='experience'
                            onChangeText={(text) => {
                                this.setState({
                                    commitText:text
                                })
                            }}
                            value={this.state.commitText}
                        >

                        </TextInput>
                    </View>
                    <TouchableOpacity onPress={() => {
                        let params=new Object();
                        params.name=this.state.userName;
                        params.phone=this.state.phoneNumber;
                        params.city = this.state.cityArr[1];
                        params.company = this.state.compony;

                        params.need = this.state.commitText;
                        if (params.need == ''){
                            toastLong('需求内容不能为空');
                            return
                        }
                        if(params.phone ==''){
                            toastLong('手机号码不能为空');
                            return

                        }
                        if(params.company ==''){
                            toastLong('单位名称不能为空');
                            return
                        }

                        Network.post('app2/register',params,(response)=>{
                            toastLong('您的申请已经提交,工作人员会以最快的速度为您开通账号')
                        },(err)=>{
                            toastLong('填写有错误')
                        })
                    }}>
                        <View style={styles.commitButton}>
                            <Text style={{color:'#FFF'}}>提交申请</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

}


const  styles = StyleSheet.create({
        backgView:{
            flex:1,
            flexDirection:'column',
            backgroundColor:'#F4F4F4',
            alignItems:'center',
        },
        wrightView:{
            flexDirection:'row',
            marginTop:px2dp(15),
            width:px2dp(297),
            //height:px2dp(50),
           // backgroundColor:'#F00'
        },
        commitButton:{
            width:px2dp(297),
            height:px2dp(40),
            backgroundColor:'#0ca6ee',
            marginTop:5,
            alignItems:'center',
            justifyContent:'center',
        },
        xuqiuView:{
            marginTop:px2dp(10),
            width:px2dp(297),
            height:px2dp(202),
            backgroundColor:'#FFF',
            borderWidth:1,
            borderColor:'#d6d6d6',
            paddingTop:px2dp(15),
            paddingLeft:px2dp(15),
            paddingRight:px2dp(15),

        },
        demandInput:{
            //backgroundColor:'#0F0',
            flex: 1,
            textAlignVertical: 'top',
            padding: 0,
            margin: 0,
            fontSize:12
        },


});
