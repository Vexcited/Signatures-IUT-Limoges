import * as cheerio from "cheerio";

import type {
  SignaturesDump,
  SignaturesModuleDump,
  SignaturesSemesterDump,
  SignaturesSkillDump
} from "./types";

export const dumpSignatureResponse = (html: string): SignaturesDump => {
  const $ = cheerio.load(html);

  const firstName = $("#prenom").text();
  const familyName = $("#nom").text();
  const className = $("#classe").text();

  const semesters: SignaturesSemesterDump[] = [];
  $("table").each(function () {
    const table = $(this);
    const tableID = table.attr("id");

    // Parse the table header containing the semester name.
    const header = table.find($(`tr[data-tt-id="${tableID}"]`));
    const [shortTableName, ...fullTableNameParts] = header.children().first().text().split(" ");
    const fullTableName = fullTableNameParts.join(" ");

    const skills: SignaturesSkillDump[] = [];

    table.find($("tr.tr_ue")).each(function () {
      const ue = $(this);
      const children = ue.children();

      const skillGlobalData: string[] = [];
      for (let iteration = children.first(), i = 0; i < 4; i++) {
        skillGlobalData.push(iteration.text());
        iteration = iteration.next();
      }

      const [, shortSkillName, ...fullSkillNameParts] = skillGlobalData[0].split(" ");
      const modules: SignaturesModuleDump[] = [];

      const tableID = ue.attr("data-tt-id");
      table.find($(`tr.tr_module[data-tt-parent-id="${tableID}"]`)).each(function () {
        const module = $(this);
        const children = module.children();

        const moduleData: string[] = [];
        for (let iteration = children.first(), i = 0; i < 4; i++) {
          moduleData.push(iteration.text());
          iteration = iteration.next();
        }

        const [shortModuleName, ...fullModuleNameParts] = moduleData[0].split(" ");
        const average = parseFloat(moduleData[1]);

        modules.push({
          id: shortModuleName,
          name: fullModuleNameParts.join(" "),
          average: isNaN(average) ? null : average,
          absences: parseInt(moduleData[2]) || 0,
          coefficient: parseFloat(moduleData[3])
        });
      });

      const globalAverage = parseFloat(skillGlobalData[1]);

      skills.push({
        id: shortSkillName,
        name: fullSkillNameParts.join(" "),
        globalAverage: isNaN(globalAverage) ? null : globalAverage,
        absences: parseInt(skillGlobalData[2]) || 0,
        coefficient: parseFloat(skillGlobalData[3]),
        modules
      });
    });

    semesters.push({
      shortName: shortTableName,
      name: fullTableName,
      skills
    });
  });

  return {
    firstName,
    familyName,
    className,
    semesters
  };
};
