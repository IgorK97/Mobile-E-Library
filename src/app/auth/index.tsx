import { useRouter } from "expo-router";
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
import "@/src/i18n";
import { Colors, Typography } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { useAuthStyles } from "@/src/styles/authStyles";

interface MyError {
  username: string | null;
  email: string | null;
  fullName: string | null;
  password: string | null;
  confirmPassword: string | null;
  phone: string | null;
}

export default function AuthScreen() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
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
      newErrors.username = "Введите имя пользователя";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Введите email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Некорректный email";
      valid = false;
    }
    if (isRegister && !form.fullName.trim()) {
      newErrors.fullName = "Введите имя";
      valid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = "Введите пароль";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
      valid = false;
    }
    if (isRegister && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
      valid = false;
    }
    if (isRegister && !/^\+?[0-9]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Введите корректный телефон";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isRegister) {
      Alert.alert("Регистрация", "Пользователь успешно зарегистрирован!");
      router.push("/(tabs)/library");
    } else {
      Alert.alert("Авторизация", "Успешный вход!");
      router.push("/(tabs)/library");
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
        <Text style={Typography.giantTitle}>
          {isRegister ? "Регистрация" : "Авторизация"}
        </Text>

        {isRegister && (
          <>
            <InputField
              label="Имя пользователя"
              value={form.username}
              onChangeText={(v) => handleChange("username", v)}
              error={errors.username || ""}
              styles={styles}
            />
            <InputField
              label="Полное имя"
              value={form.fullName}
              onChangeText={(v) => handleChange("fullName", v)}
              error={errors.fullName || ""}
              styles={styles}
            />
            <InputField
              label="Телефон"
              value={form.phone}
              onChangeText={(v) => handleChange("phone", v)}
              // keyboardType="phone-pad"
              error={errors.phone || ""}
              styles={styles}
            />
          </>
        )}

        <InputField
          label="Email"
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
          // keyboardType="email-address"
          error={errors.email || ""}
          styles={styles}
        />

        <InputField
          label="Пароль"
          value={form.password}
          onChangeText={(v) => handleChange("password", v)}
          secureTextEntry
          error={errors.password || ""}
          styles={styles}
        />

        {isRegister && (
          <InputField
            label="Подтверждение пароля"
            value={form.confirmPassword}
            onChangeText={(v) => handleChange("confirmPassword", v)}
            secureTextEntry
            error={errors.confirmPassword || ""}
            styles={styles}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={Typography.defaultButtonText}>
            {isRegister ? "Зарегистрироваться" : "Войти"}
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
                  ? Colors.light.highlightedText
                  : Colors.dark.highlightedText,
            }}
          >
            {isRegister
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
  styles,
}: // keyboardType,
{
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  styles: ReturnType<typeof useAuthStyles>;
  // keyboardType?: "default" | "email-address" | "phone-pad";
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={Typography.label}>{label}</Text>
      <TextInput
        style={[styles.inputContainer, error && styles.errorContainer]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        // keyboardType={keyboardType}
        placeholder={label}
        placeholderTextColor="#aaa"
      />
      {error && <Text style={Typography.errorText}>{error}</Text>}
    </View>
  );
}
