import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/core/navigation/AppNavigation';
import ThemeProvider from './src/core/contexts/ThemeContext';
import { FavouriteContextProvider } from './src/presentation/viewmodels/context/FavouriteContext';
import { useTheme } from './src/core/hooks/useTheme';
import CartContextProvider, { CartContext } from './src/presentation/viewmodels/context/CartContext';

function AppContent() {
  const { colors } = useTheme();
  const isDarkMode = colors === require('./src/core/theme/Colors').darkColors;

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.root}>
        <NavigationContainer>
          <FavouriteContextProvider>
            <CartContextProvider>
              <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
              <AppNavigation />
            </CartContextProvider>
          </FavouriteContextProvider>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
});

export default App;
