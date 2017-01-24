import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,   //使用Animated组件
    Easing,     //引入Easing渐变函数
    Dimensions,
    Image,
} from 'react-native';

export default class AnimaStion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //grassTransY : new Animated.Value(Dimensions.get('window').height/2),
            bigDogeTrans : new Animated.ValueXY({
                x: 100,
                y: 0
            })
        }
    }

    componentDidMount() {
        this.startAnimated();
        // this.interval = setInterval()
    }

    startAnimated(){
        var timing = Animated.timing;
        Animated.parallel([
            // timing(this.state.grassTransY, {
            //     toValue: 200,
            //     duration: 1000,
            //     easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
            // }),
            timing(this.state.bigDogeTrans, {
                toValue: {
                    x : 100,
                    y : 200
                },
                duration: 2000,
                //delay: 1000
            })
        ]).start(()=>this.startAnimated());
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.doges, {transform: this.state.bigDogeTrans.getTranslateTransform()}]} >
                    <Image source={require('../imageForCamera/qrcode_scan_light_green@2x.png')}/>
                </Animated.View>

                {/*<Animated.View style={[styles.grass, {transform: [{translateY: this.state.grassTransY}]}]}></Animated.View>*/}

            </View>


        );
    }
}

var styles = StyleSheet.create({
    grass: {
        position: 'absolute',
        width:  Dimensions.get('window').width,
        backgroundColor: '#fff',
        height: 240
    },
    doges: {
        position: 'absolute'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#73B9FF'
        backgroundColor: '#666666'
    }
});
