import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  public slidesForm: FormGroup | any;
  public slidesStatuses: string[] = [];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.slidesForm = this.fb.group({
      slides: this.fb.array([])
    });
  }

  get slides(): FormArray {
    return this.slidesForm.get('slides') as FormArray;
  }

  addSlide() {
    this.slides.push(
      this.fb.group({
        backgroundColor: [null, Validators.required],
        color: [null, Validators.required],
        title: [null, Validators.required],
        titleFont: [null, Validators.required],
        content: [null, Validators.required],
        contentFont: [null, Validators.required],
        startingCode: [null, Validators.required],
        code: [null, Validators.required],
        image: [null, Validators.required],
      })
    );
    this.slidesStatuses.push('doing');
  }

  setSilideAsDone(index: number) {
    this.slidesStatuses[index] = 'done';
  }

  setSilideAsDoing(index: number) {
    this.slidesStatuses[index] = 'doing';
  }

  removeLanguage(index: number) {
    this.slides.removeAt(index);
  }

  capitalizeFormControl(formControlName: string, index: number) {
    this.capitalize(this.slides.at(index), formControlName);
  }

  capitalize(formGroup: FormGroup | any, formControlName: string) {
    if (formGroup != null && formControlName != null) {
      const words = formGroup.get(formControlName).value.split(' ');
      const capitalizedWords = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));
      const capitalizedString = capitalizedWords.join(' ');
      formGroup.get(formControlName).setValue(capitalizedString);
    }
  }
}
