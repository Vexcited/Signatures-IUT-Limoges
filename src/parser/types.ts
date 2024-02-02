export interface SignaturesDump {
  /** Student's first name. */
  firstName: string
  /** Student's family name. */
  familyName: string
  /**
   * Student's class name.
   * @example "BUT1"
   */
  className: string

  /** Contains the skills dump for each semester. */
  semesters: Array<SignaturesSemesterDump>
}

export interface SignaturesSemesterDump {
  /** @example "S1" */
  shortName: string
  /**
   * Long name for the semester.
   * @example "Semestre 1"
   */
  name: string

  /** Contains the skills dump. */
  skills: Array<SignaturesSkillDump>
}

export interface SignaturesSkillDump {
  /**
   * Identifier of the skill.
   * @example "1.1"
   */
  id: string
  /**
   * Full name of the skill.
   * @example "Réaliser un développement d'application"
   */
  name: string
  /**
   * Student's global average for the skill.
   * @remark `null` if the skill is not yet evaluated.
   * @example 12.5
   */
  globalAverage: number | null
  /**
   * Student's number of absences on this skill.
   * @example 0
   */
  absences: number
  /**
   * Coefficient of the skill.
   * @example 10
   */
  coefficient: number

  /** Contains the dump of every modules in this skill. */
  modules: Array<SignaturesModuleDump>
}

export interface SignaturesModuleDump {
  /**
   * Identifier of the module.
   * @example "R1.01"
   */
  id: string
  /**
   * Full name of the module.
   * @example "Initiation au développement"
   */
  name: string
  /**
   * Student's average for the module.
   * @remark `null` if the module is not yet evaluated.
   * @example 18.25
   */
  average: number | null
  /**
   * Student's number of absences on this module.
   * @example 0
   */
  absences: number
  /**
   * Coefficient of the module.
   * @example 4.2
   */
  coefficient: number
}
