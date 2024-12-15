import { computed, inject, Injectable } from '@angular/core'
import { FlagsService } from './flags.service'
import { Flag } from '../../shared/types/flag'

/** This is for consumers, readonly */
@Injectable({
  providedIn: 'root',
})
export class FlagsEnabledService {
  private flagsService = inject(FlagsService)

  // flags
  flagGreetUsers = computed(() => this.checkValue('greetUser'))
  flagAboutSection = computed(() => this.checkValue('aboutSection'))

  private checkValue(label: Flag) {
    const flag = this.flagsService.flags()?.find((x) => x.label === label)
    return flag?.value ?? false
  }
}
