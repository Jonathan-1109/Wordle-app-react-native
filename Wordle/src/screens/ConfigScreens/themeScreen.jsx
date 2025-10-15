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

export default function ThemeScreen({navigation}) {

  const { t } = useTranslation(); 
  const { theme, colorsTheme, selected, toggleTheme } = useTheme(); 
  const {isLogged} = useContext(AuthContext)

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <Text style={[styles.textHeader, {color: colorsTheme.primary}]}>{t("config.theme")}</Text>
        ),
        headerStyle: {
          backgroundColor: colorsTheme.header,
        },
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        headerRight: () => isLogged ? <ProfileButton onPress={() => navigation.navigate("Profile")} /> : null,
        headerTitleAlign: 'center',

    })
  }, [navigation, theme])

    return (
      <View style={[styles.container,{backgroundColor: colorsTheme.background}]}>

        <RadioButton value={'auto'} label={t('config.system')} selected={ selected === 'auto'}
        onPress={() => {toggleTheme('auto')}} />

        <RadioButton value={'light'} label={t('config.light')} selected={selected ==='light'}
        onPress={() => {toggleTheme('light')}} />

        <RadioButton value={'dark'} label={t('config.dark')} selected={ selected ==='dark'} 
        onPress={() => {toggleTheme('dark')}}/>

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
