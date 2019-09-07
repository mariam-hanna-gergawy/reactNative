import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
  container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#CCC',
      backgroundColor: '#fff',
      borderWidth: 1,
      padding: 5,
      borderRadius: 5
   }
});


export default class AddItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      loading: false
    }
  }

  changeNameHandler = value => {
      alpha = /^[a-zA-Z]+$/;
      if(!alpha.test(value)){
        value = "";
      }
      this.setState({"name": value});
      
  }


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
    this.setState({"loading": false});   
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

                <Button
                  title = "Add"                               
                  buttonStyle = {{borderRadius: 5, margin: 15, backgroundColor : "#1D7281"}}
                  disabled = {!this.state.name}
                  loading = {this.state.loading}
                  onPress = {this.submitHandler}
          />
      </View>
    );
  }
}