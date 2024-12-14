import { Component, inject, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AddFlagAction } from '../../types/actions'

@Component({
  selector: 'app-create-flags-form',
  templateUrl: './create-flags-form.component.html',
  imports: [ReactiveFormsModule],
})
export class CreateFlagsFormComponent {
  private fb = inject(FormBuilder)
  submitForm = output<AddFlagAction>()

  form = this.fb.nonNullable.group({
    label: ['', Validators.required, Validators.minLength(6)],
  })

  validateSubmit() {
    const { label } = this.form.getRawValue()
    console.log(this.form.getRawValue())
    this.submitForm.emit({
      label: label,
    })
    this.form.reset()
  }
}
