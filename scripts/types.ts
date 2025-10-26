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

// types.ts
export interface BookFragment {
  t: string;
  xp?: number[];
  fl?: string;
  op?: string;
  src?: string;
  s?: string;
  w?: number;
  h?: number;
  role?: string;
  f?: any;
  c?: (string | BookFragment)[];
}

export interface TocItem {
  s: number;
  e: number;
  t: string;
  c?: TocItem[];
}

export interface BookMeta {
  Meta: {
    Annotation: string;
    Lang: string;
    Title: string;
    Translated: string;
    Sequences: string[];
    Created: string;
    Updated: string;
    Written: {
      Lang: string;
      Date: string;
    };
    Authors: {
      Role: string;
      Last: string;
      First: string;
    }[];
    Translators: {
      Role: string;
      First: string;
      Last: string;
    }[];
    Relations: {
      id: string;
      type: string;
      title: string;
    }[];
    ArtID: string;
    UUID: string;
    version: string;
  };
  full_length: number;
  Body: TocItem[];
  Parts: {
    s: number;
    e: number;
    xps: any[];
    xpe: any[];
    url: string;
  }[];
}

export interface ReadingSettings {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  lineHeight: number;
}
export interface EpubNode {
  t: string;
  a?: Record<string, string>[];
  c?: (EpubNode | string)[];
  xp?: number[];
}
