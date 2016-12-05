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
export default class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    render() {
        return (
            <View style={LoginStyles.TextInputView}>
                <TextInput style={LoginStyles.TextInput}
                           placeholder={this.props.name}
                           onChangeText={
                               (text) => {
                                   this.setState({text});
                                   this.props.onChangeText(text);
                               }
                           }
                />
            </View>
        );
    }
}


const LoginStyles = StyleSheet.create({
    TextInputView: {
        marginTop: px2dp(10),
        height:px2dp(50),
        backgroundColor: '#ffffff',
        borderRadius:px2dp(5),
        borderWidth:px2dp(0.3),
        borderColor:'#000000',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    TextInput: {
        backgroundColor: '#ffffff',
        height:px2dp(45),
        margin:px2dp(18),
    },
});
