export type BooksDialogType = 'simple' | 'edit' | 'delete';

export interface Book extends BookForm {
    id: string;
}

export interface BookForm {
  name: string;
  author: string;
  year: number;
  description: string;
  image: string;
}

export interface BooksDialog {
  book: Book;
  dialogType: BooksDialogType;
}
