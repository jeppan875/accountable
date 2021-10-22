import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchList } from '../../store/list/action';
import { useDispatch, useSelector } from 'react-redux';
import { selectListResult, selectList } from '../../store/list/selector';
import Card from '../../Components/Card';
import Fetching from '../../Components/Fetching';

export default () => {
  const result = useSelector(selectListResult);
  const { loading, error } = useSelector(selectList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <SafeAreaView edges={['bottom']}>
      <Fetching
        loading={loading}
        error={error}
        retry={() => dispatch(fetchList())}>
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
      </Fetching>
    </SafeAreaView>
  );
};
