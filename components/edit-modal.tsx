import { Colors } from "@/constants/colors";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  title: string;
  onChangeTitle: (text: string) => void;
  onClose: () => void;
  onSave: () => void;
};

function EditModal({
  visible,
  title,
  onChangeTitle,
  onClose,
  onSave,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Görevi Düzenle
          </Text>

          <TextInput
            style={styles.input}
            value={title}
            onChangeText={onChangeTitle}
            placeholder="Görev..."
            placeholderTextColor={Colors.textSecondary}
          />

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.cancelText}>
                İptal
              </Text>
            </Pressable>

            <Pressable
              onPress={onSave}
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.saveText}>
                Kaydet
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "85%",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    color: Colors.text,
    marginBottom: 20,
    backgroundColor: Colors.background,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: Colors.border,
  },

  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },

  cancelText: {
    color: Colors.text,
    fontWeight: "600",
  },

  saveText: {
    color: Colors.secondary,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.8,
  },
});

export default EditModal;