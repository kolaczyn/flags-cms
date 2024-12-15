export type FlagDto = {
  label: string
  /** Global value */
  value: boolean
  id: string
  /** If you belong to one of those groups, you use the value from here. Otherwise, you use the global value.
   *
   *  This approach raises a question - what if you belong to more than one group? I will have to figure this later.
   *  I should probably just add more complex form in CMS to assign value based on conditions.
   *  And the consumer will just use flags returned from API
   * */
  groups: FlagGroupDto[]
}

export type FlagGroupDto = {
  id: string
  value: boolean
}

export type FlagsListDto = FlagDto[]

export type FlagAddDto = {
  label: string
  value: false
}
