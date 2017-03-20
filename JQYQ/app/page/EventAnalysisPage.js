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
import ArticleDetails from './ArticleDetails';
import px2dp from '../util/Px2dp';
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import '../util/dateFormat';
import Affair from './Affair';
import BGGlobal from '../util/BGGlobal'
import SwipeitemView from '../component/Swipes'

export default class EventAnalysisPage extends Component{
    _page=0;
    _dataArr=[];
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _params = new Object();
    constructor(props) {
        super(props);
        this._dataRow = {};

        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            id:'2',//图片
            dataArr:[],//列表数组
            value:'',
            startTime:'',
            endTime:'',
            scrollEnable: true,
            hasIdOpen: false,
        }
    }
    _rightButtons(id,rowID) {
        return [
            {
                id: 1,
                text: '删除',
                width: 80,
                bgColor: 'red',
                underlayColor: '#ffffff',
                onPress: ()=>this._delegateAT(id,rowID),
            }
        ]
    }
    _delegateAT(id,rowID){
        console.log('删除');
        let params = new Object();
        params.id = id;
        this._params.id = id;
        Network.post('',this._params,(res)=>{
            console.log('删除事件');
            let resArr= res.rows.result;
            for (let i in resArr){
                resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
            }

        },(err)=>{err});
        this._dataArr = this._dataArr.concat();
        this._dataArr.splice(rowID,1);
        this.setState({
            //dataArr:resArr,
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            //id:resArr.id
        });
        toastShort('删除成功');
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            // this.refs.scrollView.beginRefresh()
           // this.refs.listView.beginRefresh()
        },500);//自动调用刷新 新增方法
    }
    render(){

        const titleConfig = {
            title:'事件分析',
            tintColor:'#FFF'
        };
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        tintColor={'#18242e'}
                    />
                </View>

                <View style={{flex:1}}>{this._renderListView()}</View>
            </View>
        );

    }

    componentWillMount() {

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
    _renderRow(rowData, a, b,rowID) {
        let rightBtn = this._rightButtons(rowData.id,rowID);
        let id = '' + a + b;
        console.log(rowData,'00009090909090');
        //let aa = 'qwe,er,ty',
        if (rowData.word){
            wordArr = rowData.word.split(',');
        }
        return (
            <SwipeitemView
                root={this}
                ref={(row)=>this._dataRow[id] = row}
                id={id}
                data={rowData}
                rightBtn={rightBtn}>
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
                </SwipeitemView>
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
                })
            },(err)=>{err});
            end();//刷新成功后需要调用end结束刷新
        },1500)

    }
    //加载更多,传入 pageNumber
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this._page++;
            let params = new FormData();
            params.pageNumber = this._page;
            Network.post('appevent2/searchEvent',params,(response)=>{
                if(response && response.length>0){
                    let resArr=response.rows;
                    this._dataArr = this._dataArr.concat(resArr);
                    this.setState({
                        //dataArr:resArr,
                        dataSource:this._dataSource.cloneWithRows(this._dataArr)
                    })
                }

            },(err)=>{err});
            end(this._page > 2);//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕
        },2000)// 两秒后刷新结束
    }
    //首次进入页面后加载数据源并更新 state
    componentDidMount() {
        Network.post('appevent2/searchEvent',{},(response)=>{
            let resArr=response.rows;
            this._dataArr = this._dataArr.concat(resArr)
            this.setState({
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
        //marginTop:px2dp(7),
        //marginBottom:px2dp(16),
        color:'#0ca6ee',
        borderColor:'#0ca6ee',
        fontSize:11,
        //backgroundColor:'red',
        //width:50,
        //borderBottomColor:'black',
        borderWidth:1,
        borderRadius:2
    },
    tabView:{
        flexDirection:'row',
        marginBottom:px2dp(16),
    }

});