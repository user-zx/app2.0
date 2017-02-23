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
import NavigationBar from 'react-native-navbar';
import Affair from './Affair'
import px2dp from '../util/Px2dp';
import SwipeitemView from '../component/Swipes'

export default class EventAnalysisPage extends Component{
    _page=0;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    // 构造
    constructor(props) {
        super(props);
        this._dataRow = {};

        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._getRows()),
            message:'',
            title:'',
            scrollEnable: true,
            hasIdOpen: false,
        };
    }


    _getRows(){
        const dataBlob = [];
        for(let i = 0 ; i< 10 ; i ++ ){
            dataBlob.push(
                {title:'朴槿惠事件' + i,
                    text:'2016-11-16 13:00 ~ 2017-1-20 21:12' +i
                }
            );
        }
        return dataBlob;
    }
    _pressRow(title){
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'Affair',
                component:Affair,
                params:{
                    message:'作词：李宗盛作曲：李宗盛想得却不可得' +
                    ' 你奈人生何该舍的舍不得 ' +
                    '只顾著跟往事瞎扯等你发现时间是贼了' +
                    ' 它早已偷光你的选择爱恋不过是一场高烧' +
                    ' 思念是紧跟着的好不了的咳是不能原谅 ' +
                    '却无法阻挡恨意在夜里翻墙是空空荡荡 ' +
                    '却嗡嗡作响谁在你心里放冷枪' +
                    '旧爱的誓言像极了一个巴掌' +
                    '每当你记起一句就挨一个耳光' +
                    '然后好几年都闻不得 闻不得女人香' +
                    '往事并不如烟 是的 在爱里念旧也不算美德可惜恋爱不像写歌' +
                    ' 再认真也成不了风格' +
                    '我问你见过思念放过谁呢不管你是累犯还是从无前科' +
                    '我认识的只有那合久的分了 没见过分久的合更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网岁月你别催 ' +
                    '该来的我不推该还的还 ' +
                    '该给的我给岁月你别催 ' +
                    '走远的我不追我不过是想弄清原委谁能告诉我' +
                    ' 这是什么呢她的爱在心里 埋葬了 抹平了 几年了仍有余威是不能原谅 ' +
                    '却无法阻挡爱意在夜里翻墙是空空荡荡 ' +
                    '却嗡嗡作响谁在你心里放冷枪旧爱的誓言像极了一个巴掌每当你记起一句就挨一个耳光' +
                    '然后好几年都闻不得 闻不得女人香然后好几年都闻不得 ' +
                    '闻不得女人香想得却不可得 ' +
                    '你奈人生何想得却不可得 情爱里无智者',
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



    _rightButtons() {
        return [
        //     {
        //     id: 1,
        //     text: '收藏',
        //     width: 80,
        //     bgColor: 'red',
        //     underlayColor: '#ffffff',
        //     onPress: ()=>{alert('delete1!');},
        // },
            {
            id: 2,
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAEBUlEQVR4Ae2dz24bZRRHPR53EG9BlFXAaovwioh3cJCQ4iSKAgosEF3QLurswEkUsN8BVGiXMazLBtGQhdtESlet5NKi/BGSQyLZiUJVmMvvohnJshzjsefz3BnfI53N5HPGOqqcNPP9SUmBiGyYhbNwFd6FW/AJbMAmZF7CP+EzuAe3vLFr3muz0IYpCUZ5cwu+DVfgT17AsGh633PFu4c1ToEn4RewTqOj7t1zMqmBM3AebkGXosOFv8IFmElCYAd+DOskj7r33pw4Bk7Dj+A+yWffe6/puATOwR2KHzswJznwFfg1fEXx5RUswyvSAk/AGiWHh3BCSuA8PKXkcQrzUQa2YAm6lGxK0Bp1YBveofHhDrRHFdiBVRo/qtAxHdiGmzS+bELbVGALfk8KN7BMBF4nxWcj7MAfQJcUH5ebhBV4CraoE6XFbYYN/BrcI+Uy9rjRMIHLUOlNZdDA78C/odIbbpQLGjgNH5LSL49gOkjgZVKCstxv4NfhISlBOeR2/QT+nJRBufl/gR14RMqgcDunV+BFUoZlsVfgGgnhn6Pf6a+vbtH53DSd5a93lb/GY3isIGqXBb4qJu7Bczqff48j9iWP5dcI4mq3wBUSAv+r5HAXX35K7kmDLoO/xmN4LL9GEJXOwBZ8TkLwPhba4/aMzGPPZ98lQbyAVnvgayQIBGODj5fF9fbARRoxFysfemHMy/eKgGJ74PuJDlxcogi47we2YTMuHwcx+thoQpsDvwlJAxshy4HnNLAx5jjwqgY2xjoHvicxMP8QhAGuiQx8jwM/kBjYux7gmsjADzjwUw1sjKccuKGBjdHgwC0NbIxmikyigSkFX5JRNPCxBjZGK2X+78D6Q+4xGUV/TftZAxvjFw78jQY2xrcc+LYGNsZtDpzXwMaY4cBTGtgYU/4joxMNHDon/iMj9geRfw8uLgW4Ji7wj+1PlW/oE43QudEe+C0NHDrZzqlTL0RPkwqAe3rsT6cSM3WKrUQ60W/1Mw4zfNzjP/h7RT0hsGJo+qr5qaoxmdJ6TdQEbA7x32TrwvTwYQvepOzo4tZ0CYFZFnURTISLYNibNCjKLcMLEXUhooCltLqUlk3DR9Qvyk7QxeBszth2BrqdgW7IEYDyMDueOD3/86HUoDNMYPaNrpt/KtxkIqxtvWagSz6KC98Pe2O6DVKMbUzHWvAuKdzAMrk5aJXGlyq0dXvbGG9v65sZsw2av4MZ3WI8vluM6yb5BgLrMQ8SDyop60ElozlqZ5fixy7M6WFR4XNg+rAokzrwE/iM5PGb996cpBzYtwC3Bfxaty3gwD6jTsJSBEdOlhJ65KQemipF/9jfAlzrcuzvGfQ586496Tj2tyDt2N9/Ac1/sDfK46TXAAAAAElFTkSuQmCC',
            width: 80,
            bgColor: null,
            onPress: ()=>{alert('delete2!')}
        },
        //     {
        //     id: 3,
        //     text: '分享',
        //     width: 80,
        //     bgColor: 'yellow',
        //     onPress: ()=>{alert('delete3!');},
        // }
        ]
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
    _renderRow(rowData, a, b) {
        let rightBtn = this._rightButtons();
        let id = '' + a + b;
        return (
            <SwipeitemView
                root={this}
                ref={(row)=>this._dataRow[id] = row}
                id={id}
                data={rowData}
                rightBtn={rightBtn}>
            <TouchableOpacity onPress={() => this._pressRow(rowData.title)}>
                <View style={styles.cell}>
                    <Text style={styles.cellTitle}>{rowData.title}</Text>
                    <Text style={styles.cellText}>{rowData.text}</Text>
                    <View style={styles.tabView}>
                        <Text style={styles.tabText}>江西电厂</Text>
                        <Text style={styles.tabText}>坍塌</Text>
                        <Text style={styles.tabText}>坍塌事故</Text>
                    </View>
                </View>
            </TouchableOpacity>
                </SwipeitemView>
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
            this._page=0;
            let data = [];
            for (let i = 0;i<10;i++){
                data.push(
                    {title:'没错我就是标题' + i,
                        text:'2016-11-16 13:00 ~ 2017/1/20 21:20' +i
                    }
                )
            }
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
            for (let i = 0;i<(this._page+1)*10;i++){
                data.push(
                    {title:'没错我就是标题' + i,
                        text:'微信 2016-11-16 13:00:00     🔥' +i
                    }
                )
            }
            this.setState({
                dataSource:this._dataSource.cloneWithRows(data)
            });
            end(this._page > 2);//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕

        },2000)
    }

    componentDidMount() {
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            // this.refs.scrollView.beginRefresh()
            //this.refs.listView.beginRefresh()
        },500);//自动调用刷新 新增方法
        this.setState({
            message:this.props.message,
            title:this.props.title,
            //dataSource: this.state.dataSource,
        });
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
        marginRight:px2dp(15),
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