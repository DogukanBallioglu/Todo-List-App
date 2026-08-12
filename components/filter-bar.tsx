import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  filter: "all" | "completed" | "active";
  onChangeFilter: (filter: "all" | "completed" | "active") => void;
};

function FilterBar({
  filter,
  onChangeFilter,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChangeFilter("all")}
        style={[
          styles.button,
          filter === "all" && styles.activeButton,
        ]}
      >
        <Ionicons
          name="grid-outline"
          size={22}
          color={
            filter === "all"
              ? Colors.primary
              : Colors.surface
          }
        />
      </Pressable>

      <Pressable
        onPress={() => onChangeFilter("completed")}
        style={[
          styles.button,
          filter === "completed" && styles.activeButton,
        ]}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={22}
          color={
            filter === "completed"
              ? Colors.primary
              : Colors.surface
          }
        />
      </Pressable>

      <Pressable
        onPress={() => onChangeFilter("active")}
        style={[
          styles.button,
          filter === "active" && styles.activeButton,
        ]}
      >
        <Ionicons
          name="ellipse-outline"
          size={22}
          color={
            filter === "active"
              ? Colors.primary
              : Colors.surface
          }
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  activeButton: {
    backgroundColor: Colors.secondary,
  },
});

export default FilterBar;