import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent {
  addModelForm = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(10),
  });

  submitForm() {
    console.log(this.addModelForm.value);
  }
}
