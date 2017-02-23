/**
 * Created by jiahailiang on 2017/1/18.
 */
import Dimensions from 'Dimensions'
import React,{
    PixelRatio,
    // ActivityIndicatorIOS
} from 'react-native'
module.exports = {
    pixel: 1/PixelRatio.get(),
    size:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    //loading:<ActivityIndicatorIOS color="#3E00FF" style={{marginTop:40}} />\
    loginStyle:false,
};