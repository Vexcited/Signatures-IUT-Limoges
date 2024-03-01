import * as cheerio from "cheerio";
import utf8 from "../utils/utf8";

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
    const semesterName = header.children().first().text().trim();

    const skills: SignaturesSkillDump[] = [];
    const columns: string[] = [];

    table.find($("thead th")).each(function () {
      columns.push($(this).text().trim());
    });

    table.find($("tr.tr_ue")).each(function () {
      const ue = $(this);
      let element = ue.children();

      const fullName = element.first().text();
      const fullNameParts = fullName.split(" ");

      element = element.last();
      const coefficient = parseFloat(element.text());
      element = element.prev();
      const absences = parseInt(element.text()) || 0;
      element = element.prev();
      const globalAverage = parseFloat(element.text());

      let skillID = fullNameParts.shift()!.trim();
      if (skillID.toUpperCase() === "UE") skillID = fullNameParts.shift()!.trim();

      const skill: SignaturesSkillDump = {
        id: skillID,
        name: fullNameParts.join(" ").trim(),

        globalAverage: isNaN(globalAverage) ? null : globalAverage,
        coefficient,
        absences,

        modules: []
      };

      const tableID = ue.attr("data-tt-id");
      table.find($(`tr.tr_module[data-tt-parent-id="${tableID}"]`)).each(function () {
        let element = $(this).children();

        const fullName = element.first().text();
        const fullNameParts = fullName.split(" ");

        element = element.last();
        const coefficient = parseFloat(element.text());
        element = element.prev();
        const absences = parseInt(element.text()) || 0;
        element = element.prev();
        const average = parseFloat(element.text());

        const module: SignaturesModuleDump = {
          id: fullNameParts.shift()!.trim(),
          name: utf8(fullNameParts.join(" ").trim()),
          average: isNaN(average) ? null : average,
          coefficient,
          absences
        };

        skill.modules.push(module);
      });

      skills.push(skill);
    });

    semesters.push({
      name: semesterName,
      skills
    });
  });

  return {
    firstName: utf8(firstName),
    familyName: utf8(familyName),
    className,
    semesters
  };
};
