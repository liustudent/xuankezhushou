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

  School.disableRemoteMethodByName("upsert"); // disables PATCH /schools
  School.disableRemoteMethodByName("find"); // disables GET /schools
  School.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /schools
  School.disableRemoteMethodByName("create"); // disables POST /schools
  School.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /schools/{id}
  School.disableRemoteMethodByName("findById"); // disables GET /schools/{id}
  School.disableRemoteMethodByName("exists"); // disables HEAD /schools/{id}
  School.disableRemoteMethodByName("replaceById"); // disables PUT /schools/{id}
  School.disableRemoteMethodByName("deleteById"); // disables DELETE /schools/{id}
  School.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /schools/change-stream
  School.disableRemoteMethodByName("count"); // disables GET /schools/count
  School.disableRemoteMethodByName("findOne"); // disables GET /schools/findOne
  School.disableRemoteMethodByName("update"); // disables POST /schools/update
  School.disableRemoteMethodByName("upsertWithWhere"); // disables POST /schools/upsertWithWhere
  School.disableRemoteMethodByName("prototype.__get__course_names"); //disables GET /schools/{id}/course_names
  School.disableRemoteMethodByName("prototype.__create__course_names"); //disables POST /schools/{id}/course_names
  School.disableRemoteMethodByName("prototype.__delete__course_names"); //disables DELETE /schools/{id}/course_names
  School.disableRemoteMethodByName("prototype.__findById__course_names"); //disables GET /schools/{id}/course_names/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__course_names"); //disables PUT /schools/{id}/course_names/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__course_names"); //disables DELETE /schools/{id}/course_names/{fk}
  School.disableRemoteMethodByName("prototype.__count__course_names"); //disables GET /schools/{id}/course_names/count
  School.disableRemoteMethodByName("prototype.__get__departments"); //disables GET /schools/{id}/departments
  School.disableRemoteMethodByName("prototype.__create__departments"); //disables POST /schools/{id}/departments
  School.disableRemoteMethodByName("prototype.__delete__departments"); //disables DELETE /schools/{id}/departments
  School.disableRemoteMethodByName("prototype.__findById__departments"); //disables GET /schools/{id}/departments/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__departments"); //disables PUT /schools/{id}/departments/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__departments"); //disables DELETE /schools/{id}/departments/{fk}
  School.disableRemoteMethodByName("prototype.__count__departments"); //disables GET /schools/{id}/departments/count
  School.disableRemoteMethodByName("prototype.__get__professors"); //disables GET /schools/{id}/professors
  School.disableRemoteMethodByName("prototype.__create__professors"); //disables POST /schools/{id}/professors
  School.disableRemoteMethodByName("prototype.__delete__professors"); //disables DELETE /schools/{id}/professors
  School.disableRemoteMethodByName("prototype.__findById__professors"); //disables GET /schools/{id}/professors/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__professors"); //disables PUT /schools/{id}/professors/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__professors"); //disables DELETE /schools/{id}/professors/{fk}
  School.disableRemoteMethodByName("prototype.__count__professors"); //disables GET /schools/{id}/professors/count
  School.disableRemoteMethodByName("prototype.__get__terms"); //disables GET /schools/{id}/terms
  School.disableRemoteMethodByName("prototype.__create__terms"); //disables POST /schools/{id}/terms
  School.disableRemoteMethodByName("prototype.__delete__terms"); //disables DELETE /schools/{id}/terms
  School.disableRemoteMethodByName("prototype.__findById__terms"); //disables GET /schools/{id}/terms/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__terms"); //disables PUT /schools/{id}/terms/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__terms"); //disables DELETE /schools/{id}/terms/{fk}
  School.disableRemoteMethodByName("prototype.__count__terms"); //disables GET /schools/{id}/terms/count
  School.disableRemoteMethodByName("prototype.__get__year_terms"); //disables GET /schools/{id}/year_terms
  School.disableRemoteMethodByName("prototype.__create__year_terms"); //disables POST /schools/{id}/year_terms
  School.disableRemoteMethodByName("prototype.__delete__year_terms"); //disables DELETE /schools/{id}/year_terms
  School.disableRemoteMethodByName("prototype.__findById__year_terms"); //disables GET /schools/{id}/year_terms/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__year_terms"); //disables PUT /schools/{id}/year_terms/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__year_terms"); //disables DELETE /schools/{id}/year_terms/{fk}
  School.disableRemoteMethodByName("prototype.__count__year_terms"); //disables GET /schools/{id}/year_terms/count

  // Custom API:
  School.disableRemoteMethodByName("addNewSchool"); //disables POST /schools/addNewSchool
};
