import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Login from './Login'
import Posts from './Posts'
import Random from './Random'


class TabIcon extends Component {
    constructor(props) {
      super(props)
    }
    render(){
      const { selected, title } = this.props
      return (
        <Text style={{ color: selected ? 'red' : 'black'}}>
          { title }
        </Text>
      )
    }
}

class AppRouter extends Component {
  render() {
   	return (
      <Router>
        <Scene key='root'>
          <Scene key='login' title='login' direction='vertical' initial={true}>
            <Scene key='loginContent' title='login' component={Login} style={styles.scene}></Scene>
          </Scene>
          <Scene key='tabs' hideNavBar={true} tabs={true} tabBarStyle={styles.tabBar} direction='vertical'>
            <Scene key='postsTab' title='Feed' icon={TabIcon} style={styles.scene}>
              <Scene key='posts' component={Posts} subreddit='hot' title='Reddit Posts' passProps={true} />
            </Scene>
            <Scene key='randomTab' title='random' icon={TabIcon} style={styles.scene}>
              <Scene key='random' component={Random} subreddit='random' title='Reddit Random' passProps={true} />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}


let styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    backgroundColor: '#fff',
    opacity: 1
  },
  scene: {
    paddingTop: 64
  }
})

export default connect()(AppRouter)
