/**
 * Created by jiahailiang on 2016/12/15.
 */
import Icon from './left_icon';
import React,{Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Header extends Component{

    _pop(){
        this.props.navigator.pop();
    }
    render(){
        var obj = this.props.initObj;

        return(

            <View style={[styles.header,styles.row,styles.center]}>
                <TouchableOpacity style={[styles.row,styles.center]} onPress={this._pop.bind(this)}>
                    <Icon/>
                    <Text style={styles.fontFFF}>{obj.backName}</Text>
                </TouchableOpacity>
                <View style={[styles.title,styles.center]}>
                    <Text style={[styles.fontFFF,styles.titlePos]} numberOfLines={1}>{obj.title}</Text>
                </View>
            </View>
        )
    }

};
const styles = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    title:{
        flex:1,
    },
    titlePos:{
        marginLeft:-20,
        width:200
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    fontFFF:{
        color:'#fff',
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center'
    },
    header:{
        height:64,
        backgroundColor:'#3497FF'
    }
});