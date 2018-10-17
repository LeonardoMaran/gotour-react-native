import React, { Component } from 'react'
import { View, Text, PixelRatio, StyleSheet } from 'react-native'

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          www.agenciavamosjuntos.com.br
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E42BA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14 / PixelRatio.getFontScale(),
    opacity: 0.8
  }
})
