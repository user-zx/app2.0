/**
 * Created by jiahailiang on 2017/1/11.
 */
/**
 * Created by jiahailiang on 2017/1/9.
 */

import React,{Component} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    TouchableHighlight,
    Dimensions,

} from 'react-native';

const {width,height}=Dimensions.get('window');



import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import Modal from 'react-native-root-modal';
import px2dp from '../util/px2db';


export default class RegisterView extends React.Component {

    constructor (props) {
        super(...arguments);

        super(props);

        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            name:'',
            phoneNumber:'',
            OptionName:'',
            provincesName:'',
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
            show: false,

        }
    }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    }
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
        const leftButtonConfig = {
            title:'返回',
            handler:()=>this.buttonGoBack(),
        };
        const titleConfig ={
            title:'基本信息',
        };
        return(
            <View style={{flex:1}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        tintColor={'rgb(61,171,236)'}
                        leftButton={leftButtonConfig}
                    />
                </View>
                <View style={{flex:1}}>
                    <GiftedForm
                        formName='signupForm' // GiftedForm instances that use the same name will also share the same states

                        openModal={(route) => {
                            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
                        }}

                        clearOnClose={false} // delete the values of the form when unmounted

                        defaults={{
                            /*
                             username: 'Farid',
                             'gender{M}': true,
                             password: 'abcdefg',
                             country: 'FR',
                             birthday: new Date(((new Date()).getFullYear() - 18)+''),
                             */
                        }}

                        validators={{
                            fullName: {
                                title: 'Full name',
                                // title: '用户名',
                                validate: [{
                                    validator: 'isLength',
                                    arguments: [3, 23],
                                    //message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                    message: '请输入正确的用户名'
                                }]
                            },
                            username: {
                                title: 'Username',
                                validate: [{
                                    validator: 'isLength',
                                    arguments: /^1(3|4|5|7|8)\d{9}$/,
                                    message: '手机号码 请输入正确的手机号码 '
                                },{
                                    validator: 'matches',
                                    arguments: /^1(3|4|5|7|8)\d{9}$/,
                                    message: '手机号码 请输入正确的手机号码 '
                                }]
                            },
                            password: {
                                title: 'Password',
                                validate: [{
                                    validator: 'isLength',
                                    arguments: [3, 16],
                                    message: '单位名称 请正确输入单位名称'
                                }]
                            },
                            emailAddress: {
                                title: 'Email address',
                                validate: [{
                                    validator: 'isLength',
                                    arguments: [6, 255],
                                },{
                                    validator: 'isEmail',
                                }]
                            },
                            bio: {
                                title: 'Biography',
                                validate: [{
                                    validator: 'isLength',
                                    arguments: [0, 512],
                                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                }]
                            },

                            country: {
                                title: 'Country',
                                validate: [{
                                    validator: 'isLength',
                                    arguments: [2],
                                    message: '{TITLE} is required'
                                }]
                            },
                        }}
                    >

                        <GiftedForm.SeparatorWidget />
                        <GiftedForm.TextInputWidget
                            name='fullName' // mandatory
                            title='用户名'

                            image={require('../image/alticles.png')}

                            placeholder='请填写您的用户名'
                            clearButtonMode='while-editing'
                            onChangeText={
                                (text)=>{
                                    this.setState({name:text});
                                    {/*alert(this.state.name)*/}
                                }
                            }
                        />


                        <GiftedForm.TextInputWidget
                            name='username'
                            title='手机号'
                            image={require('../image/baobiao.png')}
                            keyboardType='numbers-and-punctuation'

                            placeholder='请填写您的手机号'
                            clearButtonMode='while-editing'
                        />

                        <GiftedForm.TextInputWidget
                            name='password' // mandatory
                            title='单位名称'
                            placeholder='请填写您的单位名称'
                            clearButtonMode='while-editing'
                            //secureTextEntry={true}
                            image={require('../image/chart.png')}
                        />

                        <GiftedForm.TextInputWidget
                            name='emailAddress' // mandatory
                            title='电子邮箱'
                            placeholder='zkdj@junquan.com.cn'

                            keyboardType='email-address'

                            clearButtonMode='while-editing'

                            image={require('../image/contact_bg.png')}
                        />

                        <GiftedForm.SeparatorWidget />

                        {/*<GiftedForm.ModalWidget*/}
                        {/*title='选择所在省份'*/}
                        {/*displayValue='country'*/}
                        {/*image={require('../image/start.png')}*/}
                        {/*scrollEnabled={false}*/}

                        {/*>*/}
                        {/*<GiftedForm.SelectCountryWidget*/}
                        {/*code='alpha2'*/}
                        {/*name='country'*/}
                        {/*title='Country'*/}
                        {/*autoFocus={true}*/}
                        {/*/>*/}
                        {/*</GiftedForm.ModalWidget>*/}



                        <TouchableHighlight
                            style={{width:100,height:50,backgroundColor:'#666666'}}
                            underlayColor="#aaa"
                            onPress={this.scaleModal}
                        >
                            <Text>选择城市</Text>
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


                            <View style={{flexDirection:'row',width:300,height:600}}>

                                <GiftedForm.SelectCountryWidget
                                    code='alpha2'
                                    name='country'
                                    title='Country'
                                    autoFocus={true}
                                />
                                <TouchableHighlight
                                    style={[styles.button, styles.close]}
                                    underlayColor="#aaa"
                                    onPress={this.hideModal}
                                >
                                    <Text style={{color:'blue',textAlign:'center',fontSize:18}}>取消</Text>
                                </TouchableHighlight>

                            </View>

                        </Animated.Modal>

                        {/*<GiftedForm.ModalWidget*/}
                        {/*title='监测需求'*/}
                        {/*displayValue='bio'*/}

                        {/*image={require('../image/tian.png')}*/}

                        {/*scrollEnabled={true} // true by default*/}
                        {/*>*/}
                        {/*<GiftedForm.SeparatorWidget/>*/}
                        {/*<GiftedForm.TextAreaWidget*/}
                        {/*name='bio'*/}

                        {/*autoFocus={true}*/}

                        {/*placeholder='Something interesting about yourself'*/}
                        {/*/>*/}
                        {/*</GiftedForm.ModalWidget>*/}


                        <GiftedForm.SubmitWidget
                            title='提交'
                            widgetStyles={{
                                submitButton: {
                                    backgroundColor: this.mainColor,
                                }
                            }}
                            onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                                if (isValid === true) {
                                    // prepare object
                                    values.gender = values.gender[0];
                                    values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                                    /* Implement the request to your server using values variable
                                     ** then you can do:
                                     ** postSubmit(); // disable the loader
                                     ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                                     ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                                     ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                                     */
                                }
                            }}

                        />

                        <GiftedForm.NoticeWidget
                            title='尊敬的用户：请您核对信息无误后提交，工作人员会以最快的速度与您的联系，
                            并以最好的效果为您开通账号！军犬客服：010-6287999'
                        />

                        <GiftedForm.HiddenWidget name='tos' value={true} />

                    </GiftedForm>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
});