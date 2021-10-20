import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Card from '../Card';

export default ({
  list,
  padding = 0,
  isChildList = false,
}: {
  list: (string | undefined)[];
  padding?: number;
  isChildList: boolean;
}) => {
  return (
    <FlatList
      style={{
        marginTop: isChildList ? 20 : 0,
        borderLeftColor: 'grey',
        borderLeftWidth: 2,
        marginLeft: isChildList ? 6 : 0,
      }}
      contentContainerStyle={{
        padding,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      keyExtractor={(item, index) => (item ? item : index + '')}
      renderItem={({ item }) =>
        item ? <Card id={item} isChildCard={isChildList} /> : null
      }
      data={list || []}
    />
  );
};
