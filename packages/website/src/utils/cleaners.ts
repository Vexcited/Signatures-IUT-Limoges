const SEMESTER = "Semestre";

export const cleanSemesterName = (semesterName: string): string => {
  if (semesterName.includes(SEMESTER)) {
    const position = semesterName.indexOf(SEMESTER) + SEMESTER.length;
    const number = semesterName[position + 1];

    // When looking like "S1 Semestre 1", convert to "Semestre 1".
    const altSemesterName = "S" + number;
    if (semesterName.includes(altSemesterName)) {
      return `${SEMESTER} ${number}`;
    }
  }

  return semesterName;
};
