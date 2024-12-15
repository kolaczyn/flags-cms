import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { LayoutComponent } from './layout/layout.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
