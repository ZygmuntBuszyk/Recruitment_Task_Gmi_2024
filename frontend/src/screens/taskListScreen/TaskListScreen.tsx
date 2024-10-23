import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { useTaskContext } from '../../context/TaskContext';
import TaskCard from '../../components/taskCard/TaskCard';
import { TaskStatus } from '../../types/task';
import {styles} from "./tasListScreen.style";

export default function TaskListScreen() {
    const navigation = useNavigation();
    const { tasks, error, fetchTasks, updateTask, deleteTask } = useTaskContext();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchTasks();
        } catch (error) {
            console.error('Error refreshing tasks:', error);
        } finally {
            setRefreshing(false);
        }
    }, [fetchTasks]);

    const handleUpdateStatus = async (id: number, status: TaskStatus) => {
        try {
            await updateTask(id, { status });
        } catch (error) {
            Alert.alert('Error', 'Failed to update task status');
        }
    };

    const handleDelete = async (id: number) => {
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
                            await deleteTask(id);
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete task');
                        }
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('TaskForm')}
            >
                <Text style={styles.addButtonText}>Add New Task</Text>
            </TouchableOpacity>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
                        onStatusChange={(status) => handleUpdateStatus(item.id, status)}
                        onEdit={() => navigation.navigate('TaskForm', { task: item })}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#2089dc']}
                        tintColor="#2089dc"
                    />
                }
            />
        </View>
    );
}