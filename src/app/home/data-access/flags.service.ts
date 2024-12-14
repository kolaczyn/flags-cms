import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FlagsDto } from '../types/FlagsDto'

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  private http = inject(HttpClient)

  getFlags() {
    return this.http.get<FlagsDto>('/flags.json')
  }
}
