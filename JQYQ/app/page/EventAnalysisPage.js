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
import NavigationBar from 'react-native-navbar';
import px2dp from '../util/Px2dp';
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import '../util/dateFormat';
import Affair from './Affair';
import BGGlobal from '../util/BGGlobal';
import Header from '../component/Header'



export default class EventAnalysisPage extends Component{
    _page=1;
    _dataArr=[];
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _params = new Object();
    constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            id:'2',//图片
            dataArr:[],//列表数组
            value:'',
            startTime:'',
            endTime:'',
        }
    }

    render(){
        const titleConfig = {
            title:'事件分析',
            tintColor:'#FFF'
        };
        const bar = {
            style:'light-content',
        };
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <Header {...this.props}
                            title='事件分析'
                            headercolor={'#18242e'}
                            lefticon={null}
                            leftAction={()=>{}}
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
                enableEmptySections = {true}
                pusuToLoadMoreTitle="加载中..."
                //isShowLoadMore={false}

            />
        )
    }
    _pressRow(title,id){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'Affair',
                component:Affair,
                params:{
                    id:id,
                    title:title,
                }
            })
        }
        //将文章 id 存入本地
        BGGlobal.propsID = id;
    }
    //每行 cell 的内容渲染
    _renderRow(rowData) {

        if (rowData.word){
            wordArr = rowData.word.split(',');
        }
        return (
                <TouchableOpacity onPress={() => this._pressRow(rowData.title,rowData.eventId)}>
                    <View style={styles.cell}>
                        <Text style={styles.cellTitle}>{rowData.title}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.cellText}>{rowData.startTime}</Text>
                            <Text style={styles.cellText}>~</Text>
                            <Text style={styles.cellText}>{rowData.endTime}</Text>
                        </View>
                        <View style={styles.tabView}>
                            {
                                wordArr.map((item,i)=>{
                                    return (
                                        <Text style={styles.tabText} key={i}>{item}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }

    //刷新数据源,不需要传入参数
    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            Network.post('appevent2/searchEvent',{},(response)=>{
                let resArr=response.rows;
                this.setState({
                    dataArr:resArr,
                    dataSource:this._dataSource.cloneWithRows(resArr)
                });
                end();//刷新成功后需要调用end结束刷新
            },(err)=>{err});

        },1500)
    }
    //加载更多,传入 pageNumber
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this._page++;
            this._params.pageNumber = this._page;
            Network.post('appevent2/searchEvent',this._params,(response)=>{
                if (!response.rows){
                    toastShort('没有更多数据了');
                    return;
                }
                    let resArr=response.rows;
                    this._dataArr = this._dataArr.concat(resArr);
                    this.setState({
                        dataArr:resArr,
                        dataSource:this._dataSource.cloneWithRows(this._dataArr)
                    });
            },(err)=>{err});
            let isNoMore = this.state.dataArr.length < 10; //是否已无更多数据
            end(isNoMore);//加载成功后需要调用end结束刷新
        },2000); // 两秒后刷新结束
    }
    //首次进入页面后加载数据源并更新 state
    componentDidMount() {
        Network.post('appevent2/searchEvent',{},(response)=>{
            let resArr=response.rows;
            if (!resArr){
                toastShort('没有事件');
                return;
            }
            this._dataArr = this._dataArr.concat(resArr);
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(this._dataArr)
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
        backgroundColor:'#FFF',
        borderBottomColor:'#ececec',
        borderBottomWidth:1,

    },
    cellTitle:{
        marginTop:px2dp(16),
        marginLeft:px2dp(15),
        marginRight:px2dp(15),
        marginBottom:px2dp(7),

    },
    cellText:{
        marginTop:px2dp(0),
        marginLeft:px2dp(15),
        marginBottom:px2dp(7),
        fontSize:11,
        color:'#999999'
    },
    tabText:{
        padding:px2dp(4),
        marginLeft:15,
        color:'#0ca6ee',
        borderColor:'#0ca6ee',
        fontSize:11,
        borderWidth:1,
        borderRadius:2
    },
    tabView:{
        flexDirection:'row',
        marginBottom:px2dp(16),
    }

});