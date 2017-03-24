/**
 * Created by jiahailiang on 2017/1/18.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Selfinfo from './SelfInfo';
import StartView from './SelfStart';
import Announcement from './Announcement';
import PublicOpinionReports from './Publicsentiment';
import FeedBack from './FeedBack';
import px2dp from '../util/Px2dp';
var {width,height} = Dimensions.get('window');


export default class MyPage extends React.Component {
    constructor (props){
        super(props);
        this.state={
            selfNumber:'15712871715',
            isBadge :true,
            badgeNumber : 13
        }

    }
    JumpAction (title) {
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                "name":"title",
                component:title,
                params:{
                    title:title,
                    // Daliy:Daliy,
                    getResult:function (myMessage) {
                        _this.setState({
                            resultMessage:myMessage,
                        })
                    }
                }
            });
            console.log('--------------->',title)
        }
    }

    QuitAction () {

    }
    badgeView(){

            if(this.state.isBadge === true){
                return (
                    <View style={styles.badgeView}><Text style={styles.badgeText}>{this.state.badgeNumber}</Text></View>
                )
            } else {
                return null;
            }


    }

    render (){
        const rightButtonConfig = {
            title: '功能',
            handler: () => alert('点击效果'),
        };
        const titleConfig = {
            title: '我的',
            tintColor:'#FFF'
        };

        return (
            <View style={{backgroundColor:'#f4f4f4',flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        //rightButton={rightButtonConfig}
                        tintColor={'#18242e'}
                    />
                </View>
                <View style={{flexDirection:'column',alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={this.JumpAction.bind(this,Selfinfo)} style={{flexDirection:'row'}}>
                        <View style={[styles.firstView]}>
                            <Image source={require('../image/wode@3x.png')} style={styles.imageStyle}/>
                            <View style={styles.firstVIewText}>
                                <Text style={{marginTop:px2dp(25)}}>个人信息</Text>
                                <Text style={{marginTop:px2dp(7.5),color:'#666666',fontSize:13}}>账号: {this.state.selfNumber}</Text>
                            </View>
                            <Image source={require('../image/youjiantou@3x.png')} style={styles.rightImage}></Image>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.JumpAction.bind(this,PublicOpinionReports)} style={{flexDirection:'row'}}>
                        <View style={styles.sampleViewStyle}>
                            <Image source={require('../image/yuqingbaogao@3x.png')} style={styles.imageStyle}/>
                            <Text style={styles.textStyle}>舆情报告</Text>
                            <Image source={require('../image/youjiantou@3x.png')} style={styles.rightImage}></Image>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.JumpAction.bind(this,StartView)} style={{flexDirection:'row'}}>
                        <View style={styles.mb10}>
                            <Image source={require('../image/shoucang@3x.png')} style={styles.imageStyle}/>
                            <Text style={styles.textStyle}>我的收藏</Text>
                            <Image source={require('../image/youjiantou@3x.png')} style={styles.rightImage}></Image>

                        </View>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={this.JumpAction.bind(this,Announcement)} style={{flexDirection:'row'}}>
                        <View style={styles.sampleViewStyle}>
                            <Image source={require('../image/gaonggao@3x.png')} style={styles.imageStyle}/>
                            <Text style={styles.textStyle}>公告</Text>
                            {this.badgeView()}
                            <Image source={require('../image/youjiantou@3x.png')} style={styles.rightImage}></Image>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.JumpAction.bind(this,FeedBack)} style={{flexDirection:'row'}}>
                        <View style={styles.mb10}>
                            <Image source={require('../image/yijianfankui@3x.png')} style={styles.imageStyle}/>
                            <Text style={styles.textStyle}>意见反馈</Text>
                            <Image source={require('../image/youjiantou@3x.png')} style={styles.rightImage}></Image>

                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={this.QuitAction.bind(this)} style={{flexDirection:'row'}}>
                        <View style={styles.sampleViewStyle}>
                            <Image source={require('../image/tuichu@3x.png')} style={styles.imageStyle}/>
                            <Text style={styles.textStyle}>退出系统</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        );


    }
}

const styles = StyleSheet.create({
    sectionStyle:{
        backgroundColor:'gray',
        height:px2dp(25)
    },
    cellStyle:{
        flexDirection:'row',
        borderBottomColor:'#CCCCCC',
        borderBottomWidth:1,
        alignItems:'center'
    },
    textStyle:{
        marginLeft:1,
        alignSelf:'center',
        fontSize:14,
        flex:1
    },
    imageStyle:{
        //width:px2dp(20),
        //height:px2dp(20),
        marginLeft:px2dp(25),
        marginTop:px2dp(25),
        marginBottom:px2dp(25),
        marginRight:px2dp(15)

    },
    imageStyle2:{
        //width:px2dp(20),
        //height:px2dp(20),
        marginLeft:px2dp(25),
        marginTop:px2dp(25),
        marginBottom:px2dp(25),
        marginRight:px2dp(15)

    },
    rightImage:{
        marginRight:px2dp(23),
        marginTop:px2dp(25),
        //marginBottom:px2dp(25),
        //marginRight:px2dp(15)

    },
    sampleViewStyle:{
        flexDirection:'row',
        backgroundColor:'#FFF',
        width:width,
        borderBottomWidth:1,
        borderBottomColor:'#d9d9d9'
    },
    mb10:{
        marginBottom:px2dp(10),
        flexDirection:'row',
        backgroundColor:'#FFF',
        width:width
    },
    firstView:{
        flexDirection:'row',
        backgroundColor:'#FFF',
        width:width,
        borderBottomWidth:1,
        borderBottomColor:'#F2F2F2',
        height:px2dp(82),
        marginBottom:px2dp(10),
    },
    firstVIewText:{
        flexDirection:'column',
        flex:1,

    },
    badgeView:{
        width:24,
        height:16 ,
        backgroundColor:'#f85959',
        borderWidth:1,
        //marginLeft:10,
        marginTop:25,
        borderColor:'#FFF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginRight:px2dp(5)
    },
    badgeText:{
        color:'#fff',
        fontSize:8,
    }

});








