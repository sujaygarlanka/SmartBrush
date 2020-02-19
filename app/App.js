/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import SignIn from "./pages/Sign-In";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./pages/Header";

const Tab = createMaterialBottomTabNavigator();

export default class SmartBrush extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      loggedIn: false
    };
  }

  getUserInfo = async () => {
    return this.state.userInfo;
  }

  logIn = async (userInfo) => {
    this.setState({userInfo: userInfo, loggedIn: true});
  }

  logOut = async => {
    this.setState({userInfo: null, loggedIn: false});
  }

  render() {
    if (this.state.loggedIn) {
      return (
          <NavigationContainer>
            <Header logOut = {this.logOut.bind(this)}/>
            <Tab.Navigator initialRouteName="Home" >
              <Tab.Screen name="Home" component={Home} userInfo = {this.state.userInfo}/>
              <Tab.Screen 
                name="Profile" 
                component={Profile} 
                userInfo = {this.state.userInfo} 
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="test" color={color} size={size} />
                    ),
                }}
                />
            </Tab.Navigator>
          </NavigationContainer>
      );
    }
    else {
      return (
        <SignIn loggedIn = {this.state.loggedIn} logIn = {this.logIn.bind(this)}/>
      );
    } 
  }
}