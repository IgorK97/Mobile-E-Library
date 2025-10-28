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
import { useTranslation } from "react-i18next";
import "@/src/i18n";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { commonStyles } from "@/src/styles/common";

export default function ProfileScreen() {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isSecurityModalVisible, setIsSecurityModalVisible] = useState(false);

  const [userName, setUserName] = useState("Читатель");
  const [userEmail, setUserEmail] = useState("email@mail.ru");
  const [userAvatar, setUserAvatar] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { t, i18n } = useTranslation();

  const color = useColorScheme();

  const chevronRightColor =
    color === "light" ? Colors.light.chevronRight : Colors.dark.chevronRight;
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

  const rowText = {
    fontSize: 15,
    color: color === "light" ? Colors.light.text : Colors.dark.text,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            color === "light"
              ? Colors.light.background
              : Colors.dark.background,
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.profileSection,
            {
              borderColor:
                color === "light"
                  ? Colors.light.headerIcon.backgroundColor
                  : Colors.dark.headerIcon.backgroundColor,
            },
          ]}
        >
          <View style={styles.avatar}>
            <User size={24} color={Colors.light.userIcon} />
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
                color: color === "light" ? Colors.light.text : Colors.dark.text,
              }}
            >
              {t("profile.reader")}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color:
                  color === "light"
                    ? Colors.light.subText
                    : Colors.dark.subText,
              }}
            >
              email@mail.ru
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  color === "light"
                    ? Colors.light.highlightedText
                    : Colors.dark.highlightedText,
              },
            ]}
          >
            Настройки
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setIsProfileModalVisible(true)}
          >
            <Text style={rowText}>Настройки профиля</Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setIsSecurityModalVisible(true)}
          >
            <Text style={rowText}>Безопасность</Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={rowText}>Тёмная тема</Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  color === "light"
                    ? Colors.light.highlightedText
                    : Colors.dark.highlightedText,
              },
            ]}
          >
            Помощь
          </Text>
          <TouchableOpacity style={styles.row}>
            <Text style={rowText}>Как пользоваться приложением</Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.navigate(`/auth`)}
          >
            <Text
              style={[
                rowText,
                {
                  color:
                    color === "light"
                      ? Colors.light.highlightedText
                      : Colors.dark.highlightedText,
                },
              ]}
            >
              Выйти
            </Text>
            <ChevronRight size={20} color={chevronRightColor} />
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
          style={commonStyles.defaultContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setIsProfileModalVisible(false)}
                  style={styles.closeButton}
                >
                  <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.light.text,
                    fontWeight: 600,
                  }}
                >
                  Настройки профиля
                </Text>
              </View>
              <ScrollView style={styles.scrollForm}>
                <View
                  style={[
                    styles.avatarSection,
                    {
                      borderBottomColor:
                        color === "light"
                          ? Colors.light.borderBottomColor
                          : Colors.dark.borderBottomColor,
                    },
                  ]}
                >
                  <View style={styles.avatarContainer}>
                    {userAvatar ? (
                      <Image
                        source={{ uri: userAvatar }}
                        style={styles.modalAvatar}
                      />
                    ) : (
                      <View
                        style={[
                          styles.modalAvatar,
                          styles.placeholderAvatar,
                          {
                            backgroundColor:
                              color === "light"
                                ? Colors.light.avatarPlaceholder
                                : Colors.dark.avatarPlaceholder,
                          },
                        ]}
                      >
                        <User
                          size={40}
                          color={
                            color === "light"
                              ? Colors.light.userIcon
                              : Colors.dark.userIcon
                          }
                        />
                      </View>
                    )}
                    <TouchableOpacity
                      style={[
                        styles.avatarEditButton,
                        color === "light"
                          ? Colors.light.saveButton
                          : Colors.dark.saveButton,
                      ]}
                      onPress={handleAvatarPick}
                    >
                      <Camera
                        size={18}
                        color={
                          color === "light"
                            ? Colors.light.background
                            : Colors.dark.background
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      color:
                        color === "light"
                          ? Colors.light.subText
                          : Colors.dark.subText,
                    }}
                  >
                    Изменить аватар
                  </Text>
                </View>
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
              <View style={styles.bottomActions}>
                <TouchableOpacity
                  style={[
                    styles.saveButtonBottom,
                    color === "light"
                      ? Colors.light.saveButton
                      : Colors.dark.saveButton,
                  ]}
                  onPress={handleSaveProfile}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Сохранить изменения
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="slide"
        visible={isSecurityModalVisible}
        presentationStyle="fullScreen"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={commonStyles.defaultContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setIsSecurityModalVisible(false)}
                  style={styles.closeButton}
                >
                  <ArrowLeft
                    size={24}
                    color={
                      color === "light"
                        ? Colors.light.headerTitle.color
                        : Colors.dark.headerTitle.color
                    }
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.light.text,
                    fontWeight: 600,
                  }}
                >
                  Безопасность
                </Text>
              </View>
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
                <View style={styles.bottomActions}>
                  <TouchableOpacity
                    style={[
                      styles.saveButtonBottom,
                      color === "light"
                        ? Colors.light.saveButton
                        : Colors.dark.saveButton,
                    ]}
                    onPress={handleSaveSecurity}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Сохранить изменения
                    </Text>
                  </TouchableOpacity>
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
    alignItems: "center",
    marginTop: 10,
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
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  closeButton: {
    padding: 8,
  },

  placeholder: {
    width: 40,
  },
  scrollForm: {
    flex: 1,
    marginTop: 60,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
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
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEditButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
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
  bottomActions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  saveButtonBottom: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
});
