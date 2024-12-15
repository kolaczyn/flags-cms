import { Component, input, output } from '@angular/core'
import { FlagDto, FlagGroupDto } from '../../types/flag-dto'
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanelTitle,
} from '@angular/material/expansion'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { ChangeGroupValueAction } from '../../types/actions'

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
  changeGroup = output<ChangeGroupValueAction>()

  changeGroupWrapper(flag: FlagDto, group: FlagGroupDto) {
    this.changeGroup.emit({
      group: group.id,
      flag,
      value: !group.value,
    })
  }
}
