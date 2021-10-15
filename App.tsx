import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigator from './src/RootNavigator';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaProvider>
        <NavigationContainer theme={DefaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};

export default App;
