import { Component, inject, input, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AddFlagAction } from '../../types/actions'
import { MatFormField } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-create-flags-form',
  templateUrl: './create-flags-form.component.html',
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatButton],
})
export class CreateFlagsFormComponent {
  private fb = inject(FormBuilder)
  submitForm = output<AddFlagAction>()

  loading = input.required<boolean>()

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
