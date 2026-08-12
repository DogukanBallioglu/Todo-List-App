import { Colors } from "@/constants/colors";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  title: string;
  date: Date;

  showDatePicker: boolean;

  onChangeTitle: (text: string) => void;
  onChangeDate: (date: Date) => void;

  onOpenDatePicker: () => void;
  onCloseDatePicker: () => void;

  onAdd: () => void;
};

function AddTask({
  title,
  date,
  onChangeTitle,
  onOpenDatePicker,
  onAdd,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Görev gir..."
        placeholderTextColor={Colors.textSecondary}
      />

      <Pressable
        onPress={onOpenDatePicker}
        style={({ pressed }) => [
          styles.dateButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.dateText}>
          📅 {date.toLocaleDateString("tr-TR")}
        </Text>
      </Pressable>

      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          Ekle
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },

  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },

  dateButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  dateText: {
    fontSize: 16,
    color: Colors.text,
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: Colors.secondary,
    fontSize: 17,
    fontWeight: "600",
  },
});

export default AddTask;