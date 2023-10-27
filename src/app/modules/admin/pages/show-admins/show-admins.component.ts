import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { UserIf } from '../../interface/user-if';
import { UsersSerService } from '../../Service/users-ser.service';

@Component({
  selector: 'app-show-admins',
  templateUrl: './show-admins.component.html',
  styleUrls: ['./show-admins.component.css'],
})
export class ShowAdminsComponent implements OnInit {
  constructor(private _UsersSerService: UsersSerService) {}

  ngOnInit(): void {
    this.checkData_Admin();
  }

  // if he is a publisher

  Admins: UserIf[] = [];

  checkData_Admin() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._UsersSerService.get_(userToken).subscribe({
        next: (res) => {
          this.Admins = [];
          let resOfAdmins = res.data;

          for (let i = 0; i < resOfAdmins.length; i++) {
            if (resOfAdmins[i].role === 'admin') {
              this.Admins.push(resOfAdmins[i]);
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
