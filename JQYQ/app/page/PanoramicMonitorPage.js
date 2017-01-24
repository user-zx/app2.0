/**
 * Created by jiahailiang on 2017/1/18.
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
    SwipeableListView,
    TouchableHighlight
} from 'react-native';
//根据需要引入
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
import SwipeitemView from '../component/Swipes'



export default class PanoramicMonitorPage extends Component{
    _page=0;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    // 构造
    constructor(props) {
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this._dataRow = {};
        this.openRowId = '';
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._getRows()),
            message:'',
            title:'全景监测',
            id:'2',
            //左滑
            scrollEnable: true,
            hasIdOpen: false
        };
    }

    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };

    _getRows(){
        const dataBlob = [];
        for(let i = 0 ; i< 10 ; i ++ ){
            dataBlob.push(
                {title:'没错我就是标题' + i,
                    text:'微信      🔥 0.9  作者: 卖火柴的小女孩       2016-11-16 13:00:00' +i,

                }
            );
        }
        return dataBlob;
    }

    _dropdown_6_onSelect(idx, value) {
        toastShort(idx,value);

        // this.setState({
        //     dropdown_6_icon_heart: !this.state.dropdown_6_icon_heart,
        // })
    }


    _pressRow(title){
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'ArticleDetails',
                component:ArticleDetails,
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
        const rightButtonConfig = {
            title: '🔍',
            handler: () => this.buttonGoBack(),
            fontSize:32
        };
        const titleConfig = {
            title: '全景监测',
            tintColor: '#FFF'
        };



        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        rightButton={rightButtonConfig}
                        tintColor={'#18242e'}
                    />
                </View>
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

                    <ModalDropdown options={['全部', '热度降序','热度升序','阅读量降序','转发量降序','评论量降序']}
                                   defaultValue='排序'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}
                    />
                    <ModalDropdown options={['全部', '一天内','一周内','一个月内','三个月','六个月','一年']}
                                   defaultValue='条件筛选'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_8}
                                   onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}
                                   renderRow={this._renderDropdownView.bind(this)}
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
    // _renderRow(rowData) {
    //
    //     return(
    //         <TouchableOpacity onPress={() => this._pressRow(rowData.title)}>
    //             <View style={styles.cell}>
    //                 <Text style={styles.cellTitle}>{'这是第' + rowData.title + '行'}</Text>
    //                 <View style={styles.cellImageView}>
    //
    //                     {/*<Image style={styles.cellImage} source={icon}></Image>*/}
    //                     <Text style={styles.cellText}>{rowData.text}</Text>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     );
    //
    //
    // }
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
                        <Text style={styles.cellTitle}>{'这是第' + rowData.title + '行'}</Text>
                        <View style={styles.cellImageView}>

                            {/*<Image style={styles.cellImage} source={icon}></Image>*/}
                            <Text style={styles.cellText}>{rowData.text}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </SwipeitemView>
        );
    }

    _rightButtons() {
        return [{
            id: 1,
            text: '收藏',
            width: 80,
            bgColor: 'red',
            underlayColor: '#ffffff',
            onPress: ()=>{alert('delete1!');},
        }, {
            id: 2,
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAEBUlEQVR4Ae2dz24bZRRHPR53EG9BlFXAaovwioh3cJCQ4iSKAgosEF3QLurswEkUsN8BVGiXMazLBtGQhdtESlet5NKi/BGSQyLZiUJVmMvvohnJshzjsefz3BnfI53N5HPGOqqcNPP9SUmBiGyYhbNwFd6FW/AJbMAmZF7CP+EzuAe3vLFr3muz0IYpCUZ5cwu+DVfgT17AsGh633PFu4c1ToEn4RewTqOj7t1zMqmBM3AebkGXosOFv8IFmElCYAd+DOskj7r33pw4Bk7Dj+A+yWffe6/puATOwR2KHzswJznwFfg1fEXx5RUswyvSAk/AGiWHh3BCSuA8PKXkcQrzUQa2YAm6lGxK0Bp1YBveofHhDrRHFdiBVRo/qtAxHdiGmzS+bELbVGALfk8KN7BMBF4nxWcj7MAfQJcUH5ebhBV4CraoE6XFbYYN/BrcI+Uy9rjRMIHLUOlNZdDA78C/odIbbpQLGjgNH5LSL49gOkjgZVKCstxv4NfhISlBOeR2/QT+nJRBufl/gR14RMqgcDunV+BFUoZlsVfgGgnhn6Pf6a+vbtH53DSd5a93lb/GY3isIGqXBb4qJu7Bczqff48j9iWP5dcI4mq3wBUSAv+r5HAXX35K7kmDLoO/xmN4LL9GEJXOwBZ8TkLwPhba4/aMzGPPZ98lQbyAVnvgayQIBGODj5fF9fbARRoxFysfemHMy/eKgGJ74PuJDlxcogi47we2YTMuHwcx+thoQpsDvwlJAxshy4HnNLAx5jjwqgY2xjoHvicxMP8QhAGuiQx8jwM/kBjYux7gmsjADzjwUw1sjKccuKGBjdHgwC0NbIxmikyigSkFX5JRNPCxBjZGK2X+78D6Q+4xGUV/TftZAxvjFw78jQY2xrcc+LYGNsZtDpzXwMaY4cBTGtgYU/4joxMNHDon/iMj9geRfw8uLgW4Ji7wj+1PlW/oE43QudEe+C0NHDrZzqlTL0RPkwqAe3rsT6cSM3WKrUQ60W/1Mw4zfNzjP/h7RT0hsGJo+qr5qaoxmdJ6TdQEbA7x32TrwvTwYQvepOzo4tZ0CYFZFnURTISLYNibNCjKLcMLEXUhooCltLqUlk3DR9Qvyk7QxeBszth2BrqdgW7IEYDyMDueOD3/86HUoDNMYPaNrpt/KtxkIqxtvWagSz6KC98Pe2O6DVKMbUzHWvAuKdzAMrk5aJXGlyq0dXvbGG9v65sZsw2av4MZ3WI8vluM6yb5BgLrMQ8SDyop60ElozlqZ5fixy7M6WFR4XNg+rAokzrwE/iM5PGb996cpBzYtwC3Bfxaty3gwD6jTsJSBEdOlhJ65KQemipF/9jfAlzrcuzvGfQ586496Tj2tyDt2N9/Ac1/sDfK46TXAAAAAElFTkSuQmCC',
            width: 80,
            bgColor: null,
            onPress: ()=>{alert('delete2!')}
        }, {
            id: 3,
            text: '分享',
            width: 80,
            bgColor: 'yellow',
            onPress: ()=>{alert('delete3!');},
        }]
    }



    /**
     * 模拟刷新
     * @param end
     * @private
     */
    _onRefresh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            alert('刷新成功');

            end();//刷新成功后需要调用end结束刷新

        },1000)

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
                        text:'微信 2016-11-16 13:00:00     🔥' +i
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
    _renderDropdownView(){
        return(
            <View>
                <Text>asasasasa</Text>
            </View>
        )
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
        paddingLeft:px2dp(15),
        paddingBottom:px2dp(15),
        bottom:0
    },
    cellImageView:{

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
    },
    dropdown_9: {
        flex: 1,
        //left: px2dp(10),
        height:px2dp(160),
        width:px2dp(80),
        backgroundColor:'#666666'
    },
    dropdown_8: {
        flex: 1,
        //left: px2dp(10),
        height:px2dp(160),
        width:width,
        backgroundColor:'#666666'
    },


});