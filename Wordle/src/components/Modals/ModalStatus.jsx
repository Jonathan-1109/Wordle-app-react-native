import {Text, Modal, View, StyleSheet} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import SelectButton from '../Buttons/selectButton';

import { Colors } from '../../constants/colors';

import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

const ModalStatus = ({ word, points, onPress, status}) => {
 
    const {t} = useTranslation();
    const {isLogged } = useContext(AuthContext)
    const cond = status === 'winner'
    const isOpen = status !== 'playing'

  return (
      <Modal 
        animationType="fade" 
        visible={isOpen} 
        transparent={true} 
      >
          <View style={[styles.container, {backgroundColor: Colors.primary.modalBackground}]}>
              <View style={[styles.interContainer, {backgroundColor: '#FFFFFF'}]}>

                  <View style={styles.header}>
                      <Text style={[styles.title]}>
                        {cond? t('game.winHeader') : t('game.loseHeader')}
                      </Text>
                  </View>

                  <View style={{alignItems: 'center', marginVertical: 'auto'}}>
                      <Text style={{fontSize: 20, fontWeight: 500, marginBottom: 10}}>{t("game.word")}</Text>
                      
                      <View style={[styles.word, {backgroundColor: Colors.primary.lightGreen, borderColor: Colors.primary.green}]}>
                        <Text style={{fontSize: 20, fontWeight: 500}}>{word}</Text>
                      </View>
                  </View>

                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: 16, fontWeight: 500}}>
                        {cond ? t('game.winner') : t('game.lose')}
                      </Text>
                      { cond && isLogged && points && (
                          <Text style={{fontSize: 20}}> +{points} {t("game.point")}</Text>
                      )}
                  </View>

                  <View style={styles.footer}>
                      <SelectButton 
                        textContent={t("rules_modal.close")}
                        onPress={onPress} 
                        style={{ backgroundColor: Colors.primary.red, width: '80%'}}
                      />
                  </View>
              </View>
          </View>
      </Modal>
    )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  interContainer: {
    borderRadius: 20,
    width: '80%',
    height: '45%',
    padding: 30,
    elevation: 8,
  },
  header: {
    borderBottomWidth: 1,
    marginBottom: 20,    
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
      alignItems: 'center',  
      justifyContent: 'center',
      padding: 6,
      marginTop: 10
  },
  word: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 8,
    borderWidth: 3
  }
});

export default ModalStatus;