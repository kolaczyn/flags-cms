import { computed, inject, Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { FlagAddDto, FlagDto, FlagsListDto } from '../types/flag-dto'
import { LoadableState } from '../../shared/types/loadable-state'
import { initialState } from '../../shared/utils/initial-state'
import { connect } from 'ngxtension/connect'
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  merge,
  Subject,
  switchMap,
  tap,
} from 'rxjs'
import { AddFlagAction, ChangeFlagAction } from '../types/actions'

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
  error = computed(() => this.state().error)

  // actions
  changeFlagAction$ = new Subject<ChangeFlagAction>()
  addFlagAction$ = new Subject<AddFlagAction>()
  shouldRefetch$ = new BehaviorSubject<null>(null)

  private error$ = new Subject<string | null>()

  constructor() {
    const nextState$ = merge(
      this.changeFlagAction$.pipe(map((): S => ({ loading: true }))),
      this.changeFlagActionDone$.pipe(map((): S => ({}))),
      this.addFlagAction$.pipe(map((): S => ({ loading: true }))),
      this.addFlagActionDone$.pipe(map((): S => ({}))),
      this.shouldRefetch$.pipe(map((): S => ({ loading: true }))),
    )

    connect(this.state)
      .with(nextState$)
      .with(
        this.flagsLoaded$,
        (_, data): S => ({
          data,
          loading: false,
        }),
      )
      .with(this.error$, (_, error): S => ({ error }))
  }

  changeFlagActionDone$ = this.changeFlagAction$.pipe(
    switchMap(({ id, newValue }) =>
      this.http
        .patch(`${this.apiUrl}/${id}`, {
          value: newValue,
        } as Partial<FlagDto>)
        .pipe(
          tap(() => this.shouldRefetch$.next(null)),
          catchError((err) => this.handleError(err)),
        ),
    ),
  )

  addFlagActionDone$ = this.addFlagAction$.pipe(
    switchMap((x) =>
      this.http
        .post(this.apiUrl, {
          label: x.label,
          value: false,
        } as FlagAddDto)
        .pipe(
          tap(() => this.shouldRefetch$.next(null)),
          catchError((err) => this.handleError(err)),
        ),
    ),
  )

  private flagsLoaded$ = this.shouldRefetch$.pipe(
    switchMap(() => this.http.get<FlagsListDto>(this.apiUrl)),
    catchError((err) => this.handleError(err)),
  )

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    this.error$.next(err.message)
    return EMPTY
  }
}
