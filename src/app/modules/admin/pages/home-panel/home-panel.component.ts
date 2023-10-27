import { Component, Input, OnInit } from '@angular/core';
import { UsersSerService } from '../../Service/users-ser.service';

import { AuthService } from '../../Service/auth.service';
import { HomePanelServiceService } from '../../Service/home-panel-service.service';
import { OrdersService } from '../../Service/orders.service';
import { AddNewBookService } from '../../Service/add-new-book.service';
import { AdminMessageService } from '../../Service/admin-message.service';
import { AddNewEventService } from '../../Service/add-new-event.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css'],
})
export class HomePanelComponent implements OnInit {
  constructor(
    private _UsersSerService: UsersSerService,
    private _AuthService: AuthService,
    private _HomePanelServiceService: HomePanelServiceService,
    private _OrdersService: OrdersService,
    private _AddNewBookService: AddNewBookService,
    private _AdminMessageService: AdminMessageService,
    private _AddNewEventService: AddNewEventService
  ) {}

  ngOnInit(): void {
    this.checkData_TotalPrice();
    this.checkData_TotalOrders();
    this.checkData_TotalNumberofBooks_ElectronicOrPaper();
    this.checkData_TotalNumbersOfUsers_Publishers_Admins();
    this.checkData_TotalNumbersOfMessages();
    this.checkData_TotalNumbersOfEvents();
  }

  // get total price of all orders
  totalSalesAchieved: string = '';

  checkData_TotalPrice() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._HomePanelServiceService.GetTotalPrice().subscribe({
        next: (res: any) => {
          this.totalSalesAchieved = res.data.totalSalesAchieved;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  // get quantity of orders

  TotalOrders: string = '';

  checkData_TotalOrders() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._OrdersService.get_Orders(userToken).subscribe({
        next: (res: any) => {
          this.TotalOrders = res.data.length;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  // get total number of electronic and paper book

  TotalNumberOfElectronic: number = 0;
  TotalNumberOfPaper: number = 0;

  checkData_TotalNumberofBooks_ElectronicOrPaper() {
    this._AddNewBookService.get_book().subscribe({
      next: (res: any) => {
        let books = res.data;
        for (let i = 0; i < books.length; i++) {
          if (books[i].type === 'electronic') {
            this.TotalNumberOfElectronic++;
          } else if (books[i].type === 'paper') {
            this.TotalNumberOfPaper++;
          }
        }
      },

      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // get total number of users , publishers and admins

  TotalNumberOfUsers: number = 0;
  TotalNumberOfPublishers: number = 0;
  TotalNumberOfAdmins: number = 0;
  checkData_TotalNumbersOfUsers_Publishers_Admins() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._UsersSerService.get_(userToken).subscribe({
        next: (res: any) => {
          let resOfData = res.data;
          for (let i = 0; i < resOfData.length; i++) {
            if (resOfData[i].role === 'publisher') {
              this.TotalNumberOfPublishers++;
            } else if (resOfData[i].role === 'user') {
              this.TotalNumberOfUsers++;
            }
            if (resOfData[i].role === 'admin') {
              this.TotalNumberOfAdmins++;
            }
          }
        },
      });
    }
  }

  // get number of messages

  TotalNumberOfMessage: string = '';

  checkData_TotalNumbersOfMessages() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._AdminMessageService.get_Message(userToken).subscribe({
        next: (res: any) => {
          this.TotalNumberOfMessage = res.data.length;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  // get Number of all events

  TotalNumberOfEvents: string = '';

  checkData_TotalNumbersOfEvents() {
    this._AddNewEventService.get_event().subscribe({
      next: (res: any) => {
        this.TotalNumberOfEvents = res.data.length;
      },
      error: (err: any) => {
        console.log('Error');
      },
    });
  }
}
