/**
 * Created by jiahailiang on 2017/1/23.
 */

import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,

} from 'react-native';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';
import POArticles from './PublicOpinionArticles';
import POChatrs from './PublicOpinionCharts';
import POEvolution from './PublicOpinionEvolution';
import POSpecial from './PublicOpinionSpecial';
//import AnimaStion from './AnimaStion'
export default class Affair extends Component{
    constructor(props){
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
            title:'',
        }
    }
    componentDidMount(){
        this.setState({
            title:this.props.title,
        })
    }
    buttonGoBack() {
        const {navigator} = this.props;
        return NavGoBack(navigator);
    }
    render(){
        const liftButtonConfig = {
            title:'返回',
            handler:() => this.buttonGoBack(),
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
                        <POArticles tabLabel='文章' {...this.props}/>
                        <POChatrs tabLabel='图表' {...this.props}/>
                        <POEvolution tabLabel='专报' {...this.props}/>
                        <POSpecial tabLabel='导控' {...this.props}/>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }
}
