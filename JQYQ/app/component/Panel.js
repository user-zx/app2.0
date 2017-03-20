/**
 * Created by jiahailiang on 2017/1/20.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Animated,
} from 'react-native';


            class Panel extends Component{
            constructor(props){
                super(props);

                this.icons = {
                    'up'    : require('../image/up.png'),
                    'down'  : require('../image/down.png')
                };

                this.state = {
                    title       : props.title,
                    expanded    : true,
                    animation   : new Animated.Value(),
                    title2      : props.title2,
                };
            }

            toggle(){
                let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
                    finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

                this.setState({
                    expanded : !this.state.expanded
                });

                this.state.animation.setValue(initialValue);
                Animated.spring(
                    this.state.animation,
                    {
                        toValue: finalValue
                    }
                ).start();
            }

            _setMaxHeight(event){
                this.setState({
                    maxHeight   : event.nativeEvent.layout.height
                });
            }

            _setMinHeight(event){
                this.setState({
                    minHeight   : event.nativeEvent.layout.height
                });
            }

            render(){
                let icon = this.icons['down'];

                if(this.state.expanded){
                    icon = this.icons['up'];
                }

                return (
                    <Animated.View
                        style={[styles.container,{height: this.state.animation}]}>
                        <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                            <Text style={styles.title}>{this.state.title}</Text>
                            <Text style={styles.title}>{this.state.title2}</Text>
                            <TouchableHighlight
                                onPress={this.props.onPress}
                            >
                                <Text style={styles.title}> {this.state.title2}</Text>

                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.button}
                                onPress={this.toggle.bind(this)}
                                underlayColor="#f1f1f1" >
                                <Image
                                    style={styles.buttonImage}
                                    source={icon} >
                                </Image>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                            {this.props.children}
                        </View>

                    </Animated.View>
                );
            }
        }

        var styles = StyleSheet.create({
            container   : {
                backgroundColor: '#fff',
                margin:10,
                overflow:'hidden'
            },
            titleContainer : {
                flexDirection: 'row',
                backgroundColor:'#666666',

            },
            title       : {
                flex    : 1,
                padding : 10,
                color   :'#333333',
                //fontWeight:'bold',
                fontSize:15,
            },
            button      : {
                //width:16,
                //height:16,
                //top:0,
                //left:60,
                marginTop:0,
                marginLeft:60
            },
            buttonImage : {
                //width   : 16,
               // height  : 16,
            },
            body        : {
                padding     : 10,
                paddingTop  : 0,
                backgroundColor:'red'
            }
        });

        export default Panel;
