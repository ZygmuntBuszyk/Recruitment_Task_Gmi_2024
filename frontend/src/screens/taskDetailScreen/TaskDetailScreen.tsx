import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Text, Button } from '@rneui/themed';
import { RootStackParamList } from '../../navigation/types';
import { taskService } from '../../services/api';
import { Task } from '../../types/task';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import {styles} from "./taskDetailScreen.style";

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
    const route = useRoute<TaskDetailScreenRouteProp>();
    const navigation = useNavigation();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTask();
    }, [route.params.id]);

    const fetchTask = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await taskService.getTask(route.params.id);
            setTask(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch task');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await taskService.deleteTask(route.params.id);
                            navigation.goBack();
                        } catch (err) {
                            Alert.alert('Error', 'Failed to delete task');
                        }
                    },
                },
            ],
        );
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={fetchTask} />;
    if (!task) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text h4 style={styles.title}>{task.title}</Text>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.description}>{task.description}</Text>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.status}>{task.status}</Text>
                <Text style={styles.label}>Created At</Text>
                <Text style={styles.date}>
                    {new Date(task.createdAt).toLocaleDateString()}
                </Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Edit"
                        onPress={() => navigation.navigate('TaskForm', { task })}
                        containerStyle={styles.button}
                    />
                    <Button
                        title="Delete"
                        onPress={handleDelete}
                        buttonStyle={styles.deleteButton}
                        containerStyle={styles.button}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
