/**
 * Created by jiahailiang on 2017/1/30.
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,

} from 'react-native';
import {NavGoBack} from '../component/NavGoBack';
import NavigationBar from 'react-native-navbar';
import px2dp from '../util/Px2dp';
import {toastShort} from '../component/Toast';
import Network from '../util/Network';
import Search from '../component/Search'
var {width,height} = Dimensions.get('window');

export default class FeedBack extends Component{
    constructor(props){
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);

        this.state = {
            commitText:'',
            isDomestic:true,
            isForeign:false,
            isAllSource:false,
        }
    }

    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    };
    _updateBtnSelectedState(currentPressed, array) {
        if (currentPressed === null || currentPressed === 'undefined' || array === null || array === 'undefined') {
            return;
        }

        let newState = {...this.state};

        for (let type of array) {
            if (currentPressed == type) {
                newState[type] ? {} : newState[type] = !newState[type];
                this.setState(newState);
            } else {
                newState[type] ? newState[type] = !newState[type] : {};
                this.setState(newState);
            }
        }
    }

    _getButton1(style, selectedSate, stateType, buttonTitle, count) {
        let BTN_SELECTED_STATE_ARRAY1 = ['isAllSource', 'isDomestic', 'isForeign'];
        return(
            <View style={[style, selectedSate ? {borderColor:'#32a7f5',borderWidth:1,borderRadius:3,backgroundColor:'#32a7f5'} : {}]}>
                <Text
                    style={[styles.button, selectedSate ? {color: '#FFF'} : {}]}
                    onPress={ () => {this._updateBtnSelectedState(stateType, BTN_SELECTED_STATE_ARRAY1)}}>
                    {buttonTitle}{count}
                </Text>
            </View>
        );
    }
    render(){
        const leftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };
        const titleConfig ={
            title:'意见反馈',
            tintColor: '#FFF'
        };
        const bar = {
            style:'light-content',
        };
        return(
            <View style={{ flex:1 ,flexDirection:'column' , backgroundColor:'#FFF',alignItems:'center'}}>
                <View style={{width:width}}>
                    <NavigationBar
                        title={titleConfig}
                        tintColor={'#18242e'}
                        leftButton={leftButtonConfig}
                        statusBar={bar}
                    />
                </View>
                <View style={styles.buttonlayout1}>
                    {this._getButton1(styles.buttonleft, this.state.isAllSource, 'isAllSource', '问题反馈', )}
                    {this._getButton1(styles.buttonleft, this.state.isDomestic, 'isDomestic', '优化建议', )}
                    {this._getButton1(styles.buttonleft, this.state.isForeign, 'isForeign', '服务投诉', )}
                </View>
                <View style={styles.xuqiuView}>
                    <TextInput
                        placeholder={'请简要描述您的问题或建议'}
                        style={styles.demandInput}
                        multiline={true}
                        //ref='experience'
                        onChangeText={(text) => {
                            this.setState({
                                commitText:text
                            })
                        }}
                    >
                    </TextInput>
                </View>
                <TouchableOpacity onPress={() => {
                    let params=new Object();
                    params.content = this.state.commitText;
                    params.type = 2;
                    Network.post('appmessage2/saveUserAdvise',params,(response)=>{
                        toastShort('提交成功')
                    },(err)=>{
                        toastShort('提交失败')
                    })
                }}>
                    <View style={styles.commitButton}>
                        <Text style={{color:'#FFF'}}>提交</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    buttonlayout: {
        marginTop: 8,
        //alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-around',
        width:width,
        height:30,
        marginLeft:15,
    },

    buttonlayout1: {
        marginTop: 8,
        //alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-around',
        width:width,
        height:40,
        marginLeft:15
    },


    buttonleft: {
        borderRadius: 3,
        borderColor: '#666666',
        borderWidth: 1,
        marginLeft:10,
        width:px2dp(107),
        padding:3
    },
    button: {
        //height: px2dp(20),
        textAlign: 'center',
        //textAlignVertical: 'center',
        // marginLeft:5,
        // marginRight:5,
        //width:50,
        fontSize:16,
        //padding:1,
        //alignSelf: 'center',
        color:'#666666'
    },
    xuqiuView:{
        width:px2dp(345),
        height:px2dp(202),
        backgroundColor:'#F4F4F4',
        //padding:15,
        //margin:15

    },
    demandInput:{
        //backgroundColor:'#0F0',
        flex: 1,
        textAlignVertical: 'top',
        //padding: 0,
        //margin: 0,
        fontSize:14,
        marginTop:px2dp(15),
        marginLeft:px2dp(10)
    },
    commitButton:{
        width:px2dp(345),
        height:px2dp(40),
        backgroundColor:'#0ca6ee',
        marginTop:px2dp(26),
        alignItems:'center',
        justifyContent:'center',
    },
});

