import { Text, View, StyleSheet, ActivityIndicator, Alert, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useState, useLayoutEffect, useEffect } from 'react';
import { Colors } from '../constants/colors';

import { useTranslation } from 'react-i18next';
import i18next from '../services/i18next';

import BackButton from '../components/Buttons/backButton';
import ProfileButton from '../components/Buttons/profileButton';

import { useTheme } from '../context/themeContext';

import { fetchData } from '../services/apiFunctions';

const {height, width} = Dimensions.get('window')

export default function ClasificationScreen({navigation}) {
  const {t} = useTranslation();

  const { theme, colorsTheme } = useTheme(); 
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading]  = useState(false)
  const [mode, setMode] = useState(1)
  const max = Math.floor(width/50)
  const avatars = ['🥇','🥈','🥉']

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={[styles.textHeader, {color: colorsTheme.primary}]}>{t("class.title")}</Text>
      ),
      headerStyle: {
        backgroundColor: colorsTheme.header
      },

      headerTitleAlign: 'center',

      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => <ProfileButton onPress={() => navigation.navigate("Profile")} /> 

    })
  }, [navigation, theme])

  useEffect(() => {

    setIsLoading(true)
    fetchData(mode)
    .then(response => {
      setData(response)
      setIsLoading(false)
    })
    .catch(err => {
      console.error(err.message)
      Alert.alert("Error", t("class.error"), [{text: t('game.accept'), style:'cancel'}])
      setIsLoading(false)
    })

  }, [mode])

  return (
      <SafeAreaView style={[{backgroundColor: colorsTheme.background, flex: 1}]} edges={['bottom']}>   
        <View style={styles.containerButtons}>
          <TouchableOpacity 
          onPress={() => {setMode(1), setData(null)}} 
          style={[styles.buttons, {backgroundColor: mode === 1 ? Colors.primary.lightGreen : Colors.primary.greenGray}]}
          disabled={mode === 1}>

            <Text style={styles.textButton}> {t('profile.casualTitle')} </Text>

          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => {setMode(2), setData(null)}} 
          style={[styles.buttons, {backgroundColor: mode === 2 ? Colors.primary.lightGreen : Colors.primary.greenGray}]}
          disabled={mode === 2}>

            <Text style={styles.textButton}> {t('profile.structureTitle')} </Text>

          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>

          {[t("class.pos"), t("class.n"), t("class.p"), t("class.v"), t("class.m")].map((value,i) => (
            <View key={"title " + i} style={[styles.titleClass, {backgroundColor: Colors.primary.lightGreen}]}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>{value}</Text>
            </View>
          ))}
        </View>

          <ScrollView>

          {isLoading && (
            <View style={{height:'100%', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={155} />
            </View>
          )}

          { data && data.map((value,i) => (

            <View  key={i} style={{flexDirection:'row'}}>
              <BlockClass data={i+1 < 4 ? avatars[i] : i+1} i={i} j={0} 
                styleText={{fontSize:22, fontWeight: '450'}}/>

              <BlockClass data={value.name.length > max ? value.name.slice(0,max) + '...' : value.name} i={i} j={1} 
                styleText={{fontSize:12, fontWeight: '500'}}/>

              <BlockClass data={value.points} i={i} j={2} 
                styleText={{fontSize:15, fontWeight: '500'}}/>

              <BlockClass data={value.victories} i={i} j={3} 
                styleText={{fontSize:17,fontWeight: '500'}}/>

              <BlockClass data={value.played} i={i} j={4}
                styleText={{fontSize:17,fontWeight: '500'}} />
            </View>
          ))}
          </ScrollView>
    </SafeAreaView>
  );
}

const BlockClass = ({data,i,j,styleText}) => {  
  return (
  <View key={`data${i}-${j} `} style={[styles.class, {backgroundColor: Colors.dark.primary}]}>
    <Text style={styleText}>{data}</Text>
  </View> 
  )
}

const styles = StyleSheet.create({

  containerButtons: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    height: '8%',
    justifyContent: 'center'
  },

  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderTopColor: 'black',
    borderTopWidth: 1.2,
  },

  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  titleClass: {
    borderWidth: 0.7,
    borderBottomWidth: 1.5, 
    width: '20%', 
    height: height/13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  class: {
    borderBottomWidth: 0.9, 
    width: '20%', 
    height: height/15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});