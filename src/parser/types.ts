export interface SignaturesDump {
  firstName: string
  familyName: string
  className: string
  semesters: Array<SignaturesSemesterDump>
}

export interface SignaturesSemesterDump {
  shortName: string
  name: string
  skills: Array<SignaturesSkillDump>
}

export interface SignaturesSkillDump {
  id: string
  name: string
  globalAverage: number
  absences: number
  coefficient: number
  modules: Array<SignaturesModuleDump>
}

export interface SignaturesModuleDump {
  id: string
  name: string
  average: number
  absences: number
  coefficient: number
}
