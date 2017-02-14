import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: 'skyblue',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  }
})

export default class Title extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.children}</Text>
      </View>
    )
  }
}
