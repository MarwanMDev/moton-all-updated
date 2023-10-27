import { BookIF } from '../../interface/book-if';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddNewBookService } from '../../Service/add-new-book.service';
import { AuthService } from '../../Service/auth.service';
import { AddCatService } from '../../Service/add-cat.service';

@Component({
  selector: 'app-e-book',
  templateUrl: './e-book.component.html',
  styleUrls: ['./e-book.component.css'],
})
export class EBookComponent implements OnInit {
  constructor(
    private _AddNewBookService: AddNewBookService,
    private _AuthService: AuthService,
    private _AddCatService: AddCatService
  ) {}

  // get image added
  image: any;
  getimage(event: any) {
    this.image = event.target.files[0];

    // console.log(this.image);
  }

  saveImg: string = '';

  submitDataImage() {
    let formData = new FormData();
    formData.set('image', this.image);

    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._AddNewBookService
        .Upload_image(formData, userToken)
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.saveImg = res.filename;
            // console.log(this.saveImg);
            // this.AddBook.setValue( value:this.fileName)

            this.AddBook.patchValue({
              image: this.saveImg,
            });
          },
          error: (err) => {
            console.log('Error fetching Book data:', err);
          },
        });
    }
  }

  // get file that added
  file: any;
  getFile(event: any) {
    this.file = event.target.files[0];

    // console.log(this.file);
  }

  // send file data to database ,, save file name in variable to use

  fileName: string = '';
  submitData() {
    let formData = new FormData();
    formData.set('pdf', this.file);

    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._AddNewBookService
        .Upload_pfd(formData, userToken)
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.fileName = res.filename;
            // console.log(this.fileName);
            // this.AddBook.setValue( value:this.fileName)

            this.AddBook.patchValue({
              pdf: this.fileName,
            });
          },
          error: (err) => {
            console.log('Error fetching Book data:', err);
          },
        });
    }
  }

  AddBook: FormGroup = new FormGroup({
    bookName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    authorName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64),
    ]),
    price: new FormControl(null, [Validators.required]),
    delivaryPrice: new FormControl(null),
    publisherName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64),
    ]),
    publicationDate: new FormControl(null, [Validators.required]),
    editionOfBook: new FormControl(null, [Validators.required]),
    numberOfCovers: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    bookSize: new FormControl(null, [Validators.required]),
    language: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    pdf: new FormControl(null, [Validators.required]),
  });

  handelAddBook(AddBook: FormGroup) {
    if (this.AddBook.valid) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const formData = this.AddBook.value;

        // Add new category
        this._AddNewBookService
          .Add_book(formData, userToken)
          .subscribe({
            next: (response) => {
              // console.log(this.selectedImage2?.name);

              // console.log('book added:', response);
              alert('تم اضافه الكتاب');
              this.ngOnInit(); // Refresh the list of categories
              this.AddBook.reset(); // Reset the form
              this.fileName = '';
            },
            error: (err) => {
              console.log('Error adding category:', err);
              // Handle the error in a way that makes sense for your application
            },
          });
      }
    }
  }

  // get all Book

  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.checkData();
    this.get_category();
  }

  // delete one Book
  onDeleteProdect(id: string) {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._AddNewBookService.delete_book(id, userToken).subscribe({
        next: (res) => {
          alert('تم حذف الكتاب بنجاح');
          this.checkData();
        },
        error: (err) => {
          console.log('Error fetching Book data:', err);
        },
      });
    }
  }

  // get all books after doing any change
  Book: BookIF[] = [];

  checkData() {
    this._AddNewBookService.get_book().subscribe({
      next: (res) => {
        this.Book = res.data;
        // console.log(res.data[0]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  category: any[] = [];

  get_category() {
    this._AddCatService.get_cat().subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
