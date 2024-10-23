import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {styles} from "./loadingSpinner.style";

export default function LoadingSpinner() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#2089dc" />
        </View>
    );
}
