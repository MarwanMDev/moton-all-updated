import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminMessageService } from '../../Service/admin-message.service';
import { MessageIF } from '../../interface/message-if';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.css'],
})
export class MassageComponent implements OnInit {
  constructor(private _AdminMessageService: AdminMessageService) {}

  ngOnInit(): void {
    this.checkData();
  }

  onDeleteProdect(id: string) {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._AdminMessageService
        .delete_Message(id, userToken)
        .subscribe({
          next: (res) => {
            alert('تم حذف الرسالة بنجاح');
            this.ngOnInit();
          },
          error: (err) => {
            console.log('Error fetching Message data:', err);
          },
        });
    }
  }

  // get messages

  Messages: MessageIF[] = [];

  checkData() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._AdminMessageService.get_Message(userToken).subscribe({
        next: (res) => {
          this.Messages = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
