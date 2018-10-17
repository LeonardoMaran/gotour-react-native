import React, { Component } from 'react'
import { StyleSheet, View, Text, ImageBackground, PixelRatio, Linking, Alert } from 'react-native'
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

export default class PacoteDetalhes extends Component {
  state = {
    data: undefined
  };

  componentDidMount () {
    const { pacoteId } = this.props.match.params

    fetch(`https://apigotour.herokuapp.com/api/pacote/${pacoteId}/detalhes`)
      .then(T => T.json())
      .then(data => this.setState({ data }))
      .catch(() => Alert.alert('Erro', 'não foi possível recuperar os detalhes do pacote'))
  }

  openLinkURL (url) {
    Linking.canOpenURL(url)
      .then(supported => supported && Linking.openURL(url))
      .catch(err => console.error('An error occurred', err))
  }

  render () {
    const { data } = this.state;

    if (!data) {
      return (
        <View style={styles.container} />
      )
    }

    return (
      <View style={styles.container}>
        <NavigationBar goBack={() => this.props.history.push('/')} />
        <View style={styles.content}>
          <ImageBackground
            resizeMode='cover'
            source={{ uri: data.urlImagem }}
            style={styles.imageBackground}>
            <View style={styles.imageContent}>
              <Text style={styles.title}>
                {data.pacote.nome.toUpperCase()}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.bodyContainer}>
            <Text style={styles.textDescription}>
              {'Descrição:'.toUpperCase()}
            </Text>
            <Text style={styles.textDescription}>
              {data.descricao}
            </Text>
            <Text
              onPress={() => this.openLinkURL(`tel:${data.telefone}`)}
              style={styles.textDescription}>
              {data.telefone}
            </Text>
            <Text
              onPress={() => this.openLinkURL(`http://${data.site}`)}
              style={styles.textDescription}>
              {data.site}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>
              {data.pacote.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
          <View style={{ flex: 0.1 }}>
            <Footer />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#224AD0'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  imageBackground: {
    flex: 0.3,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderBottomColor: '#F6DB54',
    borderBottomWidth: 4
  },
  phoneNumber: {
    color: '#FFF',
    fontSize: 14 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    marginTop: 5
  },
  imageContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    flex: 0.7,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1
  },
  title: {
    fontSize: 16 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bodyContainer: {
    flex: 0.5,
    paddingLeft: 30,
    paddingRight: 30
  },
  textDescription: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14 / PixelRatio.getFontScale(),
    paddingBottom: 10,
    marginTop: 5
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 134,
    backgroundColor: '#F6DB54'
  },
  priceValue: {
    fontSize: 20 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
