import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddNewEventService } from '../../Service/add-new-event.service';
import { NewEvent } from '../../interface/new-event';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  constructor(
    private _AddNewEventService: AddNewEventService,
    private _AuthService: AuthService
  ) {}

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
    if (userToken) {
      this._AddNewEventService
        .Upload_image(formData, userToken)
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.saveImg = res.filename;
            // console.log(this.saveImg);
            // this.AddBook.setValue( value:this.fileName)

            this.AddEventForm.patchValue({
              image: this.saveImg,
            });
          },
          error: (err) => {
            console.log('Error fetching Book data:', err);
          },
        });
    }
  }

  AddEventForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    details: new FormControl(null, [Validators.required]),

    description: new FormControl(null, [Validators.required]),
  });

  handelAddEvent(AddEventForm: FormGroup) {
    if (this.AddEventForm.valid) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const formData = this.AddEventForm.value;

        // Add new category
        this._AddNewEventService
          .Add_event(formData, userToken)
          .subscribe({
            next: () => {
              alert('تم اضافة الفعالية بنجاح');
              this.ngOnInit(); // Refresh the list of categories
              this.AddEventForm.reset(); // Reset the form
              this.image = null;
            },
            error: (err) => {
              console.log('Error adding category:', err);
              // Handle the error in a way that makes sense for your application
            },
          });
      }
    }
  }

  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.checkData();
  }

  // delete one category
  onDeleteEvent(id: string) {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this._AddNewEventService.delete_event(id, userToken).subscribe({
        next: (res) => {
          alert('تم حذف الفعالية');
          this.ngOnInit();
        },
        error: (err) => {
          console.log('Error fetching category data:', err);
        },
      });
    }
  }

  // get all category after doing any change

  Event: NewEvent[] = [];

  checkData() {
    this._AddNewEventService.get_event().subscribe({
      next: (res) => {
        this.Event = res.data;
        // console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
