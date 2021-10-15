import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

export type RootStackParamList = {
  List: undefined;
  Detail: undefined;
};

const MainStack = createStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <MainStack.Navigator initialRouteName="List">
      <MainStack.Screen name="List" component={ListScreen} />
      <MainStack.Screen name="Detail" component={DetailScreen} />
    </MainStack.Navigator>
  );
}

export default RootStack;
