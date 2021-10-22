import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors, inputBase } from '../../theme';

const SearchBar = ({
  input = '',
  setInput,
  onSearch,
}: {
  input: string;
  setInput: (value: string) => void;
  onSearch: () => void;
}) => {
  return (
    <View style={[inputBase, styles.root]}>
      <AntDesign
        name="search1"
        size={24}
        color="black"
        style={{ marginLeft: 5 }}
      />
      <TextInput
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholderTextColor={colors.neutral}
        placeholder={'Search'}
        value={input}
        onChangeText={input => setInput(input)}
        style={styles.input}
        onSubmitEditing={onSearch}
      />
      <Pressable
        onPress={onSearch}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },
        ]}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    paddingRight: 20,
    paddingLeft: 5,
    fontSize: 12,
    width: '100%',
    color: colors.text,
    borderRadius: 4,
    paddingTop: 15,
    paddingBottom: 15,
    flexShrink: 1,
  },
});

export default SearchBar;
