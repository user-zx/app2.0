/**
 * Created by jiahailiang on 2016/12/15.
 */
import Seting from '../util/Seting';
import px2dp from '../util/px2db'
import React,{Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
export default class left_icon extends Component{
    render(){
        return(
            <View>
                <View style={styles.go}></View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
   go:{
       borderBottomWidth: 4*Seting.pixel,
       borderLeftWidth: 4*Seting.pixel,
       width: px2dp(15),
       height:px2dp(15),
       transform:[{rotate:'45deg'}],
       borderColor:'#FFF',
       marginLeft:px2dp(10)
   }
});