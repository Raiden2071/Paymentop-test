import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Book, BooksDialog } from '@feature/books/models/book.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '@feature/books/services/books.service';

@Component({
  selector: 'app-edit-book-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './edit-book-dialog.component.html',
  styleUrl: './edit-book-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBookDialogComponent implements OnInit {
  readonly editBookForm = this.fb.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    year: [0, Validators.required],
    description: ['', Validators.required],
    image: [''],
  });
  @ViewChild('fileInput') fileInput!: ElementRef;
  imagePreview: WritableSignal<string | ArrayBuffer | null> = signal(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BooksDialog,
    private fb: FormBuilder,
    private booksService: BooksService,
  ) {}

  public ngOnInit() {
    const book = this.data.book;

    this.editBookForm.patchValue({
      name: book.name,
      author: book.author,
      year: +book.year,
      description: book.description,
      image: book.image,
    });
  }

  public onImageClick(): void {
    this.fileInput.nativeElement.click();
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editBookForm.patchValue({ image: file });
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result);
    };

    reader.readAsDataURL(file);
  }

  public editBook(): void {
    const formValue = this.editBookForm.value;

    const bookValueToEdit: Book = {
      id: this.data.book.id,
      name: formValue.name,
      author: formValue.author,
      year: formValue.year as number,
      description: formValue.description,
      image: formValue.image,
    };

    this.booksService.editBook(bookValueToEdit);
  }
}
