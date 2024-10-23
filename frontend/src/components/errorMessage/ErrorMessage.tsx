import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from "./errorMessage.style";

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={onRetry}
                >
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}