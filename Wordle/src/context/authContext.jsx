import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Buffer } from "buffer";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [userToken, setUserToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)

    const [isLogged, setIsLogged] = useState(false)
    const [userDataInfo, setUserDataInfo] = useState(null)

    const logout = async () => {
        try {
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userInfo'])
        } catch (e) {
            console.error("Error")
        }
        setUserToken(null)
        setRefreshToken(null)
        setIsLogged(false)
        setUserDataInfo(null)
    }

    const descode = async (token) => {
        const parts = await token.split('.').map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()); 
        const payload = await JSON.parse(parts[1]);   
        return payload 
    }

    const saveLogin = async (data) => {
        try {
            const token = data.accessToken
            const newRefreshToken = data.refreshToken    
            const payload = await descode(token);
            const userData = {"name": payload.name, "mail": payload.mail, "id": payload.id}
            setUserToken(token)
            setRefreshToken(newRefreshToken)
            setIsLogged(true)
            setUserDataInfo(userData)

            await AsyncStorage.multiSet([
                ['accessToken', token],
                ['refreshToken', newRefreshToken],
                ['userInfo', JSON.stringify(userData)] 
            ])
        } catch (err) {
            console.error("err")
        }
    }

    const isLoggedIn = async () => {
        try {
            const tokens = await AsyncStorage.multiGet(['accessToken', 'refreshToken', 'userInfo'])
            const userToken = tokens[0][1]
            const refreshToken = tokens[1][1]
            const userInfoStr = tokens[2][1]
            
            if (userToken && refreshToken && userInfoStr) {
                setUserToken(userToken)
                setRefreshToken(refreshToken)
                setUserDataInfo(JSON.parse(userInfoStr)) 
                setIsLogged(true)
            }
        } catch (err) {
            console.error("Error")
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ saveLogin, logout, userToken, refreshToken, isLogged, userDataInfo }}>
            {children}
        </AuthContext.Provider>
    )
}