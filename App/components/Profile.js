import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

import Badge from './Badge';
import Divdir from './Helpers/divdir';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
});

class Profile extends React.Component{
    getRowTitle(userInfo, item){
        item = (item === 'public_repos') ? item.replace('_', ' ') : item;
        return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
    }
    createList(userInfo, topicArr){
        return topicArr.map( (item, index) => {
            if(!userInfo[item]){
                return <View key={index}></View>
            }else{
                return (
                    <View style={styles.rowContainer}>
                        <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
                        <Text style={styles.rowContent}> {userInfo[item]} </Text>
                        <Divdir></Divdir>
                    </View>
                );
            }
        })
    }
    render(){
        const userInfo = this.props.userInfo;
        const topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];

        return (
            <ScrollView style={styles.container} >
                <Badge userInfo={this.props.userInfo} />
                {this.createList(userInfo, topicArr)}
            </ScrollView>
        );
    }
}

Profile.propTypes = {
    userInfo: React.PropTypes.object.isRequired
}

module.exports = Profile;