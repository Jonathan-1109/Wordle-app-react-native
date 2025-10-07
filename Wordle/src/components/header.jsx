import { View, StyleSheet, Text, Image} from 'react-native';

import { useTheme } from '../context/themeContext';

const Header = ({style}) => {
    const { colorsTheme } = useTheme(); 

    return (
        <View style={[styles.textHeaderContainer, style]}>
          <Image style={styles.imageHeader} source={require('../assets/images/wordleLogo.png')}></Image>
          <Text style={[styles.textHeader, {color: colorsTheme.primary}]}>ordle</Text>
        </View>
    )
}

const styles = StyleSheet.create({
   textHeaderContainer: {
    flexDirection: 'row',
  },

  textHeader: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  imageHeader: {
    width: 60,
    height: 60,
    marginRight: -5,
    marginTop: 0
  },
})

export default Header