import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatAnchor } from '@angular/material/button'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, RouterLink, MatAnchor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
