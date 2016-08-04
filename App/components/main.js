import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import api from '../utils/api';
import Dashboard from './Dashboard';

var style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor:'#8fefcc',
        borderColor:'white',
        borderWidth:1,
        borderRadius:8,
        marginBottom:10,
        alignSelf:'stretch',
        justifyContent:'center'
    }
});

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
          username: '',
          isLoading: false,
          error: false
        };
    }
    handleChange(event){
        this.setState({
            username: event.nativeEvent.text
        })
    }
    handleSubmit(event){
        //update our indicatorIOS spinner
        this.setState({
            isLoading: true
        });
        //fetch data from github
        api.getBio(this.state.username)
            .then( (res) => {
                if(res.message === "Not Found"){
                    this.setState({
                        error: 'User not found',
                        isLoading: false
                    })
                }else{
                    //Pass in a new router component
                    this.props.navigator.push({
                        title: res.name || 'Selet an Option',
                        component: Dashboard,
                        passProps: {userInfo: res}
                    });
                    //Clean the search input and loading
                    this.setState({
                        isLoading: false,
                        error: false,
                        username: ''
                    });
                }
            })
    }
    render(){
        const showError = (
            this.state.error ? <Text>User not found</Text>: <View></View>
                    );
       return (
           <View style={style.mainContainer}>
               <Text style={style.title}>Search for a Github User</Text>
               <TextInput
                 style={style.searchInput}
                 value={this.state.username}
                 onChange={this.handleChange.bind(this)}
               />
               <TouchableHighlight
                style={style.button}
                onPress={this.handleSubmit.bind(this)}
                underlayColor="white"
               >
                   <Text style={style.buttonText}>SEARCH USER</Text>
               </TouchableHighlight>
               <ActivityIndicator
                animating={this.state.isLoading}
                size="large"
                color="#111"
               />
               {showError}
           </View>
       )
    }
}