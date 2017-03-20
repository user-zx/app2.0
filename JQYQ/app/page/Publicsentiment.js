/**
 * Created by jiahailiang on 2017/1/23.
 */

import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
import PublicsentDay from './PublicsentDay';
import PublicsentWeek from './PublicsentWeek';
import PublicsentMonth from './PublicsentMonth';
//import AnimaStion from './AnimaStion'
export default class Affair extends Component{
    constructor(props){
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            title:'',
            id:'',
        }
    }
    componentDidMount(){
        this.setState({
            title:'舆情报告',
            id:this.props.id
        });
    }
    buttonGoBack() {
        const {navigator} = this.props;
        return NavGoBack(navigator);
    }
    render(){
        const liftButtonConfig = {
            title: '←',
            handler: () => this.buttonGoBack(),
            fontSize:32,
            tintColor: '#FFF'
        };
        const titleConfig = {
            title:this.state.title,
            color:'#FFF',
            //fontSize:20
            tintColor:'#FFF'
        };
        return(
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        leftButton={liftButtonConfig}
                        tintColor={'#18242e'}
                    />
                </View>
                <View style={{flex:1,}}>
                    <ScrollableTabView
                        tabBarPosition='top'
                        renderTabBar={() => <DefaultTabBar/>}
                        tabBarUnderlineColor='#0ca6ee'
                        tabBarBackgroundColor='#18242e'
                        tabBarActiveTextColor='#0ca6ee'
                        tabBarInactiveTextColor='#99ffff'
                        tabBarTextStyle={{fontSize: 15}}
                    >
                        <PublicsentDay tabLabel='舆情日报' {...this.props}/>
                        <PublicsentWeek tabLabel='舆情周报' {...this.props}/>
                        <PublicsentMonth tabLabel='舆情月报' {...this.props}/>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }
}
