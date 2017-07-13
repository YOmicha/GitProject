import buffer from 'buffer';
import { AsyncStorage } from 'react-native'
//var AsyncStorage = require('react-native').AsyncStorage;
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

let val_authKey = '';
let val_userKey = '';


class AuthService{

  // first user, initial values
  getAuthInfo(cb){
    AsyncStorage.multiGet([authKey,userKey], (err, val)=>{
      if(err){
        return cb(err);
      }
      if(!val){
        return cb();
      }


      val.map( (result, i, store) => {
              let key = store[i][0];
              let val = store[i][1];
              console.log(key, val);
              if(key==authKey){ val_authKey = val;  }
              if(key==userKey){ val_userKey = val;  }
            });


      console.log("auth: "+val_userKey);
      var zippedObj = _.zipObject(['a', 'b'], [1, 2]);
      //console.log("auth: "+zippedObj['auth']);

      //if(!zippedObj[authKey]){
      if(!val_authKey){
        return cb();
      }
      var authInfo = {
        header:{
          Authorization: 'Basic' + val_authKey
        },
        //user: JSON.parse(zippedObj[userKey])
        //user: JSON.parse(userKey)
        user: userKey
      }
      return cb(null, authInfo);

    })
  }

  login(creds, cb){

    var b = new buffer.Buffer(creds.username +
     ':'+ creds.password);
     //var encodedAuth = b.toString('base64');
     var encodedAuth = 'WU9taWNoYTpZT21pY2hhNTI0NA==';
     //console.log(encodedAuth);
    //fetch('https://api.github.com/search/repositories?q=react')

    fetch('https://api.github.com/user',{
      headers:{
        'Authorization':'Basic ' + encodedAuth
      }
    })
    .then((response)=>{
      //return response.json();
      if(response.status >= 200 && response.status <= 300){
        return response;
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status !=401
      }
    })
    .then((response)=>{
      return response.json();
    })
    .then((results)=>{

      let asyncStorageValues = [
        [authKey,encodedAuth],
        [userKey, JSON.stringify(results)]
      ];

      AsyncStorage.multiSet(asyncStorageValues, (err) => {
        return cb({success : true});
      });

    })
    .catch((err) => {
      //console.log('logon failed: ' + err);
      //this.setState(err);
      return cb(err);
    });
  }
}

module.exports = new AuthService();
