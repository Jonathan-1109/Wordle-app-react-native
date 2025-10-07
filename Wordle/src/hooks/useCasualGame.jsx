import { useState } from 'react';
import { selectWord } from "../screens/GameScreens/utils/functionsGame";
import { useMatrix } from './useMatrix';

export const useCasualGame = (row, column, language = 'en') => {
    
    const matrixData = useMatrix(row,column)
    const [wordList] = useState(selectWord('5_words',language))
    const [word] = useState(wordList[Math.floor(Math.random() * wordList.length)].toUpperCase().split(''))

    const verifyWord = (selectWord) => {
        let letters = Array(column).fill('n')
        const letterCount = {}
        const use = {}

        word.forEach(letter => {
            letterCount[letter] = (letterCount[letter] || 0) + 1
        })

        selectWord.forEach((letter, i) => {
            if (letter === word[i]) {
                letters[i] = 'v'
                use[letter] = (use[letter] || 0) + 1
            }
        })

        selectWord.forEach((letter, i) => {
            if (letters[i] === 'n' && word.includes(letter)) {
                const usesLetters = use[letter] || 0
                const temp = letterCount[letter] || 0

                if (usesLetters < temp) {
                    letters[i] = 'o'
                    use[letter] = usesLetters + 1
                }
            }
        })

        const tempCheck = [...matrixData.check]
        tempCheck[matrixData.y] = letters
        matrixData.setCheck(tempCheck)

        if (letters.every(value => value === 'v')) {
            matrixData.setStatus('winner')
            return true
        }
        return false   
    }

    const nextLine = () => {

        if (matrixData.matrix[matrixData.y][column - 1] === '') {
            matrixData.setShake(true)
            return
        }

        const wordSelected = matrixData.matrix[matrixData.y]

        if (!wordList.includes(wordSelected.join('').toLowerCase())) {
            matrixData.setShake(true)
            matrixData.setNotWord(true)
            return
        }

        if (verifyWord(wordSelected)) return
        
        matrixData.setPoints(prev => prev - 100)
        
        if (matrixData.y === row - 1) {
            matrixData.setStatus("lose")
            return
        }

        matrixData.setY(prev => prev + 1)
        matrixData.setX(0)
    }

  return {
    ...matrixData,
    nextLine,
    word,
  }
}