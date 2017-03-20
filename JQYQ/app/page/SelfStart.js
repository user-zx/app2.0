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
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import '../util/dateFormat';
import SwipeitemView from '../component/Swipes'

export default class SelfStart extends Component{
    _page=0;
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
            scrollEnable: true,
            hasIdOpen: false,

        }
    }

    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };
    _rightButtons(id) {
        return [
                {
                id: 1,
                text: '取消收藏',
                width: 80,
                bgColor: 'red',
                underlayColor: '#ffffff',
                onPress: ()=>this._delegateAT(id),
            }
        ]
    }
    _delegateAT(id,rowId){
        console.log('取消收藏');
        let params = new Object();
        params.id = id;
        this._dataArr = this._dataArr.concat()
        this._dataArr.splice(rowId,1)
        this.setState({
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
        })
        Network.post('apparticle2/saveFavorites',params,(res)=>{
            console.log('取消收藏成功');
            let resArr= res.rows.result;
            for (let i in resArr){
                resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
            }
            this.setState({
                // dataArr:resArr,
                // dataSource:this._dataSource.cloneWithRows(resArr),
                id:resArr.id
            });
        },(err)=>{err})
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
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        leftButton={leftButtonConfig}
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

            />
        )

    }
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
    _renderRow(rowData, a, b,rowId) {
        let rightBtn = this._rightButtons(rowData.id,rowId);
        let id = '' + a + b;
        return (
            <SwipeitemView
                root={this}
                ref={(row)=>this._dataRow[id] = row}
                id={id}
                data={rowData}
                rightBtn={rightBtn}>
                    <TouchableOpacity onPress={() => this._pressRow(rowData.title,rowData.id)}>
                        <View style={styles.cell}>
                            <Text style={styles.cellTitle}>{rowData.title}</Text>
                            <Text style={styles.cellText}>{rowData.createTime}</Text>
                        </View>
                    </TouchableOpacity>
                </SwipeitemView>
        )
    }

    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            Network.post('app2favorites/getList',{},(response)=>{
                let resArr= response.rows.result;
                for (let i in resArr){
                    resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
                }
                this.setState({
                    dataArr:resArr,
                    dataSource:this._dataSource.cloneWithRows(resArr),
                    id:resArr.id
                })
            },(err)=>{err});//加载的状态

            end();//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
        },1500)

    }

    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this._page++;
            let params=new FormData();
            params.pageNO = this._page;
            params.pageSize = 10;
            Network.post('app2favorites/getList',params,(response)=>{
                let resArr= response.rows.result;
                for (let i in resArr){
                    resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
                }
                this._dataArr = this._dataArr.concat(resArr);
                this.setState({
                    //dataArr:resArr,
                    dataSource:this._dataSource.cloneWithRows(this._dataArr),
                    id:resArr.id
                })
            },(err)=>{err});
            end(this._page > 2);//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕

        },1000)

    }

    componentDidMount() {
        Network.post('app2favorites/getList',{},(response)=>{
            let resArr= response.rows.result;
            for (let i in resArr){
                resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");
            }
            this._dataArr = this._dataArr.concat(resArr);
            this.setState({
                dataArr:resArr,
                dataSource:this._dataSource.cloneWithRows(this._dataArr),
                id:resArr.id
            })
        },(err)=>{err});
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            this.refs.listView.beginRefresh()
        },500);//自动调用刷新 新增方法
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
