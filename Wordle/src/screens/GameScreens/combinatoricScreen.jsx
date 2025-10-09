import { useLayoutEffect, useContext} from 'react';
import { Text, View, StyleSheet, Alert, Dimensions, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors.js';

import BackButton from '../../components/Buttons/backButton.jsx';
import ModalStatus from '../../components/Modals/ModalStatus.jsx';
import Table from '../../components/table.jsx';
import KeyBoard from '../../components/keyboard.jsx';
import Header from '../../components/header.jsx';

import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next.js';

import { useTheme } from '../../context/themeContext.jsx';

import { AuthContext } from '../../context/authContext.jsx';

import { useEffect } from 'react';
import { useCombinatoricGame } from '../../hooks/useCombinatoricGame.jsx';
import { updateData } from '../../services/apiFunctions.js';

const {height, width} = Dimensions.get('window');

export default function CombinatoricScreen({navigation}) {
    const {t, i18n} = useTranslation()
    const language = i18n.language

    const { theme, colorsTheme } = useTheme()

    const {isLogged, userDataInfo} = useContext(AuthContext)
    const combinatory = useCombinatoricGame(5,5,language)

    const newStyles = (status) => {
        switch (status) {
            case 'v': {
                return {backgroundColor: Colors.primary.green, borderColor:  Colors.primary.green}
            }
            default: {
                return {borderColor: Colors.primary.defaultButton}
            }
        }
    }
    
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
        if (combinatory.notWord) {
            combinatory.setNotWord(false)

            Alert.alert(
                t("game.titleNotWord"),
                t("game.notWord"),
                [{text: t('game.accept'), style:'cancel'}],
                {cancelable:true})
        }        
    }, [combinatory.notWord])

    useEffect(() => {
        if (combinatory.status !== 'playing' && isLogged) {
            updateData(userDataInfo.id,combinatory.status,combinatory.points,2)
            .catch(err => {
                console.error(err.message)

                Alert.alert("Error",  t("game.error"), 
                [{text: t('game.accept'), style:'cancel'}],
                {cancelable:true})

            })
        }
    }, [combinatory.status])

    return (
        <SafeAreaView 
          style={[{flex: 1, backgroundColor: colorsTheme.background}]}
          edges={['bottom']}>
            <ScrollView>
                
                <Table style={{padding: 5}} game={combinatory}/>
    
                    <View style={[styles.wordContainer]}>
                        {combinatory.checkWord.map((value,i) => (
                            <View key={i} style={[
                                {
                                    width: width*0.135,
                                    maxWidth: 70,
                                    height: height*0.065,
                                    maxHeight: 140,
                                    fontSize: 17 
                                }, 
                                    styles.wordBlock,
                                    newStyles(combinatory.blockWord[i])
                                ]}>

                                <Text key={i} style={{color: colorsTheme.primary, fontSize: 20, fontWeight: 500}}>
                                    {value}
                                </Text>
                            </View>
                        ))}
                    </View>

                <KeyBoard game={combinatory} style={{marginTop: 10}}/>

                <ModalStatus 
                word={combinatory.combWord.join('')}
                onPress={() => {navigation.goBack()}}
                points={combinatory.points}
                status={combinatory.status}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  wordContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: "row",
    flexWrap: 'wrap',
    alignContent: 'center',
    gap: 5,
  },
  wordBlock: {
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 3,
    borderRadius: 5, 
  }

});