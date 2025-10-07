import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useTheme } from '../../context/themeContext';

const ProfileButton = ({onPress, disabled}) => {
  const { colorsTheme } = useTheme(); 

  return (
    <TouchableOpacity 
    style={[styles.headerLeftButton, 
    {backgroundColor: '#FFFFFF', 
    borderColor: colorsTheme.primary }]}
    onPress={onPress}
    disabled={disabled}>

        <Image source={require('../../assets/images/user.png')} style={styles.headerLeftIcon} />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerLeftButton: {
    width: 42,
    height: 42,
    marginRight: 5,
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

export default ProfileButton;