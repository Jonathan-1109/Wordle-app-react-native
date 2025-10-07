import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../locales/en.json';
import es from '../locales/es.json';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const lenguageServices = {
  en: { translation: en },
  es: { translation: es },
};

const defaultLanguage = async () => {
  try {
    const temp = await AsyncStorage.getItem('language');
    return temp || 'en';
  } catch (err) {
    return 'en';
  }
};

const initI18n = async () => {

    await i18next.use(initReactI18next).init({
      compatibilityJSON: 'v4',
      lng: await defaultLanguage(),
      fallbackLng: 'en',
      resources: lenguageServices,
    })
}

initI18n()
export default i18next;