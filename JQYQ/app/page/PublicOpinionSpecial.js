
/**
 * Created by jiahailiang on 2017/2/28.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';


const {width,height}=Dimensions.get('window');
import px2dp from '../util/Px2dp';
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import  BGGlobal from '../util/BGGlobal'
import Downloader from '../util/Downloader';
import RNFS from 'react-native-fs';
//import Util from '../util/Util'
import RNFetchBlob from 'react-native-fetch-blob'

export default class PublicOpinionSpecial extends Component {

    constructor(props) {
        super(props);
        //this._initData = this._initData.bind(this);
        //this._initData();
        this.state = {
            text:'',
            time:'',
            isCanDown:'',
            progress: 0,
            id:'',
            //下载
            // isLoaedFile: false,
            // contentLength: 0,
            // data: data,
            // downloadUrl: url,
            // filePath: filePath,
            upData:''
        }
    }
    /*_initData() {
        //是否正在下载
        this.isLoading = false;
        var data = this.props.data;
        console.log(data);
        console.log("FilePreview:", data.url);
        //对url进行Encoding
        var lastPath = Util.lastPathCompoent(data.url);
        var deletingLastPath = Util.deletingLastPathCompoent(data.url);
        var url = deletingLastPath + '/' + encodeURI(lastPath);
        //下载存储的文件路径
        var filePath = RNFS.ExternalDirectoryPath + '/' + data.name;
    }*/

    render() {
        var downTitle ='';
        var downColor = '';
        var downTextColor = '';
        if (this.state.isCanDown !=='' ){
            downTitle = '下载';
            downColor = '#0ca6ee';
            downTextColor = '#FFF';
        } else {
            downTitle = '导控请求中...';
            downColor = '#FFF';
            downTextColor = 'orange'
        }
        return (
            <View style={{flex: 1, flexDirection: 'column',alignItems:'center',width:width,height:height}}>
                <Image source={require('../image/daokong@3x.png')} style={{marginTop:50}} onPress={this._download.bind(this)} />
                <Text style={{marginTop:15,fontSize:24}}>{this.state.text}</Text>
                <Text>{this.state.time}</Text>
                <TouchableOpacity onPress={this._download.bind(this)}>
                    <View style={[styles.down,{backgroundColor:downColor}]} >
                        <Text style={{color:downTextColor,fontSize:14,textAlign:'center'}}>{downTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );

    }

    /*_pressDownloadFile() {
        if(this.isLoading) {
            return;
        }
        this.isLoading = true;
        //检查文件是否已经下载
        RNFS.exists(this.state.filePath)
            .then(result => {
                if(result) {
                    this.isLoading = false;
                    this.setState({
                        progress: 1,
                        isLoaedFile: true,
                    });
                }
                else {
                    RNFS.downloadFile(this.state.downloadUrl, this.state.filePath, (res) => {
                            this.setState({
                                contentLength: res.contentLength
                            });
                        },
                        data => {
                            this.setState({
                                progress: data.bytesWritten/this.state.contentLength,
                            });
                        })
                        .then(res => {
                            this.isLoading = false;
                            console.log(res);
                            this.setState({
                                progress: res.bytesWritten/this.state.contentLength,
                                isLoaedFile: true,
                            });
                        })
                        .catch(err => {
                            ToastAndroid.show('下载文件失败', ToastAndroid.SHORT);
                            this.isLoading = false;
                        });
                }
            })
            .catch(err => {
                ToastAndroid.show('下载文件失败', ToastAndroid.SHORT);
                this.isLoading = false;
            });
    }*/

    _download(){
        if (this.state.isCanDown !=='') {
            let dirs = RNFetchBlob.fs.dirs;
            RNFetchBlob
                .config({
                    path: dirs.DocumentDir + '/test2.doc'
                })
                .fetch('GET', 'http://120.55.190.38:8002/ficfile/test.doc', {
                    //some headers ..
                })
                .then((res) => {
                    //console.log('文件保存到---> ', res.path());
                    toastShort('文件下载成功')
                })
        }

    }
    componentDidMount() {
        console.log('飒飒','导控内容');
        let params = new  Object();
        params.eventId = BGGlobal.propsID;
        Network.post('appguide2/getGuide',params,(res)=>{
            this.setState({
                text:res.data.title,
                time:res.data.putTimeString,
                isCanDown:res.data.result,
                id:res.data.id
            });
            console.log(res.data,'导控内容')
        },(err)=>{err})
    }
}

const styles=StyleSheet.create({
down:{
    width:px2dp(295),
    height:px2dp(34),
    justifyContent:'center',
    marginTop:210,
},

});
