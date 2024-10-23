import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from '../screens/taskListScreen/TaskListScreen';
import TaskDetailScreen from '../screens/taskDetailScreen/TaskDetailScreen';
import TaskFormScreen from '../screens/taskFormScreen/TaskFormScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="TaskList"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2089dc',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="TaskList"
                    component={TaskListScreen}
                    options={{ title: 'Tasks' }}
                />
                <Stack.Screen
                    name="TaskDetail"
                    component={TaskDetailScreen}
                    options={{ title: 'Task Details' }}
                />
                <Stack.Screen
                    name="TaskForm"
                    component={TaskFormScreen}
                    options={({ route }) => ({
                        title: route.params?.task ? 'Edit Task' : 'New Task'
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}