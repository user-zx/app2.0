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
import px2dp from '../util/Px2dp';
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import '../util/dateFormat';
import SwipeitemView from '../component/Swipes';
import ArticleDetailstow from './ArticleDetailstow';
import Swipeout from 'react-native-swipeout';

var swipeoutBtns = [
    {
        text: '删除',
        backgroundColor:'red',
        onPress:()=>{alert('000')}

    }
];
export default class SelfStart extends Component{
    _page=1;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _dataArr = [];
    constructor(props) {
        super(props);
        this._dataRow = {};
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            message:'',
            title:'',
            id:'',//图片
            dataArr:[],//列表数组
            value:'',
            //scrollEnable: true,
            hasIdOpen: false,
            nextTime:'',
            isMore:'',
        }
    }

    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };
    _rightButtons(id,rowID) {
        return [
                {
                text: '取消收藏',
                width: 80,
                backgroundColor:'red',
                underlayColor: '#ffffff',
                onPress: ()=>this._delegateAT(id,rowID),
            }
        ]
    }
    _delegateAT(id,rowId){
        //console.log('取消收藏');
        let params = new Object();
        params.id = id;
        this._dataArr = this._dataArr.concat();
        this._dataArr.splice(rowId,1);
        this.setState({
            dataSource:this._dataSource.cloneWithRows(this._dataArr),

        });
        Network.post('apparticle2/saveFavorites',params,(res)=>{
            console.log(id,rowId,res,'取消收藏成功');

        },(err)=>{err});
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            //this.refs.listView.beginRefresh()
        },500);//自动调用刷新 新增方法
    }
    render(){
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };
        const titleConfig = {
            title: '我的收藏',
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
                        leftButton={leftButtonConfig}
                        tintColor={'#18242e'}
                        statusBar={bar}
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
                enableEmptySections = {true}
                pusuToLoadMoreTitle="加载中..."
            />
        )

    }
    _pressRow(title,id){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'ArticleDetailstow',
                component:ArticleDetailstow,
                params:{
                    id:id,
                    title:title,
                }
            })
        }
    }
    //每行 cell 的内容渲染
    // _renderRow(rowData, a, b,rowId) {
    //     let rightBtn = this._rightButtons(rowData.id,rowId);
    //     let id = '' + a + b;
    //     return (
    //         <SwipeitemView
    //             root={this}
    //             ref={(row)=>this._dataRow[id] = row}
    //             id={id}
    //             data={rowData}
    //             rightBtn={rightBtn}>
    //                 <TouchableOpacity onPress={() => this._pressRow(rowData.title,rowData.id)}>
    //                     <View style={styles.cell}>
    //                         <Text style={styles.cellTitle}>{rowData.title}</Text>
    //                         <Text style={styles.cellText}>{rowData.publishTime}</Text>
    //                     </View>
    //                 </TouchableOpacity>
    //             </SwipeitemView>
    //     )
    // }
    _renderRow(rowData, sectionID,rowID) {

        return (
            <Swipeout
                //left={rowData.left}
                right={this._rightButtons(rowData.id,rowID)}
                rowID={rowID}
                //sectionID={sectionID}
                autoClose={true}
               // backgroundColor={'red'}
                //close={!rowData.active}
                //onOpen={(sectionID, rowID) => console.log('---open: sectionID:' + sectionID + 'rowid:' + rowID) }
                //onClose={() => this._delegateAT(rowData.id,rowID) }
               // scroll={event => console.log('scroll event') }
            >
                    <TouchableOpacity onPress={() => this._pressRow(rowData.title,rowData.id)}>
                        <View style={styles.cell}>
                            <Text style={styles.cellTitle}>{rowData.title}</Text>
                            <Text style={styles.cellText}>{rowData.publishTime}</Text>
                        </View>
                    </TouchableOpacity>
            </Swipeout>        )
    }

    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            Network.post('app2favorites/getList',{},(response)=>{
                let resArr= response.rows.result;
                if(response.rows.result =''||!response.rows.result){
                    toastShort('没有收藏的文章');
                    return;
                }
                    for (let i in resArr){
                        resArr[i].publishTime = resArr[i].publishTime.replace(".000Z", "").replace("T"," ");
                    }

                    this.setState({
                        dataArr:resArr,
                        dataSource:this._dataSource.cloneWithRows(resArr),
                        id:resArr.id
                    });
                    toastShort('刷新成功');
            },(err)=>{err});//加载的状态

            end();//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
        },1500)

    }

    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this._page++;
            let params=new Object();
            params.pageNO = this._page;
            params.pageSize = 10;
            params.nextTime = this.state.nextTime;
            Network.post('app2favorites/getList',params,(response)=>{
                let resArr= response.rows.result;
                    if(response.rows.result =''||!response.rows.result){
                        toastShort('没有收藏的文章');
                        return;
                    }
                //console.log(response.rows.result,'00000000');
                for (let i in resArr){
                        resArr[i].publishTime = resArr[i].publishTime.replace(".000Z", "").replace("T"," ");
                    }
                    this._dataArr = this._dataArr.concat(resArr);
                    //this.state.isMore = resArr.length;
                    this.setState({
                        nextTime:response.rows.nextTime,
                        dataSource:this._dataSource.cloneWithRows(this._dataArr),
                        id:resArr.id,
                        isMore:resArr.length,
                    })

            },(err)=>{err});

            end();//加载成功后需要调用end结束刷新

        },1000)

    }

    componentDidMount() {
        Network.post('app2favorites/getList',{},(response)=>{
            let resArr= response.rows.result;
            if(response.rows.result =''||!response.rows.result){
                toastShort('没有收藏的文章');
                return;
            }
            //console.log(response,'hahhahahhah');
                for (let i in resArr){
                    resArr[i].publishTime = resArr[i].publishTime.replace(".000Z", "").replace("T"," ");
                }
                this._dataArr = this._dataArr.concat(resArr);
                this.setState({
                    dataSource:this._dataSource.cloneWithRows(this._dataArr),
                    id:resArr.id,
                    nextTime:response.rows.nextTime,
                    isMore:resArr.length,
                })
        },(err)=>{err});

    }
    componentWillUnmount() {
        //end();
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
        paddingLeft:px2dp(12),

    },
    cellImageView:{
        flexDirection:'row',

    },
    cellImage:{

    },


});
