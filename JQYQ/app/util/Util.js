/*
/!**
 * Created by jiahailiang on 2017/3/9.
 *!/
'use strict';
export default class Util {
    /!**
     * 路径扩展
     *!/
    static pathExtension(fileName) {
        if(typeof(fileName) !== 'string') {
            console.warn("请传递字符串");
            return "";
        }
        var lastIndex = fileName.lastIndexOf(".");
        if(lastIndex === -1) {
            return "";
        }
        if(lastIndex + 1 >= fileName.length) {
            return "";
        }
        return fileName.slice(lastIndex + 1);
    }

    /!**
     * 路径最后一部分
     *!/
    static lastPathCompoent(url) {
        if(typeof(url) !== 'string') {
            console.warn("请传递字符串");
            return "";
        }
        var lastIndex = url.lastIndexOf("/");
        if(lastIndex === -1) {
            return "";
        }
        if(lastIndex + 1 >= url.length) {
            return "";
        }
        return url.slice(lastIndex + 1);
    }

    /!**
     * 去掉路径最后一部分
     *!/
    static deletingLastPathCompoent(url) {
        if(typeof(url) !== 'string') {
            console.warn("请传递字符串");
            return "";
        }
        var lastIndex = url.lastIndexOf("/");
        if(lastIndex === -1) {
            return "";
        }
        return url.substring(0, lastIndex);
    }
}
*/
/**
 * Created by jiahailiang on 2017/3/9.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    ListView,
    View,
    Text,
    Image,
} from 'react-native';

var BASE_URL = 'https://api.github.com/search/repositories?q=';

export default class PublicsentDay11 extends Component{
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    _dataArr = [];
    constructor (props){
        super(props);
        this.state={
            //dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
            dataSource:this._dataSource.cloneWithRows(this._dataArr),
        }
    }

    render() {

        var content;
        if (this.state.dataSource.getRowCount() === 0) {
            content =
                <Text style={styles.blanktext}>
                    输入关键字
                </Text>;
        } else {
            content =
                <ListView
                    ref="listview"
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    automaticallyAdjustContentInsets={false}
                    keyboardDismissMode="onDrag"
                    keyboardshouldPersistTaps={true}
                    showsVerticalScrollIndicator={false}  />;
        }
        return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Search for a project..."
                    style={styles.searchBarInput}
                    onEndEditing={this.onSearchChange} />
                {content}
            </View>
        );
    }

    renderRow(repo) {
        return (
            <View>
                <View style={styles.row}>
                    <Image
                        source={{uri: repo.owner.avatar_url}}
                        style={styles.profpic} />
                    <View style={styles.textcontainer}>
                        <Text style={styles.title}>{repo.name}</Text>
                        <Text style={styles.subtitle}>{repo.owner.login}</Text>
                    </View>
                </View>
                <View style={styles.cellBorder} />
            </View>
        );
    }

    onSearchChange(event) {
        var searchTerm = event.nativeEvent.text.toLowerCase();
        var queryURL = BASE_URL + encodeURIComponent(searchTerm);
        fetch(queryURL)
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.items) {
                    this._dataArr = responseData.items;
                    this.setState({
                        dataSource:this._dataSource.cloneWithRows(resArr)
                    });
                }
            })
            .done();
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchBarInput: {
        marginTop: 30,
        padding: 5,
        fontSize: 15,
        height: 30,
        backgroundColor: '#EAEAEA',
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginLeft: 4,
    },
    profpic: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    textcontainer: {
        paddingLeft: 10,
    },
    blanktext: {
        padding: 10,
        fontSize: 20,
    },
});
