export const BOOKS_DIALOG_TYPES = {
  SHOW: 'SHOW',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};
export type BooksDialogType = typeof BOOKS_DIALOG_TYPES[keyof typeof BOOKS_DIALOG_TYPES];

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
