import { computed, inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FlagsListDto } from '../types/flags-list-dto'
import { LoadableState } from '../../shared/types/loadable-state'
import { initialState } from '../../shared/utils/initial-state'
import { connect } from 'ngxtension/connect'
import { FlagDto } from '../types/flag-dto'
import { map, merge, startWith, Subject, switchMap } from 'rxjs'
import { ChangeFlagAction } from '../types/change-flag-action'
import { Flag } from '../../shared/types/flag'

type FlagsState = LoadableState<FlagsListDto>
type S = Partial<FlagsState>

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/flags'

  // state
  private state = signal<FlagsState>(initialState)

  // selectors
  flags = computed(() => this.state().data)
  loading = computed(() => this.state().loading)

  // flags
  flagGreetUsers = computed(() => this.checkValue('greetUser'))
  flagAboutSection = computed(() => this.checkValue('aboutSection'))

  checkValue(label: Flag) {
    return this.flags()?.find((x) => x.label === label)?.value ?? false
  }

  // sources
  flagChanged$ = new Subject<ChangeFlagAction>()

  constructor() {
    const nextState$ = merge(
      this.flagChanged$.pipe(map((): S => ({ loading: true }))),
      this.changeFlag$.pipe(map((): S => ({ loading: false }))),
    )
    connect(this.state)
      .with(nextState$)
      .with(
        this.flagsLoaded$,
        (_s, response): S => ({
          data: response,
          loading: false,
        }),
      )
  }

  changeFlag$ = this.flagChanged$.pipe(switchMap((x) => this.changeFlag(x)))

  private flagsLoaded$ = this.flagChanged$.pipe(
    startWith(null),
    switchMap(() => this.getFlags()),
  )

  private getFlags() {
    return this.http.get<FlagsListDto>(this.apiUrl)
  }

  private changeFlag({ id, newValue }: ChangeFlagAction) {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      value: newValue,
    } as Partial<FlagDto>)
  }
}
