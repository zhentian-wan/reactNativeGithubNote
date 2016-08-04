import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableHighlight, NavigatorIOS} from 'react-native';

import Badge from './Badge';
import Web from './Helpers/Web_View';
import Divdir from './Helpers/divdir';

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});

class Repos extends React.Component{
    openPage(url){
        this.props.navigator.push({
            component: Web,
            title: 'Web View',
            passProps: {url}
        });
    }
    render(){
        var list = this.props.repos.map((repo, index) => {
            const desc = repo.description ? <Text style={styles.description}> {repo.description} </Text> : <View />;
            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                            onPress={this.openPage.bind(this, repo.html_url)}
                            underlayColor='transparent'>
                            <Text style={styles.name}>{repo.name}</Text>
                        </TouchableHighlight>
                        <Text style={styles.stars}> Stars: {repo.stargazers_count} </Text>
                        {desc}
                        <Divdir></Divdir>
                    </View>
                </View>
            )
        });
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo} />
                {list}
            </ScrollView>
        )
    }
};

Repos.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    repos: React.PropTypes.array.isRequired
};


module.exports = Repos;