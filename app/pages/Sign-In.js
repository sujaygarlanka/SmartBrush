import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
  } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

  export default class SignIn extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gettingLoginStatus: true,
      };
    }
  
    componentDidMount() {
      //initial configuration
      GoogleSignin.configure({
        //It is mandatory to call this method before attempting to call signIn()
        scopes: ['profile'],
        iosClientId: '270217226325-7n7dapev6bn7rch487rq2ecroicm1gdu.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });
      //Check if user is already signed in and sign in
      if (!this.props.loggedIn){
        this._signOut();
      }
      this._signInSilently();
    }
  
    _signInSilently = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        //Get the User details as user is already signed in
        try {
          const userInfo = await GoogleSignin.signInSilently();
          this.props.logIn(userInfo);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            console.log('User has not signed in yet');
          } else {
            alert("Something went wrong. Please sign in again.");
            console.log("Something went wrong. Unable to get user's info");
          }
        }
      }
      this.setState({ gettingLoginStatus: false });
    };
  
    _signIn = async () => {
      //Prompts a modal to let the user sign in into your application.
      try {
        await GoogleSignin.hasPlayServices({
          //Check if device has Google Play Services installed.
          //Always resolves to true on iOS.
          showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        this.props.logIn(userInfo);
      } catch (error) {
        console.log('Message', error.message);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User Cancelled the Login Flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Signing In');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play Services Not Available or Outdated');
        } else {
          console.log('Some Other Error Happened');
        }
      }
    };
  
    _signOut = async () => {
      //Remove user session from the device.
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (error) {
        console.error(error);
      }
    };
  
    render() {
      //returning Loader until we check for the already signed in user
      if (this.state.gettingLoginStatus) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      } else {
        //For login showing the Signin button
        return (
          <View style={styles.container}>
              <GoogleSigninButton
              style={{ width: 230, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signIn}
              />
          </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#21CE99',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {
      width: 200,
      height: 300,
      resizeMode: 'contain',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: 300,
      marginTop: 30,
    },
  });