import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps'

import {
  LocationSearchHeader,
  LocationSearchResults,
  NavigationIcon,
  SearchResultsList,
  LocationButtonGroup,
} from '../components'

const mapStateToProps = (state) => ({
  recentLocations: state.recentLocations,
  shortcutLocations: state.recentLocations.slice(0, 3)
})

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResultsOpen: false,
      sourceText: 'Work',
      destinationText: '',
      position: {
        latitude: 0,
        longtitude: 0,
      },
      region: {
        latitude: 0,
        longtitude: 0,
        latitudeDelta: 0.0922,
        longtitudeDelta: 0.0421,
      }
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const { latitude, longtitude } = coords

        this.setState({
          position: {
            latitude,
            longtitude,
          },
          region: {
            latitude,
            longtitude,
            latitudeDelta: 0.0922,
            longtitudeDelta: 0.0421,
          }
        })
      },
      (err) => alert(JSON.stringify(err))
      (enableHighAccuracy: true, timeout: 20000, maximumAge: 1000)
    )
  }

  toggleSearchResults = () => {
    const { searchResultsOpen } = this.state

    this.setState({ searchResultsOpen: !searchResultsOpen })
  }

  onSourceTextChange = (sourceText) => {
    this.setState({ sourceText })
  }

  onDestinationTextChange = (destinationText) => {
    this.setState({ destinationText })
  }

  render() {
    const { recentLocations, shortcutLocations } = this.props
    const { searchResultsOpen, sourceText, destinationText, region, position } = this.state

    return (
      <View style={styles.container}>
        <NavigationIcon
          icon={searchResultsOpen ? 'arrow-left' : 'hamburger'}
          onPress={this.toggleSearchResults}
        />
        <LocationSearchHeader
          onPress={this.toggleSearchResults}
          expanded={searchResultsOpen}
          sourceText={sourceText}
          destinationText={destinationText}
          onSourceTextChange={this.onSourceTextChange}
          onDestinationTextChange={this.onDestinationTextChange}
        />
        <LocationSearchResults visible={searchResultsOpen}>
          <SearchResultsList list={recentLocations} />
        </LocationSearchResults>
        <MapView
          style={styles.map}
          region={region}
        >
          {position && (
            <MapView.Circle
              center={position}
              radius={300}
              strokeColor={'transparent'}
              fillColor={'rgba(112,185,213,0.30)'}
            />
          )}
          {position && (
            <MapView.Circle
              center={position}
              radius={100}
              strokeColor={'transparent'}
              fillColor={'#3594BC'}
            />
          )}
        </MapView>
        <LocationButtonGroup
          visible={!searchResultsOpen}
          locations={shortcutLocations}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  map: {
    flex: 1,
    zIndex: -1,
  }
}

export default connect(mapStateToProps)(Main)
