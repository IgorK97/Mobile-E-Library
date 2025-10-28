import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
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
import { Colors, FontSizes } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { commonStyles } from "@/src/constants/common";
import { useProfileStyles } from "@/src/styles/profileStyles";
import { useTypography } from "@/src/styles/fontStyles";

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
    fontSize: FontSizes.md,
    color: color === "light" ? Colors.light.text : Colors.dark.text,
  };
  const styles = useProfileStyles();
  const typography = useTypography();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User size={24} color={Colors.light.userIcon} />
          </View>
          <View>
            <Text style={rowText}>{t("profile.reader")}</Text>
            <Text
              style={{
                fontSize: FontSizes.xs,
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
          <Text style={typography.sectionTitle}>Настройки</Text>
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
          <Text style={typography.sectionTitle}>Помощь</Text>
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
                      ? Colors.light.hightlightedText
                      : Colors.dark.hightlightedText,
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
                <Text style={typography.subTitle}>Настройки профиля</Text>
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
                      style={styles.avatarEditButton}
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
                      fontSize: FontSizes.md,
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
                  style={styles.saveButtonBottom}
                  onPress={handleSaveProfile}
                >
                  <Text
                    style={{
                      ...typography.subTitle,
                      color: "#fff",
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
                        ? Colors.light.headerTitleColor
                        : Colors.dark.headerTitleColor
                    }
                  />
                </TouchableOpacity>
                <Text style={typography.subTitle}>Безопасность</Text>
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
                    style={styles.saveButtonBottom}
                    onPress={handleSaveSecurity}
                  >
                    <Text
                      style={{
                        ...typography.subTitle,
                        color: "#fff",
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
