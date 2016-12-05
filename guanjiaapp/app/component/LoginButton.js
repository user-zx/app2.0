/**
 * Created by jiahailiang on 2016/11/22.
 */
import React, { Component } from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import px2dp from '../util/px2db'
export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressCallback} style={LoginStyles.loginTextView}>
                <Text style={LoginStyles.loginText} >
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        );
    }
}
const LoginStyles = StyleSheet.create({

    loginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        width:px2dp(40),
    },
    loginTextView: {
        marginTop: px2dp(10),
        height:px2dp(50),
        backgroundColor: '#3281DD',
        borderRadius:px2dp(5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
});
