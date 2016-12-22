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
    Dimensions
} from 'react-native';

import px2dp from '../util/px2db';
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
var {width,height} = Dimensions.get('window');

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
   ChangeName(){
       console.log('哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈')
   }
   ChangePassword(){
        console.log('呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵')
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
           <View style={{ flex:1 ,flexDirection:'column' , backgroundColor:'#F2F2F2'}}>
               <View>
               <NavigationBar
               title={titleConfig}
               tintColor={'rgb(61,171,236)'}
               leftButton={leftButtonConfig}
               />
               </View>
                <View style={styles.TabViewStyle}>
                    <TouchableOpacity onPress={this.ChangeName.bind(this)}>
                    <View style={styles.smallViewStyle}>
                        <Text style={styles.textViewStyles}>用户名</Text>
                        <Text style={styles.textViiewSmall}>张鑫</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.ChangePassword.bind(this)}>
                    <View style={styles.smallViewStyle}>
                        <Text style={styles.textViewStyles}>密码</Text>
                        <Text style={styles.textViiewSmall}>密码隐藏不可见</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.ChangePassword.bind(this)}>
                    <View style={styles.smallViewStyle}>
                        <Text style={styles.textViewStyles}>到期时间</Text>
                        <Text style={styles.textViiewSmall}>2036.7.12</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.ChangePassword.bind(this)}>
                    <View style={styles.smallViewStyle}>
                        <Text style={styles.textViewStyles}>行业</Text>
                        <Text style={styles.textViiewSmall}>企业行业</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.ChangePassword.bind(this)}>
                        <View style={styles.smallViewStyle}>
                            <Text style={styles.textViewStyles}>单位</Text>
                            <Text style={styles.textViiewSmall}>中国老司机科技有限公司</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.ChangePassword.bind(this)}>
                        <View style={styles.smallViewStyle}>
                            <Text style={styles.textViewStyles}>邮箱</Text>
                            <Text style={styles.textViiewSmall}>110112114119@163.com</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.ChangePassword.bind(this)}>
                        <View style={styles.smallViewStyle}>
                            <Text style={styles.textViewStyles}>省份</Text>
                            <Text style={styles.textViiewSmall}>内蒙古大帝国</Text>
                        </View>
                    </TouchableOpacity>
                </View>
           </View>
           )


   }

}

const styles = StyleSheet.create({

    TabViewStyle:{
        flexDirection:'column',
        flex:1,
        alignItems:'flex-start'
    },
    smallViewStyle:{
        flexDirection:'row',
        backgroundColor:'#FFF',
        borderBottomWidth:1,
        borderBottomColor:'#F2F2F2',
        width:width,
        justifyContent:'space-between'
    },
    textViewStyles:{
        fontSize:14,
        margin:px2dp(20),
        alignSelf:'center',
    },
    textViiewSmall:{
        fontSize:12,
        alignSelf:'center',
        margin:px2dp(20),
        color:'#666666',
    },
});

