import {Text, Modal, View, StyleSheet} from 'react-native';
import SelectButton from '../Buttons/selectButton';
import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

import { Colors } from '../../constants/colors';

const ModalRuler = ({ isOpen, close }) => {

  const {t} = useTranslation();
  
  return (
    <Modal 
      animationType="fade" 
      visible={isOpen} 
      transparent={true} 
      onRequestClose={() => close(false)}
    >
      <View style={[styles.container, {backgroundColor: Colors.primary.modalBackground}]}>
        <View style={[styles.interContainer, {backgroundColor: '#FFFFFF'}]}>

          <View style={styles.header}>
            <Text style={styles.title}>{t("rules_modal.title")}</Text>
          </View>

            <View style={styles.ruleItem}>
              <View style={[styles.bullet, {backgroundColor: Colors.primary.blue}]} />
              <Text style={styles.ruleText}>
                {t("rules_modal.rule_1")}
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <View style={[styles.bullet, {backgroundColor: Colors.primary.purple}]} />
              <Text style={styles.ruleText}>
                {t("rules_modal.rule_2")}
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <View style={[styles.bullet, {backgroundColor: Colors.primary.yellow}]} />
              <Text style={styles.ruleText}>
                <Text style={{color: Colors.primary.yellow, fontWeight: 'bold'}}>
                  {t("rules_modal.yellow")}
                </Text>
                {t("rules_modal.rule_3")}
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <View style={[styles.bullet, {backgroundColor: Colors.primary.green}]} />
              <Text style={styles.ruleText}>
                <Text style={{color: Colors.primary.green, fontWeight: 'bold'}}>
                  {t("rules_modal.green")}
                </Text>
              {t("rules_modal.rule_4")}
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <View style={[styles.bullet, {backgroundColor: Colors.primary.gray}]} />
              <Text style={styles.ruleText}>
                <Text style={{color: Colors.primary.gray, fontWeight: 'bold'}}>
                  {t("rules_modal.gray")}
                </Text>
                {t("rules_modal.rule_5")}
              </Text>
            </View>
            
          <View style={styles.footer}>
            <SelectButton textContent={t("rules_modal.close")} onPress={() => close(false)} 
            style={{ backgroundColor: Colors.primary.red}} />
          </View>
          
        </View>
      </View>
    
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  interContainer: {
    borderRadius: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight:'auto',
    padding: 30,
    elevation: 8,
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 6,
  },
  ruleText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
  },
  footer: {
    alignItems: 'center',  
    justifyContent: 'center',
  },
});

export default ModalRuler;