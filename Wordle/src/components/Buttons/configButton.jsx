import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import { Colors } from '../../constants/colors';

import { useTheme } from '../../context/themeContext';

const ConfigButton = ({textContent, onPress, style}) => {
    const {colorsTheme} = useTheme();

      return (
        <TouchableOpacity
          style={[ styles.buttonMode, {backgroundColor: Colors.primary.green}, style]}
          onPress={onPress}>
    
          <View style={styles.contentContainer}>
            <Text style={[styles.textButton, {color: colorsTheme.primary}]}>{textContent}</Text>
            <Image style={styles.imageButtonRight} source={require("../../assets/images/arrow.png")} ></Image>
          </View>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
buttonMode: {
  width: '100%',
  paddingVertical: 15, 
  borderRadius: 10,
  paddingHorizontal: 15,
  marginVertical: 12,
},
 contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textButton: {
    fontSize: 23,
    flex: 1
  },
  imageButtonRight: {
    width: 20,
    height: 25,
  },
})
export default ConfigButton;