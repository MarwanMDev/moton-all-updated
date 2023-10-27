import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
// import { AuthService } from 'src/app/Service/auth.service';
// import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
})
export class LayerComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLogin = this.storageService.isLoggedIn();
  }

  // logOut() {
  //   this.storageService.logOut();
  // }
}
