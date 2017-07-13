import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Text,
  View,
  StyleSheet,
  TabBarIOS
} from 'react-native';

export default class AppContainer extends Component {
  constructor(props){
    super(props);

    this.state ={
      selectedTab: 'feed'
    }

  }

  render(){
    return(

      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
            title="Feed"
            selected={this.state.selectedTab == 'feed'}
            icon={require('./img/octo.png')}

            onPress={()=> this.setState({selectedTab:'feed'})}>

            <Text style={styles.welcome}>This is the tab 1</Text>
        </TabBarIOS.Item>
    </TabBarIOS>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


//module.exports = new AppContainer();
