import { BookListItem } from "@/src/shared/types/types";
import { File, Paths, Directory } from "expo-file-system";

const BOOKS_DIR = `${Paths.document.uri}chronolibrisBooks/`;

export const getLocalUri = (bookId: string | number): string => {
  return `${BOOKS_DIR}${bookId}.epub`;
};

function ensureDirExists(dir: string) {
  const direct = new Directory(dir);
  if (!direct.exists) direct.create();
  // console.log(direct.exists);
}

function ensureFileNotExists(dir: string) {
  const file = new File(dir);
  if (file.exists) file.delete();
}

export const checkIfBookExists = async (
  bookId: string | number
): Promise<string | null> => {
  const localUri = getLocalUri(bookId);
  const fileInfo = new File(localUri);
  // Если файл существует, возвращаем его URI
  return fileInfo.exists ? localUri : null;
};

export const downloadAndSaveBook = async (
  bookId: string | number,
  serverUrl: string
): Promise<string> => {
  // Создаем директорию, если она еще не существует
  // await FileSystem.makeDirectoryAsync(BOOKS_DIR, { intermediates: true });
  ensureDirExists(BOOKS_DIR);
  const localUri = getLocalUri(bookId);

  // Используем downloadAsync для скачивания файла
  // const { uri, status } = await FileSystem.downloadAsync(serverUrl, localUri);
  const result = await File.downloadFileAsync(serverUrl, new File(localUri));

  return result.uri; // Возвращаем локальный URI
};

export const deleteLocalBook = async (
  bookId: string | number
): Promise<void> => {
  const localUri = getLocalUri(bookId);
  const file = new File(localUri);
  if (file.exists) {
    file.delete();
  }
  // Удаляем файл. idempotent: true предотвращает ошибку, если файл уже удален
  // await FileSystem.deleteAsync(localUri, { idempotent: true });
};

export const FileSystemService = {
  // async downloadToCache(bookId: number, remoteUrl: string) {
  //   await ensureDirExists(CACHE_DIR);
  //   const uri = await this.getCachePath(bookId);
  //   await FileSystem.downloadAsync(remoteUrl, uri);
  //   return uri;
  // },

  async downloadBookToStorage(bookName: string, remoteUrl: string) {
    ensureDirExists(BOOKS_DIR);
    // console.log(bookName);
    // console.log(downDir);
    ensureFileNotExists(`${BOOKS_DIR}${bookName}`);
    return await File.downloadFileAsync(
      remoteUrl,
      new File(`${BOOKS_DIR}${bookName}`)
    );
  },

  async downloadMetaToStorage(book: BookListItem) {
    const fileName = `${BOOKS_DIR}${String(book.id)}-meta.json`;
    ensureDirExists(BOOKS_DIR);
    ensureFileNotExists(fileName);
    const file = new File(fileName);
    file.create();
    const content = JSON.stringify(book);
    file.write(content);
    console.log(file.textSync());
  },

  deleteFile(bookName: string) {
    const uri = `${BOOKS_DIR}${bookName}`;
    ensureFileNotExists(uri);
  },
};
