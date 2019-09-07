import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import {ToastAndroid} from 'react-native';

export default class AddItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            valid: true,
            loading: false
        }
    }

    /* Validate Input Field */
    changeNameHandler = value => {
        numbers = /.*[0-9].*/;
        if(numbers.test(value)){
            this.setState({"name": "", "valid": false});       
        }else{
            this.setState({"name": value, "valid": true});
        }
    }

    /* set loading and send request to store data */
    submitHandler = event => {
        event.preventDefault();
        this.setState({
            "loading": true
        }, () => {
            this.store();
        });    
    }

    errorHandler = () => {
        this.setState({"loading": false});   
    }

    successHandler = () => {
        this.setState({"loading": false, "name": null});
        ToastAndroid.show('Done Successfully', ToastAndroid.SHORT);
    }

    /* Store Data (Send data to dummy server) */
    store = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,         
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.successHandler();
            console.log("Success", responseJson);         
        })
        .catch((error) => {
            this.errorHandler();
            console.error("Error", error);
        });
    }

    render(){  
        return (
            <View style={styles.container}>       
                <TextInput style = {styles.input}
                    placeholder = "Item name"
                    placeholderTextColor = "#CCC"
                    autoCapitalize = "none"
                    name = "name"
                    onChangeText = {this.changeNameHandler}
                />
                {this.state.valid ? null : <Text style={styles.error}>Number not allowed</Text>}
                <Button
                    title = "Add"                               
                    buttonStyle = {{marginTop: 15, borderRadius: 5, backgroundColor : "#1D7281"}}
                    disabled = {!this.state.name}
                    loading = {this.state.loading}
                    onPress = {this.submitHandler}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    input: {     
        height: 40,
        borderColor: '#CCC',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5
    },
    error: {
        color: "#FF0000"
    }
});
