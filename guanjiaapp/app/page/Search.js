/**
 * Created by jiahailiang on 2016/12/15.
 */
import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native'
import px2dp from '../util/px2db'
module.exports = React.createClass({
    render(){
        return(
          <View style={styles.flex_1}>
              <TextInput style={styles.input}
                         autoCapitalize='none'
                         clearButtonMode='while-editing'
                         {...this.props}
              />
          </View>
        );
    }
});
var styles = StyleSheet.create({
   flex_1:{
       flex:1
   } ,
    input:{
        borderBottomWidth:1,
        height:px2dp(40),
        borderColor:'#DDDDDD',
        paddingLeft:px2dp(5)

    }
});