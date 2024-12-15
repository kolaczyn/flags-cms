import { Component, effect, inject } from '@angular/core'
import { MatAnchor } from '@angular/material/button'
import { MatToolbar } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { FlagsService } from '../flags-settings/data-access/flags.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [MatAnchor, MatToolbar, RouterLink],
})
export class LayoutComponent {
  private flagsService = inject(FlagsService)
  private snackbar = inject(MatSnackBar)

  constructor() {
    effect(() => {
      const err = this.flagsService.error()
      if (err) {
        this.snackbar.open(err)
      }
    })
  }
}
