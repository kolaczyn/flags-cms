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
import {
  AddFlagAction,
  ChangeFlagAction,
  ChangeGroupValueAction,
} from '../types/actions'
import { FlagsApiService } from './flags-api.service'

type FlagsState = LoadableState<FlagsListDto>
type S = Partial<FlagsState>

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  private flagsApi = inject(FlagsApiService)

  // state
  private state = signal<FlagsState>(initialState)

  // selectors
  flags = computed(() => this.state().data)
  loading = computed(() => this.state().loading)
  error = computed(() => this.state().error)

  // actions
  changeFlagAction$ = new Subject<ChangeFlagAction>()
  addFlagAction$ = new Subject<AddFlagAction>()
  changeGroupValueAction$ = new Subject<ChangeGroupValueAction>()
  shouldRefetch$ = new BehaviorSubject<null>(null)

  private error$ = new Subject<string | null>()

  constructor() {
    const nextState$ = merge(
      this.changeFlagAction$.pipe(map((): S => ({ loading: true }))),
      this.changeFlagActionDone$.pipe(map((): S => ({}))),

      this.addFlagAction$.pipe(map((): S => ({ loading: true }))),
      this.addFlagActionDone$.pipe(map((): S => ({}))),

      this.shouldRefetch$.pipe(map((): S => ({ loading: true }))),

      this.changeGroupValueAction$.pipe(map((): S => ({ loading: true }))),
      this.changeGroupValueActionDone$.pipe(map((): S => ({ loading: false }))),
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

  private changeFlagActionDone$ = this.changeFlagAction$.pipe(
    switchMap((payload) =>
      this.flagsApi.patchFlagValue(payload).pipe(
        tap(() => this.shouldRefetch$.next(null)),
        catchError((err) => this.handleError(err)),
      ),
    ),
  )

  private addFlagActionDone$ = this.addFlagAction$.pipe(
    switchMap((payload) =>
      this.flagsApi.postFlag(payload).pipe(
        tap(() => this.shouldRefetch$.next(null)),
        catchError((err) => this.handleError(err)),
      ),
    ),
  )

  private changeGroupValueActionDone$ = this.changeGroupValueAction$.pipe(
    switchMap((payload) =>
      this.flagsApi.patchFlagGroup(payload).pipe(
        // TODO this repeats a couple of times
        tap(() => this.shouldRefetch$.next(null)),
        catchError((err) => this.handleError(err)),
      ),
    ),
  )

  private flagsLoaded$ = this.shouldRefetch$.pipe(
    switchMap(() => this.flagsApi.getFlags()),
    catchError((err) => this.handleError(err)),
  )

  private handleError(err: HttpErrorResponse) {
    this.error$.next(err.message)
    return EMPTY
  }
}
