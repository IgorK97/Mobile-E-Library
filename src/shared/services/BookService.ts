import { Book } from "@/src/shared/types/types";
import { FileSystemService } from "./FileSystemService";
function getFileName(book: Book) {
  const fileName = `${book.id}.epub`;
  return fileName;
}
export const BookService = {
  async saveToStorage(book: Book, url: string) {
    const bookName = getFileName(book);

    return await FileSystemService.downloadBookToStorage(bookName, url);
  },
  async saveMeta(book: Book) {
    await FileSystemService.downloadMetaToStorage(book);
  },

  // async updateBook(book: Book) {
  //   const storagePath = await FileSystemService.getStoragePath(book.id);
  //   await FileSystemService.deleteFile(storagePath);
  //   return await FileSystemService.downloadToStorage(
  //     String(book.id),
  //     getBookUrl()
  //   );
  // },
};
