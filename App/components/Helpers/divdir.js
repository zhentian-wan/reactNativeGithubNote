import React from 'react';
import {View, StyleSheet} from 'react-native';

var styles = StyleSheet.create({
    divdir: {
        height: 1,
        backgroundColor: '#E4E4E4',
        flex: 1,
        marginLeft: 15
    },
});

class Divdir extends React.Component{
    render(){
        return (
            <View style={styles.divdir} />
        );
    }
};

module.exports = Divdir;