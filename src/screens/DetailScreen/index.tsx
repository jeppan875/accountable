import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { INavigator, RootStackRouteProp } from '../../RootNavigator';
import { selectItem } from '../../store/list/selector';
import { ApplicationState } from '../../store';
import { Item } from '../../store/list/types';
import { useSelector, useStore } from 'react-redux';
import usePreventLeave from '../../hooks/usePreventLeave';
import InputField from '../../Components/InputField';
import { colors, gutters } from '../../theme';
import PrimaryButton from '../../Components/PrimaryButton';
import { regAlphabetAndSpaces } from '../../Utils/regex';

export default ({
  navigation,
  route,
}: {
  navigation: INavigator;
  route: RootStackRouteProp;
}) => {
  const id = route?.params?.id;

  const item: Item = useSelector((state: ApplicationState) =>
    selectItem(state, id),
  );

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const disableSave =
    !regAlphabetAndSpaces.test(description) ||
    !regAlphabetAndSpaces.test(title);

  usePreventLeave({
    allow: title === item.title && description === item.description,
    onLeave: disableSave ? () => null : () => null,
    leaveActionText: disableSave ? 'Stay' : 'Save changes',
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: gutters.screenGutter,
        }}>
        <InputField
          invalid={!regAlphabetAndSpaces.test(title)}
          labelText="Title"
          value={title}
          onChangeText={setTitle}
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
            onPress={() => null}
            buttonStyle={{
              flexShrink: 1,
            }}
          />
          <View style={{ width: 10 }} />
          <PrimaryButton
            text="DELETE"
            onPress={() => null}
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
