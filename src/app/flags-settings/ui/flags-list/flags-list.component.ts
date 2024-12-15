import { Component, input, output } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FlagDto, FlagsListDto } from '../../types/flag-dto'
import { FlagEditComponent } from '../flag-edit/flag-edit.component'

@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  imports: [MatCheckboxModule, FlagEditComponent],
})
export class FlagsListComponent {
  flags = input.required<FlagsListDto>()
  loading = input.required<boolean>()
  change = output<FlagDto>()
}
