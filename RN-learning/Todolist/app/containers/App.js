import React, { Component, PropTypes } from 'react'
import { View, ScrollView, StyleSheet, TextInput, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { actionCreators } from '../redux/todoRedux'

// import components
import Title from '../components/Title'
import Footer from '../components/Footer'
import Input from '../components/Input'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'whitesmoke',
  }
})

const mapStateToProps = (state) => ({
  items: state.items,
})

class App extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  addItem(item) {
    const { dispatch } = this.props
    dispatch(action)
  }

  render() {
    return (
      <View style={styles.container}>
        <Title> Todo List </Title>
        <Input
          placeholder={'Enter a todo!'}
          onSubmit=
        />
        <View style={styles.divider} />
        <ScrollView />
        <View style={styles.divider} />
        <Footer />
      </View>
    )
  }
}

export default connect(mapStateToProps)(App)
