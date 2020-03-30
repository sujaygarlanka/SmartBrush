import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
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
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
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
        console.log(userInfo);
        dispatch({type: 'SET_USER', payload: userInfo});
      } catch (error) {
        console.log(error);
        dispatch({type: 'AUTH_FAILURE', payload: error});
      }
    };
  };

export const signOut = function() {
    return async (dispatch, getState) => {
      dispatch({type: 'IS_LOADING'});
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
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
