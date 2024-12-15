import { Component, input, output } from '@angular/core'
import { FlagDto } from '../../types/flag-dto'
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanelTitle,
} from '@angular/material/expansion'
import { MatSlideToggle } from '@angular/material/slide-toggle'

@Component({
  selector: 'app-flag-edit',
  templateUrl: './flag-edit.component.html',
  imports: [
    MatAccordion,
    MatExpansionModule,
    MatExpansionPanelTitle,
    MatSlideToggle,
  ],
})
export class FlagEditComponent {
  flag = input.required<FlagDto>()
  loading = input.required<boolean>()
  change = output<FlagDto>()
}
