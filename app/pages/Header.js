import React, { Component } from 'react';
import { 
    Appbar
} from 'react-native-paper';

export default class Header extends Component {
    render (){
        return (
            <Appbar.Header>
                <Appbar.Content title="Smart Brush" />
                <Appbar.Action icon="logout-variant" onPress={this.props.logOut}/>
            </Appbar.Header>
        );
    }
}