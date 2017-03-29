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
} from 'react-native';

import {
    SwRefreshListView, //支持下拉刷新和上拉加载的ListView
} from 'react-native-swRefresh'
const {width,height}=Dimensions.get('window');
import ArticleDetails from './ArticleDetails';
import px2dp from '../util/Px2dp';
import ModalDropdown from 'react-native-modal-dropdown';
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import '../util/dateFormat';
import BGGlobal from '../util/BGGlobal';

import Modal from 'react-native-root-modal';

export default class NewClass extends Component{
    _page=0;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _dataArr=[];
    eventId = BGGlobal.propsID;//事件 ID

    constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            message:'',
            title:'',
            downArr:[],//下拉框数组
            carrie:'',//载体
            dataArr:[],//列表数组
            // nature:'',//
            value:'',
            aspect:'',
            sequence:'',
            articleList:[],
            textId:'',//详情 id
            sort:'',

        };
        this.icons = {
            yuqing:require('../image/lable/yuqing@3x.png'),
            zhengmian:require('../image/lable/zhengmian@3x.png'),
            fumian:require('../image/lable/fumian@3x.png'),
            xiangguan:require('../image/lable/xiangguan@3x.png'),
        }
    }

//下拉框点击事件
    _dropdown_6_onSelect(index,value) {
        let params=new FormData();
        params.carrie=this.state.carrie;//载体
        params.time=this.state.aspect;//时间
        params.nature=this.state.sequence;//特征
        params.sort = this.state.sort; //排序

        Network.post('appevent2/getList',params,(response)=>{
            let resArr= response.rows.result;
            console.log(resArr+'我是点击下拉框事件'+params.carrie,params.aspect,params.sequence);
            for (let i in resArr){
                resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
            }
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(resArr)
            })
        },(err)=>{err});
    }

    render(){

        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View style={{width:width,height:40,flexDirection:'row'}}>
                    <ModalDropdown options={this.state.downArr}
                                   defaultValue='载体'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => {
                                       this.state.carrie=value;
                                       this._dropdown_6_onSelect(idx, value)
                                   }}
                    />
                    <ModalDropdown options={['不限','今日','昨日','近七天','近30天',]}
                                   defaultValue='时间'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => {
                                       if(idx == 0){
                                           this.state.sequence = 'today';
                                       }else  if (idx == 1){
                                           this.state.sequence = 'yesterday';
                                       }else  if (idx == 2) {
                                           this.state.sequence = 'week';
                                       }else if  (idx == 3) {
                                           this.state.sequence = 'month';
                                       }
                                       this._dropdown_6_onSelect(idx, value)
                                   }}
                    />
                    <ModalDropdown
                        options={['不限', '相关','舆情','正面','负面']}
                        //options={this.state.dataArr}
                        defaultValue='特征'
                        textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                        style={styles.dropdown_1}
                        dropdownStyle={styles.dropdown_9}
                        onSelect={(idx, value) => {
                            this.state.aspect = value;
                            this._dropdown_6_onSelect(idx, value)
                        }}
                    />
                        <ModalDropdown options={['全部', '热度降序','热度升序','阅读量降序','转发量降序','评论量降序']}
                                       defaultValue='排序'
                                       textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                       style={styles.dropdown_1}
                                       dropdownStyle={styles.dropdown_9}
                                       onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}
                        />
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
                isShowLoadMore={false}
                renderFooter={()=>{
                    return(<View style={{backgroundColor:'#F2F2F2',height:px2dp(10)}}>
                        <Text style={{textAlign:'center'}}>加载更多</Text>
                    </View>)
                }}

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
                    //添加回调方法
                    getResult:function (meMessage) {
                        _this.setState({
                            resultMessage:meMessage,
                        })
                    }
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
            //alert(rowData.isnegative);
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
                            <Text style={{marginBottom:px2dp(10),marginRight:15,fontSize:11, color:'#999999',}}>{rowData.createTime}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    /**
     * 模拟刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            let params=new Object();
            params.eventId = this.eventId;
            Network.post('appevent2/getList',params,(responce)=>{
                let resArr = responce.rows.result;
                for (let i in resArr){
                    resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
                    console.log(resArr+'我是模拟刷新');
                }
                this.setState({
                    dataArr:resArr,
                    dataSource:this._dataSource.cloneWithRows(resArr)
                })
            },(err)=>{err});//加载的状态

            end();//刷新成功后需要调用end结束刷新
        },1500)

    }

    /**
     * 模拟加载更多
     * @param end
     * @private
     */
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this._page++;
            let params=new Object();
            params.carrie=this.state.carrie;//载体
            params.aspect=this.state.aspect;//相关
            params.sequence=this.state.sequence;//热度
            params.pageNo = this._page;
            params.eventId = this.eventId;

            Network.post('appevent2/getList',params,(response)=>{
                let resArr= response.rows.result;
                console.log(resArr+'我是加载更多');
                for (let i in resArr){
                    resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
                }
                this.setState({
                    dataArr:resArr,
                    dataSource:this._dataSource.cloneWithRows(resArr)
                })
            },(err)=>{err});
            end(this._page > 4);//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕

        },2000)

    }

    componentDidMount() {
        //加载下拉框内容
        Network.post('apppanorama2',{},(response)=>{
            this.setState({
                downArr :response.data.natureList,
            });
            let timer = setTimeout(()=>{
                clearTimeout(timer);
            },500);//自动调用刷新 新增方法
        },(err)=>{
            toastShort(err)
        });
        let params=new Object();
        params.eventId = this.eventId;
        params.pageSize = 100;
        Network.post('appevent2/getList',params,(response)=>{
            let resArr= response.rows.result;
            console.log(response+'事件文章');
            for (let i in resArr){
                resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
                this._dataArr = resArr;
            }
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(resArr)
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
        height:px2dp(40),
        backgroundColor:'#F1F1F1',
        borderColor:'#333333',
        alignItems:'center',
        justifyContent:'center'
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
        top: 120,
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

