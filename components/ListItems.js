import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ScrollView,
	FlatList, 
	ActivityIndicator,
	Alert
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import data from '../json/items.json';


export default class ListItems extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			items: []
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/posts', {//call it to get dummy data
			method: 'GET'
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("Success", responseJson);
			this.setState({
				isLoading: false,
				items: responseJson ? responseJson : data.items//if unable to get dummy data from server read it from json file
			});
		})
		.catch((error) => {//if unable to get dummy data from server read it from json file
			console.error("Error", error);
			this.setState({
				isLoading: false,
				items: data.items
			});
			console.log("Data", data.items);
		});

		
	}

	goToAddItem = () => {
    	Actions.AddItem();
   	}
	
	renderItem = ({item}) => {
		return (
			<Text style={styles.item}>{item.title}</Text>
		);
	}


	render(){
		const { items } = this.state;

	  	if(this.state.isLoading) {
			return(
				<View style={styles.loading}>
					<ActivityIndicator/>
				</View>
			);
    	}
		return (
			<View style={styles.container}>				
				{
					items.length ? 
					<ScrollView style={styles.itemsContainer}>
		  				<FlatList
		          			data={items}
		          			renderItem={this.renderItem}
		          			keyExtractor={(item, index) => index.toString()}
		        		/>    					        
					</ScrollView> : null				
				}

					<Button
			        	title=" Add new item"
			        	icon={
						    <Icon
						      name="plus-circle"
						      size={20}
						      color="white"
						    />
						 }
						iconLeft
			        	buttonStyle={styles.button}
			        	onPress={this.goToAddItem}
			        />
			</View>
		);
	}
}



const styles = StyleSheet.create({
		container: {
			flex: 1,		
			paddingTop: 22,
			backgroundColor: '#FAFAFA',
			padding: 20, 
		},
		itemsContainer: {
			backgroundColor: '#FFF',
		},
		item: {
		    padding: 10,
		    fontSize: 18,
		    height: 44,
	  	},
	  	loading: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center'
		},
		button: {
			borderRadius: 5, 			
			backgroundColor : "#00CCFF",
		}
});