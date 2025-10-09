import { useLayoutEffect, useContext} from 'react';
import { Alert, ScrollView} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';

import BackButton from '../../components/Buttons/backButton';
import ModalStatus from '../../components/Modals/ModalStatus';
import Table from '../../components/table';
import KeyBoard from '../../components/keyboard';
import Header from '../../components/header';

import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

import { useTheme } from '../../context/themeContext';
import { AuthContext } from '../../context/authContext.jsx';

import { useEffect } from 'react';
import { useCasualGame } from '../../hooks/useCasualGame.jsx';
import { updateData } from '../../services/apiFunctions.js';

export default function GameScreen({navigation}) {
  const {t, i18n} = useTranslation();
  const language = i18n.language

  const { theme, colorsTheme } = useTheme()
  const {isLogged, userDataInfo} = useContext(AuthContext)
  const casual = useCasualGame(6,5,language)  

  useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (<Header/>),
        headerStyle: {
          backgroundColor: colorsTheme.header
        },
        
        headerTitleAlign: 'center',
  
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
  
      })
    }, [navigation, theme])  

  useEffect(() => {

    if (casual.notWord) {

      casual.setNotWord(false)

      Alert.alert(
        t("game.titleNotWord"),
        t("game.notWord"),
        [{text: t('game.accept'), style:'cancel'}],
        {cancelable:true})
    }

  }, [casual.notWord])

  useEffect(() => {
    if (casual.status !== 'playing' && isLogged) {
      
      updateData(userDataInfo.id,casual.status,casual.points,1)
      .catch(err => {
        console.error(err.message)
                      
        Alert.alert("Error",  t("game.error"), 
        [{text: t('game.accept'), style:'cancel'}],
        {cancelable:true})
      })
    }
  }, [casual.status])

  return (
    <SafeAreaView style={{backgroundColor: colorsTheme.background, flex: 1}} edges={['bottom']}>
      <ScrollView>

        <Table game={casual} style={{paddingVertical: 10}}/>

        <KeyBoard game={casual} style={{}}/>

        <ModalStatus
          word={casual.word.join('')}
          onPress={() => {navigation.goBack()}}
          points={casual.points}
          status={casual.status}
        />

      </ScrollView>
    </SafeAreaView>
  )
}