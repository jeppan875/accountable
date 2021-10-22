import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import Card from '../Card';

export default ({
  list,
  padding = 0,
  isChildList = false,
}: {
  list: (string | undefined)[];
  padding?: number;
  isChildList?: boolean;
}) => {
  return (
    <FlatList
      style={[
        {
          marginTop: isChildList ? 20 : 0,
          marginLeft: isChildList ? 6 : 0,
        },
        styles.listStyle,
      ]}
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

const styles = StyleSheet.create({
  listStyle: {
    borderLeftColor: colors.neutral,
    borderLeftWidth: 2,
  },
});
