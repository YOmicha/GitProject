/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AuthService from './AuthService';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import Login from './Login';
import AppContainer from './AppContainer';

export default class GitProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }

  componentDidMount(){
    AuthService.getAuthInfo((err,authInfo)=>{
      console.log("authInfo:" + authInfo);
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  render() {
    if(this.state.checkingAuth){
      return(
        <View style={styles.container}>
          <ActivityIndicator
              animating={true}
              size="large"
              style={styles.loader}/>
        </View>
      );
    }

    if(this.state.isLoggedIn){
      return (

          <AppContainer />
      

      );
    }else{
      return(
        <Login onLogin={this.onLogin.bind(this)} />
      );
    }
  }

  onLogin(){ //this.setState( {isLoggedIn:true} );

              this.setState({isLoggedIn:true});
              //this.setState({success: true});
              //console.log("asdasds");
            }  //console.log("ready for the next view");
  //getInitialState(){ return (isLoggedIn:false); }
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

AppRegistry.registerComponent('GitProject', () => GitProject);
