/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow


import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';
import Tabbar from './app/page/TabbarView';
// import {toastShort} from './app/component/Toast';
 import LoginView from './app/page/LoginView'
export default class guanjiaapp extends Component {
  // componentDidMount(){
  //     //get方法，只填写url参数
  //     fetch('http://172.168.30.38:3000/isLogin')
  //     //上面一行会返回响应对象，即response
  //         .then((response)=>response.json())
  //         //response.json()将返回一个json类型对象
  //         .then((json)=>{
  //             this.setState({source:json});
  //             //注意我们在Promise调用链的最后调用了done() —— 这样可以抛出异常而不是简单忽略。
  //         }).done();
  // }
  // constructor (props) {
  //     super (props);
  //     this.state = {
  //         source:{},
  //         single:0,
  //     };
  // }

  render() {
    // if (this.state.source.status == 1){
    //     var defaultName = 'MainView';
    //     var defaultComponent = MainView;
    // }else {
    var defaultName = 'LoginView';
    var defaultComponent = LoginView;
    // toastShort(this.state.source.status);
    //     Alert.alert("取到的是",this.state.source.status);
    // }
*/

//     return (
//         <Navigator
//             initialRoute={{
//               name: defaultName,
//               component: defaultComponent
//             }}
//             configureScene={(route)=> {
//               {/*return Navigator.SceneConfigs.VerticalDownSwipeJump;*/}
//               return Navigator.SceneConfigs.FloatFromRight;//右滑返回
//               gestures: {}//禁止右滑返回
//             }}
//             renderScene={(route, navigator)=> {
//               let Component = route.component;
//               return <Component {...route.params} navigator={navigator}/>
//             }}
//         />
//     );
//   }
// }

import {AppRegistry} from 'react-native';
import Navigator from './app/component/Navigator'
AppRegistry.registerComponent('guanjiaapp', () => Navigator);