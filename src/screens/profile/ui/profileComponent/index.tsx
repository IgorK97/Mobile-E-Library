import { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { ArrowLeft, ChevronRight, User } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";
import { Colors, FontSizes } from "@/src/shared/lib/constants/theme";
import { useColorScheme } from "@/src/shared/lib/hooks/use-color-scheme";
import { useProfileStyles } from "@/src/screens/profile/ui/profileComponent/index.style";
import { useTypography } from "@/src/shared/lib/constants/fontStyles";
import { useStore } from "@/src/shared/lib/store/globalStore";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "@/src/shared/api/userApi";

interface ProfileProps {
  onNavigate: () => void;
}

export const Profile = ({ onNavigate }: ProfileProps) => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isSecurityModalVisible, setIsSecurityModalVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const { user, setUser } = useStore();

  const [userName, setUserName] = useState(user?.firstName || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { t } = useTranslation();

  const color = useColorScheme();
  const loadProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (e) {}
    setLoading(false);
  };
  useEffect(() => {
    loadProfile();
    console.log("USER");
    if (user) {
      setUserName(user.firstName);
      setUserEmail(user.email || "");
    }
  }, []);
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("refresh");
    await SecureStore.deleteItemAsync("profile");
    setUser(null);
  };

  const chevronRightColor =
    color === "light" ? Colors.light.chevronRight : Colors.dark.chevronRight;

  const handleSaveProfile = async () => {
    if (!user) return;
    // console.log(userName, userEmail);
    if (!userName || !userEmail) {
      return;
    }
    try {
      const updatedProfile = await updateProfile({
        firstName: userName,
        lastName: user?.lastName || "",
        email: userEmail,
        userId: user.userId,
      });
      setUser({
        ...user,
        firstName: updatedProfile.firstName,
        email: updatedProfile.email,
      });
    } catch (e) {}
    setIsProfileModalVisible(false);
  };

  const handleSaveSecurity = async () => {
    if (!user) return;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }
    if (newPassword !== confirmPassword) {
      return;
    }
    try {
      await changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
        userId: user.userId,
      });
    } catch (e) {}
    setIsSecurityModalVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const styles = useProfileStyles();
  const typography = useTypography();
  if (loading) return <Text>Loading...</Text>;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User size={24} color={Colors.light.userIcon} />
          </View>
          <View>
            <Text style={typography.rowText}>
              {user ? user.firstName : "Гость"}
            </Text>
            <Text
              style={{
                fontSize: FontSizes.xs,
                color:
                  color === "light"
                    ? Colors.light.subText
                    : Colors.dark.subText,
              }}
            >
              {user ? user.email : ""}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={typography.sectionTitle}>
            {t("profile.label_settings")}
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setIsProfileModalVisible(true)}
          >
            <Text style={typography.rowText}>
              {t("profile.label_profile_settings")}
            </Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setIsSecurityModalVisible(true)}
          >
            <Text style={typography.rowText}>
              {t("profile.label_security")}
            </Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.row}>
            <Text style={typography.rowText}>
              {t("profile.label_dark_theme")}
            </Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity> */}
        </View>
        <View style={styles.section}>
          <Text style={typography.sectionTitle}>{t("profile.label_help")}</Text>
          {/* <TouchableOpacity style={styles.row}>
            <Text style={typography.rowText}>{t("profile.tips")}</Text>
            <ChevronRight size={20} color={chevronRightColor} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.row}
            // onPress={() => router.navigate(`/auth`)}
            onPress={() => {
              // if (isRegistered) {
              //   setUser(null);
              //   setIsRegistered(!isRegistered);
              // } else onNavigate();
              // router.navigate({
              //   pathname: "/auth",
              // });
              if (user) logout();
              else onNavigate();
            }}
          >
            <Text
              style={[
                typography.rowText,
                {
                  color:
                    color === "light"
                      ? Colors.light.hightlightedText
                      : Colors.dark.hightlightedText,
                },
              ]}
            >
              {/* {isRegistered ? t("profile.exit") : t("profile.enter")} */}
              {user ? t("profile.exit") : t("profile.enter")}
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setIsProfileModalVisible(false)}
                style={styles.closeButton}
              >
                <ArrowLeft size={24} color="#000" />
              </TouchableOpacity>
              <Text style={typography.subTitle}>
                {t("profile.title_prof_sett")}
              </Text>
            </View>
            <ScrollView style={styles.scrollForm}>
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{t("profile.label_name")}</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder={t("profile.ph_name")}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{t("profile.label_email")}</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userEmail}
                    onChangeText={setUserEmail}
                    placeholder={t("profile.ph_email")}
                    keyboardType="email-address"
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
                  {t("profile.save")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        visible={isSecurityModalVisible}
        presentationStyle="fullScreen"
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
              <Text style={typography.subTitle}>
                {t("profile.title_sec_sett")}
              </Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("profile.label_pass")}</Text>
                <TextInput
                  style={styles.textInput}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder={t("profile.ph_pass")}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("profile.label_new_pass")}</Text>
                <TextInput
                  style={styles.textInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder={t("profile.ph_new_pass")}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("profile.label_conf_pass")}</Text>
                <TextInput
                  style={styles.textInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder={t("profile.ph_conf_pass")}
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
                    {t("profile.save")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
