import { BookIF } from '../../interface/book-if';
import { Component, OnInit } from '@angular/core';
import { AddNewBookService } from '../../Service/add-new-book.service';

@Component({
  selector: 'app-all-paper-books',
  templateUrl: './all-paper-books.component.html',
  styleUrls: ['./all-paper-books.component.css'],
})
export class AllPaperBooksComponent implements OnInit {
  constructor(private _AddNewBookService: AddNewBookService) {}

  ngOnInit(): void {
    this.checkData();
  }

  Book: BookIF[] = [];

  checkData() {
    this._AddNewBookService.get_book().subscribe({
      next: (res) => {
        this.Book = [];
        let book_info = res.data;
        // this.Book = res.data;
        console.log(res.data[5]);
        // type:"paper"

        for (let i = 0; i < book_info.length; i++) {
          if (book_info[i].type === 'paper') {
            this.Book.push(book_info[i]);
          }
        }
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
