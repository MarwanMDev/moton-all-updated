import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { UserIf } from '../../interface/user-if';
import { UsersSerService } from '../../Service/users-ser.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css'],
})
export class ShowUsersComponent implements OnInit {
  constructor(private _UsersSerService: UsersSerService) {}

  ngOnInit(): void {
    this.checkData_User();
  }

  Userss: UserIf[] = [];

  checkData_User() {
    // const userToken = this._AuthService.userdata.getValue();
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._UsersSerService.get_(userToken).subscribe({
        next: (res) => {
          this.Userss = [];

          let resOfUsers = res.data;

          for (let i = 0; i < resOfUsers.length; i++) {
            if (resOfUsers[i].role === 'user') {
              this.Userss.push(resOfUsers[i]);
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

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
