import { Component, input, output } from '@angular/core'
import { FlagDto } from '../../types/flag-dto'
import { MatCheckbox } from '@angular/material/checkbox'

@Component({
  selector: 'app-flag-edit',
  templateUrl: './flag-edit.component.html',
  imports: [MatCheckbox],
})
export class FlagEditComponent {
  flag = input.required<FlagDto>()
  loading = input.required<boolean>()
  change = output<FlagDto>()
}
