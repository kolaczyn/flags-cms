import { Component, inject } from '@angular/core'
import { FlagsService } from './data-access/flags.service'
import { FlagsListComponent } from './ui/flags-list/flags-list.component'
import { CreateFlagsFormComponent } from './ui/create-flags-form/create-flags-form.component'
import { AddFlagAction } from './types/actions'

@Component({
  selector: 'app-home',
  templateUrl: './flags-settings.component.html',
  imports: [FlagsListComponent, CreateFlagsFormComponent],
})
export default class FlagsSettingsComponent {
  flagsService = inject(FlagsService)

  submitForm(event: AddFlagAction) {
    this.flagsService.addFlagAction$.next(event)
  }
}
