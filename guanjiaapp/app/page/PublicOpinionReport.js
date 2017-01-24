/**
 * Created by jiahailiang on 2016/12/20.
 */
//舆情报告
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    PanResponder,
} from 'react-native';
//import Storage from 'react-native-storage';
import px2dp from '../util/px2db';
import NavigationBar from 'react-native-navbar';
import {NavGoBack} from '../component/NavGoBack';

export default class PublicOpinionReport extends Component{
    constructor(props) {
        super(props);
        this.buttonGoBack = this.buttonGoBack.bind(this);
        this.state = {
                bg:'white',
                top:0,
                left:0,
        }
    }
    buttonGoBack(){
        const {navigator} = this.props;
        return NavGoBack(navigator);
    }
    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: ()=> true,
            onPanResponderGrant: ()=>{
                this._top = this.state.top;
                this._left = this.state.left;
                this.setState({bg: 'red'})
            },
            onPanResponderMove: (evt,gs)=>{
                console.log(gs.dx+' '+gs.dy);
                this.setState({
                    top: this._top+gs.dy,
                    left: this._left+gs.dx
                })
            },
            onPanResponderRelease: (evt,gs)=>{
                this.setState({
                    bg: 'white',
                    top: this._top+gs.dy,
                    left: this._left+gs.dx
                })}
        })
    }

    render(){
        const leftButtonConfig = {
            title:'返回',
            handler:()=>this.buttonGoBack(),
        };
        const titleConfig ={
            title:'舆情报告',
        };
        return(
            <View>
                <View>
                    <NavigationBar
                        title={titleConfig}
                        tintColor={'rgb(61,171,236)'}
                        leftButton={leftButtonConfig}
                    />
                </View>
                <View style={styles.container}>
                    <View  {...this._panResponder.panHandlers}
                           style={[styles.rect,{
                            "backgroundColor": this.state.bg,
                            "top": this.state.top,
                            "left": this.state.left
                        }]}>
                    </View>
                </View>
            </View>

        )


    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rect: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        position: 'absolute',
    }
});
