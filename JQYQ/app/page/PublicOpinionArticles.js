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
import {NavGoBack} from '../component/NavGoBack';
//import NavigationBar from 'react-native-navbar';
import ArticleDetails from './ArticleDetails';
import px2dp from '../util/Px2dp';

export default class PublicOpinionArticles extends Component{
    _page=0;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    // 构造
    constructor(props) {
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this._getRows()),
            message:'',
            title:'',
        };
    }
    _dropdown_6_onSelect(idx, value) {
        toastShort(idx,value);

        // this.setState({
        //     dropdown_6_icon_heart: !this.state.dropdown_6_icon_heart,
        // })
    }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };

    _getRows(){
        const dataBlob = [];
        for(let i = 0 ; i< 10 ; i ++ ){
            dataBlob.push(
                {title:'朴槿惠第' + i +'会见金三胖',
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
                    {title:'金三胖金三胖金三胖' + i,
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