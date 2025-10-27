import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import translationRu from "./locales/ru-RU/translations.json";

const resources = {
  "ru-RU": { translation: translationRu },
  ru: { translation: translationRu },
};

// const RTL_LANGUAGES = ["ar", "ar-SA"];

const LANGUAGE_KEY = "@app_language";

const initI18n = async () => {
  try {
    // Try to get saved language preference
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    // Determine which language to use
    let selectedLanguage = savedLanguage;

    if (!selectedLanguage) {
      // If no saved language, use device locale or fallback
      const deviceLocales = Localization.getLocales();
      const deviceLocale = deviceLocales[0]?.languageTag || "ru-RU";
      const languageCode = deviceLocale.split("-")[0];

      // Try exact locale match first
      if (deviceLocale in resources) {
        selectedLanguage = deviceLocale;
      }

      // Then try language code match
      else if (languageCode in resources) {
        selectedLanguage = languageCode;
      } else {
        selectedLanguage = "ru-RU";
      }
    }

    // Handle RTL layout
    // const isRTL = RTL_LANGUAGES.includes(selectedLanguage);

    // if (I18nManager.isRTL !== isRTL) {
    //   I18nManager.allowRTL(isRTL);
    //   I18nManager.forceRTL(isRTL);
    // }

    await i18n.use(initReactI18next).init({
      resources,
      lng: selectedLanguage,
      fallbackLng: {
        "ru-*": ["ru-RU", "ru"],
        // "ko-*": ["ko-KR", "ko", "en-US"],
        // "ar-*": ["ar-SA", "ar", "en-US"],
        default: ["ru-RU"],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

    // Save the selected language
    if (!savedLanguage) {
      await AsyncStorage.setItem(LANGUAGE_KEY, selectedLanguage);
    }
  } catch (error) {
    console.error("Error initializing i18n:", error);

    // Initialize with defaults if there's an error
    await i18n.use(initReactI18next).init({
      resources,
      lng: "ru-RU",
      fallbackLng: "ru-RU",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
};

initI18n();

export default i18n;
