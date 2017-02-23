import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Image,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import Picker from 'react-native-picker';
import area from '../util/area.json';
import px2dp from '../util/Px2dp'
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
import RegisterViewSecond from './RegisterViewSecond'




const {width,height}=Dimensions.get('window');


export default class RegisterView extends Component {

    constructor(props, context) {
        super(props, context);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        //this._panduan = this._panduan.bind(this);
        this.state = {
            cityArr:[],       //城市
            userName:'',      //用户名
            phoneNumber:'',   //手机号
            compony:'',       //公司名
            enableLoginButton:true

        }
    }

    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };


    _jumpAction(){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'RegisterViewSecond',
                component:RegisterViewSecond,
                //通过 props 传到下一页的参数
                params:{
                    cityArr:this.state.cityArr,                  //城市
                    userName:this.state.userName,          //用户名
                    phoneNumber:this.state.phoneNumber,    //手机号
                    compony:this.state.compony             //公司名
                }
            })
        }
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }



    _showAreaPicker() {
        let _this = this;
        Picker.init({
            pickerTitleText: '选择城市',
            pickerConfirmBtnText:'确认',
            pickerCancelBtnText	:'取消',
            pickerData: this._createAreaData(),
            selectedValue: ['北京', '北京', '东城区'],
            onPickerConfirm: pickedValue => {
                console.log('area------->', pickedValue);
                _this.setState({
                    cityArr:pickedValue,
                });
                //this._panduan();
                console.log('++++++>>>>',this.state.city)

            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                console.log('area========>', pickedValue);
            }
        });
        Picker.show();
    }

    /*_panduan(){
            if (this.state.compony!==null &&
                this.state.cityArr!==null &&
                this.state.phoneNumber!==null &&
                this.state.userName!==null){
                this.setState({
                    enableLoginButton:true
                })
            }
            if (this.state.compony == '' ||
                this.state.cityArr == '' ||
                this.state.phoneNumber == '' ||
                this.state.userName == '') {
                this.setState({
                    enableLoginButton:false
                })
            }
    }*/

    render() {
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32
        };
        const titleConfig = {
            title: '基本信息',
            tintColor: '#FFF'
        };
        var nextButton = (
            <TouchableHighlight
                style={[styles.nextButton, {backgroundColor: '#C9C9C9'}]}
            >
                <Text style={{color:'#FFF'}}>下一步</Text>
            </TouchableHighlight>
        );
        if(this.state.enableLoginButton) {
            nextButton = (
                <TouchableHighlight
                    underlayColor={'#0ca6ee'}
                    style={[styles.nextButton, {backgroundColor:'#0ca6ee'}]}
                    onPress={this._jumpAction.bind(this)}
                >
                    <Text style={{color:'#FFF'}}>下一步</Text>
                </TouchableHighlight>
            )
        }






        return (
            <View style={styles.cityViewL}>
                <View style={{width:width }}>
                    <NavigationBar
                        title={titleConfig}
                        leftButton={leftButtonConfig}
                        tintColor={'#18242e'}
                    />
                </View>
                <View style={[styles.inputView,{marginTop:px2dp(35)}]}>
                    <Image source={require('../image/risgiter/我的@3x.png')}style={{alignSelf:'center',marginLeft:px2dp(15)}}/>
                    <TextInput
                        placeholder={'请输入您的姓名'}
                        style={styles.inputText}
                        onChangeText={(text)=>{
                            this.setState({
                                userName:text,

                                });

                        }}
                        //onEndEditing={()=>this._panduan()}
                    />
                </View>
                <View style={[styles.inputView,{marginTop:px2dp(16)}]}>
                    <Image source={require('../image/risgiter/手机@3x.png')}style={{alignSelf:'center',marginLeft:px2dp(15)}}/>
                    <TextInput
                        placeholder={'请输入您的手机号码'}
                        style={styles.inputText}
                        onChangeText={(text)=>{
                            this.setState({
                                phoneNumber:text
                            });
                            this._panduan();
                        }}
                       // onEndEditing={()=>this._panduan()}

                    />
                </View>
                <View style={[styles.inputView,{marginTop:px2dp(16)}]}>
                    <Image source={require('../image/risgiter/单位@3x.png')}style={{alignSelf:'center',marginLeft:px2dp(15)}}/>
                    <TextInput
                        placeholder={'请输入您的单位名称'}
                        style={styles.inputText}
                        onChangeText={(text)=>{
                            this.setState({
                                compony:text
                            });
                        }}
                       // onEndEditing={()=>this._panduan()}

                    />
                </View>

                <View style={[styles.regView,{marginTop:px2dp(16)}]}>
                    <Image source={require('../image/risgiter/省份@3x.png')} style={{alignSelf:'center',marginLeft:px2dp(15)}}></Image>
                    <TextInput
                        placeholder='请选择所在城市'
                        style={styles.cityText}
                        defaultValue={this.state.cityArr[0]+this.state.cityArr[1]+this.state.cityArr[2]}
                        //onEndEditing={()=>this._panduan()}

                    />
                    <TouchableOpacity onPress={this._showAreaPicker.bind(this)} style={{alignSelf:'center',marginRight:px2dp(15)}}>
                     <Image source={require('../image/risgiter/下拉@3x.png')} style={{alignSelf:'center'}} ></Image>
                     </TouchableOpacity>
                </View>
                {/*<TouchableOpacity onPress={this._jumpAction.bind(this)}>
                    <View style={styles.nextButton}>
                        <Text style={{color:'#FFF'}}>下一步</Text>
                    </View>
                </TouchableOpacity>*/}
                {nextButton}

            </View>
        );
    }
};

const styles = StyleSheet.create({
    cityViewL:{
        flex:1,
        flexDirection:'column',
        //justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F4F4F4',

    },
    regView:{
        width:px2dp(297),
        height:px2dp(35),
        flexDirection:'row',
        backgroundColor:'#FFF'


    },
    nextButton:{
        width:px2dp(297),
        height:px2dp(40),
        backgroundColor:'#0ca6ee',
        marginTop:26,
        alignItems:'center',
        justifyContent:'center',
    },
    cityText:{
        height: px2dp(35),
        width:px2dp(220),
        marginLeft:px2dp(15),
        marginRight:px2dp(5),
        fontSize:16

    },
    inputText:{
        width:px2dp(240),
        height:px2dp(35),
        marginLeft:px2dp(15),
        fontSize:16
    },
    inputView:{
        width:px2dp(297),
        height:px2dp(35),
        flexDirection:'row',
        backgroundColor:'#FFF',
    },
});
