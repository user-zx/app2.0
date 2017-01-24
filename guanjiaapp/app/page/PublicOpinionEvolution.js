/**
 * Created by jiahailiang on 2016/12/5.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Animated,
    Easing,
} from 'react-native';
import Camera from 'react-native-camera';
import {toastShort} from '../component/Toast'

export default class PublicOpinionEvolution extends React.Component {
    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.sretch,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
                //设置 am 初始化值
                fadeAnim: new Animated.Value(0), // init opacity 0
            },
            isRecording: false
        };


    }

    componentDidMount() {
        //在初始化渲染执行之后立刻调用动画执行函数
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 1},
        ).start();
    }



    onBarCodeRead=(e)=>{
        console.log(e.data);
        toastShort(e.data)
    };
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={this.state.camera.aspect}
                        captureTarget={this.state.camera.captureTarget}
                        type={this.state.camera.type}
                        flashMode={this.state.camera.flashMode}
                        defaultTouchToFocus
                        mirrorImage={false}
                        onBarCodeRead={this.onBarCodeRead}
                    />
                </View>

                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Animated.View
                        style={{
                            opacity: this.state.fadeAnim, // Binds directly
                            transform: [{
                                translateY: this.state.fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                                }),
                            }],
                        }}>
                        {this.props.children}
                    </Animated.View>
                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.4)',
        flexDirection:'row'
    },
    preview: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:200,
        height:200
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
});

