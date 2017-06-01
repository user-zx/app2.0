/**
 * Created by jiahailiang on 2017/1/18.
 */
import React,{Component,PropTypes,} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    Dimensions,
    AsyncStorage,
    TouchableHighlight,
    Platform,
    Animated,

} from 'react-native';
import px2dp from '../util/Px2dp';
import NewsClass from './NewClass';
import ResponsiveImage from 'react-native-responsive-image';
import Network from '../util/Network';
import {toastLong} from '../component/Toast';
import NewClassWaring from './NewClassWaring';
import NewClassPage from './NewClassPage';
import Header from '../component/Header'

const {width,height}=Dimensions.get('window');

export default class HomePage extends Component{
    constructor (props) {
        super(props);
        this.state = {
         resultMessage:'热点',
                yujing:'',
             xiangguan:'',
                quanbu:'',
                fumian:'',
                yuqing:'',
         columnNameArr:[],
          lableNameArr:[],
                    id:'',
            is_visible: false,
              expanded: false,
             animation: new Animated.Value(),
        };
        this.icons = {
              'up'    : require('../image/up.png'),
              'down'  : require('../image/down.png')
        };
    }
    //用三个这方法,真是绝了....下个版本再改吧
    pressAction(title,carrie,id){
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                     name:'NewsClass',
                component:NewsClass,
                params:{
                    message:carrie,
                      title:title,
                         id:id,
                }
            })
        }
    }
    pressAction1(title,carrie){
        var  _this = this;
        const {navigator} = _this.props;
        if (navigator){
            navigator.push({
                       name:'NewClassWaring',
                  component:NewClassWaring,
                params:{
                    message:carrie,
                      title:title,
                }
            })
        }
    }
    pressAction2(title,id){
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                     name:'NewClassPage',
                component:NewClassPage,
                params:{
                    title:title,
                       id:id,
                }
            })
        }
    }
    componentWillMount() {

    }
    _getStyle(){

        return(
        {
            flexWrap:'wrap',
            overflow:'scroll',
        }
        )
    }
        componentDidMount(){
            Network.post('app2/aggrNature',{},(responseText)=>{
                    this.state.yujing=responseText.data.result.预警信息;
                    this.state.xiangguan=responseText.data.result.相关信息;
                    this.state.quanbu=responseText.data.result.全部;
                    this.state.fumian=responseText.data.result.负面信息;
                    this.state.yuqing=responseText.data.result.舆情信息;
                    Network.post('appanalyse2/findColumn2',{},(responseArr)=>{
                        this.setState({
                            columnNameArr:responseArr.data
                        });
                    },(err)=>{toastLong(err)});
                },
                (err)=>{
                    toastLong(err)
                }
            );

    }

    render(){

        return(
            <View style={styles.zheBigView}>
                <View>
                    <Header {...this.props}
                            title='首页'
                            headercolor={'#18242e'}
                            lefticon={null}
                            leftAction={()=>{}}
                    />
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.loudouView}>
                        <Image source={require('../image/loudou@2x.png')} style={styles.lodou}>
                            <View style={styles.textView}>
                                <Text style={[styles.loudouText,styles.loudaoText]}>{this.state.quanbu}</Text>
                                <Text style={styles.loudouText}>{this.state.xiangguan}</Text>
                                <Text style={styles.loudouText}>{this.state.yuqing}</Text>
                                <Text style={styles.loudouText}>{this.state.fumian}</Text>
                                <Text style={[styles.zuihou]}>{this.state.yujing}</Text>
                            </View>
                        </Image>
                    </View>
                    <View style={styles.imageButton}>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction1.bind(this,'预警','appwarning2/getList')}>
                                <ResponsiveImage source={require('../image/yujing@2x.png')} style={styles.imageButtonPic}></ResponsiveImage>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'舆情')}>
                                <Image source={require('../image/yuqing@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'正面')}>
                                <Image source={require('../image/zhengmian@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'负面')}>
                                <Image source={require('../image/fumian@2x.png')} style={styles.imageButtonPic}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        {
                            this.state.columnNameArr.map((item,i)=>{
                                return(
                                    <View key={i} style={[styles.columnItem,this._getStyle.bind(this)]}>
                                        <View style={{width:width*0.25,marginLeft:px2dp(10),borderRightWidth:1,borderRightColor:'#d9d9d9',alignSelf:'center'}}>
                                            <Text style={{fontSize:16,padding:10}}>{item.name}</Text>
                                        </View>
                                        <View style={styles.lableItem} >
                                            {
                                                item.columnTags.map((itemKey,index)=>{
                                                    return(
                                                        <TouchableOpacity key ={index}
                                                                          onPress={this.pressAction2.bind(this,itemKey.name,itemKey.id)}
                                                                          style={{alignItems: 'flex-start',}}
                                                        >
                                                            <View key={index} style={{padding:(10,20,10,10)}}>
                                                                <Text style={{color:'#666666'}}>{itemKey.name}</Text>
                                                            </View>

                                                        </TouchableOpacity>

                                                    )
                                                })
                                            }
                                        </View>

                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    lodou:{
                  width:width,
                 height:px2dp(270),
        backgroundColor:'#242f39',
    },
    zheBigView:{
                   flex:1,
          flexDirection:'column',
        backgroundColor:'#F2F2F2'
    },
    loudouView:{
          flexDirection:'column',
        backgroundColor:'#FFF',
    },
    loudouText:{
        backgroundColor:'rgba(0,0,0,0)',
                  color:'#FFF',
              textAlign:'center',
         justifyContent:'center',
             paddingTop:px2dp(15),
          paddingBottom:px2dp(15),
               fontSize:12,
             marginLeft:-width*0.12,
    },
    loudaoText:{
        marginTop:px2dp(15)
    },

    imageButtonView:{

    },
    imageButtonPic:{
                 width:px2dp(50),
                height:px2dp(50),
             marginTop:px2dp(10),
          marginBottom:px2dp(10),
    },

    imageButton:{
         flexDirection:'row',
        justifyContent:'space-around',
            alignItems:'center',
       backgroundColor:'#242f39',
                   top:0
    },
    textView:{
        backgroundColor:'rgba(0,0,0,0)',
                  width:width,
    },
    zuihou:{
             paddingTop:10,
        backgroundColor:'rgba(0,0,0,0)',
              textAlign:'center',
                  color:"#FFF",
               fontSize:12,
             marginLeft:-width*0.12
    },
    listView:{
                  width:width,
                 height:px2dp(50),
        backgroundColor:(Platform.OS === 'ios') ? 'red' : 'black',
    },
    container: {
       flex            :1,
       backgroundColor :'#f4f7f9',
    },
    columnItem:{
            flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:'#D9D9D9'
    },
    lableItem:{
        flex         :1,
        flexDirection:"row",
             flexWrap:'wrap',
           alignItems:'center',
            overflow:'hidden',
    },
    firstHeader: {
        marginHorizontal: 10,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 50,
    },
});