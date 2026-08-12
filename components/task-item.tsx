import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    title: string;
    date: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
    onEdit: () => void;
};


function TaskItem({
    title,
    date,
    completed,
    onToggle,
    onDelete,
    onEdit,
}: Props) {

    const fixedDate = new Date(date);
    fixedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateState = today > fixedDate ? "late" : "early";

    return (
        <View style={styles.taskRow}>
            <Pressable
                onPress={onToggle}
                style={styles.taskContainer}
            >
                <View style={[styles.checkbox, completed && styles.completedCheckbox]}>
                    {completed && (
                        <Ionicons name="checkmark" size={20} color={Colors.primary} />
                    )}
                </View>

                <View style={styles.leftContent}>
                    <Text
                        style={[
                            styles.taskTitle,
                            completed && styles.completedTaskTitle,
                        ]}
                    >
                        {title}
                    </Text>

                    <Text
                        style={[
                            styles.taskDate,
                        ]}
                    >
                        Tarih: {new Date(date).toLocaleDateString("tr-TR")}
                    </Text>
                </View>

                <View
                    style={[styles.dateState,
                    { backgroundColor: dateState === "late" ? "red" : "green" }]}
                >
                    <Text>
                    </Text>
                </View>

            </Pressable>
            <Pressable
                onPress={onEdit}
                style={({ pressed }) => [
                    styles.editButton,
                    pressed && styles.deleteButtonPressed,
                ]}
            >
                <Ionicons
                    name="create-outline"
                    size={22}
                    color={Colors.secondary} />
            </Pressable>

            <Pressable
                onPress={onDelete}
                style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.deleteButtonPressed,
                ]}
            >
                <Ionicons
                    name="trash-outline"
                    size={22}
                    color={Colors.secondary}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    // Row

    taskRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
    },

    // Card

    taskContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,

        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,

        padding: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },



    leftContent: {
        flex: 1,
    },
    // Checkbox

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },

    completedCheckbox: {
        borderColor: Colors.primary,
    },

    dateState: {
        width: 6,
        height: "100%",
        borderRadius: 10,
        marginLeft: 10,
    },

    // Text

    taskTitle: {
        flex: 1,
        fontSize: 17,
        color: Colors.text,
        fontWeight: "500",
    },

    completedTaskTitle: {
        textDecorationLine: "line-through",
        color: Colors.textSecondary,
    },

    taskDate: {
        flex: 1,
        fontSize: 13,
        color: Colors.text
    },

    // Delete Button

    deleteButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 14,
        paddingHorizontal: 18,
    },

    deleteButtonPressed: {
        opacity: 0.8,
    },

    editButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 14,
        paddingHorizontal: 18,
    }
});

export default TaskItem;