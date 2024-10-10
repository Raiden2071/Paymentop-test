import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from './services/books.service';
import { Book, BooksDialogType } from './models/book.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BooksDialogComponent } from './dialogs/books-dialog/books-dialog.component';
import { NavbarComponent } from '@core/navbar/navbar.component';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    NavbarComponent,
    MatInput,
    MatButton,
    NgOptimizedImage,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private books$: Observable<Book[]> = toObservable(this.booksService.books);

  filteredBooks: WritableSignal<Book[]> = signal<Book[]>([]);
  searchText: FormControl<string> = this.fb.control('')

  readonly bookForm = this.fb.group({
    image: [''],
    name: [{ value: '', disabled: false }, Validators.required],
    author: [{ value: '', disabled: false }, Validators.required],
    year: [{ value: '', disabled: false }, Validators.required],
    description: [{ value: '', disabled: false }, Validators.required]
  });

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.filteredBooks.set(this.booksService.books());

    this.initFormListeners();
  }

  public openDialog(book: Book, dialogType: BooksDialogType): void {
    this.dialog.open(BooksDialogComponent, {
      data: {
        book,
        dialogType,
      },
      width: '500px',
    });
  }

  public addBook(): void {
    if (this.bookForm.valid) {
      const newBook: Book = {
        id: uuidv4(),
        name: this.bookForm.get('name')?.value || '',
        author: this.bookForm.get('author')?.value || '',
        year: +this.bookForm.get('year')?.value || 0,
        description: this.bookForm.get('description')?.value || '',
        image: this.bookForm.get('image')?.value || '',
      };

      console.log('add book method', newBook);
      this.booksService.addBook(newBook);
      this.bookForm.reset();
    }
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.bookForm.patchValue({ image: file });
    }
  }

  private initFormListeners(): void {
    this.books$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyFilter();
      });

    this.searchText.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyFilter();
      });
  }

  private applyFilter(): void {
    const books = this.booksService.books();
    const searchText = this.searchText.value ? this.searchText.value.toLowerCase() : '';

    if (searchText) {
      const filtered = books.filter(book =>
        book.name.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText)
      );
      this.filteredBooks.set(filtered);
    } else {
      this.filteredBooks.set(books);
    }
  }
}
