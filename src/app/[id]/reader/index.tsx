import "@/src/shared/i18n";
import { ReaderComponent } from "@/src/screens/reader";

// const dest = new Directory(Paths.cache, "files");
// const dbm: Bookmark[] = [];
export default function ReaderScreen() {
  return <ReaderComponent />;
  // const { width } = useWindowDimensions();
  // const insets = useSafeAreaInsets();
  // const { id } = useLocalSearchParams();

  // const { theme, changeFontSize, changeFontFamily, changeTheme, goToLocation } =
  //   useReader();

  // const bookmarksListRef = useRef<BottomSheetModal>(null);
  // const tableOfContentsRef = useRef<BottomSheetModal>(null);

  // const [isFullScreen, setIsFullScreen] = useState(true);
  // const [currentFontSize, setCurrentFontSize] = useState(16);
  // const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);

  // const increaseFontSize = () => {
  //   if (currentFontSize < MAX_FONT_SIZE) {
  //     setCurrentFontSize(currentFontSize + 1);
  //     changeFontSize(`${currentFontSize + 1}px`);
  //   }
  // };

  // const decreaseFontSize = () => {
  //   if (currentFontSize > MIN_FONT_SIZE) {
  //     setCurrentFontSize(currentFontSize - 1);
  //     changeFontSize(`${currentFontSize - 1}px`);
  //   }
  // };

  // const switchTheme = () => {
  //   const index = Object.values(themes).indexOf(theme);
  //   const nextTheme =
  //     Object.values(themes)[(index + 1) % Object.values(themes).length];
  //   changeTheme(nextTheme);
  // };

  // const switchFontFamily = () => {
  //   const index = availableFonts.indexOf(currentFontFamily);
  //   const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];

  //   setCurrentFontFamily(nextFontFamily);
  //   changeFontFamily(nextFontFamily);
  // };

  // const [epubAsset, setEpubAsset] = useState<string | null>(null);
  // useEffect(() => {
  //   const funcLoad = async () => {
  //     try {
  //       // const asset = Asset.fromModule("@assets/images/book_1.png");
  //       // await asset.downloadAsync();
  //       // const ifile = new File(asset.localUri ?? "");
  //       // const array64 = await ifile.base64();
  //       const b: Book = {
  //         id: 1,
  //         title: "Буддизм в Японии",
  //         author: "Т.П. Григорьева",
  //         rating: 4.5,
  //         reviewCount: 10,
  //         pages: 704,
  //         year: 1993,
  //         description:
  //           "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
  //         imageUrl: require("@assets/images/book_1.png"),
  //         genres: [
  //           "Философия",
  //           "Культурология",
  //           "Религия",
  //           "Буддизм",
  //           "Восток",
  //           "Япония",
  //         ],
  //         imageBase64: "array64",
  //       };
  //       // console.log(array64);
  //       const url =
  //         process.env.EXPO_PUBLIC_BASE_DEV_URL + "/api/Book/book.epub";

  //       // const output = await File.downloadFileAsync(url, Paths.document);
  //       const output = await BookService.saveToStorage(b, url);
  //       await BookService.saveMeta(b);
  //       const res = await output.base64();
  //       console.log(output.uri);
  //       // const uri = await BookService.saveToStorage(b);
  //       // const file = new File(uri);
  //       // if (dest.exists) dest.delete();
  //       // dest.create();
  //       // const output = await File.downloadFileAsync(url, dest);
  //       // console.log(file.exists);
  //       // console.log(file.uri);
  //       // const res = await file.base64();
  //       // const res = await FileSystem.readAsStringAsync(uri, {
  //       //   encoding: FileSystem.EncodingType.Base64,
  //       // });
  //       // console.log(res);
  //       setEpubAsset(res);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   funcLoad();
  // }, []);

  // if (epubAsset === null) {
  //   return <Text>...</Text>;
  // }

  // return (
  //   <GestureHandlerRootView
  //     style={{
  //       flex: 1,
  //       paddingTop: insets.top,
  //       paddingBottom: insets.bottom,
  //       paddingLeft: insets.left,
  //       paddingRight: insets.right,
  //       backgroundColor: theme.body.background,
  //     }}
  //   >
  //     <View
  //       style={{
  //         flex: 1,
  //       }}
  //     >
  //       <Reader
  //         src={epubAsset}
  //         fileSystem={useFileSystem}
  //         initialBookmarks={dbm}
  //         onAddBookmark={(bookmark) => {
  //           console.log(bookmark);
  //         }}
  //         onRemoveBookmark={(bookmark) =>
  //           console.log("onRemoveBookmark", bookmark)
  //         }
  //         onUpdateBookmark={(bookmark) =>
  //           console.log("onUpdateBookmark", bookmark)
  //         }
  //         onChangeBookmarks={(bookmarks) =>
  //           console.log("onChangeBookmarks", bookmarks)
  //         }
  //         width={width}
  //         defaultTheme={Themes.LIGHT}
  //         waitForLocationsReady
  //         onWebViewMessage={(message) => {
  //           if (message.type === "onCfiFromPercentage") {
  //             goToLocation(message.cfi);
  //           }
  //         }}
  //       />
  //     </View>
  //     <Pressable
  //       onPress={() => setIsFullScreen(!isFullScreen)}
  //       style={StyleSheet.absoluteFill}
  //     ></Pressable>
  //     {!isFullScreen && <ReaderHeader author="Автор" title="Название книги" />}
  //     {!isFullScreen && (
  //       <ReaderFooter
  //         currentFontSize={currentFontSize}
  //         increaseFontSize={increaseFontSize}
  //         decreaseFontSize={decreaseFontSize}
  //         switchTheme={switchTheme}
  //         switchFontFamily={switchFontFamily}
  //         onOpenBookmarksList={() => {
  //           bookmarksListRef.current?.present();
  //           setIsFullScreen(!isFullScreen);
  //         }}
  //         onOpenTableOfContents={() => {
  //           tableOfContentsRef.current?.present();
  //           setIsFullScreen(!isFullScreen);
  //         }}
  //       />
  //     )}
  //     <BookmarksList
  //       ref={bookmarksListRef}
  //       onClose={() => bookmarksListRef.current?.dismiss()}
  //     />
  //     <TableOfContents
  //       ref={tableOfContentsRef}
  //       onClose={() => tableOfContentsRef.current?.dismiss()}
  //       onPressSection={(selectedSection) => {
  //         goToLocation(selectedSection.href.split("/")[1]);
  //         tableOfContentsRef.current?.dismiss();
  //       }}
  //     />
  //   </GestureHandlerRootView>
  // );
}
