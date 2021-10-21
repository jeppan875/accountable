import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import { StackNavigationProp } from '@react-navigation/stack';

export type INavigator = StackNavigationProp<RootStackParamList>;

export type RootStackParamList = {
  List: undefined;
  Detail: { id: string };
};

export type RootStackRouteProp = RouteProp<RootStackParamList>;

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
