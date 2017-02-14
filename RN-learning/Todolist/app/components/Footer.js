import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    color: '#CD5C5C',
    fontSize: 20,
  }
})

export default class Footer extends Component {

  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.text}>Remove completed items</Text>
      </View>
    )
  }
}
