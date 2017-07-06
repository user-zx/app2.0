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

export default class PublicOpinionArticles extends Component{
    _page=1;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _dataArr=[];
    eventId = BGGlobal.propsID;//事件 ID
    params = new Object();
    constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            message:'',
            title:'',
            downArr:[],//下拉框数组
            carrie:'',//载体
            dataArr:[],//列表数组
            value:'',
            nature:'',
            time:'',
            articleList:[],
            textId:'',//详情 id
            sort:'',
            nextTime:'',
            isCarrie:false,
            isNature:false,
            isSort:false,
            isTime:false,
        };
        this.icons = {
            yuqing:require('../image/lable/yuqing@3x.png'),
            zhengmian:require('../image/lable/zhengmian@3x.png'),
            fumian:require('../image/lable/fumian@3x.png'),
            xiangguan:require('../image/lable/xiangguan@3x.png'),
            down:require('../image/down.png'),
            up:require('../image/up.png'),
        }
    }

//下拉框点击事件
    _dropdown_6_onSelect(index,value) {
        this.params.eventId = BGGlobal.propsID;
        this.params.carrie=this.state.carrie;//载体
        this.params.time=this.state.time;//时间
        this.params.nature=this.state.nature;//特征
        this.params.sort = this.state.sort; //排序
        //this.params.pageSize = 10;
        console.log(this.params,'筛选点击的测试');
        Network.post('appevent2/getList',this.params,(response)=>{
            console.log(response,'筛选点击的测试');
            let resArr= response.rows.result;
            if(!response.rows.result || response.rows.result ==''){
                return;
            }
            for (let i in resArr){
                resArr[i].publishTime = resArr[i].publishTime.replace(".000Z", "").replace("T"," ");
            }
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(resArr)
            })
        },(err)=>{toastShort('网络错误',err)});
    }

    render(){
        let icon;
        icon = this.state.isCarrie ? this.icons.up : this.icons.down;
        return (
            <View style={{flex:1,flexDirection:'column'}}>
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
                        <Image source={icon} style={styles.typeimage} />
                    </View>
                    <View style={styles.dropdown_1}>

                        <ModalDropdown options={['不限','今日','昨日','近七天','近30天',]}
                                       defaultValue='时间'
                                       textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                      // style={styles.dropdown_1}
                                       dropdownStyle={styles.dropdown_9}
                                       onSelect={(idx, value) => {
                                           if(idx == 0){
                                               this.state.time = '';
                                           }else if(idx == 1){
                                               this.state.time = 'today';
                                           }else  if (idx == 2){
                                               this.state.time = 'yesterday';
                                           }else  if (idx == 3) {
                                               this.state.time = 'week';
                                           }else if  (idx == 4) {
                                               this.state.time = 'month';
                                           }
                                           this._dropdown_6_onSelect(idx, value)
                                       }}
                        />
                        <Image source={icon} style={styles.typeimage} />
                    </View>
                    {/*<View style={styles.dropdown_1}>*/}
                    {/*<ModalDropdown*/}
                        {/*options={['舆情','相关','正面','负面']}*/}
                        {/*//options={this.state.dataArr}*/}
                        {/*defaultValue='特征'*/}
                        {/*textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}*/}
                        {/*//style={styles.dropdown_1}*/}
                        {/*dropdownStyle={styles.dropdown_9}*/}
                        {/*onSelect={(idx, value) => {*/}
                            {/*//this.state.aspect = value;*/}
                            {/*if(idx == 0){*/}
                                {/*this.state.nature = '舆情';*/}
                            {/*}else  if (idx == 1){*/}
                                {/*this.state.nature = '相关';*/}
                            {/*}else  if (idx == 2) {*/}
                                {/*this.state.nature = '正面';*/}
                            {/*}else if  (idx == 3) {*/}
                                {/*this.state.nature = '负面';*/}
                            {/*}*/}
                            {/*this._dropdown_6_onSelect(idx, value)*/}
                        {/*}}*/}
                    {/*/>*/}
                        {/*<Image source={icon} style={styles.typeimage} />*/}
                {/*</View>*/}
                    <View style={styles.dropdown_1}>
                        <ModalDropdown options={['热度降序','时间降序']}
                                       defaultValue='排序'
                                       textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                       //style={styles.dropdown_1}
                                       dropdownStyle={styles.dropdown_10}
                                       onSelect={(idx, value) => {
                                           if (idx == 0){
                                               this.state.sort = 'publishTime';
                                           } else  if  (idx ==1){
                                               this.state.sort = 'hot';
                                           }
                                           //调用点击事件
                                           this._dropdown_6_onSelect(idx, value)}}
                        />
                        <Image source={icon} style={styles.typeimage} />
                    </View>
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
                //isShowLoadMore={false}
                pusuToLoadMoreTitle="加载中~~~"

            />
        )

    }
    _pressRow(title,id){
        var _this = this;
        const {navigator} = _this.props;
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
        if(rowData.ispositive ==1){
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
                        <Text style={styles.cellTitle} numberOfLines={2}>{rowData.title}</Text>
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
     * 模拟刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        this.timer =  setTimeout(()=>{
            //clearTimeout(timer);
            this.params.eventId = BGGlobal.propsID;
            this.params.pageNo = 1;//第几页
            Network.post('appevent2/getList',this.params,(responce)=>{
                console.log(this.params,'事件文章刷新');
                let resArr = responce.rows.result;
                if(!response.rows.result){
                    toastShort('没有相关数据');
                    return;
                }
                //toastShort('刷新成功');

                // console.log(resArr);
                for (let i in resArr){
                    resArr[i].publishTime = resArr[i].publishTime.replace(".000Z", "").replace("T"," ");
                }
                this.setState({
                    dataArr:resArr,
                    dataSource:this._dataSource.cloneWithRows(resArr)
                })
            },(err)=>{toastShort('刷新失败',err)});//加载的状态
            let isNoMore = this.state.dataArr.length < 10; //是否已无更多数据
            end(isNoMore);//加载成功后需要调用end结束刷新
        },1500)

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
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
            this.params.eventId = BGGlobal.propsID;
            this.params.pageNo = this._page;//第几页
            this.params.nextTime = this.state.nextTime;
            //toastShort(this.);
            Network.post('appevent2/getList',this.params,(response)=>{
                let resArr= response.rows.result;
                if(!response.rows.result){
                    toastShort('没有更多数据');
                    return;
                }
                for (let i in resArr){
                    resArr[i].publishTime = resArr[i].publishTime.replace(".000Z", "").replace("T"," ");
                }
                this._dataArr = this._dataArr.concat(resArr);
                this.setState({
                    dataArr:resArr,
                    nextTime:response.rows.nextTime ,
                    dataSource:this._dataSource.cloneWithRows(this._dataArr)
                })
            },(err)=>{err});
            let isNoMore = this.state.dataArr.length < 10; //是否已无更多数据
            end(isNoMore);//加载成功后需要调用end结束刷新
        },2000)

    }

    componentDidMount() {
        this.params.eventId = BGGlobal.propsID;
        Network.post('appevent2/getList',this.params,(response)=>{
            let resArr= response.rows.result;
            if(!response.rows.result){
                toastShort('没有相关数据');
                return;
            }
            for (let i in resArr){
                resArr[i].publishTime = resArr[i].publishTime.replace(".000Z", "").replace("T"," ");
            }
            //在原有的数组上加上新的数组
            this._dataArr = this._dataArr.concat(resArr);
            this.setState({
                dataArr:resArr,
                nextTime:response.rows.nextTime ,
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
        borderBottomColor:'#ececec',
        borderBottomWidth:1
    },
    cellTitle:{
        paddingTop:px2dp(17),
        paddingLeft:px2dp(15),
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
    typeimage:{
        width:10,
        height:10,
    },
    dropdown_1: {
        top: 0,
        width:width/3,
        height:39,
        backgroundColor:'#FFF',
        borderColor:'#333333',
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
    dropdown_10: {
        flex: 1,
        //left: px2dp(10),
        height:px2dp(70),
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

