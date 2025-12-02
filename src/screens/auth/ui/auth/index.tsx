// import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";
import { Colors } from "@/src/shared/lib/constants/theme";
import { useColorScheme } from "@/src/shared/lib/hooks/use-color-scheme";
import { useAuthStyles } from "@/src/screens/auth/ui/auth/index.style";
import { useTypography } from "@/src/shared/lib/constants/fontStyles";
import { getProfile, login, register } from "@/src/shared/api/userApi";
import { useStore } from "@/src/shared/lib/store/globalStore";

interface MyError {
  username: string | null;
  email: string | null;
  fullName: string | null;
  password: string | null;
  confirmPassword: string | null;
  phone: string | null;
}
interface FormValues {
  username: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface AuthProps {
  onNavigate: () => void;
}

export const Auth = ({ onNavigate }: AuthProps) => {
  // const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState<FormValues>({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState<MyError>({
    confirmPassword: null,
    email: null,
    fullName: null,
    password: null,
    phone: null,
    username: null,
  });

  const { t } = useTranslation();
  const typography = useTypography();
  const { setUser } = useStore();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const color = useColorScheme();
  const styles = useAuthStyles();

  const validateForm = () => {
    let valid = true;
    const newErrors: MyError = {
      confirmPassword: null,
      email: null,
      fullName: null,
      password: null,
      phone: null,
      username: null,
    };

    if (isRegister && !form.username.trim()) {
      newErrors.username = t("auth.error_name");
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = t("auth.error_email");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t("auth.incorr_email");
      valid = false;
    }
    if (isRegister && !form.fullName.trim()) {
      newErrors.fullName = t("auth.error_fullname");
      valid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = t("auth.error_pass");
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = t("auth.short_pass");
      valid = false;
    }
    if (isRegister && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = t("auth.error_conf_pass");
      valid = false;
    }
    if (isRegister && !/^(\+7|8)?[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = t("auth.error_phone");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isRegister) {
        const res = await register({
          name: form.username,
          familyName: form.fullName,
          email: form.email,
          password: form.password,
        });

        if (!res.success) {
          Alert.alert(
            t("auth.alert_title_reg"),
            res.message || "Registration failed"
          );
          return;
        }

        Alert.alert(
          t("auth.alert_title_reg"),
          res.message || "Registration successful"
        );
        const resProfile = await getProfile();
        setUser(resProfile);
        onNavigate();
      } else {
        const res = await login(form.email, form.password);

        if (!res.success) {
          Alert.alert(
            t("auth.alert_title_auth"),
            res.message || "Login failed"
          );
        }
        Alert.alert(
          t("auth.alert_title_auth"),
          res.message || "Login successful"
        );
        const resProfile = await getProfile();
        setUser(resProfile);

        onNavigate();
      }
    } catch (e) {
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={typography.giantTitle}>
          {isRegister ? t("auth.alert_title_reg") : t("auth.alert_title_auth")}
        </Text>

        {isRegister && (
          <>
            <InputField
              label={t("auth.l_name")}
              value={form.username}
              onChangeText={(v) => handleChange("username", v)}
              error={errors.username || ""}
            />
            <InputField
              label={t("auth.l_fullname")}
              value={form.fullName}
              onChangeText={(v) => handleChange("fullName", v)}
              error={errors.fullName || ""}
            />
            <InputField
              label={t("auth.l_phone")}
              value={form.phone}
              onChangeText={(v) => handleChange("phone", v)}
              // keyboardType="phone-pad"
              error={errors.phone || ""}
            />
          </>
        )}

        <InputField
          label={t("auth.l_email")}
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
          // keyboardType="email-address"
          error={errors.email || ""}
        />

        <InputField
          label={t("auth.l_pass")}
          value={form.password}
          onChangeText={(v) => handleChange("password", v)}
          secureTextEntry
          error={errors.password || ""}
        />

        {isRegister && (
          <InputField
            label={t("auth.l_conf_pass")}
            value={form.confirmPassword}
            onChangeText={(v) => handleChange("confirmPassword", v)}
            secureTextEntry
            error={errors.confirmPassword || ""}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={typography.defaultButtonText}>
            {isRegister ? t("auth.action_reg") : t("auth.action_auth")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsRegister(!isRegister)}
        >
          <Text
            style={{
              textAlign: "center",
              color:
                color === "light"
                  ? Colors.light.hightlightedText
                  : Colors.dark.hightlightedText,
            }}
          >
            {isRegister ? t("auth.switch_to_auth") : t("auth.switch_to_reg")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function InputField({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
}: // styles,
// typography,
// keyboardType,
{
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  // styles: ReturnType<typeof useAuthStyles>;
  // typography: ReturnType<typeof useTypography>;
  // keyboardType?: "default" | "email-address" | "phone-pad";
}) {
  const styles = useAuthStyles();
  const typography = useTypography();
  return (
    <View style={styles.inputContainer}>
      <Text style={typography.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.errorContainer]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        // keyboardType={keyboardType}
        placeholder={label}
        placeholderTextColor="#aaa"
      />
      {error && <Text style={typography.errorText}>{error}</Text>}
    </View>
  );
}
