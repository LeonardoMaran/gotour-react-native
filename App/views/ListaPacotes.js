import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, PixelRatio, Alert } from 'react-native'
import CardPacote from '../components/CardPacote'
import ImageSlide from '../components/ImageSlide'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

export default class ListaPacotes extends Component {
  state = {
    pacotes: []
  }

  componentDidMount () {
    fetch('https://apigotour.herokuapp.com/api/pacotes')
      .then(T => T.json())
      .then(pacotes => this.setState({ pacotes }))
      .catch(() => Alert.alert('Erro', 'Não foi possivel recuperar os pacotes'))
  }

  render () {
    return (
      <View style={styles.container}>
        <NavigationBar />
        <ScrollView style={styles.content}>
          <View style={{ marginBottom: 30 }}>
            <ImageSlide />
          </View>
          {this.state.pacotes.map((pacote, key) => (
            <CardPacote
              detalhes={pacote}
              key={key}
              onPress={() => this.props.history.push(`/${pacote.id}`)}
            />
          ))}
          {this.state.pacotes.length === 0 && (
            <Text style={styles.textWithoutItems}>
              Nenhum pacote encontrado
            </Text>
          )}
        </ScrollView>
        <View style={{ flex: 0.1 }}>
          <Footer />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  content: {
    flex: 0.8,
    flexDirection: 'column',
    backgroundColor: '#224AD0'
  },
  textWithoutItems: {
    fontSize: 15 / PixelRatio.getFontScale(),
    textAlign: 'center',
    color: '#FFF'
  },
  footer: {
    flex: 0.1
  }
})
