import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { BooksDialog } from '@feature/books/models/book.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-show-book-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon
  ],
  templateUrl: './show-book-dialog.component.html',
  styleUrl: './show-book-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowBookDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BooksDialog) {}
}
