import { Component, inject } from '@angular/core'
import { FlagsService } from './data-access/flags.service'
import { AsyncPipe } from '@angular/common'
import { FlagsListComponent } from './ui/flags-list.component'
import { async } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [AsyncPipe, FlagsListComponent],
})
export default class HomeComponent {
  flagsService = inject(FlagsService)

  flags$ = this.flagsService.getFlags()
  protected readonly async = async
}
