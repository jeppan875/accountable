import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchList, searchList, shuffleList } from '../../store/list/action';
import { useDispatch, useSelector } from 'react-redux';
import { selectListResult, selectList } from '../../store/list/selector';
import Card from '../../Components/Card';
import Fetching from '../../Components/Fetching';
import SearchBar from '../../Components/SearchBar';
import PrimaryButton from '../../Components/PrimaryButton';

export default () => {
  const [search, setSearch] = useState('');

  const result = useSelector(selectListResult);
  const { loading, error } = useSelector(selectList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Fetching
        loading={loading}
        error={error}
        retry={() => dispatch(fetchList())}>
        <FlatList
          ListHeaderComponentStyle={{
            marginBottom: 20,
          }}
          ListHeaderComponent={
            <>
              <SearchBar
                input={search}
                setInput={setSearch}
                onSearch={() => dispatch(searchList(search))}
              />
              <PrimaryButton
                text={'Shuffle'}
                onPress={() => dispatch(shuffleList())}
              />
            </>
          }
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
