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
    SwRefreshListView,
} from 'react-native-swRefresh'
const {width,height}=Dimensions.get('window');
import NavigationBar from 'react-native-navbar';
import px2dp from '../util/Px2dp';
import {NavGoBack} from '../component/NavGoBack';
import AnnouncementAT from './SearchView';
import Network from '../util/Network'
export default class Announcement extends Component{
    _page=0;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _dataArr=[];
    // 构造
    constructor(props) {
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);

        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
            message:'',
            title:'',
            timeString:'',

        };
    }

    _pressRow(title){
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'AnnouncementAT',
                component:AnnouncementAT,
                params:{
                    message:'情爱里无智者',
                    title:title,
                }
            })
        }
    }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };
    render(){
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };
        const titleConfig = {
            title:'系统公告',
            tintColor:'#FFF'
        };
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        tintColor={'#18242e'}
                        leftButton={leftButtonConfig}
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
            />
        )

    }
    //每行 cell 的内容渲染iew
    _renderRow(rowData) {
        return (

                <View style={{flexDirection:'row'}}>
                    <View style={styles.cell}>
                        <Text style={styles.cellTitle}>{rowData.title}</Text>
                        <Text style={styles.cellText}>{rowData.timeString}</Text>
                    </View>
                </View>

        )

    }

    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            let params  = {pageSize:100};
            Network.post('appmessage2/guides',params,(response)=>{
                this.setState({
                    dataArr:response.data,
                    dataSource:this._dataSource.cloneWithRows(response.data)
                })
            },(err)=>{err});//加载的状态

            end();//刷新成功后需要调用end结束刷新
        },1500)
    }


    componentDidMount() {
            let params  = {pageSize:100};
            Network.post('appmessage2/guides',params,(response)=>{
                this.setState({
                    dataArr:response.data,
                    dataSource:this._dataSource.cloneWithRows(response.data)
                })
            },(err)=>{err});//加载的状态
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
        backgroundColor:'#FFF',
        borderBottomColor:'#ececec',
        borderBottomWidth:1,
        height:px2dp(91),
        flexDirection:'column',
        width:width

    },
    cellTitle:{
        marginTop:px2dp(16),
        marginLeft:px2dp(15),
        marginBottom:px2dp(7),
        fontSize:15,
        marginRight:px2dp(20)
    },
    cellText:{
        fontSize:11,
        color:'#999999',
        //marginLeft:px2dp(220),
        marginBottom:10,
        //marginTop:px2dp(30),
        textAlign:'right',
        marginRight:px2dp(20)
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