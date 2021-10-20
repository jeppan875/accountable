import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchList } from '../../store/list/action';
import { useDispatch, useSelector } from 'react-redux';
import { collectionSelector } from '../../store/list/selector';

export default () => {
  const result = useSelector(collectionSelector);
  console.log(result, 'resultresult');
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
