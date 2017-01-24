/**
 * Created by jiahailiang on 2017/1/6.
 */
/**
 * Created by jiahailiang on 2016/12/20.
 */
//引导页
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    AsyncStorage,

} from 'react-native';

import px2dp from '../util/px2db';
import {NavGoBack} from '../component/NavGoBack';
import AppIntro from 'react-native-app-intro';

export default class GuideView extends Component{
    constructor(props) {
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {

        }
    }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    }
    onSkipBtnHandle = (index) => {
        Alert.alert('Skip');
        console.log(index);
    }
    doneBtnHandle = () => {
        Alert.alert('Done');
    }
    nextBtnHandle = (index) => {
        Alert.alert('Next');
        console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }
    componentDidMount() {

    }
    render(){

        const pageArray = [{
            title: '欢迎使用军犬舆情管家',
            description: 'Description 1',
            img: require('../image/share_icon_wechat.png'),
            imgStyle: {
                height: 80 * 2.5,
                width: 109 * 2.5,
            },
            backgroundColor: '#fa931d',
            fontColor: '#fff',
            level: 10,
        }, {
            title: '还有一件事...',
            description: '阿斯顿发送到发送到发大水发士大夫的发生的发的所发生的发生的发生的法定' +
            '是大法官水电费水电费感受到分公司的分公司的分公司',
            img: require('../image/share_icon_moments.png'),
            imgStyle: {
                height: 93 * 2.5,
                width: 103 * 2.5,
            },
            backgroundColor: '#a4b602',
            fontColor: '#fff',
            level: 10,
        },
            {
                title: '还有一件事...',
                description: '阿斯顿发送到发送到发大水发士大夫的发生的发的所发生的发生的发生的法定' +
                '是大法官水电费水电费感受到分公司的分公司的分公司',
                img: require('../image/share_icon_moments.png'),
                imgStyle: {
                    height: 93 * 2.5,
                    width: 103 * 2.5,
                },
                backgroundColor: '#a4b602',
                fontColor: '#fff',
                level: 10,
            }

        ];
        return(
            <View>
                <AppIntro
                    onNextBtnClick={this.nextBtnHandle}
                    onDoneBtnClick={this.doneBtnHandle}
                    onSkipBtnClick={this.onSkipBtnHandle}
                    onSlideChange={this.onSlideChangeHandle}
                    pageArray={pageArray}
                />
            </View>
        )


    }

}

