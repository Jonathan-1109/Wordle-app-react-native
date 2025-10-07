import { useState } from 'react';

export const useMatrix = (row, column) => {
    const [x,setX] = useState(0)
    const [y,setY] = useState(0)
    const [points,setPoints] = useState(row*100)
    const [status,setStatus] = useState('playing')
    const [shake, setShake] = useState(false)
    const [notWord, setNotWord] = useState(false)
    const [matrix, setMatrix] = useState(Array(row).fill().map(() => Array(column).fill('')))
    const [check, setCheck] = useState(Array(row).fill().map(() => Array(column).fill('')))

    const selectLetter = (value) => {
        if (matrix[y][x] !== '') return

        if (x < column - 1) setX(prev => prev + 1)

        const tempMatrix = matrix.map(row => [...row])
        tempMatrix[y][x] = value
        setMatrix(tempMatrix)
    }

    const deleteLetter = () => {
        const newMatrix = matrix.map(row => [...row])

        if (x > 0 && matrix[y][x] === '') {
            newMatrix[y][x - 1] = ''
            setX(prev => prev - 1)
        }

        if (matrix[y][x] !== '') newMatrix[y][x] = ''
        setMatrix(newMatrix)
    }

    return {
        x,
        y,
        setX,
        setY,
        status,
        setStatus,
        check,
        setCheck,
        shake,
        setShake,
        notWord,
        setNotWord,
        matrix,
        setMatrix,
        selectLetter,
        deleteLetter,
        points,
        setPoints
    }
}