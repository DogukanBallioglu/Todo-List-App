import AddTask from "@/components/add-task";
import EditModal from "@/components/edit-modal";
import FilterBar from "@/components/filter-bar";
import Header from "@/components/header";
import TaskItem from "@/components/task-item";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Task = {
  id: number,
  title: string,
  isCompleted: boolean,
  dueDate: string;
}

function MainScreen() {
  const [filter, setFilter] = useState<
    "all" | "completed" | "active"
  >("all");

  const [listItem, setListItem] = useState<Task[]>([]);

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(
        "tasks",
        JSON.stringify(listItem)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem("tasks");

      if (data) {
        setListItem(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [listItem]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const filteredListItem = listItem.filter((item) => {
    if (filter === "completed") return item.isCompleted;
    if (filter === "active") return !item.isCompleted;
    return true;
  });

  const handleToggle = (id: number) => {
    setListItem((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setListItem((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleEdit = (id: number) => {
    const task = listItem.find((item) => item.id === id);

    if (!task) return;

    setEditingTaskId(id);
    setEditTitle(task.title);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      isCompleted: false,
      dueDate: date.toISOString(),
    };

    setListItem((prev) => [...prev, newTask]);
    setTitle("");
    setDate(new Date());
  };


  const handleSave = () => {
    if (editingTaskId === null) return;

    setListItem((prev) =>
      prev.map((item) =>
        item.id === editingTaskId
          ? {
            ...item,
            title: editTitle.trim(),
          }
          : item
      )
    );

    setIsModalVisible(false);
    setEditingTaskId(null);
    setEditTitle("");
  };

  const toplamGorevSayisi = listItem.length;

  const tamamlananGorevSayisi = listItem.filter(
    (item) => item.isCompleted
  ).length;

  const kalanGorevSayisi =
    toplamGorevSayisi - tamamlananGorevSayisi;

  const progress = toplamGorevSayisi === 0
    ? 0
    : (tamamlananGorevSayisi / toplamGorevSayisi) * 100;


  return (
    <View style={styles.screen}>
      <Header
        total={toplamGorevSayisi}
        completed={tamamlananGorevSayisi}
        active={kalanGorevSayisi}
      />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          %{Math.round(progress)}
        </Text>
      </View>

      <FilterBar
        filter={filter}
        onChangeFilter={setFilter}
      />

      <FlatList
        data={filteredListItem}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            date={item.dueDate}
            completed={item.isCompleted}
            onToggle={() => handleToggle(item.id)}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={70} style={{ marginBottom: 10 }} />
            {filter === "completed" && <Text style={styles.emptyText}> Tamamlanan görev bulunamadı.</Text>}
            {filter === "active" && <Text style={styles.emptyText}> Kalan görev bulunamadı.</Text>}
            {
              filter === "all" &&
              (<>
                <Text style={styles.emptyText}> Henüz görev eklenmedi.</Text>
                <Text style={[styles.emptyText, { color: Colors.danger }]}> Aşağıdan görev ekleyebilirsiniz. </Text>
              </>)


            }
          </View>
        }
      />

      <AddTask
        title={title}
        date={date}
        showDatePicker={showDatePicker}
        onOpenDatePicker={() => setShowDatePicker(true)}
        onCloseDatePicker={() => setShowDatePicker(false)}
        onChangeDate={setDate}
        onChangeTitle={setTitle}
        onAdd={handleAdd}
      />

      <EditModal
        visible={isModalVisible}
        title={editTitle}
        onChangeTitle={setEditTitle}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  taskList: {
    paddingBottom: 20,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 15,
  },

  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.secondary,
    borderRadius: 10,
  },

  progressText: {
    width: 40, // Yüzde için sabit alan
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});

export default MainScreen;