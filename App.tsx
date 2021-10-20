import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigator from './src/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/configureStore';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaProvider>
          <NavigationContainer theme={DefaultTheme}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </View>
    </Provider>
  );
};

export default App;
