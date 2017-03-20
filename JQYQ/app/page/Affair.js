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
import POArticles from './PublicOpinionArticles';
import POChatrs from './PublicOpinionCharts';
import POEvolution from './PublicOpinionEvolution';
import POSpecial from './PublicOpinionSpecial';
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
            title:this.props.title,
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
            tintColor:'#FFF',
            style:{
                marginLeft:60,
                marginRight:60,
            },
            numberOfLines:0
        };
        return(
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        leftButton={liftButtonConfig}
                        tintColor={'#18242e'}
                        numberOfLines={1}

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
