import { computed, inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FlagsDto } from '../types/FlagsDto'
import { LoadableState } from '../../shared/types/loadable-state'
import { initialState } from '../../shared/utils/initial-state'
import { connect } from 'ngxtension/connect'

type FlagsState = LoadableState<FlagsDto>
type S = Partial<FlagsState>

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  private http = inject(HttpClient)

  private state = signal<FlagsState>(initialState)

  flags = computed(() => this.state().data)

  constructor() {
    connect(this.state).with(
      this.flagsLoaded$,
      (_state, response): S => ({
        data: response,
        loading: false,
      }),
    )
  }

  private apiUrl = 'http://localhost:3000'

  getFlags() {
    return this.http.get<FlagsDto>(`${this.apiUrl}/flags`)
  }

  private flagsLoaded$ = this.getFlags()
}
