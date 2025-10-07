import { useState } from 'react';
import { selectWord } from "../screens/GameScreens/utils/functionsGame";
import { useMatrix } from './useMatrix';

export const useCombinatoricGame = (row, column, language = 'en') => {

    const matrixData = useMatrix(row,column)
    const [wordList] = useState(selectWord('5_words',language))
    const [combWordList] = useState(selectWord('combinatoric',language))
    const [combWord] = useState(combWordList[Math.floor(Math.random() * combWordList.length)].toUpperCase().split(''))
    const [checkWord, setCheckWord] = useState(Array(combWord.length).fill(''))
    const [blockWord, setBlockWord] = useState(Array(combWord.length).fill(''))

    const verifyWord = (wordSelected) => {

        let types = Array(wordSelected.length).fill('n')
        const letterCount = {}
        const use = {}
        const tempBlockWord = [...blockWord]
        const tempCheckWord = [...checkWord]

        combWord.forEach(letter => {
            letterCount[letter] = (letterCount[letter] || 0) + 1
        });

        wordSelected.forEach((letter, i) => {
            combWord.forEach((letterWord,j) => {
                if (letter === letterWord) {
                    tempCheckWord[j] = letterWord
                    tempBlockWord[j] = 'v'
                    types[i] = 'v'
                    use[letter] = (use[letter] || 0) + 1
                }
            })
        })

        wordSelected.forEach((letter, i) => {
            if (types[i] === 'n' && combWord.includes(letter)) {
                const usesLetters = use[letter] || 0
                const temp = letterCount[letter] || 0

            if (usesLetters < temp) {
                use[letter] = usesLetters + 1
            }
        }
    });
        
    const tempCheck = [...matrixData.check]
    tempCheck[matrixData.y] = types
    matrixData.setCheck(tempCheck)
    setCheckWord(tempCheckWord)
    setBlockWord(tempBlockWord)

    if (tempBlockWord.every(value => value === 'v')) {
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
        blockWord,
        checkWord,
        combWord,
    }
}