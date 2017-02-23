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
    //Modal,
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
import Network from '../util/Network';
import '../util/dateFormat';
import Modal from '../component/Modal'


export default class NewsClass extends Component{
    _page=0;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    // 构造
    constructor(props) {
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.icons ={
            'zhengmian' : require('../image/source/正面@3x.png'),
            'fumian'    : require('../image/source/负面@3x.png'),
            'xiangguan' : require('../image/source/相关@3x.png'),
            'yuqing'    : require('../image/source/舆情@3x.png'),
        };
        this.jhl={
            message:'titleName',
            title:'titleName',
            id:'2',
            dataArr:[],         //载体数组
            carrie:'all',       //载体
            sort:'hot',         //排序器     publishTime、hot
            nature:'',          //特征       舆情、相关、正面、负面
            time:'week',        //时间       today、yesterday、week、month
            rel:'true',         //排重       true/false
            country:'',         //来源       境外/境内
            pageNo:'1',         //第几页
            pageSize:'10'  ,     //每页取多少条数据
            start_time:'',       //开始时间
            end_time:'',        //结束时间
            mode:'',            //手动预警
            nextTime:'',        //下一个时间
            prevTime:'',        //上一个
            limit:'',           //限制
            offset:'',          //偏移


        };
        this.state = {
            dataSource:this._dataSource.cloneWithRows(this.jhl.dataArr),
            message:'',
            title:'',
            id:'2',
            open: false
        };
    }

    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };

    /*_getRows(){
        const dataBlob = [];
        /!*for(let i = 0 ; i< 10 ; i ++ ){
            dataBlob.push(
                {title:'没错我就是标题' + i,
                    text:'微信 2016-11-16 13:00:00     🔥' +i,

                }
            );
        }*!/
        const params=new Object();
        params.carrier=this.state.carrier,
            params.sequencer=this.state.sequencer,
            params.aspect=this.state.aspect,
            params.screen=this.state.screen,
            Network.postSecond('appwarning2/getList',params,(response)=>{
                console.log(response.total);
                alert(response.total);
                dataBlob:response.rows.result

            },(err)=>{err});
        return dataBlob;
    }*/



    componentWillMount(){

    }
    _dropdown_6_onSelect() {

        //let dataBlob = [];
        let params=new FormData();
            params.carrie=this.jhl.carrie;
            params.time=this.jhl.time;
            params.sort=this.jhl.sort;
            params.rel=this.jhl.rel;
            params.country = this.jhl.country;
            params.pageNo = this.jhl.pageNo;
            params.pageSize = this.jhl.pageSize;
            params.start_time = this.jhl.start_time;
            params.end_time = this.jhl.end_time;
            params.mode = this.jhl.mode;
            params.nextTime = this.jhl.nextTime;
            params.prevTime = this.jhl.prevTime;
            params.limit = this.jhl.limit;
            params.offset = this.jhl.offset;
            params.nature = this.jhl.nature;

        //console.log(this.state.screen);
            Network.post('appwarning2/getList',params,(response)=>{
               let resArr= response.rows.result;
                for (let i in resArr){
                    resArr[i].createTime = new Date(resArr[i].createTime).Format("yyyy/MM/dd hh:mm");;
                }
                this.jhl.dataArr=resArr;
                let timer = setTimeout(()=>{
                    clearTimeout(timer);
                    //this.refs.scrollView.beginRefresh()
                    this.refs.listView.beginRefresh()
                },500);
                this.setState({
                    //dataArr:response.data.natureList,
                    dataSource:this._dataSource.cloneWithRows(dataArr),
                })
            },(err)=>{err});

        //return dataArr;
    }


    _pressRow(title){
        let messageArr = [];
        for (let i in this.jhl.dataArr) {
            messageArr = this.jhl.dataArr[i].content;
        }
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'ArticleDetails',
                component:ArticleDetails,

                params:{
                    message:messageArr,
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
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32
        };
        const titleConfig = {
                title: this.state.title,
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
                    <View style={{width:width,height:40,flexDirection:'row'}}>
                    <ModalDropdown options={this.state.dataArr}
                                   defaultValue='载体'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => {
                                       this.jhl.carrie=value;
                                       this._dropdown_6_onSelect(idx, value)
                                   }}
                    />
                    <ModalDropdown
                                   options={['不限', '相关','舆情','正面','负面']}
                                   //options={this.state.dataArr}
                                   defaultValue='特征'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => {
                                       this.jhl.aspect = value;
                                       this._dropdown_6_onSelect(idx, value)
                                   }}
                    />

                    <ModalDropdown options={['热度','时间']}
                                   defaultValue='排序'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_9}
                                   onSelect={(idx, value) => {
                                       this.state.sequence = value;
                                       this._dropdown_6_onSelect(idx, value)
                                   }}                    />
                    {/*<ModalDropdown options={['全部', '一天内','一周内','一个月内','三个月','六个月','一年']}
                                   defaultValue='条件筛选'
                                   textStyle={{fontSize:px2dp(15),padding:px2dp(10),textAlign:'center'}}
                                   style={styles.dropdown_1}
                                   dropdownStyle={styles.dropdown_8}
                                   onSelect={(idx, value) => {
                                       this.jhl.screen = value;
                                       this._dropdown_6_onSelect(idx, value)
                                   }}
                                   renderRow={this._renderDropdownView.bind(this)}
                    />*/}
                        <Modal offset={this.state.offset}
                               open={this.state.open}
                               modalDidOpen={() => console.log('modal did open')}
                               modalDidClose={() => this.setState({open: false})}
                               style={styles.dropdown_1}>
                            <View>
                                <Text style={{fontSize: 20, marginBottom: 10}}>条件筛选</Text>
                                <TouchableOpacity
                                    style={{margin: 5}}
                                    onPress={() => this.setState({offset: -100})}>
                                    <Text>Move modal up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{margin: 5}}
                                    onPress={() => this.setState({offset: 0})}>
                                    <Text>Reset modal position</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{margin: 5}}
                                    onPress={() => this.setState({open: false})}>
                                    <Text>Close modal</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
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

        // //let id = this.state.id;
        // switch (this.state.id) {
        //     case '1' :
        //         return(icon = this.icons['zhengmian']);
        //         break;
        //
        //     case '2' :
        //         return(icon = this.icons['fumian']);
        //         break;
        //
        //     default:icon = this.icons['zhengmian']
        // }





        return(
            <TouchableOpacity onPress={() => this._pressRow(rowData.title)}>
                <View style={styles.cell}>
                    <Text style={styles.cellTitle}>{rowData.title}</Text>
                    <View style={styles.cellImageView}>

                        <Image style={styles.cellImage} source={icon}></Image>
                        <Text style={styles.cellText}>{rowData.author}</Text>
                        <Text style={styles.cellText}>{rowData.createTime}</Text>
                        <Text style={styles.cellText}>{rowData.siteName}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        );


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
            this.setState({
                dataSource:this._dataSource.cloneWithRows(this.jhl.dataArr)
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
            this.setState({
                dataSource:this._dataSource.cloneWithRows(this.jhl.dataArr)
            });
            end(this._page > 2);//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕

        },2000)
    }

    componentDidMount() {
        let timer = setTimeout(()=>{
            clearTimeout(timer);
             //this.refs.scrollView.beginRefresh()
            this.refs.listView.beginRefresh()
        },500);//自动调用刷新 新增方法
        Network.post('apppanorama2',{},(response)=>{
            this.setState({
                dataArr:response.data.natureList,
                message:this.props.message,
                title:this.props.title,
                //dataSource: this.state.dataSource,
            })
        },(err)=>{
            toastShort(err)
        })
    }
    _renderDropdownView(){
        return(
            <View style={{flexDirection:'column'}}>
                <Text>aaaaaaa</Text>
                <Text>aaaaaaa</Text>
                <View style={{flexDirection:'row'}}>
                    <Text>ccccccc</Text>
                    <Text>ccccccc</Text>
                </View>
                <Text>bbbbbbb</Text>
                <Text>bbbbbbb</Text>
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
        paddingLeft:px2dp(12),

    },
    cellImageView:{
        flexDirection:'row',

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
        backgroundColor:'#FFF'
    },
    dropdown_8: {
        flex: 1,
        //left: px2dp(10),
        height:px2dp(160),
        width:width,
        backgroundColor:'#666666'
    },


});