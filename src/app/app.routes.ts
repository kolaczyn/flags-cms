import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'settings',
    loadComponent: () => import('./flags-settings/flags-settings.component'),
  },
]
