import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { INavigator } from '../RootNavigator';

// from example https://reactnavigation.org/docs/preventing-going-back/
export default ({
  allow,
  onLeave,
  leaveActionText,
}: {
  allow: boolean;
  onLeave: () => void;
  leaveActionText: string;
}) => {
  const navigation: INavigator = useNavigation();

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        if (allow) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {
              text: leaveActionText,
              style: 'default',
              onPress: () => onLeave(),
            },
            {
              text: 'Discard changes',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, allow, onLeave, leaveActionText],
  );
};
