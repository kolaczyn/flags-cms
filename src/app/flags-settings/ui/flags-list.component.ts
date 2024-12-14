import { Component, input, output } from '@angular/core'
import { FlagsListDto } from '../types/flags-list-dto'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FlagDto } from '../types/flag-dto'
import { FlagsService } from '../data-access/flags.service'

@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  imports: [MatCheckboxModule],
})
export class FlagsListComponent {
  flags = input.required<FlagsListDto>()
  change = output<[FlagDto['id'], FlagDto['value']]>()

  onChange(flag: FlagDto) {
    this.change.emit([flag.id, !flag.value])
  }
}
