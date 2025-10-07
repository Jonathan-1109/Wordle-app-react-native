import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,
ScrollView, Alert} from 'react-native';

import { useState, useLayoutEffect, useContext } from 'react';
import { Colors } from '../../constants/colors';

import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

import SelectButton from '../../components/Buttons/selectButton';
import BackButton from '../../components/Buttons/backButton';
import Header from '../../components/header';

import { useTheme } from '../../context/themeContext';
import { AuthContext } from '../../context/authContext';

import api from '../../api/api';

export default function RegisterScreen({navigation}) {
  const {t} = useTranslation();

  const { theme, colorsTheme } = useTheme(); 
  
  const [lock, setLock] = useState(false)
  const [confirmLock, setConfirmLock] = useState(false)

  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [verify, setVerify] = useState(Array(3).fill(false))

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const band = password === password2
  const [activateButton, setActivateButton] = useState(false)

  const {saveLogin} = useContext(AuthContext)

  const verifyName = (value) => {
    const newVerify = [...verify]

    if (!(/^[^\s]{4,}\s*$/.test(value))) {
      setNameError(t('register.nameError'))
      newVerify[0] = false
      setVerify(newVerify)
      return
    }

    newVerify[0] = true
    setVerify(newVerify)
    setNameError('')
  }

  const verifyEmail = (value) => {
    const newVerify = [...verify]
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))) {
      setEmailError(t("register.mailError"))
      newVerify[1] = false
      setVerify(newVerify)
      return
    }
    newVerify[1] = true
    setVerify(newVerify)
    setEmailError("")
  }

  const verifyPassword = (value) => {
    const newVerify = [...verify]
    if (!(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value))) {
      setPasswordError(t('register.passwordError'))
      newVerify[2] = false
      setVerify(newVerify)
      return
    }
    setPasswordError("")
    newVerify[2] = true
    setVerify(newVerify)
  }

  const sendForm = async () => {
    
    const content = {
      name: name.trim(),
      mail: email.trim(),
      password: password,
      confirmPassword: password2
    }

    await api.post('/users/register', content)
    .then( async (response) => {
      await saveLogin(response.data)

      Alert.alert(
        t("log.exHeader"),
        t("log.exSign"),
        [{text: t('game.accept'), style:'cancel'}],
        {cancelable:true}
      )

      navigation.replace("Home")
    })
    .catch(() => {
      
      Alert.alert(
        "Error",
        t("log.errorSign"),
        [{text: t('game.accept'), style:'cancel'}],
        {cancelable:true}
      )

      setActivateButton(false)
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (<Header/>),
       headerTitleStyle: {
        textAling: 'center',
      },
      headerStyle: {
        backgroundColor: colorsTheme.header
      },

      headerTitleAlign: 'center',

      headerLeft: () => <BackButton onPress={() => navigation.goBack()} disabled={activateButton} />,

    })
  }, [navigation, theme, activateButton])

  const disabled = !(verify.every((value) => value === true) && band)

  return (
  
      <KeyboardAvoidingView style={[styles.container, {backgroundColor: colorsTheme.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        <ScrollView style={{width:'100%', height: '100%'}}>

          <View style={[styles.form, {backgroundColor: colorsTheme.background}]}>
            
            <View style={[styles.headerForm, {backgroundColor: Colors.primary.lightGreen}]}>
              <Text style={[styles.headerText, {color: colorsTheme.primary}]}>{t("register.header")}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                
              <View>
                <View style={[styles.inputTextContainer, {alignContent: 'center',
                  backgroundColor: Colors.light.background, borderColor: colorsTheme.borderColor}]}>

                  <TextInput placeholder={t('register.placeName')} style={[styles.inputText,  
                  {width:'80%', color: 'black'}]} 
                  placeholderTextColor="#999" onChangeText={(text) => {verifyName(text),setName(text)}}/>
                </View>

                <View style={{marginLeft: 20}}>
                  <Text style={{fontSize: 14,fontWeight: 'bold',color:'red'}}>{nameError}</Text>
                </View>

                <View style={[styles.inputTextContainer, 
                  {flexDirection: 'row', alignItems: 'center',backgroundColor: Colors.light.background,
                    borderColor: colorsTheme.borderColor
                  }]}>

                  <TextInput
                    inputMode="email"
                    placeholder={t("register.placeEmail")}
                    style={[styles.inputText, {width:'82%', color: 'black'}]}
                    placeholderTextColor="#999"
                    onChangeText={(text) => {verifyEmail(text), setEmail(text)}}
                  />
                  <Image style={styles.icon} source={require('../../assets/images/user.png')} />
                </View>

                <View style={{marginLeft: 20}}>
                  <Text style={{fontSize: 14,fontWeight: 'bold',color:'red'}}>{emailError}</Text>
                </View>

                <View style={[styles.inputTextContainer,
                  {flexDirection: 'row', alignItems: 'center',backgroundColor: Colors.light.background,
                    borderColor: colorsTheme.borderColor
                  }]}>

                  <TextInput placeholder={t("register.placePassword")} 
                  style={[styles.inputText,  {width:'82%', color: 'black'}]}
                  placeholderTextColor="#999" secureTextEntry={!lock}
                  onChangeText={(text) => {verifyPassword(text), setPassword(text)}}/>

                  <TouchableOpacity onPress={() => setLock(!lock)} style={{marginLeft: 'auto'}}>
                    <Image style={styles.icon} 
                    source={lock ? require('../../assets/images/unlock.png') : require('../../assets/images/padlock.png')}/>
                  </TouchableOpacity>
                </View>
                
                <View style={{marginLeft: 20}}>
                  <Text style={{fontSize: 14,fontWeight: 'bold',color:'red'}}>{passwordError}</Text>
                </View>

                <View style={[styles.inputTextContainer, 
                  {flexDirection: 'row', alignItems: 'center' ,backgroundColor: Colors.light.background,
                    borderColor: colorsTheme.borderColor
                  }]}>

                  <TextInput placeholder={t("register.placeConfirm")}
                  style={[styles.inputText, {width:'82%', color: 'black'}]}
                  placeholderTextColor="#999" secureTextEntry={!confirmLock}
                  onChangeText={(text) => {setPassword2(text)}}/>
                  
                  <TouchableOpacity onPress={() => setConfirmLock(!confirmLock)} style={{marginLeft: 'auto'}}>
                    <Image style={styles.icon} 
                    source={confirmLock ? require('../../assets/images/unlock.png') : require('../../assets/images/padlock.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={{marginLeft: 20, marginBottom: 10}}>
                  <Text style={{fontSize: 14,fontWeight: 'bold',color:'red'}}>
                    {band ? '' : t('register.confirmedError')}
                  </Text>
                </View>

              </View>

              <SelectButton textContent={t("register.register")} 
              style={{backgroundColor:  disabled ?  Colors.primary.defaultButton : Colors.primary.lightGreen, width: 300}}
              disabled={disabled || activateButton} onPress={() => { setActivateButton(true), sendForm()}}/>

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.replace('Login')} disabled={activateButton}>
                  <Text style={{color: colorsTheme.linkButton, borderBottomWidth: 1, borderColor: colorsTheme.linkButton}}>
                    {t("register.link")}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        
        </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  form: {
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
    marginVertical: 2.5
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