import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../Service/orders.service';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private _OrdersService: OrdersService) {}

  orders: OrderModel[] = [];

  ngOnInit(): void {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._OrdersService.get_Orders(userToken).subscribe({
        next: (res) => {
          this.orders = res.data;
          console.log(res.data);

          for (const order of this.orders) {
            for (const cartItem of order.cartItems) {
              const bookName: string = cartItem.book.bookName;
              console.log(`Book Name: ${bookName}`);
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
