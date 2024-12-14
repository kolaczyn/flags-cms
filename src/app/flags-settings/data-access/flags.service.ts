import { computed, inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FlagsListDto } from '../types/flags-list-dto'
import { LoadableState } from '../../shared/types/loadable-state'
import { initialState } from '../../shared/utils/initial-state'
import { connect } from 'ngxtension/connect'
import { FlagDto } from '../types/flag-dto'
import { startWith, Subject, switchMap } from 'rxjs'
import { FlagChanged } from '../types/flag-changed'

type FlagsState = LoadableState<FlagsListDto>
type S = Partial<FlagsState>

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  private http = inject(HttpClient)

  private state = signal<FlagsState>(initialState)

  flags = computed(() => this.state().data)
  loading = computed(() => this.state().loading)

  flagChanged$ = new Subject<FlagChanged>()

  constructor() {
    connect(this.state)
      .with(
        this.flagsLoaded$,
        (_state, response): S => ({
          data: response,
          loading: false,
        }),
      )
      .with(
        this.flagChanged$,
        (state, response): S => ({
          loading: true,
        }),
      )
      .with(
        this.changeFlag$,
        (state, response): S => ({
          loading: false,
        }),
      )
  }

  private apiUrl = 'http://localhost:3000/flags'

  getFlags() {
    return this.http.get<FlagsListDto>(this.apiUrl)
  }

  // flags
  flagGreetUsers = computed(() => {
    return this.checkValue('greetUser')
  })
  flagAboutSection = computed(() => this.checkValue('aboutSection'))

  checkValue(label: string) {
    return this.flags()?.find((x) => x.label === label)?.value ?? false
  }

  changeFlag$ = this.flagChanged$.pipe(
    switchMap(({ id, newValue }) =>
      this.http.patch(`${this.apiUrl}/${id}`, {
        value: newValue,
      } as Partial<FlagDto>),
    ),
  )

  private flagsLoaded$ = this.flagChanged$.pipe(
    startWith(null),
    switchMap(() => this.getFlags()),
  )
}
