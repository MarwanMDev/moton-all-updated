import { Component, OnInit } from '@angular/core';
import { UsersSerService } from '../../Service/users-ser.service';
import { AuthService } from '../../Service/auth.service';
import { UserIf } from '../../interface/user-if';

@Component({
  selector: 'app-show-publishers',
  templateUrl: './show-publishers.component.html',
  styleUrls: ['./show-publishers.component.css'],
})
export class ShowPublishersComponent implements OnInit {
  constructor(private _UsersSerService: UsersSerService) {}

  ngOnInit(): void {
    this.checkData_Publisher();
  }

  // if he is a publisher

  Publisher: UserIf[] = [];

  checkData_Publisher() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._UsersSerService.get_(userToken).subscribe({
        next: (res) => {
          this.Publisher = [];
          let resOfPublisher = res.data;

          for (let i = 0; i < resOfPublisher.length; i++) {
            if (resOfPublisher[i].role === 'publisher') {
              this.Publisher.push(resOfPublisher[i]);
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // delete user if he is publisher or user by sending his id to back-end

  Delete_User_And_Publisher(id: string) {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._UsersSerService.delete_(id, userToken).subscribe({
        next: (res) => {
          alert('تم حذف الناشر');
          this.ngOnInit();
        },
        error: (err) => {
          console.log('Error fetching Message data:', err);
        },
      });
    }
  }
}
