import { createContext, useContext, useLayoutEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from "../constants/colors";

const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(null);
    const [selected, setSelected] = useState(null)

    const colorsTheme = Colors[theme] ?? Colors.light
    const defaultColor = useColorScheme()
    
    const toggleTheme = async (value) => {
        setSelected(value)
        if (value === 'auto') {
            await AsyncStorage.removeItem('color')
            setTheme(defaultColor)
            return
        }
        setTheme(value)
        await AsyncStorage.setItem('color', value)
    }

    useLayoutEffect(() => {
        const loadColor = async () => {
            const temp = await AsyncStorage.getItem('color')
            if (!temp) {
                setSelected('auto')
                setTheme(defaultColor)
                return
            }
            setSelected(temp)
            setTheme(temp)
        }
        loadColor()

    }, [defaultColor, theme])

    return(
        <ThemeContext.Provider value={{colorsTheme, theme, toggleTheme, selected}}>
            {children}
        </ThemeContext.Provider>
    )
}