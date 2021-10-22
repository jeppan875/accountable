import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { colors } from '../../theme';
import { ErrorCodes } from '../../Utils/constants';

const Fetching = ({
  loading,
  error,
  children,
  retry,
}: {
  loading: boolean;
  error?: string;
  children: JSX.Element;
  retry?: () => void;
}) => {
  useEffect(() => {
    if (error) {
      if (error === ErrorCodes.RETRY && retry) {
        Alert.alert('Failed to fetch', 'Try again', [
          {
            text: 'Retry',
            style: 'default',
            onPress: () => retry(),
          },
          {
            text: 'Close',
            style: 'default',
          },
        ]);
      }
      if (error === ErrorCodes.FAILURE) {
        Alert.alert('Error', 'Service unavailable, try again later.', [
          {
            text: 'close',
            style: 'default',
          },
        ]);
      }
    }
  }, [error]);

  if (loading || error) {
    return (
      <View
        style={{
          marginTop: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading && (
          <ActivityIndicator size={'large'} color={colors.secondary} />
        )}
        {error && (
          <Text style={{ fontSize: 14, color: colors.text }}>
            {'Something went wrong, try again later'}
          </Text>
        )}
      </View>
    );
  }
  return children;
};

export default Fetching;
