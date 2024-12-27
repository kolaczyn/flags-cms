import { inject, Injectable } from '@angular/core'
import {
  FlagAddDto,
  FlagDto,
  FlagGroupDto,
  FlagsListDto,
} from '../types/flag-dto'
import { HttpClient } from '@angular/common/http'
import {
  AddFlagAction,
  ChangeFlagAction,
  ChangeGroupValueAction,
} from '../types/actions'

/* This api has all the actual call to the REST API. I don't know if this is a good approach, but we'll see */
@Injectable({
  providedIn: 'root',
})
export class FlagsApiService {
  private apiUrl = 'http://localhost:5285/flags'
  private http = inject(HttpClient)

  getFlags() {
    return this.http.get<FlagsListDto>(this.apiUrl)
  }

  postFlag({ label }: AddFlagAction) {
    const payload: FlagAddDto = {
      label: label,
    }
    return this.http.post(this.apiUrl, payload)
  }

  patchFlagValue({ id, newValue }: ChangeFlagAction) {
    const payload: Partial<FlagDto> = {
      value: newValue,
    }
    return this.http.patch(`${this.apiUrl}/${id}`, payload)
  }

  patchFlagGroup({ flag, group, value }: ChangeGroupValueAction) {
    const newGroups: FlagGroupDto[] = flag.groups.map((x) => {
      const newValue = x.id === group ? value : x.value
      return {
        ...x,
        value: newValue,
      }
    })
    const payload: Partial<FlagDto> = {
      groups: newGroups,
    }
    return this.http.patch(`${this.apiUrl}/${flag.id}`, payload)
  }
}
