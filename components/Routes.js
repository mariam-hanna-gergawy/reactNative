import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ListItems from './ListItems.js';
import AddItem from './AddItem.js';

const Routes = () => (
   <Router>
      <Scene key = "root">
      		<Scene key = "ListItems" component = {ListItems} title = "Items" initial = {true} />
        	<Scene key = "AddItem" component = {AddItem} title = "Add Item" />
      </Scene>
   </Router>
)
export default Routes