/**
 * Smart Brush
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from './constants/theme';
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();
const Auth = createStackNavigator();

const reactNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.COLORS.WHITE,
  },
};

function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

class SmartBrush extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer theme={reactNavigationTheme}>
        <Auth.Navigator
          screenOptions={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: theme.COLORS.WHITE,
              shadowColor: theme.COLORS.TRANSPARENT,
              shadowRadius: 0,
              shadowOffset: {
                  height: 0,
              }
            },
            headerTitleStyle: {
              fontWeight: 'normal',
            },
          }}>
          {this.props.user ? (
            <Auth.Screen name="App Name" component={App}/>
          ) : (
            <Auth.Screen name="Login" component={Login} options = {{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: 'pop',
            }}/>
          )}
        </Auth.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(SmartBrush);
