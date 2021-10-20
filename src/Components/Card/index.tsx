import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem } from '../../store/list/selector';
import { ApplicationState } from '../../store';
import { Item } from '../../store/list/types';
import CardList from '../CardList';

const Card = ({
  id,
  isChildCard = false,
}: {
  id: string;
  isChildCard: boolean;
}) => {
  const [showList, setShowList] = useState(false);

  const item: Item = useSelector((state: ApplicationState) =>
    selectItem(state, id),
  );
  console.log(item, 'itemmmm');
  return (
    <View
      style={{
        marginLeft: isChildCard ? 10 : 0,
      }}>
      <Pressable
        onPress={() => setShowList(!showList)}
        disabled={!item.hasList}
        style={({ pressed }) => [styles.root, pressed && { opacity: 0.5 }]}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </Pressable>
      {item.hasList && showList && (
        <CardList list={item.list || []} isChildList={true} />
      )}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
