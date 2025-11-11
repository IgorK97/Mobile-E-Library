import { Book } from "@/src/shared/types/types";
import { File, Paths, Directory } from "expo-file-system";

const downDir = `${Paths.document.uri}chronolibrisBooks/`;

function ensureDirExists(dir: string) {
  const direct = new Directory(dir);
  if (!direct.exists) direct.create();
  // console.log(direct.exists);
}

function ensureFileNotExists(dir: string) {
  const file = new File(dir);
  if (file.exists) file.delete();
}

export const FileSystemService = {
  // async downloadToCache(bookId: number, remoteUrl: string) {
  //   await ensureDirExists(CACHE_DIR);
  //   const uri = await this.getCachePath(bookId);
  //   await FileSystem.downloadAsync(remoteUrl, uri);
  //   return uri;
  // },

  async downloadBookToStorage(bookName: string, remoteUrl: string) {
    ensureDirExists(downDir);
    // console.log(bookName);
    // console.log(downDir);
    ensureFileNotExists(`${downDir}${bookName}`);
    return await File.downloadFileAsync(
      remoteUrl,
      new File(`${downDir}${bookName}`)
    );
  },

  async downloadMetaToStorage(book: Book) {
    const fileName = `${downDir}${String(book.id)}-meta.json`;
    ensureDirExists(downDir);
    ensureFileNotExists(fileName);
    const file = new File(fileName);
    file.create();
    const content = JSON.stringify(book);
    file.write(content);
    console.log(file.textSync());
  },

  deleteFile(bookName: string) {
    const uri = `${downDir}${bookName}`;
    ensureFileNotExists(uri);
  },
};
