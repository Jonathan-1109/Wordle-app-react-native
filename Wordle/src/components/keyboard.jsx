import {TouchableOpacity, Dimensions, StyleSheet, Text, Image, View, Vibration, Animated} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/themeContext';

import { useTranslation } from 'react-i18next';
import i18next from '../services/i18next';

const { width, height } = Dimensions.get('window');

const KeyBoard = ({style, game}) => {

    const {i18n} = useTranslation()
    const [disabled, setDisabled] = useState(false)

    const animations = useRef({
        up: new Animated.Value(20),
        opacity: new Animated.Value(0),
    }).current

    const moveY = () => {
        Animated.parallel([
            Animated.timing(animations.up, {toValue:0,duration:800,useNativeDriver: true}),
            Animated.timing(animations.opacity, {toValue: 1, duration: 800, useNativeDriver: true})
        ]).start()
    }

    useEffect(() => {
        try {
            moveY()
        } catch (err) {
        }
    }, [])

    useEffect(() => {
        setDisabled(game.status !== 'playing')
    }, [game.status])

    return (
        <Animated.View style={[
            { alignItems: 'center', justifyContent: 'center', 
            transform: [{translateY: animations.up}], opacity: animations.opacity}, 
            style]}>

            <View style={styles.containerButtons}>
                {['Q','W','E','R','T','Y','U','I','O','P'].map(letter => (
                    <Block key={letter} label={letter} 
                    onPress={() => {game.selectLetter(letter), Vibration.vibrate(100)}} 
                    disabled={disabled}/>
                ))}
            </View>

            <View style={styles.containerButtons}>
                {['A','S','D','F','G','H','J','K','L'].map(letter => (
                  <Block key={letter} label={letter} 
                  onPress={() =>{game.selectLetter(letter), Vibration.vibrate(100)}} 
                  disabled={disabled}/>
                ))}
                {i18n.language === 'es' && <Block label={'Ñ'} 
                onPress={() => {game.selectLetter('Ñ'), Vibration.vibrate(100)}} disabled={disabled}/>}
            </View>

            <View style={styles.containerButtons}>
                <ImageBlock image={require('../assets/images/enter.png')} 
                onPress={() => {game.nextLine(), Vibration.vibrate(60)}} disabled={disabled} /> 

                {['Z','X','C','V','B','N','M'].map(letter => (
                <Block key={letter} label={letter} 
                onPress={() => {game.selectLetter(letter), Vibration.vibrate(100)}} disabled={disabled}/>
                ))}

                <ImageBlock image={require('../assets/images/delete.png')} 
                onPress={() => {game.deleteLetter(), Vibration.vibrate(60)}} 
                disabled={disabled}/>           
            </View>
        </Animated.View>
    )
}

const Block = ({label, onPress, disabled}) => {
    const { colorsTheme } = useTheme(); 
    const fontSize = Math.max(18, Math.min(22, width * 0.05));
    
    return (
        <TouchableOpacity style={
        [styles.block, 
        {
            borderColor: colorsTheme.primary, 
            width: width * 0.092,
            maxWidth: 45,
            height: height*0.1,
            maxHeight: 70
        }]}
        onPress={onPress}
        disabled={disabled}>

            <Text style={{color: colorsTheme.primary, fontSize: fontSize}}>
                {label}
            </Text>

        </TouchableOpacity>
    )
}

const ImageBlock = ({image, onPress, disabled}) => {
    const { theme, colorsTheme } = useTheme(); 
    return (
        <TouchableOpacity style={
        [styles.block, 
        {
            borderColor: colorsTheme.primary, 
            width: width*0.14,
            height: height*0.1,
            maxWidth: 55,
            maxHeight: 70,
            backgroundColor: theme === 'dark' ? colorsTheme.primary : 'transparent'
        }]}
        onPress={onPress}
        disabled={disabled}>

            <Image source={image} style={styles.image}/>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    block: {
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 'auto',
    marginHorizontal: 0.5
    },
    image: {
        width: 40,
        height: 35,
    },
    containerButtons: {
    flexDirection: 'row',
    marginTop: 2,
  },

})

export default KeyBoard