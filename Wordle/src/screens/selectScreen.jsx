import { StyleSheet, View} from 'react-native';
import { useState, useLayoutEffect } from 'react';
import { Colors } from '../constants/colors';

import { useTranslation } from 'react-i18next';
import i18next from '../services/i18next';

import SelectButton from '../components/Buttons/selectButton';
import ModalRuler from '../components/Modals/ModalRuler';
import BackButton from '../components/Buttons/backButton';
import Header from '../components/header';

import { useTheme } from '../context/themeContext';

import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import ProfileButton from '../components/Buttons/profileButton';

export default function SelectScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false)
  const {t} = useTranslation();

  const { theme, colorsTheme } = useTheme(); 
  const {isLogged } = useContext(AuthContext)

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

      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => isLogged ? <ProfileButton onPress={() => navigation.navigate("Profile")} /> : null

    })
  }, [navigation, theme])

  return (
    <View style={[styles.container, {backgroundColor: colorsTheme.background}]}>

        <SelectButton textContent={t("select.casual")} style={{backgroundColor: Colors.primary.green}}  
        onPress={() => navigation.navigate('Game')}/>
        
        <SelectButton textContent={t("select.discrete")} style={{backgroundColor: Colors.primary.green}} 
        onPress={() => navigation.navigate('Combinatorics')}/>

        <SelectButton textContent={t("select.how")} style={{backgroundColor: Colors.primary.lightBlue}} 
        onPress={() => setModalVisible(true)}/>

        <ModalRuler isOpen={modalVisible} close={setModalVisible} />

        { isLogged &&
        <SelectButton textContent={t("select.class")} 
          onPress={() => navigation.navigate('Clasification')} style={{backgroundColor: Colors.primary.green}}/>
        }

        <SelectButton textContent={t("select.config")}   
        onPress={() => navigation.navigate('Config')} style={{backgroundColor: Colors.primary.defaultButton}}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
});