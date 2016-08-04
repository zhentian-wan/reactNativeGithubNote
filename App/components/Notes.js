import firebase from 'firebase';
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    TextInput,
    TouchableHighlight
} from 'react-native';
import Badge from './Badge';
import Divdir from './Helpers/divdir';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});


// In the video there are a couple errors, fixed them so it would build.
class Notes extends React.Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.notes = [];
        this.state = {
            note: '',
            dataSource: null,
        };
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAs8HBqV2X6VIOE5MnDwENz1nRffNkUbiU",
            authDomain: "github-saver-9a338.firebaseapp.com",
            databaseURL: "https://github-saver-9a338.firebaseio.com",
            storageBucket: "github-saver-9a338.appspot.com",
        };
        firebase.initializeApp(config);
    }
    componentDidMount(){
        firebase.database().ref('notes/').on('child_added', (data)=>{
            this.notes.push(data.val());
        })
    }
    handleChange(e){
        this.setState({
            note: e.nativeEvent.text
        })
    }
    handleSubmit(){
        let note = this.state.note;
        firebase.database().ref('notes/').push({
            note,
            timestamp: +new Date()
        })
        this.setState({
            note: ''
        })
    }
    render(){

            var notesHtml = this.notes && this.notes.map((note, index)=>{
                return (
                    <View>
                        <Text key={index}>{note.note}</Text>
                        <Divdir />
                    </View>
                );
            });


        return (
            <View style={styles.container}>
                <Badge userInfo={this.props.userInfo}/>
                <View>
                    {notesHtml}
                </View>
                <View style={styles.footerContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.note}
                        onChange={this.handleChange.bind(this)}
                        placeholder="New Note" />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.handleSubmit.bind(this)}
                        underlayColor="#88D4F5">
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
};

Notes.propTypes = {
    userInfo: React.PropTypes.object.isRequired
};

module.exports = Notes;