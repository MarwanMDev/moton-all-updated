import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLogin = this.storageService.isLoggedIn();
  }
}
