import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, 
  Platform, Alert} from 'react-native';
import { useState, useLayoutEffect, useContext } from 'react';
import { CommonActions } from '@react-navigation/native'

import { Colors } from '../../constants/colors';

import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

import SelectButton from '../../components/Buttons/selectButton';
import BackButton from '../../components/Buttons/backButton';

import { useTheme } from '../../context/themeContext';
import { AuthContext } from '../../context/authContext';

import api from '../../api/api';
import Header from '../../components/header';

export default function LoginScreen({navigation}) {
  const {t} = useTranslation();

  const { theme, colorsTheme } = useTheme(); 
  
  const [lock, setLock] = useState(false)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isButton, setIsButton] = useState(false)

  const {saveLogin} = useContext(AuthContext)

  const loginAccount = async () => {

    const data = {
      name: name.trim(),
      password: password
    }
    await api.post('/users/login', data)
    .then(async (response) => {
      await saveLogin(response.data)

      Alert.alert(t("log.exHeader"), t("log.ex"),
        [{text: t('game.accept'), style:'cancel'}],
        {cancelable:true}
      )
      navigation.dispatch( CommonActions.reset({ index: 0, routes: [{ name: 'Home' }]}))

    })
    .catch((err) => {
      Alert.alert( "Error", t('log.error'),
        [{text: t('game.accept'), style:'cancel'}],
        {cancelable:true}
      )
      setIsButton(false)
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => ( <Header/> ),
      
       headerTitleStyle: {
        textAling: 'center',
      },
      headerStyle: {
        backgroundColor: colorsTheme.header
      },

      headerTitleAlign: 'center',

      headerLeft: () => <BackButton onPress={() => navigation.goBack()} disabled={isButton} />,

    })
  }, [navigation, theme, isButton])

  return (
  
      <KeyboardAvoidingView style={[styles.container, {backgroundColor: colorsTheme.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        <View style={[styles.form, {backgroundColor: colorsTheme.background}]}>
          
          <View style={[styles.headerForm, {backgroundColor: Colors.primary.lightGreen}]}>
            <Text style={[styles.headerText, {color: colorsTheme.primary}]}>{t('log.header')}</Text>
          </View>

          <View style={{alignItems: 'center'}}>
              
            <View>

              <View style={[styles.inputTextContainer, 
                {flexDirection: 'row', alignItems: 'center',backgroundColor: Colors.light.background,
                  borderColor: colorsTheme.borderColor
                }]}>

                <TextInput
                  placeholder={t("log.placeName")}
                  style={[styles.inputText, {width:'82%', color: 'black'}]}
                  placeholderTextColor="#999"
                  onChangeText={(text) => {setName(text)}}
                />
                <Image style={styles.icon} source={require('../../assets/images/user.png')} />
              </View>

              <View style={[styles.inputTextContainer,
                 {flexDirection: 'row', alignItems: 'center',backgroundColor: Colors.light.background,
                  borderColor: colorsTheme.borderColor
                 }]}>

                <TextInput 
                placeholder={t("register.placePassword")} 
                style={[styles.inputText,  {width:'82%', color: 'black'}]}
                placeholderTextColor="#999" secureTextEntry={!lock}
                onChangeText={(text) => {setPassword(text)}}/>

                <TouchableOpacity onPress={() => setLock(!lock)} style={{marginLeft: 'auto'}}>
                  <Image style={styles.icon} 
                  source={lock ? require('../../assets/images/unlock.png') : require('../../assets/images/padlock.png')}/>
                </TouchableOpacity>
              </View>

            </View>

            <SelectButton textContent={t('log.header')} 
            disabled={isButton}
            style={{backgroundColor:  Colors.primary.lightGreen, width: 300}}
            onPress={() => {setIsButton(true), loginAccount()}}/>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.replace('Register')} disabled={isButton}>
                <Text style={{color: colorsTheme.linkButton, borderBottomWidth: 1, borderColor: colorsTheme.linkButton}}>
                  {t("log.link")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    width: '100%',
    height: '100%',
    gap: 10,
    flex: 1,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 27,
  },

  inputText: {
    paddingHorizontal: 15,
  },

  inputTextContainer: {
    paddingHorizontal: 4, 
    paddingVertical: 8,
    borderWidth: 2.2,
    width: 'auto',
    borderRadius: 20,
    maxWidth: 310,
    height: 'auto',
    maxHeight: 110,
    marginVertical: 15
  },

  icon: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
    marginRight: 8,
  },


  headerForm: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,

  },

});