import React from 'react';
import {
    View,
    WebView,
    StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column',
    },
});

class Web extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <WebView source={{uri: this.props.url}} />
            </View>
        );
    }
}

Web.propTypes = {
    url: React.PropTypes.string.isRequired
};

module.exports = Web;