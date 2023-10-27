import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AddCatService } from '../../Service/add-cat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryIf } from '../../interface/category-if';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private categoryService: AddCatService,
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
      this.categoryService
        .Upload_image(formData, userToken)
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.saveImg = res.filename;
            // console.log(this.saveImg);
            // this.AddBook.setValue( value:this.fileName)

            this.AddCategoryForm.patchValue({
              image: this.saveImg,
            });
          },
          error: (err) => {
            console.log('Error fetching Book data:', err);
          },
        });
    }
  }

  AddCategoryForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),

    language: new FormControl(null, [Validators.required]),

    type: new FormControl(null, [Validators.required]),
  });

  handelAddCategory(AddCategoryForm: FormGroup) {
    if (this.AddCategoryForm.valid) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const formData = this.AddCategoryForm.value;

        // Add new category
        this.categoryService.Add_Cat(formData, userToken).subscribe({
          next: () => {
            alert('تم اضافة الفئة بنجاح');
            this.ngOnInit(); // Refresh the list of categories
            this.AddCategoryForm.reset(); // Reset the form
            // this.selectedImage1 = null;
            this.image = null;
          },
          error: (err) => {
            // Handle the error
            console.log('Error adding category:', err);
          },
        });
      }
    }
  }

  // get all category

  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.checkData();
  }

  // delete one category
  onDeleteProdect(id: string) {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.categoryService.delete_cat(id, userToken).subscribe({
        next: () => {
          alert('تم حذف الفئة بنجاح');
          this.ngOnInit();
        },
        error: (err) => {
          console.log('Error fetching category data:', err);
        },
      });
    }
  }

  // get all category after doing any change
  category: CategoryIf[] = [];
  checkData() {
    this.categoryService.get_cat().subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
