import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchList } from '../../store/list/action';
import { useDispatch } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchList());
  }, []);
  return (
    <SafeAreaView edges={['top']}>
      <Text style={{ color: 'black', marginTop: 90, fontSize: 20 }}>heyyy</Text>
    </SafeAreaView>
  );
};
