import { Component, inject } from '@angular/core'
import { FlagsService } from './data-access/flags.service'
import { FlagsListComponent } from './ui/flags-list.component'

@Component({
  selector: 'app-home',
  templateUrl: './flags-settings.component.html',
  imports: [FlagsListComponent],
})
export default class FlagsSettingsComponent {
  flagsService = inject(FlagsService)
}
