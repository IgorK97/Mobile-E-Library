import { FileSystemService } from "./FileSystemService";

export const BookService = {
  async saveToStorage(bookName: string, url: string) {
    return await FileSystemService.downloadToStorage(bookName, url);
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
