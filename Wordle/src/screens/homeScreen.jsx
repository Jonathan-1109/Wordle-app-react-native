import { Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { useTranslation } from 'react-i18next';
import i18next from '../services/i18next';

import SelectButton from '../components/Buttons/selectButton';
import { Colors } from '../constants/colors';

import { useTheme } from '../context/themeContext';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const {width} = Dimensions.get('window')

export default function HomeScreen({ navigation }) {
    const {t} = useTranslation()
    const { colorsTheme } = useTheme(); 
    const { isLogged, userDataInfo} = useContext(AuthContext)

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, {backgroundColor: colorsTheme.background}]}>

                <View style={styles.header}>
                    
                    <Image style={styles.logo} source={require('../assets/images/wordleLogo.png')} />

                    <Text style={[styles.title,{color: colorsTheme.primary}]}>ordle</Text>
                </View>

                <View style={styles.descriptionContainer}>
                    
                    <Text style={[styles.descriptionText, {color: colorsTheme.primary}]}> {t("home.guess_word")} </Text>

                    <Text style={[styles.subDescriptionText, {color: colorsTheme.secondary}]}> {t("home.words")} </Text>

                </View>  

                { isLogged &&
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text 
                        style={[styles.textName,{color: colorsTheme.primary}]}>
                            {t("home.welcome") + userDataInfo.name.slice(0,12)}
                        </Text>
                    </View>
                }

                <View style={{alignItems: 'center',}}>
                    <SelectButton textContent={t("home.play")} onPress={() => navigation.navigate('Select')} 
                    style={[styles.primaryButton, {backgroundColor: Colors.primary.green}]}/>
                    
                    {!isLogged &&
                    <SelectButton textContent={t("home.log")} onPress={() => navigation.navigate('Login')} 
                    style={[styles.secondaryButton, {borderColor: Colors.primary.green}]} /> }
                
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{color: colorsTheme.primary, marginTop: 'auto'}}>
                        {t("home.By")} Jonathan Tellez
                    </Text>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10, 
        minHeight: 50,
        height: '100%',
    },

    textName: {
        fontSize: 27, 
        fontWeight: 'bold', 
        marginBottom: 20
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Math.min(120,width*0.25),
        marginBottom: 12,
    },
    logo: {
        width: 75,
        height: 75,
        marginRight: -8,
        marginTop: 7
    },
    title: {
        fontSize: 55,
        fontWeight: '800',
        letterSpacing: 2,
    },
    descriptionContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
        marginBottom: 40,
    },
    descriptionText: {
        fontSize: 32,
        textAlign: 'center',
        marginVertical: 20,
        lineHeight: 30,
    },
    subDescriptionText: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 22,
        marginVertical: 10,
        opacity: 0.9,
    },
    primaryButton: {
        elevation: 7,
    },
    secondaryButton: {
        borderWidth: 3.5,
        marginTop: 22,
    }
});