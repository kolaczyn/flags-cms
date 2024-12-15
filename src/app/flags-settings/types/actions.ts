import { FlagDto, FlagGroupDto } from './flag-dto'

export type ChangeFlagAction = {
  id: string
  newValue: boolean
}

export type AddFlagAction = {
  label: string
}

export type ChangeGroupValueAction = {
  flag: FlagDto
  group: FlagGroupDto['id']
  value: FlagGroupDto['value']
}
