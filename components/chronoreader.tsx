// BookReader.tsx
import { BookFragment, BookMeta, ReadingSettings } from "@/scripts/types";
import React, { JSX, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Импорт локальных ресурсов
const tocData: BookMeta = require("../assets/toc.json");
const fragmentData: BookFragment[] = require("../assets/000.json");

// Карта изображений
const imageMap: { [key: string]: any } = {
  image0_61179fe6182f8f7c795f26b4_jpg: require("../assets/images/image0_61179fe6182f8f7c795f26b4_jpg.jpeg"),
  image1_61179ff5182f8f7c795f26cc_jpg: require("../assets/images/image1_61179ff5182f8f7c795f26cc_jpg.jpeg"),
  image2_61179ff3182f8f7c795f26c9_jpg: require("../assets/images/image2_61179ff3182f8f7c795f26c9_jpg.jpeg"),
  image3_61179ff1182f8f7c795f26c6_jpg: require("../assets/images/image3_61179ff1182f8f7c795f26c6_jpg.jpeg"),
  image4_61179fef182f8f7c795f26c3_jpg: require("../assets/images/image4_61179fef182f8f7c795f26c3_jpg.jpeg"),
  image5_61179fed182f8f7c795f26c0_jpg: require("../assets/images/image5_61179fed182f8f7c795f26c0_jpg.jpeg"),
  image6_61179feb182f8f7c795f26bd_jpg: require("../assets/images/image6_61179feb182f8f7c795f26bd_jpg.jpeg"),
  image7_61179fe9182f8f7c795f26ba_jpg: require("../assets/images/image7_61179fe9182f8f7c795f26ba_jpg.jpeg"),
  image8_61179fe8182f8f7c795f26b7_jpg: require("../assets/images/image8_61179fe8182f8f7c795f26b7_jpg.jpeg"),
};

export function ChronoReader() {
  const [currentFragment, setCurrentFragment] = useState<BookFragment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const pageHeight = screenHeight * 0.7; // 70% высоты экрана для контента

  // Настройки чтения
  const [settings, setSettings] = useState<ReadingSettings>({
    backgroundColor: "#f5f5f5",
    textColor: "#333333",
    fontSize: 16,
    lineHeight: 1.5,
  });

  // Настройки цветов
  const colorSchemes = {
    light: { bg: "#f5f5f5", text: "#333333" },
    sepia: { bg: "#f4ecd8", text: "#5c4b33" },
    dark: { bg: "#1a1a1a", text: "#e6e6e6" },
  };

  const fontSizeOptions = [14, 16, 18, 20, 22];

  useEffect(() => {
    loadFragment();
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [currentPage, currentFragment]);

  const loadFragment = async () => {
    try {
      setCurrentFragment(fragmentData);
      // В реальном приложении здесь будет загрузка фрагмента по его индексу
      calculateTotalPages(fragmentData);
    } catch (error) {
      console.error("Error loading fragment:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPages = (fragment: BookFragment[]) => {
    // Простая логика разбиения на страницы - в реальном приложении нужно учитывать высоту элементов
    const elementsPerPage = 5; // Примерное количество элементов на страницу
    const pages = Math.ceil(fragment.length / elementsPerPage);
    setTotalPages(pages);
  };

  const calculateProgress = () => {
    if (!tocData.Parts.length) return;

    const currentPart = tocData.Parts[0]; // В реальном приложении определяем текущий фрагмент
    const partSize = currentPart.e - currentPart.s;
    const progressInPart = (currentPage / totalPages) * partSize;
    const totalProgress =
      (currentPart.s + progressInPart) / tocData.full_length;

    setReadingProgress(totalProgress * 100);
  };

  const getVisibleContent = (): BookFragment[] => {
    const startIndex = currentPage * 5; // 5 элементов на страницу
    const endIndex = startIndex + 5;
    return currentFragment.slice(startIndex, endIndex);
  };

  const navigateToPage = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeColorScheme = (scheme: keyof typeof colorSchemes) => {
    setSettings({
      ...settings,
      backgroundColor: colorSchemes[scheme].bg,
      textColor: colorSchemes[scheme].text,
    });
  };

  const changeFontSize = (size: number) => {
    setSettings({
      ...settings,
      fontSize: size,
      lineHeight: size / 10 + 1.4, // Автоматический расчет межстрочного интервала
    });
  };

  const renderContent = (
    content: (string | BookFragment)[],
    level: number = 0
  ): JSX.Element[] => {
    return content.map((item, index) => {
      if (typeof item === "string") {
        return (
          <Text
            key={index}
            style={[
              styles.text,
              { color: settings.textColor, fontSize: settings.fontSize },
            ]}
          >
            {item}
          </Text>
        );
      }

      return renderElement(item, index, level);
    });
  };

  const renderElement = (
    element: BookFragment,
    key: number,
    level: number = 0
  ): JSX.Element => {
    const { t, c, fl, op, src, s, w, h, role, f } = element;

    const baseStyle = {
      color: settings.textColor,
      fontSize: settings.fontSize,
      lineHeight: settings.fontSize * settings.lineHeight,
    };

    switch (t) {
      case "p":
        return (
          <View
            key={key}
            style={[styles.paragraph, { marginLeft: level * 10 }]}
          >
            {c && renderContent(c, level)}
          </View>
        );

      case "div":
        return (
          <View
            key={key}
            style={[
              styles.div,
              fl === "center" && styles.centerContent,
              op && { opacity: parseFloat(op) },
            ]}
          >
            {c && renderContent(c, level)}
          </View>
        );

      case "img":
        if (s && imageMap[s]) {
          const imageAspectRatio = w && h ? w / h : 1;
          const imageWidth = Math.min(screenWidth - 40, w || screenWidth - 40);
          const imageHeight = imageWidth / imageAspectRatio;

          return (
            <View key={key} style={styles.imageContainer}>
              <Image
                source={imageMap[s]}
                style={[
                  styles.image,
                  {
                    width: imageWidth,
                    height: imageHeight,
                  },
                ]}
                resizeMode="contain"
              />
            </View>
          );
        }
        return <View key={key} />;

      case "title":
        return (
          <View key={key} style={styles.titleContainer}>
            <Text style={[styles.title, baseStyle]}>
              {c && typeof c[0] === "string" ? c[0] : ""}
            </Text>
          </View>
        );

      case "note":
        if (role === "footnote") {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => console.log("Show footnote:", f)}
            >
              <Text style={[styles.footnoteReference, baseStyle]}>
                {c && typeof c[0] === "string" ? c[0] : "[note]"}
              </Text>
            </TouchableOpacity>
          );
        }
        return <View key={key} />;

      case "em":
        return (
          <Text key={key} style={[styles.emphasis, baseStyle]}>
            {c && typeof c[0] === "string" ? c[0] : ""}
          </Text>
        );

      default:
        return (
          <View key={key} style={styles.unknownElement}>
            {c && renderContent(c, level)}
          </View>
        );
    }
  };

  const ProgressBar: React.FC = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${readingProgress}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{readingProgress.toFixed(1)}%</Text>
        <Text style={styles.pageText}>
          Страница {currentPage + 1} из {totalPages}
        </Text>
      </View>
    );
  };

  const SettingsPanel: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);

    if (!showSettings) {
      return (
        <TouchableOpacity
          style={styles.settingsToggle}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.settingsToggleText}>⚙️</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.settingsPanel}>
        <View style={styles.settingsHeader}>
          <Text style={styles.settingsTitle}>Настройки чтения</Text>
          <TouchableOpacity onPress={() => setShowSettings(false)}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.settingLabel, { color: settings.textColor }]}>
            Цветовая схема:
          </Text>
          <View style={styles.colorButtons}>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: colorSchemes.light.bg },
              ]}
              onPress={() => changeColorScheme("light")}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: colorSchemes.sepia.bg },
              ]}
              onPress={() => changeColorScheme("sepia")}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: colorSchemes.dark.bg },
              ]}
              onPress={() => changeColorScheme("dark")}
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.settingLabel, { color: settings.textColor }]}>
            Размер шрифта:
          </Text>
          <View style={styles.fontSizeButtons}>
            {fontSizeOptions.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.fontSizeButton,
                  settings.fontSize === size && styles.fontSizeButtonActive,
                ]}
                onPress={() => changeFontSize(size)}
              >
                <Text
                  style={[
                    styles.fontSizeButtonText,
                    { color: settings.textColor },
                    settings.fontSize === size &&
                      styles.fontSizeButtonTextActive,
                  ]}
                >
                  A
                </Text>
                <Text
                  style={[styles.fontSizeLabel, { color: settings.textColor }]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка книги...</Text>
      </View>
    );
  }

  const visibleContent = getVisibleContent();

  return (
    <View
      style={[styles.container, { backgroundColor: settings.backgroundColor }]}
    >
      <View style={styles.header}>
        <Text style={[styles.bookTitle, { color: settings.textColor }]}>
          {tocData.Meta.Title}
        </Text>
        <Text style={[styles.author, { color: settings.textColor }]}>
          {tocData.Meta.Authors.map(
            (author) => `${author.First} ${author.Last}`
          ).join(", ")}
        </Text>
      </View>

      {/* Область контента с фиксированной высотой */}
      <View style={[styles.contentArea, { height: pageHeight }]}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {visibleContent.map((element, index) =>
            renderElement(element, index)
          )}
        </ScrollView>

        {/* Кнопки навигации */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentPage === 0 && styles.navButtonDisabled,
            ]}
            onPress={() => navigateToPage("prev")}
            disabled={currentPage === 0}
          >
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentPage === totalPages - 1 && styles.navButtonDisabled,
            ]}
            onPress={() => navigateToPage("next")}
            disabled={currentPage === totalPages - 1}
          >
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Панель прогресса */}
      <ProgressBar />

      {/* Панель настроек */}
      <SettingsPanel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
  },
  contentArea: {
    position: "relative",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    marginBottom: 12,
  },
  div: {
    marginBottom: 16,
  },
  centerContent: {
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  image: {
    borderRadius: 4,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    lineHeight: 22,
  },
  emphasis: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
  footnoteReference: {
    fontSize: 14,
    color: "#0066cc",
    textDecorationLine: "underline",
  },
  unknownElement: {
    marginBottom: 12,
  },
  // Прогресс бар
  progressContainer: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0066cc",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
  pageText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 4,
  },
  // Кнопки навигации
  navigationButtons: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    pointerEvents: "box-none",
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  navButtonDisabled: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  navButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  // Панель настроек
  settingsToggle: {
    position: "absolute",
    top: 70,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsToggleText: {
    fontSize: 20,
  },
  settingsPanel: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingGroup: {
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  colorButtons: {
    flexDirection: "row",
    gap: 12,
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  fontSizeButtons: {
    flexDirection: "row",
    gap: 8,
  },
  fontSizeButton: {
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 44,
  },
  fontSizeButtonActive: {
    borderColor: "#0066cc",
    backgroundColor: "#0066cc",
  },
  fontSizeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fontSizeButtonTextActive: {
    color: "white",
  },
  fontSizeLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});
