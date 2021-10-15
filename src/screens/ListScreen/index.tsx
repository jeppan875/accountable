import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
  return (
    <SafeAreaView edges={['top']}>
      <Text style={{ color: 'black', marginTop: 90, fontSize: 20 }}>heyyy</Text>
    </SafeAreaView>
  );
};
