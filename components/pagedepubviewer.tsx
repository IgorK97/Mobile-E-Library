import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { EpubNode } from "@/scripts/types";

const { width, height } = Dimensions.get("window");
const PAGE_HEIGHT = height * 0.75;

export const PagedEpubViewer: React.FC<{ fragments: EpubNode[] }> = ({
  fragments,
}) => {
  const [pages, setPages] = useState<EpubNode[][]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [pageHeights, setPageHeights] = useState<number[]>([]);

  const hiddenRef = useRef<View>(null);
  const [bookStream, setBookStream] = useState<(EpubNode | string)[]>([]);

  // 1️⃣ Преобразуем массив фрагментов в линейный поток узлов
  useEffect(() => {
    const flattenNodes = (node: EpubNode | string): (EpubNode | string)[] => {
      if (typeof node === "string") return [node];
      if (!node.c) return [node];
      return [node, ...node.c.flatMap(flattenNodes)];
    };
    const stream = fragments.flatMap(flattenNodes);
    setBookStream(stream);
  }, [fragments]);

  // 2️⃣ После сборки потока — начинаем измерение и разбивку
  useEffect(() => {
    if (bookStream.length > 0) {
      paginateBook(bookStream);
    }
  }, [bookStream]);

  // 3️⃣ Основной алгоритм разбиения
  const paginateBook = async (stream: (EpubNode | string)[]) => {
    const newPages: EpubNode[][] = [];
    let currentPage: EpubNode[] = [];
    let currentHeight = 0;

    for (const item of stream) {
      const height = await measureNodeHeight(item);
      if (currentHeight + height <= PAGE_HEIGHT) {
        currentPage.push(item as EpubNode);
        currentHeight += height;
      } else {
        // Если это текст — разбиваем по словам
        if (typeof item === "string") {
          const words = item.split(" ");
          let tempText = "";
          for (const word of words) {
            const h = await measureNodeHeight(tempText + word + " ");
            if (currentHeight + h > PAGE_HEIGHT) {
              currentPage.push(tempText.trim() as unknown as EpubNode);
              newPages.push(currentPage);
              currentPage = [];
              currentHeight = 0;
              tempText = word + " ";
            } else {
              tempText += word + " ";
            }
          }
          if (tempText.trim().length) {
            currentPage.push(tempText.trim() as unknown as EpubNode);
            currentHeight += await measureNodeHeight(tempText);
          }
        } else {
          // Не помещается целиком — на следующую страницу
          newPages.push(currentPage);
          currentPage = [item as EpubNode];
          currentHeight = height;
        }
      }
    }

    if (currentPage.length > 0) newPages.push(currentPage);
    setPages(newPages);
    setPageHeights(newPages.map(() => PAGE_HEIGHT));
    setIsMeasuring(false);
  };

  // 4️⃣ "Измеряем" высоту узла (упрощённая эвристика)
  const measureNodeHeight = async (
    node: EpubNode | string
  ): Promise<number> => {
    if (typeof node === "string") {
      const wordCount = node.split(" ").length;
      return Math.ceil((wordCount / 10) * 20); // ≈20px на 10 слов
    }
    switch (node.t.toLowerCase()) {
      case "img":
        return 220;
      case "h1":
      case "h2":
      case "h3":
        return 60;
      case "p":
        return 80;
      default:
        return 50;
    }
  };

  const goPrev = () => setPageIndex((p) => Math.max(0, p - 1));
  const goNext = () => setPageIndex((p) => Math.min(pages.length - 1, p + 1));

  if (isMeasuring) {
    return (
      <View style={styles.loader}>
        <Text>Форматирование страниц...</Text>
      </View>
    );
  }

  const currentPage = pages[pageIndex] || [];

  return (
    <View style={styles.container}>
      <View style={styles.readerBox}>
        <ScrollView scrollEnabled={false}>
          {currentPage.map((node, i) => (
            <RenderNode key={i} node={node} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={goPrev}>
          <Text style={styles.btnText}>◀</Text>
        </Pressable>
        <Text style={styles.pageNum}>
          {pageIndex + 1}/{pages.length}
        </Text>
        <Pressable style={styles.button} onPress={goNext}>
          <Text style={styles.btnText}>▶</Text>
        </Pressable>
      </View>
    </View>
  );
};

// 5️⃣ Рекурсивный рендер тегов
const RenderNode: React.FC<{ node: EpubNode | string }> = ({ node }) => {
  if (typeof node === "string") {
    return <Text style={styles.text}>{node} </Text>;
  }

  const tag = node.t.toLowerCase();
  const children = node.c?.map((c, i) => <RenderNode key={i} node={c} />);

  switch (tag) {
    case "p":
      return <Text style={styles.paragraph}>{children}</Text>;
    case "div":
    case "section":
      return <View style={styles.div}>{children}</View>;
    case "h1":
      return <Text style={styles.h1}>{children}</Text>;
    case "h2":
      return <Text style={styles.h2}>{children}</Text>;
    case "h3":
      return <Text style={styles.h3}>{children}</Text>;
    case "span":
      return <Text>{children}</Text>;
    case "img": {
      const src = node.a?.find((a) => a["src"])?.["src"];
      if (!src) return null;
      return <Image source={{ uri: src }} style={styles.image} />;
    }
    default:
      return <View>{children}</View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffefc",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  readerBox: {
    width: width * 0.9,
    height: PAGE_HEIGHT,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  text: { fontSize: 16, color: "#222" },
  paragraph: { fontSize: 16, lineHeight: 22, marginBottom: 10, color: "#222" },
  div: { marginBottom: 10 },
  h1: { fontSize: 24, fontWeight: "700", marginVertical: 10 },
  h2: { fontSize: 20, fontWeight: "600", marginVertical: 8 },
  h3: { fontSize: 18, fontWeight: "500", marginVertical: 6 },
  image: {
    width: width * 0.8,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#444",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  btnText: { color: "white", fontSize: 20 },
  pageNum: { fontSize: 16, color: "#444" },
  loader: { flex: 1, alignItems: "center", justifyContent: "center" },
});
