/**
 * Created by jiahailiang on 2016/11/22.
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
//根据需要引入
import {
    SwRefreshListView, //支持下拉刷新和上拉加载的ListView
} from 'react-native-swRefresh'
const {width,height}=Dimensions.get('window');
import ModalDropdown from 'react-native-modal-dropdown';
import {toastShort} from '../component/Toast'
//import NavigationBar from 'react-native-navbar';
import ArticleDetails from './ArticleDetails';
import px2dp from '../util/Px2dp';
import BGGlobal from '../util/BGGlobal';
import NetWork from '../util/Network';

export default class PublicOpinionArticles extends Component{
    _page=0;
    eventId = BGGlobal.propsID;//事件 ID
    _dataArr=[];
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            message:'',
            title:'',
            id:'',// 留着备用
            textId:'',//详情 id
            //eventId:'',//事件 ID
            dataArr:[],
        };
    }
    _dropdown_6_onSelect(idx, value) {
        toastShort(idx,value);

    }

    _pressRow(title){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'ArticleDetails',
                component:ArticleDetails,
                params:{
                    textId:'你奈人生何想得却不可得 情爱里无智者',
                    title:title
                }
            })
        }
    }
    render(){

        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View style={{width:width,height:40,flexDirection:'row'}}>
                    <ModalDropdown options={['全部', '综合','新闻','博客','论坛','微博','微信','QQ群','电子报','视频','手机WEB','其他']}
                                   defaultValue='载体'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}
                    />
                    <ModalDropdown options={['全部', '大眼睛','小眼睛','高鼻梁','没鼻子','大嘴唇','三角眼','大屁股','小短腿','肤色黑']}
                                   defaultValue='特征'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}
                    />
                    <ModalDropdown options={['全部', '一天内','一周内','一个月内','三个月','六个月','一年']}
                                   defaultValue='时间'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}
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

    /**
     * ListViewDemo
     * @returns {XML}
     * @private
     */
    _renderListView(){
        return(
            <SwRefreshListView
                dataSource={this.state.dataSource}
                ref="listView"
                renderRow={this._renderRow.bind(this)}
                onRefresh={this._onListRefersh.bind(this)}
                onLoadMore={this._onLoadMore.bind(this)}
                //isShowLoadMore={false}
                renderFooter={()=>{
                    return(<View style={{backgroundColor:'#F2F2F2',height:px2dp(10)}}>
                        <Text style={{textAlign:'center'}}>精彩继续</Text>
                    </View>)
                }}

            />
        )

    }
    //每行 cell 的内容渲染
    _renderRow(rowData) {
        return (
            <TouchableOpacity onPress={() => this._pressRow(rowData.title)}>
                <View style={styles.cell}>
                    <Text style={styles.cellTitle}>{'这是第'+rowData.title+'行'}</Text>
                    <Text style={styles.cellText}>{rowData.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    /**
     * 下拉刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        console.log('开始执行 下拉刷新 方法');

        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this._page=0;
            let data = [];
            let params = new Object();
            params.eventId = this.eventId;
            NetWork.post('appevent2/getList',params,(responce)=>{
                data.push(responce.rows);
                console.log(responce+'________OOO___OOO___OOO___OOO');
                //data = responce.rows.result
            },(err)=>{
                console.log('刷新请求报错'+err);
            });
            this.setState({
                dataSource:this._dataSource.cloneWithRows(data)
            });
            this.refs.listView.resetStatus(); //重置上拉加载的状态

            end();//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
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
            let data = [];
            NetWork.post('appevent2/getList',{},(responce)=>{
                data = responce.rows
            },(err)=>{err});
            this.setState({
                dataSource:this._dataSource.cloneWithRows(data)
            });
            end(this._page > 2);//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕

        },2000)
    }

    componentDidMount() {
        /*alert(BGGlobal.propsID+'纯纯纯粹');

         let timer = setTimeout(()=>{
         clearTimeout(timer);
         this.refs.listView.beginRefresh()
         },500);//自动调用刷新 新增方法
         this.setState({
         id:this.props.id,
         });*/
        //this._onListRefersh.bind(this);
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
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1
    },
    cellTitle:{

    },
    cellText:{

    },
    dropdown_1: {
        top: 0,
        width:width/4,
        height:px2dp(40),
        backgroundColor:'#F2F2F2',
        borderColor:'black',
        alignItems:'center',
    },
    dropdown_9: {
        flex: 1,
        //left: px2dp(10),
        height:px2dp(160),
        width:px2dp(80),
        backgroundColor:'#666666'
    },


});