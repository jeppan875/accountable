import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { colors } from '../../theme';

const Fetching = ({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error?: string;
  children: JSX.Element;
}) => {
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
