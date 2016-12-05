/**
 * Created by jiahailiang on 2016/12/5.
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
        }
        const titleConfig = {
            title:this.state.title,
        }
        return(
            <View style={{flex:1}}>
                <View>
                    <NavigationBar
                    title={titleConfig}
                    leftButton={liftButtonConfig}
                    tintColor={'rgb(61,171,236)'}
                    />
                </View>

                    <ScrollableTabView
                        tabBarPosition='top'
                        renderTabBar={() => <DefaultTabBar/>}
                        tabBarUnderlineColor='#f00'
                        tabBarBackgroundColor='#00000000'
                        tabBarActiveTextColor='#f00'
                        tabBarInactiveTextColor='#000'
                        tabBarTextStyle={{fontSize: 17}}>
                        <POArticles tabLabel='文章' {...this.props}/>
                        <POChatrs tabLabel='图表' {...this.props}/>
                        <POEvolution tabLabel='专报' {...this.props}/>
                        <POSpecial tabLabel='导控' {...this.props}/>
                    </ScrollableTabView>
            </View>
        )
    }
}
