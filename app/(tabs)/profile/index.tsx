import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { router } from "expo-router";
import { ArrowLeft, Camera, ChevronRight, User } from "lucide-react-native";

export default function ProfileScreen() {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isSecurityModalVisible, setIsSecurityModalVisible] = useState(false);

  const [userName, setUserName] = useState("Читатель");
  const [userEmail, setUserEmail] = useState("email@mail.ru");
  const [userAvatar, setUserAvatar] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAvatarPick = () => {
    Alert.alert(
      "Выберите аватар",
      "Вы можете выбрать изображение из галереи или сделать фото",
      [
        {
          text: "Из галереи (в разработке)",
          onPress: () => {},
        },
        {
          text: "Сделать фото (в разработке)",
          onPress: () => {},
        },
        {
          text: "Отмена",
          style: "cancel",
        },
      ]
    );
  };

  const handleSaveProfile = () => {
    console.log(userName, userEmail);
    setIsProfileModalVisible(false);
  };

  const handleSaveSecurity = () => {
    setIsSecurityModalVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  {
    /* <Switch value={colorScheme==='dark'} 
          onChange={() => {
            Appearance.setColorScheme(colorScheme==='dark' ? 'light' : 'dark')
          }}/> */
  }
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
          <TouchableOpacity
            style={styles.row}
            onPress={() => setIsProfileModalVisible(true)}
          >
            <Text style={styles.rowText}>Настройки профиля</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setIsSecurityModalVisible(true)}
          >
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
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.navigate(`/auth`)}
          >
            <Text style={[styles.rowText, { color: "#D32F2F" }]}>Выйти</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        visible={isProfileModalVisible}
        presentationStyle="fullScreen"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              {/* Заголовок модального окна */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setIsProfileModalVisible(false)}
                  style={styles.closeButton}
                >
                  <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Настройки профиля</Text>
                {/* <TouchableOpacity
                  onPress={handleSaveProfile}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity> */}
              </View>
              <ScrollView style={styles.scrollForm}>
                {/* Аватар */}
                <View style={styles.avatarSection}>
                  <View style={styles.avatarContainer}>
                    {userAvatar ? (
                      <Image
                        source={{ uri: userAvatar }}
                        style={styles.modalAvatar}
                      />
                    ) : (
                      <View
                        style={[styles.modalAvatar, styles.placeholderAvatar]}
                      >
                        <User size={40} color="#A855F7" />
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.avatarEditButton}
                      onPress={handleAvatarPick}
                    >
                      <Camera size={18} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.avatarText}>Изменить аватар</Text>
                </View>
                {/*Форма редактирования профиля*/}
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Имя пользователя</Text>
                    <TextInput
                      style={styles.textInput}
                      value={userName}
                      onChangeText={setUserName}
                      placeholder="Введите ваше имя"
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.textInput}
                      value={userEmail}
                      onChangeText={setUserEmail}
                      placeholder="Введите ваш email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </ScrollView>
              {/* Кнопка сохранения внизу */}
              <View style={styles.bottomActions}>
                <TouchableOpacity
                  style={styles.saveButtonBottom}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Сохранить изменения</Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.inputGroup}>
                  <Text style={styles.label}>О себе</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Расскажите о себе"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View> */}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      {/* Модальное окно настроек безопасности */}
      <Modal
        animationType="slide"
        visible={isSecurityModalVisible}
        presentationStyle="fullScreen"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              {/* Заголовок модального окна */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setIsSecurityModalVisible(false)}
                  style={styles.closeButton}
                >
                  <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Безопасность</Text>
                {/* <TouchableOpacity
                  onPress={handleSaveSecurity}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity> */}
              </View>
              {/* Форма смены пароля */}
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Текущий пароль</Text>
                  <TextInput
                    style={styles.textInput}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Введите текущий пароль"
                    secureTextEntry
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Новый пароль</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Введите новый пароль"
                    secureTextEntry
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Подтвердите новый пароль</Text>
                  <TextInput
                    style={styles.textInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Повторите новый пароль"
                    secureTextEntry
                  />
                </View>
                {/* Кнопка сохранения внизу */}
                <View style={styles.bottomActions}>
                  <TouchableOpacity
                    style={styles.saveButtonBottom}
                    onPress={handleSaveSecurity}
                  >
                    <Text style={styles.saveButtonText}>
                      Сохранить изменения
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.securityTips}>
                  <Text style={styles.tipsTitle}>Советы по безопасности:</Text>
                  <Text style={styles.tip}>
                    • Используйте не менее 8 символов
                  </Text>
                  <Text style={styles.tip}>
                    • Добавьте цифры и специальные символы
                  </Text>
                  <Text style={styles.tip}>
                    • Не используйте простые пароли
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingBottom: 50,
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
    borderColor: "#D32F2F",
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
  // Стили для модальных окон
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContent: {
    flex: 1,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  placeholder: {
    width: 40,
  },
  scrollForm: {
    flex: 1,
    marginTop: 60, // Отступ для фиксированного заголовка
  },
  // Стили для аватара
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderAvatar: {
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEditButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#D32F2F",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  avatarText: {
    fontSize: 16,
    color: "#6b7280",
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  securityTips: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  tip: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  bottomActions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  saveButtonBottom: {
    backgroundColor: "#D32F2F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
