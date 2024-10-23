import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Task, TaskStatus } from '../../types/task';
import {styles} from "./taskCard.style";

interface TaskCardProps {
    task: Task;
    onPress: () => void;
    onStatusChange: (status: TaskStatus) => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function TaskCard({
                                     task,
                                     onPress,
                                     onStatusChange,
                                     onEdit,
                                     onDelete
                                 }: TaskCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
                {task.description}
            </Text>
            <View style={styles.footer}>
                <Text style={[
                    styles.status,
                    task.status === TaskStatus.DONE && styles.statusDone
                ]}>
                    {task.status}
                </Text>
                <View style={styles.actions}>
                    {task.status !== TaskStatus.DONE && (
                        <TouchableOpacity
                            style={[styles.button, styles.completeButton]}
                            onPress={() => onStatusChange(TaskStatus.DONE)}
                        >
                            <Text style={styles.buttonText}>Complete</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={onEdit}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={onDelete}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}