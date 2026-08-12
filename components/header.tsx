import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  total: number;
  completed: number;
  active: number;
};

function Header({
  total,
  completed,
  active,
}: Props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>
        Yapılacaklar Listesi
      </Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Toplam Görev Sayısı: {total}
        </Text>

        <Text style={styles.statsText}>
          Tamamlanan Görev Sayısı: {completed}
        </Text>

        <Text style={styles.statsText}>
          Kalan Görev Sayısı: {active}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.secondary,
    marginBottom: 12,
  },

  statsContainer: {
    width: "100%",
  },

  statsText: {
    color: Colors.surface,
    fontSize: 15,
    marginBottom: 5,
  },
});

export default Header;