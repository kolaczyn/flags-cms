import { Component, input, output } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FlagDto, FlagsListDto } from '../../types/flag-dto'

@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  imports: [MatCheckboxModule],
})
export class FlagsListComponent {
  flags = input.required<FlagsListDto>()
  loading = input.required<boolean>()
  change = output<FlagDto>()
}
