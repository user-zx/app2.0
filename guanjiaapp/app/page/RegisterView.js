
/*
*
*/
import React, { Component } from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StatelessForm, InlineTextInput } from 'react-native-stateless-form'

export default class RegisterView extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null,
            email: null,
            password: null,
            phoneNumber:null,
            optionName:null,
            provincesName:null,
        }
    }

    render() {
        const { name, email, password,phoneNumber,optionName,provincesName } = this.state;
        const nameValid = (name && name.length > 0 ? true : false);
        const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
        //const passwordValid = (password && password.length >= 8 ? true : false);
        const phoneNumberValid = /^1(3|4|5|7|8)\d{9}$/.test(phoneNumber);
        const optionNameValid = (optionName && optionName.length > 0 ? true : false);
        const provincesNameValid = (provincesName && provincesName.length > 0 ? true : false);
        return (
            <StatelessForm style={{
                flex: 1,
                marginTop: 20,
                backgroundColor: 'lightgray',
            }}>
                <InlineTextInput
                    title='姓名'
                    placeholder='输入姓名'
                    style={{ borderColor: 'gray' }}
                    titleStyle={{ color: 'dimgray' }}
                    inputStyle={{ color: 'slategray' }}
                    messageStyle={{ color: 'red' }}
                    icon={ <Icon name={'account-circle'} size={18} color={'steelblue'} /> }
                    validIcon={ <Icon name='check' size={18} color='green' /> }
                    invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                    value={name}
                    valid={nameValid}
                    message={name && !nameValid ? 'Please fill your name' : null}
                    onChangeText={(text) => { this.setState({name: text}) }}
                />
                <InlineTextInput
                    title='邮箱'
                    placeholder=' zkdj@junquan.com.cn'
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    style={{ borderColor: 'gray' }}
                    titleStyle={{ color: 'dimgray' }}
                    inputStyle={{ color: 'slategray' }}
                    messageStyle={{ color: 'red' }}
                    icon={ <Icon name={'mail-outline'} size={18} color={'steelblue'} /> }
                    validIcon={ <Icon name='check' size={18} color='green' /> }
                    invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                    value={email}
                    valid={emailValid}
                    message={email && !emailValid ? '请输入有效的邮箱地址' : null}
                    onChangeText={(text) => { this.setState({email: text}) }}
                />
                <InlineTextInput
                    title='手机号'
                    placeholder='输入手机号码'
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='numbers-and-punctuation'
                    //secureTextEntry={true}
                    style={{ borderColor: 'gray' }}
                    titleStyle={{ color: 'dimgray' }}
                    inputStyle={{ color: 'slategray' }}
                    messageStyle={{ color: 'red' }}
                    icon={ <Icon name={'phone'} size={18} color={'steelblue'} /> }
                    validIcon={ <Icon name='check' size={18} color='green' /> }
                    invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                    value={phoneNumber}
                    valid={phoneNumberValid}
                    message={phoneNumber && !phoneNumberValid ? '请输入有效的手机号码' : null}
                    onChangeText={(text) => { this.setState({phoneNumber: text}) }}
                />
                <InlineTextInput
                    title='单位名称'
                    placeholder='输入单位名称'
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={{ borderColor: 'gray' }}
                    titleStyle={{ color: 'dimgray' }}
                    inputStyle={{ color: 'slategray' }}
                    messageStyle={{ color: 'red' }}
                    icon={ <Icon name={'home'} size={18} color={'steelblue'} /> }
                    validIcon={ <Icon name='check' size={18} color='green' /> }
                    invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                    value={ optionName }
                    valid={optionNameValid}
                    message={optionName && !optionNameValid ? '输入单位名称' : null}
                    onChangeText={(text) => { this.setState({optionName: text}) }}
                />
                <InlineTextInput
                    title='省份'
                    placeholder='填写省份'
                    autoCorrect={false}
                    autoCapitalize='none'
                    //secureTextEntry={true}
                    style={{ borderColor: 'gray' }}
                    titleStyle={{ color: 'dimgray' }}
                    inputStyle={{ color: 'slategray' }}
                    messageStyle={{ color: 'red' }}
                    icon={ <Icon name={'map'} size={18} color={'steelblue'} /> }
                    validIcon={ <Icon name='check' size={18} color='green' /> }
                    invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                    value={provincesName}
                    valid={provincesNameValid}
                    message={provincesName && !provincesNameValid ? 'Password too short' : null}
                    onChangeText={(text) => { this.setState({provincesName: text}) }}
                />
            </StatelessForm>
        )
    }
}

