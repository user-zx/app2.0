/**
 * Created by jiahailiang on 2017/2/8.
 */
'use strict';

//导入react-native-storage框架，进行本地存储
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
    //最大容量1000条数据
    size: 1000,
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    //默认过期时间，永不过期
    defaultExpires: null,
    //读写时在内存中缓存数据
    enabledCache: true,
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    sync: {}
});

class BGGlobal {
    constructor() {
        //读取所有属性
        storage.load({
            key: "userInfo"
        })
            .then( userInfo => {
                //是否登陆
                this.isLogin = true;
                this.globalUserInfo = userInfo;
            })
            .catch(err => {
                this.isLogin = false;
                this.globalUserInfo = '';
            });

        storage.load({
            key: "passCode"
        })
            .then( passCode => {
                this.globalPassCode  = passCode;
            })
            .catch(err => {
                this.globalPassCode = '';
            });
        storage.load({
            key: "propsID"
        })
            .then( propsID => {
                this.globalpropsID  = propsID;
            })
            .catch(err => {
                this.globalpropsID = '';
            });

        storage.load({
            key: "isDidLogin"
        })
            .then( isDidLogin => {
                this.globalIsDidLogin = isDidLogin;
            })
            .catch(err => {
                this.globalIsDidLogin = false;
            });

        storage.load({
            key: "deviceToken"
        })
            .then( deviceToken => {
                this.globalDeviceToken = deviceToken;
            })
            .catch(err => {
                this.globalDeviceToken = '';
            });
        storage.load({
            key: "searchString"
        })
            .then( searchString => {
                this.globalsearchString = searchString;
            })
            .catch(err => {
                this.globalsearchString = '';
            });
    }

    set userInfo(userInfo) {
        this.isLogin = true;
        this.globalUserInfo = userInfo;
        storage.save({
            key: 'userInfo',
            rawData: userInfo
        });
    }
    set propsID(propsID) {
        this.globalporpsID = propsID;
        storage.save({
            key: 'propsID',
            rawData: propsID
        });
    }

    set passCode(passCode) {
        this.globalPassCode = passCode;
        storage.save({
            key: 'passCode',
            rawData: passCode
        });
    }
    set isDidLogin(isDidLogin) {
        this.globalIsDidLogin = isDidLogin;
        storage.save({
            key: 'isDidLogin',
            rawData: isDidLogin
        });
    }
    set deviceToken(deviceToken) {
        this.globalDeviceToken = deviceToken;
        storage.save({
            key: 'deviceToken',
            rawData: deviceToken,
        });
    }
    set searchString(searchString) {
            this.globalsearchString = searchString;
            storage.save({
                key: 'searchString',
                rawData: searchString,
            });
        }

    get userInfo() {
        return this.globalUserInfo;
    }
    get passCode() {
        return this.globalPassCode;
    }
    get isDidLogin() {
        return this.globalIsDidLogin;
    }
    get deviceToken() {
        return this.globalDeviceToken;
    }
    get propsID() {
        return this.globalporpsID;
    }
    get searchString() {
            return this.globalsearchString;
        }


    // clearUserInfo() {
    //     this.isLogin = false;
    //     storage.remove({
    //         key: 'userInfo'
    //     });
    //     storage.remove({
    //         key: 'passCode'
    //     });
    // }
};

var global  = new BGGlobal();
module.exports = global;
