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
    Animated,
    TouchableHighlight,
    TextInput,
} from 'react-native';
//根据需要引入
import {
   // SwRefreshScrollView, //支持下拉刷新的ScrollView
    SwRefreshListView, //支持下拉刷新和上拉加载的ListView
    //RefreshStatus, //刷新状态 用于自定义下拉刷新视图时使用
    //LoadMoreStatus //上拉加载状态 用于自定义上拉加载视图时使用
} from 'react-native-swRefresh'
var ScreenWidth= Dimensions.get('window').width;
var BASE_URL = 'https://api.github.com/search/repositories?q=';

import {NavGHoBack} from '../component/NavGoBack';
import NavigationBar from 'react-native-navbar';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-root-modal';
import ArticleDetails from './ArticleDetails';
import px2dp from '../util/px2db';

const {width,height}=Dimensions.get('window');
const DEMO_OPTIONS_1 = ['全部', '综合','新闻','博客','论坛','微博','微信','QQ群','电子报','视频','手机 WEB','其他'];
export default class MonitorView extends Component{
    _page=0;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    // 构造
    constructor(props) {
        super(...arguments);
        super(props);
        // 初始状态
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._getRows()),
            visible: false,
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
            show: false,
        };
    }
    /**
     * 显示搜索结果
     * @param result
     */
    showResult(result) {
        var result = result;
        this.setState({
            show: true,
            value: result
        });
    }
    /**
     * 隐藏搜索结果
     * @param result
     */
    hideResult(result) {
        this.setState({
            show: false,
            value: result
        });

    }

    _getRows(){
        const dataBlob = [];
        for(let i = 0 ; i< 10 ; i ++ ){
            dataBlob.push(
                {title:'没错我就是标题' + i,
                    text:'微信 2016-11-16 13:00:00     🔥' +i
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
    // onSearchChange(event) {
    //     var searchTerm = event.nativeEvent.text.toLowerCase();
    //     var queryURL = BASE_URL + encodeURIComponent(searchTerm);
    //     fetch(queryURL)
    //         .then((response) => response.json())
    //         .then((responseData) => {
    //             if (responseData.items) {
    //                 this.setState({
    //                     dataSource: this.state.dataSource.cloneWithRows(responseData.items),
    //                 });
    //             };
    //         })
    //         .done();
    // }
    slideModal = () => {
        this.state.x.setValue(-320);
        this.state.scale.setValue(1);
        Animated.spring(this.state.x, {
            toValue: 0
        }).start();
        this.setState({
            visible: true
        });
        this.slide = true;
    };

    scaleModal = () => {
        this.state.x.setValue(0);
        this.state.scale.setValue(0);
        Animated.spring(this.state.scale, {
            toValue: 1
        }).start();
        this.setState({
            visible: true
        });
        this.slide = false;
    };

    hideModal = () => {
        if (this.slide) {
            Animated.timing(this.state.x, {
                toValue: -320
            }).start(() => {
                this.setState({
                    visible: false
                });
            });
        } else {
            Animated.timing(this.state.scale, {
                toValue: 0
            }).start(() => {
                this.setState({
                    visible: false
                });
            });
        }

    };
    render(){
        const titleConfig = {
            title:'全景舆情'
        };
        // return this._renderScrollView() //ScrollView Demo ScrollView不支持上拉加载
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                   <NavigationBar
                   title={titleConfig}
                   tintColor={'rgb(61,171,236)'}
                   />
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',height:50,backgroundColor:"#f2f2f2",alignItems:"center"}}>

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor="#aaa"
                        onPress={this.slideModal}
                    >
                        <Text>关键词搜索</Text>
                    </TouchableHighlight>
                    {/*<ModalDropdown options={['排重', '不排重']}*/}
                                   {/*defaultValue='排重'*/}
                                   {/*textStyle={{fontSize:20,height:20}}*/}
                                   {/*style={styles.button}*/}
                    {/*/>*/}
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor="#aaa"
                       // onPress={this.}
                    >
                        <Text>排重</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor="#aaa"
                        onPress={this.scaleModal}
                    >
                        <Text>条件筛选</Text>
                    </TouchableHighlight>
                    <Animated.Modal
                        visible={this.state.visible}
                        style={[styles.modal, {
                            transform: [
                                {
                                    scale: this.state.scale
                                },
                                {
                                    translateX: this.state.x
                                }
                            ]
                        }]}
                    >


                        <View style={styles.modalContainer}>

                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="🔍输入关键词搜索"
                                    style={styles.searchBarInput}
                                    onChangeText={(text)=>this.showResult(text)}
                                    value={this.state.value}
                                    onEndEditing={(text)=>this.hideResult({text})}//onEndEditing={this.onSearchChange}
                                    />
                            <TouchableHighlight
                                style={[styles.button, styles.close]}
                                underlayColor="#aaa"
                                onPress={this.hideModal}
                            >
                                <Text style={{color:'blue',textAlign:'center',fontSize:18}}>取消</Text>
                            </TouchableHighlight>

                        </View>
                        <View style={{marginTop:px2dp(20)}}>

                        { this.state.show ?
                            <View style={styles.result}>
                                <View style={[styles.resultItemBottomLine, styles.flex]}>
                                    <Text style={[styles.resultItem]}
                                          numberOfLines={1}
                                          onPress={this.hideResult.bind(this, this.state.value + '事件')}>
                                        {this.state.value}事件
                                    </Text>
                                </View>

                                <View style={[styles.resultItemBottomLine, styles.flex]}>
                                    <Text style={styles.resultItem}
                                          numberOfLines={1}
                                          onPress={this.hideResult.bind(this, this.state.value + 'ISIS')}>
                                        {this.state.value}ISIS
                                    </Text>
                                </View>

                                <View style={[styles.resultItemBottomLine, styles.flex]}>
                                    <Text style={[styles.resultItem]}
                                          numberOfLines={1}
                                          onPress={this.hideResult.bind(this, this.state.value + '王宝强')}>
                                        {this.state.value}王宝强
                                    </Text>
                                </View>

                                <View style={[styles.resultItemBottomLine, styles.flex]}>
                                    <Text style={[styles.resultItem]}
                                          numberOfLines={1}
                                          onPress={this.hideResult.bind(this, this.state.value + '雾霾')}>
                                        {this.state.value}雾霾
                                    </Text>
                                </View>

                                <View style={[styles.flex]}>
                                    <Text style={[styles.resultItem]}
                                          numberOfLines={1}
                                          onPress={this.hideResult.bind(this, this.state.value + '中华人民共和国')}>
                                        {this.state.value}中华人民共和国
                                    </Text>
                                </View>
                            </View>
                            : null
                        }
                    </View>
                    </Animated.Modal>
                </View>
                <View style={{flex:1}}>{this._renderListView()}</View>
            </View>
        );

    }


    /**
     * scrollVewDemo
     * @returns {XML}
     */
    _renderScrollView(){

        return(
            <SwRefreshScrollView
                onRefresh={this._onRefresh.bind(this)}
                ref="scrollView"
                //其他你需要设定的属性(包括ScrollView的属性)
            >
                <View style={styles.content}>
                    <Text>下拉刷新ScrollView</Text>
                </View>
            </SwRefreshScrollView>
        )

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
     * 模拟刷新
     * @param end
     * @private
     */
    _onRefresh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            alert('刷新成功');

            end();//刷新成功后需要调用end结束刷新

        },1500)

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
            this.refs.listView.beginRefresh()
        },500);//自动调用刷新 新增方法
    }

}
const styles=StyleSheet.create({
    content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
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
    downCell:{
       // flex:1,
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        backgroundColor:"#f2f2f2",
        alignItems:"center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'rgba(0, 155, 155, 0.5)',
        flex:1,
        flexDirection:'column'
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    close: {
        //position: 'absolute',
        //right: 20,
        top: px2dp(30),
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent:'center',
        width:width/5,
        height:px2dp(30)
    },
    modalContainer: {
        // height: height-130,
        // width: width,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue',
       // flex:1,
        flexDirection:'row'

    },
    text: {
        color: '#fff'
    },
    customimg: {
        width: 50,
        height: 50
    },
    searchBarInput: {
        marginTop: px2dp(30),
        padding: px2dp(5),
        fontSize: 15,
        height: px2dp(30),
        backgroundColor: '#EAEAEA',
        width:width/5*4,
        marginLeft:px2dp(10),
        borderRadius:px2dp(5)
    },
    container1: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    flexDirection: {
        flexDirection: 'row'
    },
    input: {
        borderWidth: 1,
        marginLeft: 5,
        paddingLeft: 5,
        borderColor: '#ccc',
        justifyContent: 'center',
        borderRadius: 4
    },
    inputHeight: {
        height: 45
    },
    btn: {
        width: 55,
        marginLeft: -5,
        marginRight: 5,
        backgroundColor: '#23beff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4
    },
    result: {
        marginLeft: 5,
        marginRight: 5,
        height: 200,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,

    },
    resultItem: {
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd'

    },

    resultItemBottomLine: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    }

});