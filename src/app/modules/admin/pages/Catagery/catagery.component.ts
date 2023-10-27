import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-catagery',
  templateUrl: './catagery.component.html',
  styleUrls: ['./catagery.component.css']
})
export class CatageryComponent {

  constructor(private Auth_service:AuthService , private _Router :Router){}


  login_form: FormGroup = new FormGroup({
   
    email : new FormControl(null ,[Validators.required ]),

  })




  handelLogin(login_form:FormGroup){
   
    console.log(login_form.value);

    if(login_form.valid){
      this.Auth_service.forget_pass(login_form.value).subscribe({
        next: (response) =>
        {
         console.log(response);
         
          
        },
        error: (err) => console.log(err)
      });
    }
  }
  

}
