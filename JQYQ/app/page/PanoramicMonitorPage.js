/**
 * Created by jiahailiang on 2017/2/28.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    Dimensions,
    TouchableOpacity,
    Animated,
} from 'react-native';

import {
    SwRefreshListView, //支持下拉刷新和上拉加载的ListView
} from 'react-native-swRefresh'
const {width,height}=Dimensions.get('window');
import {NavGoBack} from '../component/NavGoBack';
import NavigationBar from 'react-native-navbar';
import ArticleDetails from './ArticleDetails';
import px2dp from '../util/Px2dp';
import ModalDropdown from 'react-native-modal-dropdown';
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import '../util/dateFormat';
import Modal from 'react-native-root-modal';
import AnnouncementAT from './SearchView'

export default class PanoramicMonitorPage extends Component{
    _page=1;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _dataArr=[]
    params = new Object();
    constructor(props) {
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            message:'',
            title:'',
            id:'2',//图片
            open: false,
            visible: false,
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
            isAllTime: true,//时间
            isTaday: false,
            isYesterday: false,
            isWeek: false,
            isMonth: false,
            isDomestic:false,
            isForeign:false,
            isAllSource:true,
            isAllSite:true,
            isFocus:false,
            downArr:[],//下拉框数组
            carrie:'',//载体
            dataArr:[],//列表数组
            // nature:'',//
            value:'',
            aspect:'',
            sequence:'',
            articleList:[],
            nextTime:'',
        };
        this.icons = {
            yuqing:require('../image/lable/yuqing@3x.png'),
            zhengmian:require('../image/lable/zhengmian@3x.png'),
            fumian:require('../image/lable/fumian@3x.png'),
            xiangguan:require('../image/lable/xiangguan@3x.png'),
        }
    }
    // 更新"全部/未处理/已处理"按钮的状态
    _updateBtnSelectedState(currentPressed, array) {
        if (currentPressed === null || currentPressed === 'undefined' || array === null || array === 'undefined') {
            return;
        }

        let newState = {...this.state};

        for (let type of array) {
            if (currentPressed == type) {
                newState[type] ? {} : newState[type] = !newState[type];
                this.setState(newState);
            } else {
                newState[type] ? newState[type] = !newState[type] : {};
                this.setState(newState);
            }
        }
    }

    // 返回设置的button
    _getButton(style, selectedSate, stateType, buttonTitle, count) {
        let BTN_SELECTED_STATE_ARRAY = ['isAllTime', 'isTaday', 'isYesterday','isWeek','isMonth',];
        return(
            <View style={[style, selectedSate ? {borderColor:'#32a7f5',borderWidth:1,borderRadius:10} : {}]}>
                <Text
                    style={[styles.button, selectedSate ? {color: '#32a7f5'} : {}]}
                    onPress={ () => {this._updateBtnSelectedState(stateType, BTN_SELECTED_STATE_ARRAY)}}>
                    {buttonTitle}{count}
                </Text>
            </View>
        );
    }

    _getButton1(style, selectedSate, stateType, buttonTitle, count) {
        let BTN_SELECTED_STATE_ARRAY1 = ['isAllSource', 'isDomestic', 'isForeign'];
        return(
            <View style={[style, selectedSate ? {borderColor:'#32a7f5',borderWidth:1,borderRadius:10,} : {}]}>
                <Text
                    style={[styles.button, selectedSate ? {color: '#32a7f5'} : {}]}
                    onPress={ () => {this._updateBtnSelectedState(stateType, BTN_SELECTED_STATE_ARRAY1)}}>
                    {buttonTitle}{count}
                </Text>
            </View>
        );
    }

    _getButton2(style, selectedSate, stateType, buttonTitle, count) {
        let BTN_SELECTED_STATE_ARRAY2 = ['isAllSite', 'isFocus'];
        return(
            <View style={[style, selectedSate ? {borderColor:'#32a7f5',borderWidth:1,borderRadius:10} : {}]}>
                <Text
                    style={[styles.button, selectedSate ? {color: '#32a7f5'} : {}]}
                    onPress={ () => {this._updateBtnSelectedState(stateType, BTN_SELECTED_STATE_ARRAY2)}}>
                    {buttonTitle}{count}
                </Text>
            </View>
        );
    }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };
    onSelect(){
        if (this.state.isAllTime){
            this.params.time = 'all'
        }
        if (this.state.isTaday){
            this.params.time = 'today'
        }
        if (this.state.isYesterday){
            this.params.time = 'yesterday'
        }
        if (this.state.isWeek){
            this.params.time = 'week'
        }
        if (this.state.isMonth){
            this.params.time = 'months'
        }
        if (this.state.isAllSource){
            this.params.country = '全部'
        }
        if (this.state.isDomestic){
            this.params.country = '境内'
        }
        if (this.state.isForeign){
            this.params.country = '境外'
        }
        if (this.state.isAllSite){
            this.params.publishSite = '全部'
        }
        if(this.state.isFocus){
            this.params.publishSite = '关注'
        }
        Network.post('apppanorama2/getList',this.params,(response)=>{
            let resArr= response.rows;
            if(!response.rows){
                toastShort('没有相关数据');
                return;
            }
            for (let i in resArr){
                resArr[i].publishTime = new Date(resArr[i].publishTime).Format("yyyy/MM/dd hh:mm");
            }
            this._dataArr = resArr;
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(resArr)
            })
        },(err)=>{err});

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
        this.onSelect();

    };
//下拉框点击事件
    _dropdown_6_onSelect(index,value) {
        this.params.carrie=this.state.carrie;//载体
        this.params.nature=this.state.aspect;//相关
        this.params.sort=this.state.sequence;//热度
        Network.post('apppanorama2/getList',this.params,(response)=>{
            let resArr= response.rows;
            if(!response.rows){
                toastShort('没有相关数据');
                return;
            }
            for (let i in resArr){
                resArr[i].publishTime = new Date(resArr[i].publishTime).Format("yyyy/MM/dd hh:mm");
            }
            this._dataArr = resArr;
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(resArr)
            })
        },(err)=>{err});

    }
    _pressRow1(){
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'AnnouncementAT',
                component:AnnouncementAT,
            })
        }
    }
    render(){
        const rightButtonConfig = {
            title: '🔍',
            handler: () => {this._pressRow1()},
            fontSize: 34,
            tintColor:'#FFF'
        };
        const titleConfig = {
            title: '全景监测',
            tintColor: '#FFF'
        };
        const bar = {
            style:'light-content',
        };
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        rightButton={rightButtonConfig}
                        tintColor={'#18242e'}
                        statusBar={bar}
                    />
                </View>
                <View style={{width:width,height:40,flexDirection:'row',borderBottomColor:'#ececec',
                    borderBottomWidth:1}}>
                    <View style={styles.dropdown_1}>
                        <ModalDropdown options={['全部','综合','新闻','博客','论坛','微博','微信','QQ群','电子报','视频','手机wap']}
                                       defaultValue='载体'
                                       textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                       //style={styles.dropdown_1}
                                       dropdownStyle={styles.dropdown_9}
                                       onSelect={(idx, value) => {
                                           if (idx == 0) {
                                               this.state.carrie='';
                                           }else {
                                               this.state.carrie=value;
                                           }
                                           this._dropdown_6_onSelect(idx, value)
                                       }}
                        />
                        <Image source={require('../image/down.png')} style={{width:10,height:10}} />
                    </View>
                    <View style={styles.dropdown_1}>
                        <ModalDropdown
                            options={['不限', '相关','舆情','正面','负面']}
                            defaultValue='特征'
                            textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                            //style={styles.dropdown_1}
                            dropdownStyle={styles.dropdown_9}
                            onSelect={(idx, value) => {
                                if  (idx == 0){
                                    this.state.aspect = '不限';
                                }else if(idx==1){
                                    this.state.aspect = '相关';
                                }else if(idx == 2) {
                                    this.state.aspect = '舆情';
                                }else if (idx ==3){
                                    this.state.aspect = '正面';
                                }else if(idx == 4) {
                                    this.state.aspect = '负面';
                                }

                                this._dropdown_6_onSelect(idx, value)
                            }}
                        />
                        <Image source={require('../image/down.png')} style={{width:10,height:10}} />
                    </View>
                    <View style={styles.dropdown_1}>

                        <ModalDropdown options={['热度降序','时间降序']}
                                       defaultValue='排序'
                                       textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                       //style={styles.dropdown_1}
                                       dropdownStyle={styles.dropdown_9}
                                       onSelect={(idx, value) => {
                                           if(idx==0){
                                               this.state.sequence = 'hot';
                                           }else if(idx == 1) {
                                               this.state.sequence = 'publishTime';
                                           }
                                           this._dropdown_6_onSelect(idx, value)
                                       }}
                        />
                        <Image source={require('../image/down.png')} style={{width:10,height:10}} />
                    </View>
                    <TouchableOpacity
                        style={styles.dropdown_1}
                        underlayColor="#FFF"
                        onPress={this.scaleModal}
                    >
                        <Text style={{fontSize:16}}>条件筛选</Text>
                        <Image source={require('../image/down.png')} style={{width:10,height:10}} />
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
                        <View style={styles.modal2} >
                            <View style={{marginLeft:25,marginTop:20,width:width}}>
                                <Text style={{color:'#666666',fontSize:12}}>时间</Text>
                            </View>
                            <View style={styles.buttonlayout}>
                                {this._getButton(styles.buttonleft, this.state.isAllTime, 'isAllTime', '不限', )}
                                {this._getButton(styles.buttonleft, this.state.isTaday, 'isTaday', '今天', )}
                                {this._getButton(styles.buttonleft, this.state.isYesterday, 'isYesterday', '昨天', )}
                                {this._getButton(styles.buttonleft, this.state.isWeek, 'isWeek', '本周', )}
                                {this._getButton(styles.buttonleft, this.state.isMonth, 'isMonth', '近30天', )}
                            </View>
                            <View style={{marginLeft:25,marginTop:20}}>
                                <Text style={{color:'#666666',fontSize:12}}>站点</Text>
                            </View>
                            <View style={styles.buttonlayout1}>
                                {this._getButton1(styles.buttonleft, this.state.isAllSource, 'isAllSource', '全部', )}
                                {this._getButton1(styles.buttonleft, this.state.isDomestic, 'isDomestic', '境内', )}
                                {this._getButton1(styles.buttonleft, this.state.isForeign, 'isForeign', '境外', )}
                            </View>
                            <View style={{marginLeft:25,marginTop:20}}>
                                <Text style={{color:'#666666',fontSize:12}}>来源</Text>
                            </View>
                            <View style={styles.buttonlayout1}>
                                {this._getButton2(styles.buttonright, this.state.isAllSite, 'isAllSite', '全部站点', )}
                                {this._getButton2(styles.buttonright, this.state.isFocus, 'isFocus', '关注站点', )}
                            </View>

                            <TouchableOpacity
                                style={{backgroundColor:'#0ca6ee',width:px2dp(344),height:px2dp(30),alignSelf:'center',marginTop:50,
                                    justifyContent:'center'
                                }}
                                underlayColor="#aaa"
                                onPress={this.hideModal}
                            >
                                <Text style={{fontSize:16,color:'#FFF',textAlign:'center',}}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.Modal>
                </View>

                <View style={{flex:1}}>{this._renderListView()}</View>
            </View>
        );

    }

    _renderListView(){
        return(
            <SwRefreshListView
                dataSource={this.state.dataSource}
                ref="listView"
                renderRow={this._renderRow.bind(this)}
                onRefresh={this._onListRefersh.bind(this)}
                onLoadMore={this._onLoadMore.bind(this)}
                enableEmptySections = {true}
                pusuToLoadMoreTitle="加载中..."


            />
        )

    }
    _pressRow(title,id){
        var _this = this;
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
        let icon;
        if(rowData.ispositive == 1){
            icon = this.icons['zhengmian'];
        } else if(rowData.isnegative ==1){
            icon = this.icons['fumian'];
        } else {
            if(rowData.isyuqing ==1 ){
                icon = this.icons['yuqing'];
            } else {
                icon = this.icons['xiangguan'];
            }
        }
        return (
            <TouchableOpacity onPress={() => this._pressRow(rowData.title,rowData.id)}>
                <View style={styles.cell}>
                    <View style={{width:width,height:px2dp(70)}}>
                        <Text style={styles.cellTitle}>{rowData.title}</Text>
                    </View>
                    <View style={{flexDirection:'row',width:width,justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={icon} style={{marginLeft:px2dp(15),marginBottom:px2dp(15),marginTop:px2dp(5)}} />
                            <Text style={styles.cellText}>{rowData.siteName}</Text>
                            <Text style={styles.cellText}>{rowData.author}</Text>
                        </View>
                        <View style={{marginBottom:px2dp(10)}}>
                            <Text style={{marginBottom:px2dp(10),marginRight:15,fontSize:11, color:'#999999',}}>{rowData.publishTime}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    /**
     * 刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this.params.tagId = this.props.id;
            this.params.pageNo = 1;
            this.params.nextTime = '';
            Network.post('apppanorama2/getList',this.params,(response)=>{
                let resArr = response.rows;
                for (let i in resArr){
                    resArr[i].publishTime = new Date(resArr[i].publishTime).Format("yyyy/MM/dd hh:mm");
                }
                this._dataArr = resArr;
                this.setState({
                    dataArr:resArr,
                    dataSource:this._dataSource.cloneWithRows(resArr)
                })
            },(err)=>{err});//加载的状态

            end();//刷新成功后需要调用end结束刷新
        },1500)

    }

    /**
     * 加载更多
     * @param end
     * @private
     */
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
        },2000);
        this._page++;
        this.params.pageNo = this._page;
        this.params.nextTime = this.state.nextTime;
        //添加的
        this.params.tagId = this.props.id;
        Network.post('apppanorama2/getList',this.params,(response)=>{
            let resArr= response.rows;
            for (let i in resArr){
                resArr[i].publishTime = new Date(resArr[i].publishTime).Format("yyyy/MM/dd hh:mm");
            }
            this._dataArr = this._dataArr.concat(resArr);
            this.setState({
                dataArr:resArr,
                nextTime:response.nextTime ,
                dataSource:this._dataSource.cloneWithRows(this._dataArr)
            })
        },(err)=>{err});
        end(!this.state.dataArr || this.state.dataArr.length <10);//加载结束条件
    }

    componentDidMount() {
        this.params.nature=this.props.title;
        this.params.tagId = this.props.id;
        Network.post('apppanorama2/getList',this.params,(response)=>{
            let resArr= response.rows;
            for (let i in resArr){
                resArr[i].publishTime = new Date(resArr[i].publishTime).Format("yyyy/MM/dd hh:mm");
            }
            this._dataArr = this._dataArr.concat(resArr);
            this.setState({
                dataArr:resArr,
                nextTime:response.nextTime ,
                dataSource:this._dataSource.cloneWithRows(this._dataArr),
            })
        },(err)=>{err});

    }
}

const styles=StyleSheet.create({
    container:{

    },
    content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
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
    cellImage:{

    },
    dropdown_1: {
        top: 0,
        width:width/4,
        height:39,
        backgroundColor:'#FFF',
        //borderColor:'#333333',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    dropdown_9: {
        flex: 1,
        //left: px2dp(10),
        height:px2dp(160),
        width:px2dp(80),
        backgroundColor:'#FFF'
    },
    dropdown_8: {
        flex: 1,
        //left: px2dp(10),
        height:px2dp(160),
        width:width,
        backgroundColor:'#666666'
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

    modal2: {
        //flex:1,
        top: 110,
        right: 0,
        bottom: 100,
        left: 0,
        backgroundColor: '#FFF',
        //flex:1,
        flexDirection:'column'

    },
    buttonlayout: {
        marginTop: 8,
        //alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-around',
        width:width,
        height:30,
        marginLeft:15,
    },

    buttonlayout1: {
        marginTop: 8,
        //alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-around',
        width:width,
        height:30,
        marginLeft:15
    },


    buttonleft: {
        borderRadius: 10,
        borderColor: '#666666',
        borderWidth: 1,
        marginLeft:10,
        width:55,
        padding:3
    },
    buttonright: {
        borderRadius: 10,
        borderColor: '#666666',
        borderWidth: 1,
        marginLeft:10,
        width:69,
        padding:3
    },
    button: {
        //height: px2dp(20),
        textAlign: 'center',
        //textAlignVertical: 'center',
        // marginLeft:5,
        // marginRight:5,
        //width:50,
        fontSize:12,
        //padding:1,
        //alignSelf: 'center',
        color:'#666666'


    },
    buttondivideline: {
        // width: 1,
        // height: 30,
        // backgroundColor: '#f4f4f4',
        // flexDirection: 'column',
        // marginLeft:5,
        // marginRight:5,
        // borderRadius: 8,
    },


});
