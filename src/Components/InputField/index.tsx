import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, inputBase } from '../../theme';

interface InputFieldProps extends TextInputProps {
  invalid?: boolean;
  invalidText?: string;
  containerStyles?: ViewStyle;
  value: string;
  labelText?: string;
  inputRef?: React.Ref<TextInput>;
  extraStyles?: ViewStyle;
}

const InputField = ({
  invalid,
  invalidText,
  containerStyles,
  value,
  placeholder,
  textContentType,
  autoCompleteType = 'off',
  onBlur,
  onFocus,
  keyboardType = 'default',
  onChangeText,
  onSubmitEditing,
  selectTextOnFocus,
  editable,
  autoCapitalize = 'sentences',
  inputRef,
  extraStyles,
  secureTextEntry,
  labelText,
  textAlignVertical = 'center',
  multiline = false,
  maxLength,
}: InputFieldProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={containerStyles}>
      {labelText && (
        <Text
          style={{
            color: colors.secondary,
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 10,
          }}>
          {labelText}
        </Text>
      )}
      <TextInput
        autoCapitalize={autoCapitalize}
        autoCompleteType={autoCompleteType}
        ref={inputRef}
        secureTextEntry={secureTextEntry}
        onBlur={e => {
          setFocused(false);
          if (onBlur) {
            onBlur(e);
          }
        }}
        maxLength={maxLength}
        selectTextOnFocus={selectTextOnFocus}
        onFocus={e => {
          setFocused(true);
          if (onFocus) {
            onFocus(e);
          }
        }}
        editable={editable}
        multiline={multiline}
        underlineColorAndroid="rgba(0,0,0,0)"
        style={[
          inputBase,
          focused && { borderWidth: 2, borderColor: colors.secondary },
          invalid && { borderWidth: 2, borderColor: colors.error },
          extraStyles,
        ]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        textContentType={textContentType}
        value={value}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        placeholderTextColor={colors.neutral}
        textAlignVertical={textAlignVertical}
      />
      {invalid && (
        <Text
          style={{
            fontSize: 10,
            marginTop: 5,
            color: colors.error,
          }}>
          {invalidText ? invalidText : 'Invalid input'}
        </Text>
      )}
    </View>
  );
};

export default InputField;
