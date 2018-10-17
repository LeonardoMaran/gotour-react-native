import React, { Component } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, Text, Image, PixelRatio } from 'react-native'
import busImage from '../assets/bus.png'
import moment from 'moment'
import 'moment/locale/pt-br'

export default class DetalhePacote extends Component {
  componentDidMount () {
    moment.locale('pt-br')
  }

  render () {
    const { onPress } = this.props
    const { nome, valor, dataInicio, dataFim } = this.props.detalhes

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, styles.mainContainer]}>
          <View style={[styles.container, styles.subContainer]}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {nome.toUpperCase()}
              </Text>
            </View>
            <View style={styles.lineBar} />
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={busImage}
              />
            </View>
          </View>
          <View style={styles.content}>
            <View style={{ flex: 0.7 }}>
              <Text style={styles.periodBetween}>
                De {moment(dataInicio).format('YY [de] MMMM')} até {moment(dataFim).format('YY [de] MMMM')}
              </Text>
            </View>
            <View style={styles.details}>
              <View style={styles.timeDurationContainer}>
                <Text style={styles.timeDuration}>
                  {moment.duration(moment(dataInicio).diff(moment(dataFim))).humanize()}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  mainContainer: {
    justifyContent: 'space-around',
    height: 130,
    maxHeight: 130,
    alignItems: 'center'
  },
  subContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  bordered: {
    borderWidth: 1,
    borderColor: 'red'
  },
  titleContainer: {
    flex: 0.6,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#F6DB54'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    fontSize: 12 / PixelRatio.getFontScale()
  },
  lineBar: {
    flex: 0.3,
    height: 1,
    backgroundColor: '#4870F6'
  },
  imageContainer: {
    flex: 0.1
  },
  image: {
    maxWidth: 178
  },
  content: {
    flex: 0.6,
    backgroundColor: '#4870F6',
    width: '95%',
    height: '100%',
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 2
  },
  periodBetween: {
    color: '#ffffff',
    fontSize: 14 / PixelRatio.getFontScale(),
    fontWeight: 'bold'
  },
  details: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeDuration: {
    color: '#ffffff',
    fontSize: 17 / PixelRatio.getFontScale(),
    fontWeight: 'bold'
  },
  timeDurationContainer: {
    flex: 0.8,
    flexDirection: 'column'
  },
  priceContainer: {
    flex: 0.2,
    flexDirection: 'column'
  },
  price: {
    color: '#ffffff',
    fontSize: 15 / PixelRatio.getFontScale(),
    fontStyle: 'italic'
  }
})
