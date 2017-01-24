/**
 * Created by jiahailiang on 2016/12/15.
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
    get: function (url,successCallback,failCallback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                console.log(responseText);
                successCallback(JSON.parse(responseText));
            })
            .catch(function (err) {
                failCallback(err);
            })
    },
    //loading:<ActivityIndicatorIOS color="#3E00FF" style={{marginTop:40}} />\
    loginStyle:false,
};