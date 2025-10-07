import { Text, View, StyleSheet, Alert, Share,Image, ScrollView} from 'react-native';
import { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { CommonActions } from '@react-navigation/native'
import { Colors } from '../../constants/colors';

import { useTranslation } from 'react-i18next';
import i18next from '../../services/i18next';

import SelectButton from '../../components/Buttons/selectButton';
import BackButton from '../../components/Buttons/backButton';

import { useTheme } from '../../context/themeContext';

import api from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/authContext.jsx';

export default function ProfileScreen({navigation}) {
  const {t} = useTranslation();

  const { theme, colorsTheme } = useTheme(); 
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)
  const {userDataInfo, logout} = useContext(AuthContext)

   useEffect( () => {
  
    const fetchData = async () => {
      try {

        const response = await api.get(`/data/getData/${userDataInfo.id}`);
        const values = response.data.values
        values.forEach((value) => {
          if (value.modeID === 1) {
            setData(value)
          }
          if (value.modeID === 2) {
            setData2(value)
          } 
        })

      } catch (err) {

        Alert.alert("Error", t("profile.error"), [{text: t('game.accept'), style:'cancel'}])
        if (err.status === 401) {
          await logout()
          navigation.dispatch( CommonActions.reset({ index: 0, routes: [{ name: 'Home' }]}))
        }

      }
    };
    fetchData();
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.textHeaderContainer}>
          <Text style={[styles.textHeader, {color: colorsTheme.primary}]}>{t("profile.t")}</Text>
        </View>
      ),
       headerTitleStyle: {
        textAling: 'center',
      },
      headerStyle: {
        backgroundColor: colorsTheme.header
      },

      headerTitleAlign: 'center',

      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,

    })
  }, [navigation, theme])

const shareButton = async () => {
    try {
        const points = ( data ? data.points : 0) + (data2 ? data2.points : 0) 
        const victories = (data ? data.victories : 0) + (data2 ? data2.victories : 0)
        await Share.share({
            message: t("profile.m1") + points + t("profile.m2") + victories + t("profile.m3"),
        });
    } catch (err) {
        Alert.alert("Error", t("profile.shareError"), 
        [{text: t('game.accept'), style:'cancel'}],
        {cancelable:true})
    }
}

return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colorsTheme.background }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
        <View style={styles.headerContainer}>
          <View style={[styles.profileContainer, { borderColor: colorsTheme.primary, backgroundColor: '#FFFFFF'}]}>
            <Image
              source={require('../../assets/images/user.png')}
              style={[styles.profileImage]}
            />
          </View>
          <Text style={[styles.userName, { color: colorsTheme.primary }]}>{userDataInfo.name}</Text>
        </View>

        <View style={[styles.statsCard, { backgroundColor: Colors.primary.lightGreen, borderRadius: 20, marginBottom: 10 }]}>
          <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: Colors.light.primary }]}>{t("profile.casualTitle")}</Text>
          </View>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors.light.primary }]}>{ data ? data.victories : 0}</Text>
              <Text style={[styles.statLabel, { color: Colors.light.primary }]}>{t("profile.casualWins")}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors.light.primary  }]}>{ data ? data.played : 0}</Text>
              <Text style={[styles.statLabel, { color: Colors.light.primary }]}>{t("profile.casualPlays")}</Text> 
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors.light.primary }]}>{ data ? data.points : 0}</Text>
              <Text style={[styles.statLabel, { color: Colors.light.primary }]}>{t("profile.casualPoints")}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.statsCard, {backgroundColor: Colors.primary.pink}]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.light.primary }]}>{t("profile.structureTitle")}</Text>
          </View>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue]}>{data2 ? data2.victories : 0}</Text>
              <Text style={[styles.statLabel, { color: Colors.light.primary  }]}>{t("profile.casualWins")}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue]}>{data2 ? data2.played : 0}</Text>
              <Text style={[styles.statLabel, { color: Colors.light.primary  }]}>{t("profile.casualPlays")}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue]}>{data2 ? data2.points : 0}</Text>
              <Text style={[styles.statLabel, { color: Colors.light.primary  }]}>{t("profile.casualPoints")}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.summaryCard, {backgroundColor: Colors.light.header}]}>
          <Text style={[styles.summaryTitle, { color: Colors.light.primary }]}>{t("profile.totalSummary")}</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: Colors.light.primary}]}>
                {(data ? data.victories : 0) + (data2 ? data2.victories : 0)}</Text>
              <Text style={[styles.summaryLabel, { color: Colors.light.primary }]}>{t("profile.casualWins")}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, {color: Colors.light.primary }]}>
                {(data ? data.points : 0) + (data2 ? data2.points : 0)}</Text>
              <Text style={[styles.summaryLabel, { color: Colors.light.primary }]}>{t("profile.casualPoints")}</Text>
            </View>
          </View>
        </View>
        <SelectButton textContent={t("profile.share")}  style={{backgroundColor: Colors.primary.green}} 
        onPress={() => shareButton()}/>
        
      </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileContainer: {
    borderWidth: 3,
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 27,
    fontWeight: '600',
  },
  statsCard: {
    borderRadius: 16,
    padding: 10,
    marginVertical: 1,
    width: '90%',
    maxWidth: 400
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    maxWidth: 400
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 15,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#1A1A1B',
  },
  textHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 40
  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});