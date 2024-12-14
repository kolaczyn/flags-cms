import { Component, inject } from '@angular/core'
import { FlagsService } from '../flags-settings/data-access/flags.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  flagsService = inject(FlagsService)
}
