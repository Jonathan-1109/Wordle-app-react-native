import {Text, StyleSheet, View} from 'react-native';
import { useLayoutEffect, useState } from 'react';

import {useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

import BackButton from '../../components/Buttons/backButton';
import RadioButton from '../../components/Buttons/radioButton';
import ProfileButton from '../../components/Buttons/profileButton';

import { useTheme } from '../../context/themeContext';

import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageScreen({navigation}) {

  const { t, i18n } = useTranslation(); 
  const { theme, colorsTheme } = useTheme(); 
  const {isLogged} = useContext(AuthContext)

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <Text style={[styles.textHeader, {color: colorsTheme.primary}]}>{t("config.language")}</Text>
        ),
        headerStyle: {
          backgroundColor: colorsTheme.header,
        },
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        headerRight: () => isLogged ? <ProfileButton onPress={() => navigation.navigate("Profile")} /> : null,
        headerTitleAlign: 'center',

    })
  }, [navigation,i18n.language, theme])

    return (
      <View style={[styles.container,{backgroundColor: colorsTheme.background}]}>

        <RadioButton value={'es'} label={'Español'} selected={i18n.language==='es'}
        image={require('../../assets/images/Flag_Mexico.png')} 
        onPress={(value) => {i18n.changeLanguage(value), AsyncStorage.setItem("language", value)}} />

        <RadioButton value={'en'} label={'English'} selected={i18n.language==='en'} 
        image={require('../../assets/images/Flag_of_the_United_States.png')}
        onPress={(value) => {i18n.changeLanguage(value), AsyncStorage.setItem("language", value)}}/>

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 25
  },
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
