import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';

import Profile from './Profile';
import Repos from './Repos';
import Notes from './Notes';
import api from '../utils/api';


var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1
    },
    image: {
        height: 350,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    }
});

class Dashboard extends React.Component{
    makeBackground(btn){
        var obj = {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            flex: 1
        }
        if(btn === 0){
            obj.backgroundColor = '#48BBEC';
        } else if (btn === 1){
            obj.backgroundColor = '#E77AAE';
        } else {
            obj.backgroundColor = '#758BF4';
        }
        return obj;
    }
    goToProfile(){
        this.props.navigator.push({
            title: 'Profile',
            component: Profile,
            passProps: {userInfo: this.props.userInfo}
        });
    }
    goToRepos(){
        api.getRepos(this.props.userInfo.login)
            .then((res)=>{
                this.props.navigator.push({
                    title: 'Profile',
                    component: Repos,
                    passProps: {
                        userInfo: this.props.userInfo,
                        repos: res
                    }
                });
            })
    }
    goToNotes(){
        this.props.navigator.push({
            title: 'Notes',
            component: Notes,
            passProps: {
                userInfo: this.props.userInfo
            }
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
                <TouchableHighlight
                    style={this.makeBackground(0)}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}>View Profile</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(1)}
                    onPress={this.goToRepos.bind(this)}
                    underlayColor="#E39EBF">
                    <Text style={styles.buttonText}>View Repositories</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(2)}
                    onPress={this.goToNotes.bind(this)}
                    underlayColor="#9BAAF3">
                    <Text style={styles.buttonText}>Take Notes</Text>
                </TouchableHighlight>
            </View>
        )
    }
};

module.exports = Dashboard;