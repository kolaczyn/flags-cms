import { Component, inject } from '@angular/core'
import { FlagsService } from './data-access/flags.service'
import { FlagsListComponent } from './ui/flags-list.component'
import { FlagDto } from './types/flag-dto'

@Component({
  selector: 'app-home',
  templateUrl: './flags-settings.component.html',
  imports: [FlagsListComponent],
})
export default class FlagsSettingsComponent {
  flagsService = inject(FlagsService)

  onChange([id, newValue]: [FlagDto['id'], FlagDto['value']]) {
    this.flagsService.changeFlag(id, newValue)
  }
}
