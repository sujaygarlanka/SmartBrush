import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

GoogleSignin.configure({
  //It is mandatory to call this method before attempting to call signIn()
  scopes: ['profile'],
  iosClientId:
    '270217226325-7n7dapev6bn7rch487rq2ecroicm1gdu.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export const googleSignIn = function() {
  return async (dispatch, getState) => {
    try {
      dispatch({type: 'IS_LOADING'});
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      let userInfo = await GoogleSignin.signIn();
      userInfo.user.authProvider = 'GOOGLE';
      dispatch({type: 'SET_USER', payload: userInfo.user});
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
      dispatch({type: 'AUTH_FAILURE', payload: error});
    }
  };
};

export const facebookSignIn = function() {
    return async (dispatch, getState) => {
      try {
        dispatch({type: 'IS_LOADING'});
        await LoginManager.logInWithPermissions(['public_profile']);
        let accessToken = await AccessToken.getCurrentAccessToken();
        let userInfo = await fetch(`https://graph.facebook.com/v6.0/me?fields=email,first_name,last_name,picture&access_token=${accessToken.accessToken}`);
        userInfo = await userInfo.json();
        // console.log(userInfo)
        // let picture = await fetch(`https://graph.facebook.com/v6.0/me/picture&access_token=${accessToken.accessToken}`);
        // console.log(picture)
        let user = {
          givenName: userInfo.first_name,
          familyName: userInfo.last_name,
          email: userInfo.email,
          photo: userInfo.picture.data.url,
          authProvider: 'FACEBOOK'
        };
        dispatch({type: 'SET_USER', payload: user});
      } catch (error) {
        console.log(error);
        dispatch({type: 'AUTH_FAILURE', payload: error});
      }
    };
  };

export const signOut = function() {
    return async (dispatch, getState) => {
      let user = getState().user;
      dispatch({type: 'IS_LOADING'});
      console.log(user)
      try {
        if (user.authProvider == 'GOOGLE'){
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        }
        else if  (user.authProvider == 'FACEBOOK'){
          let accessToken = await AccessToken.getCurrentAccessToken();
          // let userId = AccessToken.getUserId();
          // Log out doesn't quite work
          let response = await fetch(`https://graph.facebook.com/v2.5/me?access_token=${accessToken.accessToken}`, {
            method: 'delete'
          })
          console.log(response)
          await LoginManager.logOut();
        }
        dispatch({type: 'SET_USER', payload: null});
      } catch (error) {
        console.error(error);
        dispatch({type: 'AUTH_FAILURE', payload: error});
      }
    };
  };


export const signUp = function(user) {
    return async (dispatch, getState) => {
        dispatch({type: 'IS_LOADING'});
        dispatch({type: 'SET_USER', payload: user});
    }
};
