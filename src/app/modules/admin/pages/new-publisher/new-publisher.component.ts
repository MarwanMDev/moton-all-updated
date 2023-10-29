import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.css'],
})
export class NewPublisherComponent implements OnInit {
  constructor(private userService: UserService) {}

  // get image added
  image: any;
  getimage(event: any) {
    this.image = event.target.files[0];

    // console.log(this.image);
  }

  saveImg: string = '';

  submitDataImage() {
    let formData = new FormData();
    formData.set('image', this.image);

    const userToken = localStorage.getItem('userToken');
    // if (userToken) {
    //   this.userService.Upload_image(formData, userToken).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.saveImg = res.filename;
    //       console.log(this.saveImg);
    //       // this.AddBook.setValue( value:this.fileName)

    //       this.AddPublisher.patchValue({
    //         profileImage: this.saveImg,
    //       });
    //     },
    //     error: (err) => {
    //       console.log('Error fetching Book data:', err);
    //     },
    //   });
    // }
  }

  AddPublisher: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64),
    ]),
    email: new FormControl(null, [Validators.required]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      ),
    ]),

    confirmPassword: new FormControl(null, [Validators.required]),

    role: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),

    profileImage: new FormControl(null, [Validators.required]),
  });

  handelAddPublisher(addPublisherForm: FormGroup) {
    if (addPublisherForm.valid) {
      this.userService.addUser(addPublisherForm.value).subscribe({
        next: () => {
          alert('تم اضافة المستخدم');
          addPublisherForm.reset(); // Reset the form
          this.image = null;
          this.checkData(); // Refresh the list of categories
        },
        error: (err) => {
          console.log('Error adding category:', err);
          // Handle the error in a way that makes sense for your application
        },
      });
    }
  }

  // posterPrefix:string="https://image.tmdb.org/t/p/w500"

  ngOnInit(): void {
    this.checkData();
  }

  // delete one category
  onDeletePublisher(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        alert('تم حذف الناشر');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error fetching category data:', err);
      },
    });
  }

  // get all Publisher after doing any change

  Publisher: User[] = [];

  checkData() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.userService.getAllUsers().subscribe({
        next: (res) => {
          // this.Publisher=[]
          // let resOfUsers = res.data
          this.Publisher = res.data;
          console.log(res.data);

          // for(let i =0 ; i< resOfUsers.length ; i++){

          //   if(resOfUsers[i].role === 'publisher' ){

          //     this.Publisher.push(resOfUsers[i])

          //   }

          // }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
