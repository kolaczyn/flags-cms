import { Component, input } from '@angular/core'
import { FlagsDto } from '../types/FlagsDto'
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  imports: [MatCheckboxModule],
})
export class FlagsListComponent {
  flags = input.required<FlagsDto>()
}
