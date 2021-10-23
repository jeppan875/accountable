import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { selectItem } from '../../store/list/selector';
import { ApplicationState } from '../../store';
import { Item } from '../../store/list/types';
import { INavigator } from '../../RootNavigator';
import { colors, textStyle } from '../../theme';
import RadioButton from '../RadioButton';

const Card = ({
  id,
  isChildCard = false,
  questionList = false,
  selectedItem = '',
  setSelectedItem,
}: {
  id: string;
  isChildCard: boolean;
  questionList: boolean;
  selectedItem: string;
  setSelectedItem: (selected: string) => void;
}) => {
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState('');

  const navigation: INavigator = useNavigation();

  const item: Item = useSelector((state: ApplicationState) =>
    selectItem(state, id),
  );

  const showSubItems = questionList
    ? selectedItem === item.id
    : item.hasList && showList;

  return (
    <View
      style={{
        marginLeft: isChildCard ? 10 : 0,
      }}>
      <Pressable
        disabled={questionList && item.hasList}
        onPress={() =>
          item.hasList
            ? setShowList(!showList)
            : navigation.navigate('Detail', { id })
        }
        style={({ pressed }) => [styles.root, pressed && { opacity: 0.5 }]}>
        {questionList && item.hasList ? (
          <RadioButton
            label={item?.title}
            secondaryLabel={item?.description}
            selected={selectedItem === item.id}
            onPress={() => {
              setShowList(!showList);
              setSelectedItem(selectedItem === item.id ? '' : item.id);
            }}
          />
        ) : (
          <>
            <Text style={textStyle.title}>{item?.title}</Text>
            <Text style={textStyle.subTitle}>{item?.description}</Text>
          </>
        )}
      </Pressable>
      {showSubItems && (
        <FlatList
          style={[
            {
              marginTop: item.hasList ? 20 : 0,
              marginLeft: item.hasList ? 6 : 0,
            },
            styles.listStyle,
          ]}
          contentContainerStyle={{
            padding: 20,
          }}
          ListHeaderComponent={
            item.hasQuestion ? (
              <Text style={styles.question}>{item.question}</Text>
            ) : null
          }
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(item: string, index) => (item ? item : index + '')}
          renderItem={({ item: itemId }) =>
            itemId ? (
              <Card
                id={itemId}
                isChildCard={item.hasList}
                questionList={item.hasQuestion}
                selectedItem={selected}
                setSelectedItem={setSelected}
              />
            ) : null
          }
          data={item.list || []}
        />
      )}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listStyle: {
    borderLeftColor: colors.neutral,
    borderLeftWidth: 2,
  },
  question: {
    color: colors.secondary,
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
});
