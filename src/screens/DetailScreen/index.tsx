import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { INavigator, RootStackRouteProp } from '../../RootNavigator';
import { selectItem } from '../../store/list/selector';
import { ApplicationState } from '../../store';
import { Item } from '../../store/list/types';
import { useDispatch, useSelector } from 'react-redux';
import usePreventLeave from '../../hooks/usePreventLeave';
import InputField from '../../Components/InputField';
import { colors, gutters, textStyle } from '../../theme';
import PrimaryButton from '../../Components/PrimaryButton';
import { regAlphabetAndSpaces } from '../../Utils/regex';
import { updateItem, removeItem } from '../../store/list/action';

export default ({
  navigation,
  route,
}: {
  navigation: INavigator;
  route: RootStackRouteProp;
}) => {
  const id = route?.params?.id;
  const dispatch = useDispatch();

  const item: Item = useSelector((state: ApplicationState) =>
    selectItem(state, id),
  );

  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [saved, setSaved] = useState(false);

  const disableSave =
    !regAlphabetAndSpaces.test(description) ||
    !regAlphabetAndSpaces.test(title);

  usePreventLeave({
    allow:
      (title === item?.title && description === item?.description) ||
      item == null ||
      saved,
    onLeave: disableSave
      ? () => null
      : () => dispatch(updateItem(id, title, description)),
    leaveActionText: disableSave ? 'Stay' : 'Save changes',
  });

  useEffect(() => {
    if (item == null || saved) {
      navigation.goBack();
    }
  }, [item, saved]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: gutters.screenGutter,
        }}>
        {item?.parentTitle && (
          <Text style={textStyle.title}>
            {'Part of collection ' + item.parentTitle}
          </Text>
        )}
        <InputField
          invalid={!regAlphabetAndSpaces.test(title)}
          labelText="Title"
          value={title}
          onChangeText={setTitle}
          containerStyles={{ marginTop: 20 }}
        />
        <InputField
          labelText="Description"
          value={description}
          containerStyles={{ marginTop: 20 }}
          onChangeText={setDescription}
          multiline
          invalid={!regAlphabetAndSpaces.test(description)}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            disabled={disableSave}
            text="SAVE"
            onPress={() => {
              setSaved(true);
              dispatch(updateItem(id, title, description));
            }}
            buttonStyle={{
              flexShrink: 1,
            }}
          />
          <View style={{ width: 10 }} />
          <PrimaryButton
            text="DELETE"
            onPress={() => dispatch(removeItem(id))}
            buttonStyle={{
              backgroundColor: colors.error,
              flexShrink: 1,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 1,
    marginTop: 20,
  },
});
