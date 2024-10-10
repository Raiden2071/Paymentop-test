import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { BooksDialog } from '../../models/book.model';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-books-dialogs',
  standalone: true,
  imports: [
    NgIf,
    MatDialogClose,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatIconModule,
  ],
  templateUrl: './books-dialog.component.html',
  styleUrl: './books-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BooksDialog) {}

  public onEditBook() {

  }

  public onDeleteBook() {

  }
}
