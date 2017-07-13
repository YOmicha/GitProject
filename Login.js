import React, { Component } from 'react';
import buffer from 'buffer';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  View
} from 'react-native';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state ={
      showProgress : false
    }

  }

  render(){
    var errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>
        The username and password combination did not work
      </Text>;
    }

    if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue
      </Text>;
    }

    return(
      <View style={styles.container} >
        <Image style={styles.logo} source={require('./img/Octocat.png')} />
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput onChangeText={(text) => this.setState({user:text})} style={styles.input} placeholder="User Name" />
        <TextInput onChangeText={(text) => this.setState({password:text})} style={styles.input} placeholder="Password" secureTextEntry="true"/>
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttontext}>LOG IN</Text>
        </TouchableHighlight>
        {errorCtrl}


        <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            style={styles.loader}/>
      </View>
    );
  }


  onLoginPressed(){
    //console.log(this.state);
    this.setState({showProgress: true});

    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password
    },(results) => {
      this.setState(Object.assign({
                    showProgress: false},
                    results));

     //this.props.onLogin();
      //console.log("results: " + this.props.onLogin);
      if(results.success && this.props.onLogin){
      //if(results.success){
        this.props.onLogin();
        //console.log("props: " + this.props);
        //console.log("ready for the next page");
      }


    });
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ccc',
    padding:40,
    alignItems:'center'
  },
  button:{
    backgroundColor:'#000',
    height:50,
    alignSelf:'stretch',
    marginTop:10,
    justifyContent:'center'
  },
  buttontext:{
    fontSize:22,
    color:'#fff',
    alignSelf:'center'
  },
  input: {
    borderColor:'#000',
    height:50,
    marginTop:10,
    borderWidth:1,
    paddingLeft:4,
    fontSize:18
  },
  heading:{
    fontSize:30,
    marginTop:10
  },
  logo:{
    width: 66,
    height:55
  },
  loader:{
    marginTop:10
  },
  error:{
    color: 'red'
  }
})


//AppRegistry.registerComponent('Login', () => GitProject);
