import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  //   SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const BookReader: React.FC = () => {
  const webviewRef = useRef<any>(null);
  const [pageContent, setPageContent] = useState<string[]>([]); // массив "страниц"
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAndPaginateHTML();
  }, [fontSize]);

  const loadAndPaginateHTML = async () => {
    try {
      setLoading(true);

      // 1️⃣ Загружаем локальный HTML из assets
      const asset = Asset.fromModule(
        require("../assets/books/chapter_001.html")
      );
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;
      const rawHtml = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // 2️⃣ Встраиваем CSS для шрифта
      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                font-size: ${fontSize}px;
                line-height: 1.6;
                padding: 16px;
                margin: 0;
                color: #222;
                font-family: 'Georgia';
              }
            </style>
          </head>
          <body>${rawHtml}</body>
        </html>
      `;

      // 3️⃣ Отправляем HTML во временный WebView для измерения высоты
      webviewRef.current?.injectJavaScript(`
        (function() {
          document.body.innerHTML = \`${html.replace(/`/g, "\\`")}\`;
          const totalHeight = document.body.scrollHeight;
          const viewportHeight = window.innerHeight;
          const totalPages = Math.ceil(totalHeight / viewportHeight);
          const pages = [];
          for (let i = 0; i < totalPages; i++) {
            pages.push(document.body.innerHTML);
          }
          window.ReactNativeWebView.postMessage(JSON.stringify({
            totalPages,
            totalHeight,
            html: document.body.innerHTML
          }));
        })();
        true;
      `);
    } catch (err) {
      console.error(err);
    }
  };

  // 4️⃣ Принимаем данные из WebView
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const { totalPages, totalHeight, html } = data;

      const viewportHeight = SCREEN_HEIGHT;
      const sliceHeight = totalHeight / totalPages;

      // 5️⃣ Режем контент на "виртуальные страницы"
      const pages = [];
      for (let i = 0; i < totalPages; i++) {
        const start = Math.floor(
          ((i * sliceHeight) / totalHeight) * html.length
        );
        const end = Math.floor(
          (((i + 1) * sliceHeight) / totalHeight) * html.length
        );
        pages.push(html.slice(start, end));
      }

      setPageContent(pages);
      setCurrentPage(0);
      setLoading(false);
    } catch (e) {
      console.error("parse error", e);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Загрузка...</Text>
        <WebView
          ref={webviewRef}
          onMessage={handleMessage}
          style={{ height: 0, width: 0 }}
          source={{ html: "<html><body></body></html>" }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Читалка */}
      <WebView
        source={{ html: pageContent[currentPage] }}
        style={styles.reader}
        originWhitelist={["*"]}
      />

      {/* Панель управления */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
        >
          <Text style={styles.buttonText}>◀ Пред.</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          {currentPage + 1} / {pageContent.length}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setCurrentPage((p) => Math.min(p + 1, pageContent.length - 1))
          }
          disabled={currentPage === pageContent.length - 1}
        >
          <Text style={styles.buttonText}>След. ▶</Text>
        </TouchableOpacity>
      </View>

      {/* Управление шрифтом */}
      <View style={styles.fontControls}>
        <TouchableOpacity
          onPress={() => setFontSize((s) => Math.max(s - 2, 10))}
        >
          <Text style={styles.fontButton}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFontSize((s) => Math.min(s + 2, 40))}
        >
          <Text style={styles.fontButton}>A+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookReader;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  reader: { flex: 1 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  button: { padding: 8 },
  buttonText: { color: "#D32F2F", fontSize: 16 },
  pageText: { fontSize: 16, color: "#333" },
  fontControls: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 12,
    gap: 20,
  },
  fontButton: { fontSize: 20, color: "#D32F2F", fontWeight: "bold" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
