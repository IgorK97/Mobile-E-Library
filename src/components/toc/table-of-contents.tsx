import React, { forwardRef, useState } from "react";
import { View } from "react-native";
import {
  Toc,
  Section as SectionType,
  useReader,
} from "@epubjs-react-native/core";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Button, Text } from "react-native-paper";
import Section from "./section";
import { contrast, resolveTheme } from "@/src/constants/reader-theme";
import { useTocStyles } from "@/src/styles/tocStyles";

import "@/src/i18n";
import { useTranslation } from "react-i18next";
interface Props {
  onPressSection: (section: SectionType) => void;
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const TableOfContents = forwardRef<Ref, Props>(
  ({ onPressSection, onClose }, ref) => {
    const { toc, section, theme } = useReader();

    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<Toc>(toc);

    const snapPoints = React.useMemo(() => ["50%", "90%"], []);
    const colors = resolveTheme(theme);
    const { t } = useTranslation();
    const renderItem = React.useCallback(
      ({ item }: { item: SectionType }) => (
        <Section
          searchTerm={searchTerm}
          isCurrentSection={section?.id === item?.id}
          section={item}
          onPress={(_section) => {
            onPressSection(_section);
          }}
        />
      ),
      [onPressSection, searchTerm, section?.id]
    );
    const styles = useTocStyles();
    const header = React.useCallback(
      () => (
        <View
          style={{
            backgroundColor: colors.background,
          }}
        >
          <View style={styles.title}>
            <Text
              variant="titleMedium"
              style={{ color: contrast[theme.body.background] }}
            >
              {t("toc.title")}
            </Text>

            <Button
              mode="text"
              textColor={contrast[theme.body.background]}
              onPress={onClose}
            >
              {t("toc.close")}
            </Button>
          </View>

          <View style={{ width: "100%" }}>
            <BottomSheetTextInput
              inputMode="search"
              returnKeyType="search"
              returnKeyLabel="Search"
              autoCorrect={false}
              autoCapitalize="none"
              defaultValue={searchTerm}
              style={{
                ...styles.input,
              }}
              placeholder={t("toc.ph")}
              placeholderTextColor={contrast[theme.body.background]}
              onSubmitEditing={(event) => {
                event.persist();

                setSearchTerm(event.nativeEvent?.text);
                setData(
                  toc.filter((elem) =>
                    new RegExp(event.nativeEvent?.text, "gi").test(elem?.label)
                  )
                );
              }}
            />
          </View>
        </View>
      ),
      [onClose, searchTerm, theme.body.background, toc]
    );

    React.useEffect(() => {
      setData(toc);
    }, [toc]);
    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          style={{
            ...styles.container,
            backgroundColor: colors.background,
          }}
          handleStyle={{
            backgroundColor: colors.background,
          }}
          backgroundStyle={{
            backgroundColor: colors.background,
          }}
          onDismiss={() => setSearchTerm("")}
        >
          <BottomSheetFlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: SectionType) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={header}
            style={{ width: "100%" }}
            maxToRenderPerBatch={20}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

TableOfContents.displayName = "TableOfContents";
