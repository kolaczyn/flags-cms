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
      (state, response): S => ({
        data: response,
        loading: false,
      }),
    )
  }

  getFlags() {
    return this.http.get<FlagsDto>('/flags.json')
  }

  private flagsLoaded$ = this.getFlags()
}
