import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

import { useTheme } from '../../context/themeContext';

const SelectButton = ({textContent, onPress, style, disabled}) => {
  const { colorsTheme } = useTheme(); 

  return (
    <TouchableOpacity
      style={[styles.buttonMode, style]}
      onPress={onPress}
      disabled={disabled ? disabled : false}
    >

      <View style={styles.contentContainer}>
        <Text style={[styles.textButton, {color: style.color ? style.color : colorsTheme.primary}]}>{textContent}</Text>
      </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonMode: {
    width: '57%',
    minWidth: 115,
    maxWidth: 270,
    padding: 11,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    fontWeight: 500,
  },
})

export default SelectButton;