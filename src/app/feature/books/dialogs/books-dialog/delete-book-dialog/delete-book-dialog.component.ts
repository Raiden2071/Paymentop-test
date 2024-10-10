import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { BooksDialog } from '@feature/books/models/book.model';
import { BooksService } from '@feature/books/services/books.service';

@Component({
  selector: 'app-delete-book-dialog',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatIcon
    ],
  templateUrl: './delete-book-dialog.component.html',
  styleUrl: './delete-book-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteBookDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BooksDialog,
    private booksService: BooksService,
  ) {}

  public deleteBook(): void {
    this.booksService.deleteBook(this.data.book.id);
  }
}
