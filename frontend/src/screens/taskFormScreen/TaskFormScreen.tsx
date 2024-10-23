import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Button, ButtonGroup } from '@rneui/themed';
import { RootStackParamList } from '../../navigation/types';
import { TaskStatus } from '../../types/task';
import FormInput from '../../components/formInput/FormInput';
import {useTaskContext} from "../../context/TaskContext";
import {styles} from "./taskFormScreen.style";

type TaskFormScreenRouteProp = RouteProp<RootStackParamList, 'TaskForm'>;

export default function TaskFormScreen() {
    const route = useRoute<TaskFormScreenRouteProp>();
    const navigation = useNavigation();
    const { createTask, updateTask } = useTaskContext();
    const existingTask = route.params?.task;

    const [title, setTitle] = useState(existingTask?.title ?? '');
    const [description, setDescription] = useState(existingTask?.description ?? '');
    const [status, setStatus] = useState(existingTask?.status ?? TaskStatus.TODO);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) newErrors.title = 'Title is required';

        if (!description.trim()) newErrors.description = 'Description is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm() || submitting) return;

        try {
            setSubmitting(true);

            if (existingTask) {
                await updateTask(existingTask.id, { title, description, status });
            } else {
                await createTask({ title, description, status });
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert(
                'Error',
                `Failed to ${existingTask ? 'update' : 'create'} task`
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <FormInput
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                    error={errors.title}
                />

                <FormInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    error={errors.description}
                    // multiline
                />

                <View style={styles.statusContainer}>
                    <ButtonGroup
                        buttons={Object.values(TaskStatus)}
                        selectedIndex={Object.values(TaskStatus).indexOf(status)}
                        onPress={(index) =>
                            setStatus(Object.values(TaskStatus)[index] as TaskStatus)
                        }
                        containerStyle={styles.buttonGroup}
                    />
                </View>

                <Button
                    title={existingTask ? 'Update Task' : 'Create Task'}
                    onPress={handleSubmit}
                    loading={submitting}
                    containerStyle={styles.submitButton}
                />
            </View>
        </ScrollView>
    );
}
