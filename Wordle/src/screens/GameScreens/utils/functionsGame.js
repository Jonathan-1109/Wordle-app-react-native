import words_es from '../../../assets/data/words_es.json'
import words_en from '../../../assets/data/words_en.json' 

export const selectWord = (mode, lenguage) => {
    switch (lenguage) {
      case 'es': {
        return words_es[mode]
      }
      default: {
        return words_en[mode]
      }
    }
}