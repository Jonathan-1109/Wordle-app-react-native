import { ThemeProvider } from './src/context/themeContext';
import { AuthProvider } from './src/context/authContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {

 return (
  <AuthProvider>
    <ThemeProvider>
      <SafeAreaProvider >
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  </AuthProvider>
 )
} 