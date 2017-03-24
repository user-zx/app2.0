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


export default class PublicsentWeek extends Component {

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
        params.time = 'week';
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

    /*_createDateData() {
     let date = [];
     for(let i=1950;i<2050;i++){
     let month = [];
     for(let j = 1;j<13;j++){
     let day = [];
     if(j === 2){
     for(let k=1;k<29;k++){
     day.push(k+'日');
     }
     //Leap day for years that are divisible by 4, such as 2000, 2004
     if(i%4 === 0){
     day.push(29+'日');
     }
     }
     else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
     for(let k=1;k<32;k++){
     day.push(k+'日');
     }
     }
     else{
     for(let k=1;k<31;k++){
     day.push(k+'日');
     }
     }
     let _month = {};
     _month[j+'月'] = day;
     month.push(_month);
     }
     let _date = {};
     _date[i+'年'] = month;
     date.push(_date);
     }
     return date;
     }*/
    _showTimePicker() {
        let years = [],
            months = [],
            days = [],
            hours = [],
            minutes = [];

        for(let i=1;i<18;i++){
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
            pickerData,
            selectedValue,
            pickerConfirmBtnText:'确认',
            pickerCancelBtnText	:'取消',
            pickerTitleText: '选择时间',
            wheelFlex: [1, 1],
            onPickerConfirm: pickedValue => {
                console.log('哈哈哈点击了确认按钮', pickedValue);
                this.setState({
                    time:pickedValue,
                    year:pickedValue[0],
                    month:pickedValue[1]
                });
                this._timeActon()
            },
            onPickerCancel: pickedValue => {
                console.log('呵呵呵', pickedValue);
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
                                                  onPress={() => this._pressRow(item.title,item.id,'week')} >
                                    <Text style={{marginLeft:20,color:'#666666'}}>{item.title}舆情周报</Text>
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
        // var reg = [\u4e00-\u9fa5];
        // var result=title.replace(reg,'');
        let result = title.substring(0,title.length-2);
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