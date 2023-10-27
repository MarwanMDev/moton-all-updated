import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private Auth_service: AuthService,
    private _Router: Router
  ) {}

  isLodaing: boolean = false;

  login_form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),

    password: new FormControl(null, [Validators.required]),
  });

  handelLogin(login_form: FormGroup) {
    this.isLodaing = true;

    if (login_form.valid) {
      this.Auth_service.login(login_form.value).subscribe({
        next: (response) => {
          localStorage.setItem('userToken', response.token);
          this.Auth_service.decodeUserData();
          this.isLodaing = false;
          if (response.data.role === 'admin') {
            this._Router.navigate(['/home-panel']);
          } else if (response.data.role === 'publisher') {
            this._Router.navigate(['/ebook']);
          }

          console.log(response.data.role);
        },
        error: (err) => console.log(err),
      });
    }

    // console.log(AddCategoryForm.value);
  }
}
