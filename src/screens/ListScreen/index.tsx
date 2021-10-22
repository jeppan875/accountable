import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchList } from '../../store/list/action';
import { useDispatch, useSelector } from 'react-redux';
import { selectListResult } from '../../store/list/selector';
import Card from '../../Components/Card';

export default () => {
  const result = useSelector(selectListResult);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <SafeAreaView edges={['bottom']}>
      <FlatList
        contentContainerStyle={{
          padding: 20,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item, index) => (item ? item : index + '')}
        renderItem={({ item }) =>
          item ? <Card id={item} isChildCard={false} /> : null
        }
        data={result || []}
      />
    </SafeAreaView>
  );
};
