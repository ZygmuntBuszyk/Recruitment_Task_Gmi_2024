import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { TaskProvider } from './src/context/TaskContext';

export default function App() {
    return (
        <SafeAreaProvider>
            <TaskProvider>
                <AppNavigator />
            </TaskProvider>
        </SafeAreaProvider>
    );
}