import { BookIF } from '../../interface/book-if';
import { Component, OnInit } from '@angular/core';
import { AddNewBookService } from '../../Service/add-new-book.service';

@Component({
  selector: 'app-all-electronic-books',
  templateUrl: './all-electronic-books.component.html',
  styleUrls: ['./all-electronic-books.component.css'],
})
export class AllElectronicBooksComponent implements OnInit {
  constructor(private _AddNewBookService: AddNewBookService) {}

  ngOnInit(): void {
    this.checkData();
  }

  Book: BookIF[] = [];

  booksize: number = 0;

  checkData() {
    this._AddNewBookService.get_book().subscribe({
      next: (res) => {
        console.log(this.Book);

        this.Book = [];
        let book_info = res.data;

        for (let i = 0; i < book_info.length; i++) {
          if (book_info[i].type === 'electronic') {
            this.Book.push(book_info[i]);
          }
        }
        this.booksize = this.Book.length;
        console.log(this.booksize);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
}
