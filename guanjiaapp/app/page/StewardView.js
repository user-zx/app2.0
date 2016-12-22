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
    ListView,
    AsyncStorage,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import px2dp from '../util/px2db';
import NewsClass from './NewsClass'
const {width,height}=Dimensions.get('window');

export default class StewardView extends React.Component {
    _ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    constructor (props) {
        super(props);
        this.state = {
            dataSource:this._ds.cloneWithRows(this.getDataArr()),
            text : '全部监测数据 45733621',
            resultMessage:'热点',
        };
    }

    getDataArr(){
        const dataArr = [];
        for(let i = 0 ; i< 10 ; i ++ ){
            dataArr.push(
                {
                    title:'相关站点信息' + i,
                    text:'Lorem ipsum dolor sit amet, ius ad pertinax oportereaccommodare,' +
                    ' an vix civibus corrumpit referrentur. Te nam case ludusinciderint, te mea' +
                    ' facilisi adipiscing. Sea id integre luptatum. In tota saleconsequuntur nec.' +
                    ' Erat ocurreret mei ei. Eu paulo sapientem vulputateest, vel an accusam intellegam interesset.' +
                    ' Nam eu stet periculareprimique, ea vim illud modus, putant invidunt reprehendunt ne qui' + i
                }
            );
        }
        return dataArr;
    }
    renderRow(rowData,sectionID,rowID,heightlightRow){
        return(
            <View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#F2F2F2',borderLeftWidth:1,borderLeftColor:'#F2F2F2'}}>
                <Text style={{width:width/4,textAlign:'center',fontSize:16,padding:px2dp(10)}}>{rowData.title}</Text>
                <View style={{width:1,height:70,backgroundColor:'#F2F2F2'}} />
                <Text style={{width:(width/4*3)-1 ,textAlign:'center',fontSize:16,padding:px2dp(20)}}>{rowData.text}</Text>
            </View>
        )
    }
    pressAction(title){
        var  _this = this;
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'NewsClass',
                component:NewsClass,
                params:{
                    message:'asdfasdfa',
                    title:title,
                    getResult:function(messageReturn){
                _this.setState({
                    resultMessage:messageReturn,
                })
            }
                }
            })
        }
    }
    render(){
        const rightButtonConfig = {
          title:'搜索'
        };
        const titleConfig = {
          title:' 舆情管家'
        };
        return(
            <View style={firstPageStyles.zheBigView}>
                <View>
                    <NavigationBar
                    title={titleConfig}
                    rightButton={rightButtonConfig}
                    tintColor={'rgb(61,171,236)'}
                    />
                </View>
                <ScrollView>
                    <View style={firstPageStyles.loudouView}>
                        <Image source={require('../image/funnel.png')} style={firstPageStyles.lodou}>
                            <Text style={firstPageStyles.loudouText}>{this.state.text}</Text>
                            <Text style={firstPageStyles.loudouText}>{'456654'}</Text>
                            <Text style={firstPageStyles.loudouText}>{'123658'}</Text>
                            <Text style={firstPageStyles.loudouText}>{'789456'}</Text>
                            <Text style={firstPageStyles.loudouText}>{'123'}</Text>
                        </Image>
                        <View style={firstPageStyles.loudouRightView}>
                            <Text style={firstPageStyles.loudouRightText}>相关</Text>
                            <Text style={firstPageStyles.loudouRightText}>舆情</Text>
                            <Text style={firstPageStyles.loudouRightText}>负面</Text>
                            <Text style={firstPageStyles.loudouRightText}>预警</Text>
                        </View>
                    </View>
                    <View style={firstPageStyles.imageButtonView}>
                        <View style={firstPageStyles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'预警')}>
                                <Image source={require('../image/06.png')} style={firstPageStyles.imageButtonPic}></Image>
                                <Text style={firstPageStyles.imageButtonText}>预警</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={firstPageStyles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'舆情')}>
                                <Image source={require('../image/03.png')} style={firstPageStyles.imageButtonPic}></Image>
                                <Text style={firstPageStyles.imageButtonText}>舆情</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={firstPageStyles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'正面')}>
                                <Image source={require('../image/05.png')} style={firstPageStyles.imageButtonPic}></Image>
                                <Text style={firstPageStyles.imageButtonText}>正面</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={firstPageStyles.imageButtonView}>
                            <TouchableOpacity onPress={this.pressAction.bind(this,'负面')}>
                                <Image source={require('../image/04.png')} style={firstPageStyles.imageButtonPic}></Image>
                                <Text style={firstPageStyles.imageButtonText}>负面</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{fontSize:20,fontWeight:'400',padding:px2dp(5)}}>栏目分类</Text>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:'#FFF'}}>
                        <Text style={{color:'rgb(80,164,237)',fontSize:16,padding:px2dp(20)}}>新媒体</Text>
                        <Text onPress={this.pressAction.bind(this,'微博舆情')} style={{fontSize:16,padding:px2dp(20)}}>微博舆情</Text>
                        <Text onPress={this.pressAction.bind(this,'微信舆情')} style={{fontSize:16,padding:px2dp(20)}}>微信舆情</Text>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:'#FFF',marginTop:px2dp(10)}}>
                        <Text onPress={this.pressAction.bind(this,'关注站点信息')} style={{color:'rgb(80,164,237)',fontSize:16,padding:px2dp(20)}}>关注站点信息</Text>
                        <Text onPress={this.pressAction.bind(this,'关注站点信息')} style={{color:'rgb(80,164,237)',fontSize:16,padding:px2dp(20)}}>关注站点信息</Text>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:'#FFF',marginTop:px2dp(10)}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            contentContainerStyle={{flexWrap:'wrap' }}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }
}
const firstPageStyles = StyleSheet.create({
    lodou:{
        width:px2dp(245),
        height:px2dp(240),
        flexDirection:'column',
        //justifyContent:'center'
    },
    zheBigView:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#F2F2F2F2'
    },
    loudouView:{
        flexDirection:'row',
        justifyContent:'center',
        //marginTop:px2dp(10),
        backgroundColor:'#FFF',
        paddingTop:px2dp(10),
    },
    loudouText:{
        backgroundColor:'rgba(0,0,0,0)',
        color:'#FFF',
        textAlign:'center',
        padding:px2dp(15),
        justifyContent:'center',

    },
    loudouRightView:{
        flexDirection:'column',
        marginTop:px2dp(22),
    },
    loudouRightText:{
        fontSize:px2dp(20),
        alignItems:'flex-start',
        paddingTop:px2dp(30),
    },
    imageButtonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:px2dp(10),
        paddingLeft:px2dp(10),
        paddingRight:px2dp(10),
        backgroundColor:'#FFF',
        //marginBottom:px2dp(10),
        paddingBottom:px2dp(5)
    },
    imageButtonPic:{
        width:px2dp(45),
        height:px2dp(45),
    },
    imageButtonText:{
        textAlign:'center',
        fontSize:16,
        marginTop:px2dp(5)
    },
}) ;