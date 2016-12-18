import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Animated, Easing} from 'react-native';

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#48BBEC',
        paddingBottom: 10
    },
    name: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 10,
        marginBottom: 5,
        color: 'white'
    },
    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white'
    },
    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    }
});

class Badge extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            bounceAnim: new Animated.Value(0)
        }
    }
    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 1, duration: 2000}
        ).start();
        Animated.timing(
            this.state.bounceAnim,
            {toValue: 1, duration: 2000, easing: Easing.bounce}
        ).start();
    }
    render(){
        const animatedTextStyle = {
            opacity: this.state.fadeAnim,
        };
        const animateImageStyle = {
            opacity: this.state.bounceAnim
        };
        return (
            <View style={styles.container}>
                <Animated.Image style={[styles.image, animateImageStyle]} source={{uri: this.props.userInfo.avatar_url}}></Animated.Image>
                <Animated.Text style={[styles.name,animatedTextStyle]}> {this.props.userInfo.name} </Animated.Text>
                <Animated.Text style={[styles.handle, animatedTextStyle]}> {this.props.userInfo.login} </Animated.Text>
            </View>
        )
    }
}

/**
 * Make sure when when user the Badge component, the userInfo object is there
 * @type {{userInfo: *}}
 */
Badge.propTypes = {
    userInfo: React.PropTypes.object.isRequired
};

module.exports=Badge;






