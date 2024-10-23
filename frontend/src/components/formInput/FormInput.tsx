import React from 'react';
import { View } from 'react-native';
import { Input } from '@rneui/themed';
import {styles} from "./formInput.style";

interface FormInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    multiline?: boolean;
}

export default function FormInput({
                                      label,
                                      value,
                                      onChangeText,
                                      error,
                                      multiline
                                  }: FormInputProps) {
    return (
        <View style={styles.container}>
            <Input
                label={label}
                value={value}
                onChangeText={onChangeText}
                errorMessage={error}
                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
                style={multiline && styles.multilineInput}
            />
        </View>
    );
}
