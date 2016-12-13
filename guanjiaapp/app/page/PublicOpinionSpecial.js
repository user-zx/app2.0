import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import {toastShort} from '../component/Toast'

var WeChat=require('react-native-wechat');
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}
export default class PublicOpinionSpecial extends Component {
    constructor(props) {
        super(props);
        //应用注册
        WeChat.registerApp('wxea6f27aa74050684');
    }
    render() {
        return (
            <View style={{margin:20}}>
                <Text style={styles.welcome}>
                    微信好友/朋友圈分享
                </Text>
                <CustomButton text='微信好友分享-文本'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToSession({type: 'text', description: '测试微信好友分享文本'})
                                                  .catch((error) => {
                                                      toastShort(error.message);
                                                  });
                                          } else {
                                              toastShort('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
                <CustomButton text='微信好友/朋友圈分享-链接'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToSession({
                                                  title:'微信好友测试链接',
                                                  description: '分享自(www.junquan.com.cn)',
                                                  thumbImage: 'http://www.artguide.net.cn/newsUploadFile/2013032805385736.jpg',
                                                  type: 'news',
                                                  webpageUrl: 'http://www.51candy.org'
                                              })
                                                  .catch((error) => {
                                                      toastShort(error.message);
                                                  });
                                          } else {
                                              toastShort('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
                <CustomButton text='微信朋友圈分享-文本'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享文本'})
                                                  .catch((error) => {
                                                      toastShort(error.message);
                                                  });
                                          } else {
                                              toastShort('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
                <CustomButton text='微信朋友圈分享-链接'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToTimeline({
                                                  title:'微信朋友圈测试链接',
                                                  description: '分享自:贾海亮(www.51candy.org)',
                                                  thumbImage: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1481610683&di=058c3bc68bbfe0f81e931c0dd49f40e8&src=http://admin.rockbundartmuseum.org/upload/photo_db/2013/09/26/201309261652144985/250_250/201309261652144985.jpg',
                                                  type: 'news',
                                                  webpageUrl: 'http://www.51candy.org'
                                              })
                                                  .catch((error) => {
                                                      toastShort(error.message);
                                                  });
                                          } else {
                                              toastShort('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
});