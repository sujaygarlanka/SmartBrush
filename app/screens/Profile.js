import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Text, Input,  Block} from 'galio-framework';
import {connect} from 'react-redux';
import {signOut} from '../actions/auth-actions';
import theme from '../constants/theme';
import Title from '../components/Title';

class Profile extends Component {
  render() {
    return (
      <Block flex>
        <Title title="Login" />
        <Block flex center>
          <Image
            source={{
              uri: this.props.user.photo,
            }}
            style={{width: 200, height: 200, borderRadius: 200 / 2}}
          />
        </Block>
        <Block flex center middle>
          <Button
            disabled
            round
            color={theme.COLORS.TRANSPARENT}
            style={styles.profileInfoFields}>
            <Text center color={theme.COLORS.MUTED}>
              {this.props.user.givenName + " " + this.props.user.familyName}
            </Text>
          </Button>
          <Button
            disabled
            round
            color={theme.COLORS.TRANSPARENT}
            style={styles.profileInfoFields}>
            <Text center color={theme.COLORS.MUTED}>
              {this.props.user.email}
            </Text>
          </Button>
        </Block>
        <Block flex center middle>
          <Button color={theme.COLORS.PRIMARY} shadowColor={theme.COLORS.PRIMARY} round onPress={() => this.props.signOut()}>
            Sign Out
          </Button>
        </Block>
      </Block>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  profileInfoFields: {
    borderColor: theme.COLORS.MUTED,
    marginVertical: 10,
  },
});
