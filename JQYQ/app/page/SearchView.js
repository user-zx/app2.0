/**
 * Created by jiahailiang on 2017/3/10.
 */
import React,{Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ScrollView,
    AsyncStorage,
    TextInput,
} from 'react-native';
import Search from '../component/Search';
import Modal from 'react-native-root-modal';
import {NavGoBack} from '../component/NavGoBack';
import Network from '../util/Network'
import ArticleDetails from './ArticleDetails';
import '../util/dateFormat';
import px2dp from '../util/Px2dp';
import BGGlobal from '../util/BGGlobal'
import {toastShort} from '../component/Toast';

const {width,height}=Dimensions.get('window');

export default class SearchView extends Component{
    _searchARR= BGGlobal.searchString?BGGlobal.searchString.split(','):[];
    _dataArr = [];
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _page=1;
    constructor(props){
        super(props);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            searchArr:[],
            open: false,
            visible: false,
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
            dataArr:[],
        };
        this.icons = {
            yuqing:require('../image/lable/yuqing@3x.png'),
            zhengmian:require('../image/lable/zhengmian@3x.png'),
            fumian:require('../image/lable/fumian@3x.png'),
            xiangguan:require('../image/lable/xiangguan@3x.png'),
        }
    }

    removeAll(){
        this._searchARR = [];
        BGGlobal.searchString = '';
        this.setState({
            searchArr:this._searchARR
        });
    }
     removeOne(index){
         this._searchARR = this._searchARR.concat();
         this._searchARR.splice(index,1);
         this.setState({
             searchArr:this._searchARR
         });
     }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };
    _pressRow(title,id){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'ArticleDetails',
                component:ArticleDetails,
                params:{
                    id:id,
                    title:title,
                }
            });
        }
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

    };
    render(){
        return(
            <View style={{ flex: 1}} >
                <View style={{width:width,height:20,backgroundColor:'#242f39'}} onPress={()=>{this.hideModal.bind(this)}} />
                <Search
                     titleSearch="搜索"
                     titleCancel="取消"
                     ref="search_box"
                     onSearch={this.onSearch}
                     onChangeText={this.onChangeText}
                     onCancel={this.onCancel}
                     onFocus={this.onFocus}
                     backgroundColor="#242f39"
                     placeholderTextColor="#666666"
                     tintColorSearch="#242f39"
                     tintColorDelete="#242f39"
                    />
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
                    >
                        <View style={styles.searchTitleView}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:3,height:15,backgroundColor:'#0ca6ee'}}></View>
                                <Text style={{textAlign:'center',marginLeft:17,fontSize:16}}>搜索历史</Text>
                            </View>
                            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.removeAll()}>
                                <Image source={require('../image/seacrh/removeAll@3x.png')}/>
                                <Text  style={{textAlign:'center',marginRight:20}}>清空</Text>
                            </TouchableOpacity>

                        </View>
                                {
                                    this._searchARR.map((item,index)=>{
                                        return(
                                            <View key = {index} style={styles.searchTitleView}>
                                                <TouchableOpacity style={{flexDirection:'row'}} onPress={
                                                    ()=> this.onSearch(item)
                                                }>
                                                    <Image source={require('../image/seacrh/history@3x.png')} style={{marginLeft:20}}/>
                                                    <Text style={{marginLeft:5,textAlign:'center',color:'#666666'}}>{item}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={
                                                    ()=> this.removeOne(index)
                                                }>
                                                    <Image  source={require('../image/seacrh/delate@3x.png')}
                                                            style={{marginRight:15}}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                    </Animated.Modal>
                    <View style={{flex:1}}>
                        <ListView
                            enableEmptySections = {true}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                        />
                    </View>
                </View>
        )
    }

    _renderRow(rowData){
            var icon;
            if (rowData.ispositive == 1) {
                icon = this.icons['zhengmian'];
            } else if (rowData.isnegative == 1) {
                icon = this.icons['fumian'];
            } else {
                if (rowData.isyuqing == 1) {
                    icon = this.icons['yuqing'];
                } else {
                    icon = this.icons['xiangguan'];
                }
            }
            return (
                <TouchableOpacity onPress={() => this._pressRow(rowData.title, rowData.id)}>
                    <View style={styles.cell}>
                        <View style={{width: width, height: px2dp(70)}}>
                            <Text style={styles.cellTitle}>{rowData.title}</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: width, justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={icon}
                                       style={{marginLeft: px2dp(15), marginBottom: px2dp(15), marginTop: px2dp(5)}}/>
                                <Text style={styles.cellText}>{rowData.siteName}</Text>
                                <Text style={styles.cellText}>{rowData.author}</Text>
                            </View>
                            <View style={{marginBottom: px2dp(10)}}>
                                <Text style={{
                                    marginBottom: px2dp(10),
                                    marginRight: 15,
                                    fontSize: 11,
                                    color: '#999999',
                                }}>{rowData.publishTime}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )

    }
    //点击搜索
    onSearch = (text) => {
        if (text == ''){
            toastShort('搜索内容不能为空');
            return;
        }
        return new Promise((resolve, reject) => {
            //在数组第0个位置添加刚刚输入的内容
            // let a = this._searchARR.length;
            // for(var i=0;i<a;i++){
            //     if (this._searchARR[i] = text){
            //         return
            //     }
            // }
            this._searchARR.unshift(text);
            //每个搜索词用,分开
            let searchStr = this._searchARR.join(',');
            //储存到本地
            BGGlobal.searchString = searchStr;
            //模态消失
            this.hideModal();
            //更新state 属性
            this.setState({
                searchArr:this._searchARR
            });
            //调用搜索事件
            this._SearchAction(text);
            resolve();
        });
    };
    _SearchAction = (text) =>{
       // console.log('执行了 SearchAction 方法')
        let params = new  Object();
        params.all = text;
        params.pageSize = 50;
        Network.post('apppanorama2/getList',params,(response)=>{
            let resArr= response.rows;
            if(response.rows==''||!response.rows){
                toastShort('没有搜索到相关数据');
                return;
            }
            // else {
            //     toastShort(resArr.length,'条数据');
            // }
            for (let i in resArr){
                resArr[i].publishTime = new Date(resArr[i].publishTime).Format("yyyy/MM/dd hh:mm");
            }
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(resArr)
            })
        },(err)=>{err});
    };

    //文字变化
    onChangeText = (text) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    };
    //点击取消
    onCancel = () => {
        return new Promise((resolve, reject) => {
            this.hideModal();
            this.buttonGoBack();
            resolve();
        });
    };
    //获取焦点时
    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            this.scaleModal();
            console.log('点击搜索');
            resolve();
        });
    };
    componentDidMount(){
        this.scaleModal();
        this.onFocus();
    }


}
const styles = StyleSheet.create({
    searchTitleView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:width,
        height:44,
        borderBottomWidth:1,
        borderBottomColor:'#666666'
    },
    modal: {
        backgroundColor: '#FFF',
        flexDirection:'column',
        width:width,
        marginTop:64
    },
    cell:{
        height:px2dp(100),
        backgroundColor:'#FFF',
        borderBottomColor:'#ececec',
        borderBottomWidth:1
    },
    cellTitle:{
        paddingTop:px2dp(17),
        paddingLeft:px2dp(15),
        //numberOfLines:1,
        paddingRight:px2dp(15),
        paddingBottom:px2dp(15),
        fontSize:15,
        color:'#333333',
    },
    cellText:{
        fontSize:11,
        color:'#999999',
        marginLeft:px2dp(10),
        marginBottom:px2dp(10),
        marginTop:px2dp(5)
    },
    cellImageView:{
        flexDirection:'row',
    },
});