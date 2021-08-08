"use strict";
const app = require("../../server/server");
module.exports = function (School) {
  School.addNewSchool = function (
    name,
    nameAbbrev,
    terms,
    current_year,
    current_term,
    cb
  ) {
    let Term = app.models.term;
    School.create(
      {
        name: name,
        nameAbbrev: nameAbbrev,
        current_year: current_year,
        current_term: current_term,
      },
      function (errSchool, schoolInstance) {
        if (errSchool) {
          console.log("Fail to add School " + nameAbbrev);
          let errObj = new Error();
          errObj.name = "Fail to add School " + nameAbbrev;
          errObj.status = 404;
          // console.log(errObj)
          return cb(errObj);
        }
        let schoolId = schoolInstance.id.toString();
        for (const [term, order] of Object.entries(terms)) {
          Term.create(
            { term: term, order: order, schoolId: schoolId },
            function (errTerm, termInstance) {
              if (errTerm) {
                console.log("Fail to add Term " + term + "for " + nameAbbrev);
              } else {
                console.log("Created Term " + term + " for " + nameAbbrev);
              }
            }
          );
        }
        cb(null, "Success");
      }
    );
  };

  School.remoteMethod("addNewSchool", {
    description: "Get major list for python crawl",
    http: { path: "/addNewSchool", verb: "post" },
    accepts: [
      { arg: "name", type: "string", required: true },
      { arg: "nameAbbrev", type: "string", required: true },
      { arg: "terms", type: "Object", required: true },
      { arg: "currentYear", type: "number", required: true },
      { arg: "currentTerm", type: "string", required: true },
    ],
    returns: { arg: "result", type: "object" },
  });
};
