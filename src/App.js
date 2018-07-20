import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify,{Auth} from 'aws-amplify';

import  { API } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'us-east-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'us-east-1_ocsfuzncy', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '1r8dvd3ni2b47joidc5ctmsqbq', //OPTIONAL - Amazon Cognito Web Client ID
    },
    API: {
        endpoints: [
            {
                name: "userInfo",
                endpoint: " https://aw0jtxwju8.execute-api.us-east-1.amazonaws.com/Dev"
            }
        ]
    }
});




Auth.signIn('kiruthi', '12345678')
    .then(user => {
        console.log(user)
        let apiName = 'userInfo'; // replace this with your api name.
        let path = '/user-info'; //replace this with the path you have configured on your API
        let myInit = {
            body: {
                "operation": "create",
                "payload": {
                    "TableName":"zee-user-info",
                    "Item":{
                        "user-id":"kiruthi",
                        "email":"aaaa@r.com",
                        "city":"cbe"
                    }
                }
            }, // replace this with attributes you need
            headers: {
                Authorization:user.signInUserSession.idToken.jwtToken
            } // OPTIONAL
        }

        API.post(apiName, path, myInit).then(response => {
           alert("Success Insertion!")
        }).catch(error => {
            console.log(error.response)
        });

    })
    .catch(err => console.log(err));

Auth.signUp({
    username:'mithu',
    password:'12345678',
    attributes: {
        name:'mithu',
        email:"mithu1234@mailinator.com",          // optional
        "custom:city":"bbb"  // optional - E.164 number convention
        // other custom attributes
    },
    validationData: []  //optional
})
    .then(data => console.log(data))
    .catch(err => console.log(err));


Auth.currentAuthenticatedUser()
    .then(user => {
        Auth.updateUserAttributes(user, {
            'custom:city': 'Lastname'
        })
    })


Auth.currentAuthenticatedUser()
    .then(user => {
        Auth.userAttributes(user)
            .then(_attributes => {
                console.log(_attributes);
            })
    })





/*let user = Auth.currentAuthenticatedUser();
console.log(user);
Auth.currentCredentials();
let result =  Auth.updateUserAttributes(user, {
    'custom:city': 'Lastname'
});
console.log(result);*/


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;