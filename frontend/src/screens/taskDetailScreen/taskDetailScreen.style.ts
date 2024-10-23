import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    title: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
    status: {
        fontSize: 16,
        color: '#333',
        textTransform: 'uppercase',
    },
    date: {
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
    deleteButton: {
        backgroundColor: '#ff4444',
    },
});