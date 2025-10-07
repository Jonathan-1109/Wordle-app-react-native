import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer  } from "@react-navigation/native";

import SelectScreen from "../screens/selectScreen";
import HomeScreen from '../screens/homeScreen';
import ClasificationScreen from '../screens/clasificationScreen';

import ConfigScreen from '../screens/ConfigScreens/configScreen';
import LanguageScreen from '../screens/ConfigScreens/languageScreen'

import GameScreen from '../screens/GameScreens/gameScreen'
import CombinatoricScreen from '../screens/GameScreens/combinatoricScreen';

import LoginScreen from '../screens/loginScreens/loginScreen';
import RegisterScreen from '../screens/loginScreens/registerScreen';
import ProfileScreen from '../screens/loginScreens/profileScreen';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/themeContext';
import ThemeScreen from '../screens/ConfigScreens/themeScreen';

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
    const {theme} = useTheme()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Select' component={SelectScreen}/>
                <Stack.Screen name='Config' component={ConfigScreen}/>
                <Stack.Screen name='Language' component={LanguageScreen}/>
                <Stack.Screen name='Theme' component={ThemeScreen}/>
                <Stack.Screen name='Game' component={GameScreen}/>
                <Stack.Screen name='Combinatorics' component={CombinatoricScreen}/> 
                <Stack.Screen name='Login' component={LoginScreen}/>          
                <Stack.Screen name='Register' component={RegisterScreen}/>   
                <Stack.Screen name='Clasification' component={ClasificationScreen}/>    
                <Stack.Screen name='Profile' component={ProfileScreen}/>                                    
            </Stack.Navigator>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'}/>     
        </NavigationContainer>   
    )
}