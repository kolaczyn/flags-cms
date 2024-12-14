import { Component, inject } from '@angular/core'
import { FlagsEnabledService } from '../shared/data-access/flags-enabled.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  flagsEnabledService = inject(FlagsEnabledService)
}
