/**
 * Created by jiahailiang on 2016/12/12.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';

import px2dp from '../util/px2db';
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';

export default class Selfinfo extends Component{
   constructor(props) {
       super(props);
       this.buttonGoBack = this.buttonGoBack.bind(this);
       this.state = {

       }
   }
   buttonGoBack(){
       const {navigator} = this.props;
       return NavGoBack(navigator);
   }

   render(){
       const leftButtonConfig = {
         title:'返回',
           handler:()=>this.buttonGoBack(),
       };
       const titleConfig ={
         title:'个人信息',
       };
       return(
           <View>
               <NavigationBar
               title={titleConfig}
               tintColor={'rgb(61,171,236)'}
               leftButton={leftButtonConfig}
               />
           </View>
           )


   }

}

const styles = StyleSheet.create({

});

