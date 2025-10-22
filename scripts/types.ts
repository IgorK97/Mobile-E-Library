// types.ts
export interface EpubPage {
  id: string;
  html: string;
  chapterIndex: number;
  pageIndex: number;
}

export interface EpubBook {
  pages: EpubPage[];
  totalPages: number;
  totalChapters: number;
}

export interface ReaderConfig {
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  padding: number;
}
