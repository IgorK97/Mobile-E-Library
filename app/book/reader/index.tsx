import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { ArrowLeft, Menu, Minimize, Settings } from "lucide-react-native";
import React, { useState } from "react";
import {
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
  return (
    <SafeAreaView style={styles.container}>
      {/*Header*/}
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
      {/*Book Cover*/}
      {/* <View style={styles.coverWrapper}> */}
      <View style={styles.coverContainer}>
        <Image source={paths} style={styles.cover} resizeMode="contain" />
      </View>
      {/* </View> */}
      {/*Bottom Controls*/}
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
          <TouchableOpacity style={styles.iconButton}>
            <Menu size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Minimize size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
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
  // coverWrapper: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 16,
  // },
  coverContainer: {
    width: 280,
    height: 400,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 16,
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
