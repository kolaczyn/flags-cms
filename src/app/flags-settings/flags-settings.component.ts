import { Component, inject } from '@angular/core'
import { FlagsService } from './data-access/flags.service'
import { CreateFlagsFormComponent } from './ui/create-flags-form/create-flags-form.component'
import { AddFlagAction } from './types/actions'
import { FlagEditComponent } from './ui/flag-edit/flag-edit.component'

@Component({
  selector: 'app-home',
  templateUrl: './flags-settings.component.html',
  imports: [CreateFlagsFormComponent, FlagEditComponent],
})
export default class FlagsSettingsComponent {
  flagsService = inject(FlagsService)

  submitForm(event: AddFlagAction) {
    this.flagsService.addFlagAction$.next(event)
  }
}
