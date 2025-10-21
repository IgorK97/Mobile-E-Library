import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { ArrowLeft, Menu, Minimize, Settings } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReaderScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const paths: ImageSourcePropType = require("../../../assets/images/book_1.png");
  const router = useRouter();

  const [isBottomVisible, setIsBottomVisible] = useState(true);
  const [activePanel, setActivePanel] = useState<"none" | "settings" | "toc">(
    "none"
  );

  const bottomAnim = useRef(new Animated.Value(0)).current;

  const toggleBottom = () => {
    Animated.timing(bottomAnim, {
      toValue: isBottomVisible ? 100 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsBottomVisible(!isBottomVisible);
    setActivePanel("none");
  };

  const openPanel = (type: "settings" | "toc") => {
    if (activePanel === type) {
      setActivePanel("none");
    } else {
      setActivePanel(type);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*Header*/}
      {isBottomVisible && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#D32F2F" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title} numberOfLines={1}>
              Буддизм в Японии
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              Т.П. Григорьева
            </Text>
          </View>
        </View>
      )}
      {/*Book Cover*/}
      <View style={styles.coverWrapper}>
        <TouchableOpacity
          onPress={() => {
            setIsBottomVisible(true);
          }}
        >
          <View style={styles.coverContainer}>
            <Image source={paths} style={styles.cover} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View>
      {/*Bottom Controls*/}
      {isBottomVisible && (
        <View style={styles.bottomControls}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            value={currentPage}
            onValueChange={(value) => setCurrentPage(Math.floor(value))}
            minimumTrackTintColor="#D32F2F"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#D32F2F"
          />
          {/*Page Counter*/}
          <Text style={styles.pageColor}>{currentPage} из 100</Text>
          {/*Toolbar*/}
          <View style={styles.toolbar}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setActivePanel("toc");
              }}
            >
              <Menu size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings
                size={24}
                color="#666"
                onPress={() => {
                  setActivePanel("settings");
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Minimize
                size={24}
                color="#666"
                onPress={() => {
                  setIsBottomVisible(!isBottomVisible);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Settings panel*/}
      {activePanel === "settings" && (
        <Animated.View style={styles.panel}>
          <Text style={styles.panelTitle}>Настройки шрифта</Text>
          <View style={styles.panelRow}>
            <TouchableOpacity style={styles.panelButton}>
              <Text style={styles.panelText}>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton}>
              <Text style={styles.panelText}>A+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setActivePanel("none")}>
            <Text style={styles.closeText}>Закрыть</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {/* TOC PANEL */}
      {activePanel === "toc" && (
        <Animated.View style={styles.panel}>
          <Text style={styles.panelTitle}>Оглавление</Text>
          <TouchableOpacity style={styles.panelItem}>
            <Text>Введение</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelItem}>
            <Text>Глава 1. Зарождение буддизма</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelItem}>
            <Text>Глава 2. Распространение в Японии</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActivePanel("none")}>
            <Text style={styles.closeText}>Закрыть</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconButton: {
    padding: 8,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  author: {
    fontSize: 13,
    color: "#666",
  },
  panel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
  },
  panelTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  panelButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
  },
  panelText: { fontSize: 16 },
  panelItem: { paddingVertical: 8 },
  closeText: { textAlign: "center", color: "#D32F2F", marginTop: 8 },
  coverWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 16,
  },
  coverContainer: {
    width: 280,
    maxHeight: 350,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",
    // elevation: 4,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // padding: 16,
  },
  cover: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
  bottomControls: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  pageColor: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 13,
    color: "#D32F2F",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
});
