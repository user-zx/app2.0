/**
 * Created by jiahailiang on 2017/3/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Animated,

} from 'react-native';

import Network from '../util/Network';
import Picker from 'react-native-picker';
import PublicsentPerview from './PublicsentPerview';
import {toastShort} from '../component/Toast';
import Modal from 'react-native-root-modal';

const {width,height}=Dimensions.get('window');


export default class PublicsentDay extends Component {

    constructor(props,context){
        var mayData = new Date();

        super(props,context);
        this.state={
            time:[],
            TitleArr:[{title:'加载中...'}],
            Id:'',
            year: mayData.getFullYear(),
            month:mayData.getMonth()+1,
            //today:mayData.getDay()
            open: false,
            visible: false,
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this._timeActon()
    }

    _timeActon(){
        let params = new Object();
        params.time = 'today';
        params.year = this.state.year;
        params.month = this.state.month;
        Network.post('appbriefing2',params,(res)=>{
            this.state.TitleArr = res.rows.content;
            if(res.rows.content==''){
                toastShort('这个时间,没有报告');
                return;
            }
            this.setState({
                TitleArr:res.rows.content,
                id:res.rows.content.id,
            });
        },(err)=>{
            toastShort('错误→',err);
        })
    }

    _showTimePicker() {
        this.scaleModal();
        let years = [],
            months = [],
            days = [],
            hours = [],
            minutes = [];

        for(let i=18;i>1;i--){
            years.push(i+2000);
        }
        for(let i=1;i<13;i++){
            months.push(i);
            hours.push(i);
        }
        for(let i=1;i<32;i++){
            days.push(i);
        }
        for(let i=1;i<61;i++){
            minutes.push(i);
        }
        let pickerData = [years, months,];
        let date = new Date();
        let selectedValue = [
            [date.getFullYear()],
            [date.getMonth()+1],

        ];
        Picker.init({
            //pickerData:this._createDateData(),//年月日
            pickerData:pickerData,
            selectedValue:[this.state.year,this.state.month],
            pickerConfirmBtnText:'确认',
            pickerCancelBtnText	:'取消',
            pickerTitleText: '选择时间',
            wheelFlex: [1, 1],
            onPickerConfirm: pickedValue => {
                //console.log('哈哈哈点击了确认按钮', pickedValue);
                this.hideModal();
                this.setState({
                    time:pickedValue,
                    year:pickedValue[0],
                    month:pickedValue[1]
                });
                this._timeActon()
            },
            onPickerCancel: pickedValue => {
                //console.log('呵呵呵', pickedValue);
                this.hideModal();
            },
            onPickerSelect: pickedValue => {
                let targetValue = [...pickedValue];
                if(parseInt(targetValue[1]) === 2){
                    if(targetValue[0]%4 === 0 && targetValue[2] > 29){
                        targetValue[2] = 29;
                    }
                    else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
                        targetValue[2] = 28;
                    }
                }
                else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
                    targetValue[2] = 30;

                }
                // forbidden some value such as some 2.29, 4.31, 6.31...
                if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
                    // android will return String all the time，but we put Number into picker at first
                    // so we need to convert them to Number again
                    targetValue.map((v, k) => {
                        if(k !== 3){
                            targetValue[k] = parseInt(v);
                        }
                    });
                    Picker.select(targetValue);
                    pickedValue = targetValue;
                }
            }
        });
        Picker.show();
    }

//显示模态
    slideModal = () => {
        this.state.x.setValue(-320);
        this.state.scale.setValue(1);
        Animated.spring(this.state.x, {
            toValue: 0
        }).start();
        this.setState({
            visible: true
        });
        this.slide = true;
    };
//设置模态
    scaleModal = () => {
        this.state.x.setValue(0);
        this.state.scale.setValue(0);
        Animated.spring(this.state.scale, {
            toValue: 1
        }).start();
        this.setState({
            visible: true
        });
        this.slide = false;
    };

//隐藏模态窗口
    hideModal = () => {
        if (this.slide) {
            Animated.timing(this.state.x, {
                toValue: -320
            }).start(() => {
                this.setState({
                    visible: false
                });
            });
        } else {
            Animated.timing(this.state.scale, {
                toValue: 0
            }).start(() => {
                this.setState({
                    visible: false
                });
            });
        }
        //this.onSelect();
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection:'column',backgroundColor:'#F2F2F2'}}>
                <TouchableOpacity
                    style={{width:width,height:44,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        backgroundColor:'#FFF',
                        marginBottom:3}}
                    onPress={this._showTimePicker.bind(this)} >
                    <Text style={{marginLeft:20}}>{this.state.year}年度</Text>
                    <Text style={{marginRight:40}}>{this.state.month}月份</Text>
                    <Image source={require('../image/zhixiang-bottom.png')} style={{marginRight:20}} />
                </TouchableOpacity>
                <Animated.Modal
                    visible={this.state.visible}
                    style={[styles.modal, {
                        transform: [
                            {
                                scale: this.state.scale
                            },
                            {
                                translateX: this.state.x
                            }
                        ]
                    }]}
                    onRequestClose = {this.hideModa}

                >

                </Animated.Modal>
                <ScrollView>
                    {
                        this.state.TitleArr.map((item,index)=>{
                            return(
                                <TouchableOpacity key={index}
                                                  style={{
                                                      width:width,
                                                      height:44,
                                                      backgroundColor:'#FFF',
                                                      marginBottom:1,
                                                      flexDirection:'row',
                                                      justifyContent:'space-between',
                                                      alignItems:'center',
                                                  }}
                                                  onPress={() => this._pressRow(item.title,item.id,'today')} >
                                    <Text style={{marginLeft:20,color:'#666666'}}>{item.title}舆情日报</Text>
                                    <Image style={{marginRight:20}} source={require('../image/zhixiang-right.png')} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }

    _pressRow(title,id,time){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'PublicsentPerview',
                component:PublicsentPerview,
                params:{
                    id:id,
                    title:title,
                    time:time,
                }
            })
        }
    }

}

const styles = StyleSheet.create({
    sectionHeader: {
        width: width,
        height: 44,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d9d9d9'
    },
    modal: {
        //flex:1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#00000000',
        //flex:1,
        flexDirection:'column',

    },

    // modal2: {
    //     //flex:1,
    //     top: 110,
    //     right: 0,
    //     bottom: 100,
    //     left: 0,
    //     //backgroundColor: '#FFF',
    //     //flex:1,
    //     flexDirection:'column'
    //
    // },
});