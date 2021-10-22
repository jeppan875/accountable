import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchList } from '../../store/list/action';
import { useDispatch, useSelector } from 'react-redux';
import { selectListResult } from '../../store/list/selector';
import Card from '../../Components/Card';
import CardList from '../../Components/CardList';

export default () => {
  const result = useSelector(selectListResult);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <SafeAreaView edges={['bottom']}>
      <CardList padding={20} list={result} />
    </SafeAreaView>
  );
};
