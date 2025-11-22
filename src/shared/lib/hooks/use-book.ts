import { booksClient } from "../../api/booksApi";
import { useEffect, useState } from "react";

export function useBookFile(bookId: number) {
  const [file, setFile] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    booksClient
      .getBook(bookId)
      .then((res) => {
        setFile(res.data);
        setFileName(res.fileName ?? "book.epub");
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [bookId]);

  return { file, fileName, loading, error };
}
