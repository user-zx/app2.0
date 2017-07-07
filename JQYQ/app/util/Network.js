/**
 * Created by jiahailiang on 2017/2/8.
 */
import {ServerBaseURL} from './GlobalConst';
//import {toastShort} from '../component/Toast';
import makeCancelable from '../util/MakeCancelable';
import {load} from '../page/LoginView';
module.exports = {
    /**
     * 基于fetch的get方法
     * @method get
     * @param {object} params 请求参数
     * @param {string} url 传递API中的参数
     * @param {function} callback 请求成功回调
     */
    get(url, params, successCallback, failCallback){
        url = ServerBaseURL + url;

        //遍历参数组成字符串
        var keyArray = Object.keys(params);
        var array = [];
        for(var i = 0; i < keyArray.length; i++) {
            var key = keyArray[i];
            array.push(key+'='+params[key]);
        }
        if(array.length > 0) {
            var paramString = array.join('&');
            url = url + '?' + paramString;
        }
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                // alert(responseText);
                var response = JSON.parse(responseText);
                if(response.status == 0) {
                    successCallback(response);
                }
                else {
                    failCallback(response.message);
                }
            })
            .catch(function(err){
                failCallback(String(err));
            });
    },

    post(url, params, successCallback, failCallback){
        url = ServerBaseURL + url;

        load('userInfo',(responce)=>{
            if (responce.status === 200){
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'pomptoken':responce.token

                    },
                    body: JSON.stringify(params)
                }).then((response) => response.text())
                    .then((responseText) => {
                        var response = JSON.parse(responseText);
                        if(response.status == 0) {
                            successCallback(response);
                        }else{
                            failCallback(response.message);
                        }
                    })
                    .catch(function(err){
                        //failCallback(String(err));
                        //toastShort(err);
                    });
            }else {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        //'pomptoken':token

                    },
                    body: JSON.stringify(params)
                }).then((response) => response.text())
                    .then((responseText) => {
                        var response = JSON.parse(responseText);
                        if(response.status == 0) {
                            successCallback(response);
                        }else{
                            failCallback(response.message);
                        }
                    })
                    .catch(function(err){
                        //failCallback(String(err));
                        //toastShort(err);
                    });
            }
        });




    },
    postCancel(url, params, successCallback, failCallback){
        url = ServerBaseURL + url;
        let _this = this;
        _this.cancelable=makeCancelable(fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }));
        _this.cancelable.promise
            .then((response) => response.text())
            .then((responseText) => {
                var response = JSON.parse(responseText);
                if(response.status == 0) {
                    successCallback(response);
                }else{
                    failCallback(response.message);
                }
            }).catch(function(err){
                //failCallback(String(err));
                //toastShort(err);
            });
        setTimeout(function () {
            //_this.cancelable.cancel();
        },2000);
    },
    postSecond(url, params, successCallback, failCallback){
        url = ServerBaseURL + url;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: params
        }).then((response) => response.text())
            .then((responseText) => {
                var response = JSON.parse(responseText);
                if(response.status == 0) {
                    successCallback(response);
                }
                else {
                    failCallback(response.message);
                }
            })
            .catch(function(err){
                failCallback(String(err));

            });
    },
    postURL(url, params, successCallback, failCallback){
        url = ServerBaseURL + url;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }).then((response) => response.text())
            .then((responseText) => {
                var response = JSON.parse(responseText);
                if(response) {
                    successCallback(response);
                }else{
                    failCallback(response.message);
                }
            })
            .catch(function(err){
                failCallback(String(err));
            });
    },

    getURL(url, params, successCallback, failCallback){
        url = 'http://120.55.190.38:8002/ficfile/' + url;

        //遍历参数组成字符串
        var keyArray = Object.keys(params);
        var array = [];
        for(var i = 0; i < keyArray.length; i++) {
            var key = keyArray[i];
            array.push(key+'='+params[key]);
        }
        if(array.length > 0) {
            var paramString = array.join('&');
            url = url + '?' + paramString;
        }
        fetch(url)
            .then((response) => {
                if(response) {
                    successCallback(response);
                }
                else {
                    failCallback(response.message);
                }
            })
            .catch(function(err){
                failCallback(String(err));
            });
    },

};
