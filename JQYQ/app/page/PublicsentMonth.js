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

} from 'react-native';

import Network from '../util/Network'
import Picker from 'react-native-picker';
import PublicsentPerview from './PublicsentPerview'

const {width,height}=Dimensions.get('window');

export default class PublicsentMonth extends Component {

    constructor(props,context){
        var mayData = new Date();
        super(props,context);
        this.state={
            time:[],
            TitleArr:[{title:'加载中...'}],
            Id:'',
            year: mayData.getFullYear(),
            month:mayData.getMonth()+1,

        }
    }

    componentDidMount() {
        this._timeActon()
    }

    _timeActon(){

        let params = new Object();
        params.time = 'month';
        params.year = this.state.year;
        params.month = this.state.month;
        Network.post('appbriefing2',params,(res)=>{
            this.setState({
                TitleArr:res.rows.content,
                id:res.rows.content.id,
            });
        },(err)=>{
            console.log(err,'错误')
        })
    }


    _showTimePicker() {
        let years = [],
            months = [];

        for(let i=1;i<18;i++){
            years.push(i+2000);
        }
        for(let i=1;i<13;i++){
            months.push(i);
        }

        let pickerData = [years, months];
        let date = new Date();
        let selectedValue = [
            [date.getFullYear()],
            [date.getMonth()+1],
        ];
        Picker.init({
            pickerData,
            selectedValue,
            pickerConfirmBtnText:'确认',
            pickerCancelBtnText	:'取消',
            pickerTitleText: '选择时间',
            wheelFlex: [2, 1],
            onPickerConfirm: pickedValue => {
                this.setState({
                    time:pickedValue,
                    year:pickedValue[0],
                    month:pickedValue[1]
                });
                this._timeActon()
            },
            onPickerCancel: pickedValue => {
                console.log('取消', pickedValue);
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
                                                  onPress={() => this._pressRow(item.title,item.id,'month')} >
                                    <Text style={{marginLeft:20,color:'#666666'}}>{item.title}舆情月报</Text>
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
        var result=title.replace('/','-');
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'PublicsentPerview',
                component:PublicsentPerview,
                params:{
                    id:id,
                    title:result,
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
    }
})