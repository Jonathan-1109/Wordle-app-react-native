import {TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';

import { Colors } from '../../constants/colors';
import { useTheme } from '../../context/themeContext';

const {width, height} = Dimensions.get('window')

const BackButton = ({onPress, disabled}) => {
  const { colorsTheme } = useTheme(); 

  return (
    <TouchableOpacity 
    style={[styles.headerLeftButton, 
    {backgroundColor: Colors.primary.green, 
    borderColor: colorsTheme.primary }]}
    onPress={onPress}
    disabled={disabled}>

        <Image source={require('../../assets/images/back.png')} style={styles.headerLeftIcon} />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerLeftButton: {
    width: 42,
    marginLeft: 5,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerLeftIcon: {
    width: 30,
    height: 30
  }
});

export default BackButton;