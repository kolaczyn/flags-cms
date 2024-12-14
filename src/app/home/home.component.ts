import { Component, inject } from '@angular/core'
import { FlagsService } from './data-access/flags.service'
import { FlagsListComponent } from './ui/flags-list.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FlagsListComponent],
})
export default class HomeComponent {
  flagsService = inject(FlagsService)
}
