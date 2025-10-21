import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ChevronRight, User } from "lucide-react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User size={24} color="#A855F7" />
          </View>
          <View>
            <Text style={styles.userName}>Читатель</Text>
            <Text style={styles.userEmail}>email@mail.ru</Text>
          </View>
        </View>
        {/*Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Настройки профиля</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Безопасность</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Тёмная тема</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Помощь</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Как пользоваться приложением</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.rowText, { color: "#D32F2F" }]}>Выйти</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 100,
    width: "100%",
    maxWidth: 480,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 15,
    color: "#111",
  },
  userEmail: {
    fontSize: 13,
    color: "#6B7280",
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    color: "#D32F2F",
    fontSize: 15,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  rowText: {
    fontSize: 15,
    color: "#111",
  },
});
