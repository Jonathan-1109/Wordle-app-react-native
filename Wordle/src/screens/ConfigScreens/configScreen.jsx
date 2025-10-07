import {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

import ConfigButton from '../../components/Buttons/configButton';
import BackButton from '../../components/Buttons/backButton';
import ProfileButton from '../../components/Buttons/profileButton';

import {useTheme} from '../../context/themeContext'

import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import { CommonActions } from '@react-navigation/native'

export default function ConfigScreen({navigation}) {
  const { t } = useTranslation(); 
  const {colorsTheme, theme} = useTheme();
  const {isLogged,logout} = useContext(AuthContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
          <Text style={[styles.textHeader, {color: colorsTheme.primary}]}>{t("config.config")}</Text>
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
    <View style={[styles.container, {backgroundColor: colorsTheme.background}]}>
        
        <ConfigButton textContent={t("config.language")}
        onPress={() => navigation.navigate('Language')} />

        <ConfigButton textContent={t("config.theme")}
        onPress={() => navigation.navigate('Theme')} />

        {isLogged &&  
        <ConfigButton textContent={t("config.logout")}  
        onPress={() => {logout(), navigation.dispatch( CommonActions.reset({ index: 0, routes: [{ name: 'Home' }]}))}} 
        />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 25,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});