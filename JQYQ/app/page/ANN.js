/**
 * Created by jiahailiang on 2017/3/20.
 */
/**
 * Created by jiahailiang on 2017/3/10.
 */
import React,{Component} from 'react';
import {
    Text,StyleSheet,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ScrollView,

} from 'react-native';
import Search from '../component/Search';
import Modal from 'react-native-root-modal';
import {NavGoBack} from '../component/NavGoBack';
import Network from '../util/Network'
import ArticleDetails from './ArticleDetails';
import '../util/dateFormat';
import px2dp from '../util/Px2dp';

const {width,height}=Dimensions.get('window');

export default class ANN extends Component{
    _searchARR=[];
    _dataArr = [];
    constructor(props){
        super(props);
        //this._renderRow = this._renderRow.bind(this);
        _dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            searchArr:[],
            open: false,
            visible: false,
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
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
        this.setState({
            searchArr:this._searchARR
        })
    }

    removeOne(index){
        alert('删除这个',index)
        this._searchARR = this._searchARR.concat();
        this._searchARR.splice(index,1);
        this.setState({
            searchArr:this._searchARR
        })
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
            })
        }
    }
    //每行 cell 的内容渲染
    _renderRow(rowData) {
        if (this._dataArr && this._dataArr.length > 0) {
            let icon;
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
                                }}>{rowData.createTime}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }else {
            return (
                <Text>加载中...</Text>
            )
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
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../image/seacrh/history@3x.png')} style={{marginLeft:20}}/>
                                        <Text style={{marginLeft:5,textAlign:'center',color:'#666666'}}>{item}</Text>
                                    </View>
                                    <Image  source={require('../image/seacrh/delate@3x.png')}
                                            style={{marginRight:15}}
                                            onPress={()=>{
                                                this.removeOne.bind(this,index)
                                            }}
                                    />
                                </View>
                            )
                        })
                    }
                </Animated.Modal>

                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                />
            </View>
        )
    }

    //点击搜索
    onSearch = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onSearch', text);
            // this._searchARR = this._searchARR.concat(text);
            this._searchARR.unshift(text);
            this.hideModal();
            this.setState({
                searchArr:this._searchARR
            });
            this._SearchAction(text);
            resolve();
        });
    };
    _SearchAction = (text) =>{
        let params = new  Object();
        params.all = text;
        Network.post('apppanorama2/getList',params,(response)=>{
            let resArr= response.rows;
            for (let i in resArr){
                resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
            }
            //this._dataArr = this._dataArr.concat(resArr);
            this._dataArr = resArr;
            this.setState({
                dataSource:this._dataSource.cloneWithRows(resArr)
            })
        },(err)=>{err});
    };

    //文字变化
    onChangeText = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onChangeText', text);
            console.log('onChangeText', this._searchARR);
            resolve();
        });
    };
    //点击取消
    onCancel = () => {
        return new Promise((resolve, reject) => {
            console.log('onCancel');
            this.hideModal();
            this.buttonGoBack();
            resolve();
        });
    };
    //获取焦点时
    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onFocus', text);
            this.scaleModal();
            resolve();
        });
    };
    componentDidMount(){
        this.scaleModal();
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
        // top: 108,
        // right: 0,
        // bottom: 100,
        // left: 0,
        backgroundColor: '#FFF',
        //flex:1,
        flexDirection:'column',
        // borderBottomWidth:1,
        // borderBottomColor:'#666666',
        width:width,
        //height:400,
        marginTop:64
    },
    cell:{
        height:px2dp(100),
        backgroundColor:'#FFF',
        //alignItems:'center',
        //justifyContent:'center',
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