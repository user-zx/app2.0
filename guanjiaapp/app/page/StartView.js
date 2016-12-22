/**
 * Created by jiahailiang on 2016/12/16.
 */
import Seting from '../util/Seting';
import Search from './Search';
import SearchURL from '../component/Service';
import {NavGoBack} from '../component/NavGoBack';
import Header from '../component/Header'
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListVeiw,
    Image,
    TouchableOpacity,
} from 'react-native';
export default class StartView extends Component{
   // ds = new ListVeiw.DataSource({rowHasChanged:(r1,r2) =>r1 !== r2});
    constructor(props){
        super(props);
        this.state={
            // dataSource:this.ds.cloneWithRows([]),
            // keywords:'功夫熊猫',
            // show:false
        }
    }
    render(){
        return(
            <View>
                <View>
                    <Header
                    navigator={this.props.navigator}
                    initObj={{
                        backName:this.props.backName,
                        title:'我的星标'
                    }}
                    />
                </View>
            </View>
        )
    }
}