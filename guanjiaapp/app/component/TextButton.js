/**
 * Created by jiahailiang on 2016/11/29.
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
export default class TextButton extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressResister} style={textStyles.TextView}>
                <Text style={textStyles.Text} >
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        );
    }
}
const textStyles = StyleSheet.create({

    Text: {
        color: '#ffffff',
        fontWeight: 'bold',
        width:px2dp(80),
        fontSize:14
    },
    TextView: {
        marginTop: px2dp(10),
        height:px2dp(30),
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius:px2dp(5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
});
