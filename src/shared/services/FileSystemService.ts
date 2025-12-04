import { BookDetails, BookListItem } from "@/src/shared/types/types";
import { File, Paths, Directory } from "expo-file-system";

const BOOKS_DIR = `${Paths.document.uri}chronolibrisBooks/`;

export const getLocalUri = (bookId: string | number): string => {
  return `${BOOKS_DIR}${bookId}.epub`;
};

export const getMetaUri = (bookId: string | number): string => {
  return `${BOOKS_DIR}${bookId}-meta.json`;
};

export const getCoverUri = (bookId: string | number, ext: string): string => {
  return `${BOOKS_DIR}${bookId}-cover${ext}`;
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
// export interface LocalBookItem extends BookListItem {
//   localCoverUri: string | null;
// }

export const getExistingCoverUri = async (
  bookId: string | number
): Promise<string | null> => {
  const possibleExtensions = [".jpg", ".png", ".jpeg"];
  for (const ext of possibleExtensions) {
    const uri = getCoverUri(bookId, ext);
    const fileInfo = new File(uri);
    if (fileInfo.exists) {
      return uri;
    }
  }
  return null;
};

export const checkIfBookExists = async (
  bookId: string | number
): Promise<string | null> => {
  const localUri = getLocalUri(bookId);
  const fileInfo = new File(localUri);
  return fileInfo.exists ? localUri : null;
};

export const downloadAndSaveBook = async (
  bookId: string | number,
  serverUrl: string
): Promise<string> => {
  // await FileSystem.makeDirectoryAsync(BOOKS_DIR, { intermediates: true });
  ensureDirExists(BOOKS_DIR);
  const localUri = getLocalUri(bookId);
  ensureFileNotExists(localUri);
  // const { uri, status } = await FileSystem.downloadAsync(serverUrl, localUri);
  const result = await File.downloadFileAsync(serverUrl, new File(localUri));

  return result.uri;
};

function getExtensionFromUrl(url: string): string {
  const match = url.match(/\.([0-9a-z]+)(?=[?#]|$)/i);
  return match ? `.${match[1]}` : ".png"; // По умолчанию .jpg, если не удается определить
}

/**
 * Сохраняет метаданные книги в JSON файл и загружает обложку.
 * @param bookDetails - Полные метаданные книги (получены с сервера).
 */
export const downloadAndSaveMetadata = async (
  bookDetails: BookDetails
): Promise<void> => {
  const bookId = bookDetails.id;
  ensureDirExists(BOOKS_DIR);

  const metaFileName = getMetaUri(bookId);
  ensureFileNotExists(metaFileName);

  try {
    const metaFile = new File(metaFileName);
    metaFile.create();
    const content = JSON.stringify(bookDetails);
    metaFile.write(content);
    console.log(`Метаданные сохранены: ${metaFileName}`);
  } catch (error) {
    console.error("Ошибка при сохранении метаданных:", error);
  }

  const remoteCoverUrl = `${process.env.EXPO_PUBLIC_BASE_DEV_URL}/${bookDetails.coverUri}`;
  const ext = getExtensionFromUrl(remoteCoverUrl || ".png");
  const localCoverUri = getCoverUri(bookId, ext);
  console.log(remoteCoverUrl);
  console.log(localCoverUri);
  if (remoteCoverUrl) {
    try {
      ensureFileNotExists(localCoverUri);
      await File.downloadFileAsync(remoteCoverUrl, new File(localCoverUri));
      console.log(`Обложка сохранена: ${localCoverUri}`);
    } catch (error) {
      console.error("Ошибка при загрузке обложки:", error);
    }
  }
};

export const deleteLocalBook = async (
  bookId: string | number
): Promise<void> => {
  const localUri = getLocalUri(bookId);
  const file = new File(localUri);
  if (file.exists) {
    file.delete();
    ensureFileNotExists(getMetaUri(bookId));
    ensureFileNotExists(getCoverUri(bookId, ".png"));
    ensureFileNotExists(getCoverUri(bookId, ".jpeg"));
    ensureFileNotExists(getCoverUri(bookId, ".jpg"));
  }
};

export const FileSystemService = {
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

  async getLocalBookDetails(
    bookId: string | number
  ): Promise<BookDetails | null> {
    const metaUri = getMetaUri(bookId);
    const metaFile = new File(metaUri);
    if (!metaFile.exists) {
      return null;
    }

    try {
      const content = await metaFile.text();
      const bookDetails: BookDetails = JSON.parse(content);
      const localCoverUri = await getExistingCoverUri(bookId);

      return bookDetails;
    } catch (e) {
      console.error(`Error reading metadata for book ${bookId}:`, e);
      return null;
    }
  },
  /**
   * Получает список ID всех локально сохраненных книг по файлам метаданных.
   * @returns Массив ID книг.
   */
  async getAllLocalBookIds(): Promise<number[]> {
    try {
      const directory = new Directory(BOOKS_DIR);
      if (!directory.exists) {
        return [];
      }
      const files = await directory.list();
      const metaFiles = files.filter((f) => f.name.includes("-meta.json"));

      const bookIds = metaFiles
        .map((file) => {
          const match = file.name.match(/(\d+)-meta\.json/);
          return match ? parseInt(match[1], 10) : null;
        })
        .filter((id): id is number => id !== null);

      return bookIds;
    } catch (e) {
      console.error("Error reading BOOKS_DIR:", e);
      return [];
    }
  },
};
