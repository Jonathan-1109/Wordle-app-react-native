import { View, StyleSheet, Animated, Dimensions, Text} from 'react-native';
import {useEffect, useRef} from 'react';

import { Colors } from '../constants/colors';
import { useTheme } from '../context/themeContext';

const {height, width} = Dimensions.get('window')

const Table = ({style, game}) => {
    
  const { colorsTheme } = useTheme(); 
  const shake = useRef(new Animated.Value(0)).current

  const animations = useRef(game.matrix.map(() => ({
      left: new Animated.Value(65),
      opacity: new Animated.Value(0),
  }))).current;
    
  const shakeAnimationTiming = () => {
    Animated.sequence([
      Animated.timing(shake, {toValue:10,duration:120,useNativeDriver:true}),
      Animated.timing(shake, {toValue:-10,duration:120,useNativeDriver:true}),
      Animated.timing(shake, {toValue:10,duration:120,useNativeDriver:true}),
      Animated.timing(shake, {toValue:-10,duration:120,useNativeDriver:true}),
      Animated.timing(shake, {toValue:0,duration:120,useNativeDriver:true})
    ]).start()
  }

  const stylesValues = (status) => {
        switch (status) {
          case 'v': {
            return {backgroundColor: Colors.primary.lightGreen, borderColor:  Colors.primary.lightGreen}
          }
          case 'o': {
            return {backgroundColor: Colors.primary.yellow, borderColor:  Colors.primary.yellow}
          }
          case 'n': {
            return {backgroundColor: Colors.primary.gray, borderColor:  Colors.primary.gray}
          }
          default: {
            return {borderColor: colorsTheme.borderColor}
          }
        }
    }

  const refColor = () => {
      return {borderColor: Colors.primary.blue}
    }

  const firstAnimation = () => {
      const lineAnimations = animations.map((anim) =>
        Animated.parallel([
          Animated.timing(anim.left, {toValue: 0, duration: 650, useNativeDriver: true}),
          Animated.timing(anim.opacity, {toValue: 1, duration: 800, useNativeDriver: true})
        ])
      )
      Animated.stagger(140, lineAnimations).start()
    }
    
  useEffect(() => {
    try {
      if (game.shake) {
        shakeAnimationTiming()
        game.setShake(false)
      }
      firstAnimation()
    } catch (err) {
    }
  },[game.shake])

    return (
        <View style={style}>
          
            {game.matrix.map((rowMatrix, i) => (
                <Animated.View key={i} 
                style={[styles.row, {transform: [{translateX: animations[i].left}], opacity:animations[i].opacity}]}>

                    {rowMatrix.map((value, j) => (
    
                        <Animated.View key={j} style={[styles.block,
                        {
                          width: width*0.16,
                          maxWidth: 75,
                          height: height*0.08,
                          maxHeight: 150
                        },
                        stylesValues(game.check[i][j]),
                        i === game.y && { transform: [{ translateX: shake }]},
                        i === game.y && j === game.x && refColor()]}>
        
                            <Text key={`${i}-${j}`} style={{color: colorsTheme.primary, fontSize: 25, fontWeight: 600}}> 
                              {value}
                            </Text>
    
                        </Animated.View>
                    ))}
                </Animated.View>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    gap:7,
    justifyContent: 'center',
    flexDirection: "row",
    paddingVertical: 3.6,
  },
  block: {
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
  }
})

export default Table